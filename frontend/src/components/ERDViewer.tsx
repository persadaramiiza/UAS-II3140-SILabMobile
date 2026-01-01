import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Download, Plus, Table2, Key, Link2 } from 'lucide-react';
import { Screen, UserRole } from '../App';
import BottomNav from './BottomNav';

interface ERDViewerProps {
  onBack: () => void;
  navigate: (screen: Screen) => void;
  userRole: UserRole;
}

interface ERDAttribute {
  name: string;
  type: string;
  isPrimaryKey: boolean;
  isForeignKey: boolean;
}

interface ERDTable {
  id: string;
  x: number;
  y: number;
  width: number;
  name: string;
  attributes: ERDAttribute[];
}

interface ERDRelationship {
  id: string;
  from: string;
  to: string;
  type: '1:1' | '1:N' | 'N:M';
}

const templates = [
  { name: 'Blank Canvas', tables: [], relationships: [] },
  {
    name: 'E-Commerce System',
    tables: [
      {
        id: '1',
        x: 50,
        y: 50,
        width: 150,
        name: 'Users',
        attributes: [
          { name: 'user_id', type: 'INT', isPrimaryKey: true, isForeignKey: false },
          { name: 'username', type: 'VARCHAR', isPrimaryKey: false, isForeignKey: false },
          { name: 'email', type: 'VARCHAR', isPrimaryKey: false, isForeignKey: false },
        ]
      },
      {
        id: '2',
        x: 220,
        y: 50,
        width: 150,
        name: 'Orders',
        attributes: [
          { name: 'order_id', type: 'INT', isPrimaryKey: true, isForeignKey: false },
          { name: 'user_id', type: 'INT', isPrimaryKey: false, isForeignKey: true },
          { name: 'total', type: 'DECIMAL', isPrimaryKey: false, isForeignKey: false },
        ]
      },
      {
        id: '3',
        x: 135,
        y: 250,
        width: 150,
        name: 'Products',
        attributes: [
          { name: 'product_id', type: 'INT', isPrimaryKey: true, isForeignKey: false },
          { name: 'name', type: 'VARCHAR', isPrimaryKey: false, isForeignKey: false },
          { name: 'price', type: 'DECIMAL', isPrimaryKey: false, isForeignKey: false },
        ]
      },
    ],
    relationships: [
      { id: '1', from: '1', to: '2', type: '1:N' as const },
      { id: '2', from: '2', to: '3', type: 'N:M' as const },
    ]
  },
  {
    name: 'University System',
    tables: [
      {
        id: '1',
        x: 30,
        y: 30,
        width: 140,
        name: 'Students',
        attributes: [
          { name: 'student_id', type: 'INT', isPrimaryKey: true, isForeignKey: false },
          { name: 'name', type: 'VARCHAR', isPrimaryKey: false, isForeignKey: false },
          { name: 'major', type: 'VARCHAR', isPrimaryKey: false, isForeignKey: false },
        ]
      },
      {
        id: '2',
        x: 220,
        y: 30,
        width: 140,
        name: 'Courses',
        attributes: [
          { name: 'course_id', type: 'INT', isPrimaryKey: true, isForeignKey: false },
          { name: 'course_name', type: 'VARCHAR', isPrimaryKey: false, isForeignKey: false },
          { name: 'credits', type: 'INT', isPrimaryKey: false, isForeignKey: false },
        ]
      },
      {
        id: '3',
        x: 125,
        y: 200,
        width: 140,
        name: 'Enrollments',
        attributes: [
          { name: 'enrollment_id', type: 'INT', isPrimaryKey: true, isForeignKey: false },
          { name: 'student_id', type: 'INT', isPrimaryKey: false, isForeignKey: true },
          { name: 'course_id', type: 'INT', isPrimaryKey: false, isForeignKey: true },
          { name: 'grade', type: 'VARCHAR', isPrimaryKey: false, isForeignKey: false },
        ]
      },
    ],
    relationships: [
      { id: '1', from: '1', to: '3', type: '1:N' as const },
      { id: '2', from: '2', to: '3', type: '1:N' as const },
    ]
  },
];

export default function ERDViewer({ onBack, navigate, userRole }: ERDViewerProps) {
  const [tables, setTables] = useState<ERDTable[]>([]);
  const [relationships, setRelationships] = useState<ERDRelationship[]>([]);
  const [selectedTable, setSelectedTable] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [showAddTable, setShowAddTable] = useState(false);
  const [newTableName, setNewTableName] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    drawCanvas();
  }, [tables, relationships, selectedTable]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw relationships
    ctx.strokeStyle = '#6B6B6B';
    ctx.lineWidth = 2;
    relationships.forEach((rel) => {
      const fromTable = tables.find((t) => t.id === rel.from);
      const toTable = tables.find((t) => t.id === rel.to);
      if (!fromTable || !toTable) return;

      const fromX = fromTable.x + fromTable.width / 2;
      const fromY = fromTable.y + (fromTable.attributes.length + 1) * 25 + 30;
      const toX = toTable.x + toTable.width / 2;
      const toY = toTable.y;

      ctx.beginPath();
      ctx.moveTo(fromX, fromY);
      ctx.lineTo(toX, toY);
      ctx.stroke();

      // Draw relationship type
      ctx.fillStyle = '#0F2A71';
      ctx.font = '600 12px Plus Jakarta Sans';
      ctx.textAlign = 'center';
      ctx.fillText(rel.type, (fromX + toX) / 2, (fromY + toY) / 2);
    });

    // Draw tables
    tables.forEach((table) => {
      const isSelected = table.id === selectedTable;
      const headerHeight = 30;
      const rowHeight = 25;
      const totalHeight = headerHeight + (table.attributes.length * rowHeight);

      // Shadow
      ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
      ctx.shadowBlur = 8;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 2;

      // Table header
      ctx.fillStyle = isSelected ? '#FF6B00' : '#0F2A71';
      ctx.fillRect(table.x, table.y, table.width, headerHeight);

      ctx.shadowColor = 'transparent';

      // Table name
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '600 14px Plus Jakarta Sans';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(table.name, table.x + table.width / 2, table.y + headerHeight / 2);

      // Table body
      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(table.x, table.y + headerHeight, table.width, table.attributes.length * rowHeight);

      // Border
      ctx.strokeStyle = isSelected ? '#FF6B00' : '#E8E8E8';
      ctx.lineWidth = isSelected ? 3 : 1;
      ctx.strokeRect(table.x, table.y, table.width, totalHeight);

      // Attributes
      table.attributes.forEach((attr, idx) => {
        const attrY = table.y + headerHeight + (idx * rowHeight);
        
        // Attribute background
        if (idx % 2 === 1) {
          ctx.fillStyle = '#FAFAFA';
          ctx.fillRect(table.x, attrY, table.width, rowHeight);
        }

        // Primary/Foreign key icon
        if (attr.isPrimaryKey) {
          ctx.fillStyle = '#FFD700';
          ctx.font = '12px Plus Jakarta Sans';
          ctx.textAlign = 'left';
          ctx.fillText('🔑', table.x + 5, attrY + rowHeight / 2);
        } else if (attr.isForeignKey) {
          ctx.fillStyle = '#87CEEB';
          ctx.font = '12px Plus Jakarta Sans';
          ctx.textAlign = 'left';
          ctx.fillText('🔗', table.x + 5, attrY + rowHeight / 2);
        }

        // Attribute name
        ctx.fillStyle = '#111111';
        ctx.font = attr.isPrimaryKey ? '600 12px Plus Jakarta Sans' : '12px Plus Jakarta Sans';
        ctx.textAlign = 'left';
        ctx.fillText(attr.name, table.x + 25, attrY + rowHeight / 2);

        // Attribute type
        ctx.fillStyle = '#6B6B6B';
        ctx.font = '11px Plus Jakarta Sans';
        ctx.textAlign = 'right';
        ctx.fillText(attr.type, table.x + table.width - 5, attrY + rowHeight / 2);
      });
    });
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const clickedTable = tables.find((table) => {
      const totalHeight = 30 + (table.attributes.length * 25);
      return x >= table.x && x <= table.x + table.width && 
             y >= table.y && y <= table.y + totalHeight;
    });

    setSelectedTable(clickedTable ? clickedTable.id : null);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!selectedTable) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const table = tables.find((t) => t.id === selectedTable);
    if (table) {
      setDragging(true);
      setDragOffset({ x: x - table.x, y: y - table.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!dragging || !selectedTable) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setTables(tables.map((t) => 
      t.id === selectedTable 
        ? { ...t, x: x - dragOffset.x, y: y - dragOffset.y }
        : t
    ));
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const loadTemplate = (template: typeof templates[0]) => {
    setTables(template.tables);
    setRelationships(template.relationships);
    setSelectedTable(null);
  };

  const addNewTable = () => {
    if (!newTableName.trim()) return;
    
    const newTable: ERDTable = {
      id: Date.now().toString(),
      x: 50,
      y: 50,
      width: 150,
      name: newTableName,
      attributes: [
        { name: 'id', type: 'INT', isPrimaryKey: true, isForeignKey: false },
        { name: 'name', type: 'VARCHAR', isPrimaryKey: false, isForeignKey: false },
      ]
    };
    
    setTables([...tables, newTable]);
    setNewTableName('');
    setShowAddTable(false);
  };

  const downloadDiagram = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'erd-diagram.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const deleteSelected = () => {
    if (selectedTable) {
      setTables(tables.filter((t) => t.id !== selectedTable));
      setRelationships(relationships.filter((r) => r.from !== selectedTable && r.to !== selectedTable));
      setSelectedTable(null);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-[#FAFAFA]">
      {/* Header */}
      <div className="bg-white border-b border-[#E8E8E8] px-6 py-4 flex-shrink-0">
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center hover:opacity-70 transition-opacity"
          >
            <ArrowLeft size={24} color="#0F2A71" />
          </button>
          <button
            onClick={downloadDiagram}
            className="h-10 px-4 bg-[#0F2A71] text-white rounded-[12px] flex items-center gap-2 hover:opacity-90 transition-opacity"
          >
            <Download size={16} />
            <span style={{ fontSize: '14px' }}>Download</span>
          </button>
        </div>
        <div>
          <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#FFB800' }}>ERD Viewer</h1>
          <p className="text-[#6B6B6B]" style={{ fontSize: '14px' }}>Design entity relationship diagrams</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 pb-24 scrollbar-hide">
        {/* Templates */}
        <div className="bg-white rounded-[16px] border border-[#E8E8E8] p-4 mb-4">
          <h2 className="mb-3" style={{ fontSize: '16px', fontWeight: 600 }}>Templates</h2>
          <div className="flex gap-2 overflow-x-auto">
            {templates.map((template, idx) => (
              <button
                key={idx}
                onClick={() => loadTemplate(template)}
                className="px-4 py-2 bg-[#F5F5F5] rounded-[8px] hover:bg-[#E8E8E8] transition-colors whitespace-nowrap"
                style={{ fontSize: '14px' }}
              >
                {template.name}
              </button>
            ))}
          </div>
        </div>

        {/* Tools */}
        <div className="bg-white rounded-[16px] border border-[#E8E8E8] p-4 mb-4">
          <h2 className="mb-3" style={{ fontSize: '16px', fontWeight: 600 }}>Tools</h2>
          
          {showAddTable ? (
            <div className="space-y-3">
              <input
                type="text"
                value={newTableName}
                onChange={(e) => setNewTableName(e.target.value)}
                placeholder="Table name"
                className="w-full h-11 px-4 border border-[#E8E8E8] rounded-[12px] focus:outline-none focus:ring-2 focus:ring-[#0F2A71] focus:border-transparent"
                style={{ fontSize: '14px' }}
              />
              <div className="flex gap-2">
                <button
                  onClick={addNewTable}
                  className="flex-1 h-11 bg-[#0F2A71] text-white rounded-[12px] hover:opacity-90 transition-opacity"
                  style={{ fontSize: '14px', fontWeight: 600 }}
                >
                  Add
                </button>
                <button
                  onClick={() => setShowAddTable(false)}
                  className="flex-1 h-11 bg-[#F5F5F5] text-[#111111] rounded-[12px] hover:bg-[#E8E8E8] transition-colors"
                  style={{ fontSize: '14px', fontWeight: 600 }}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => setShowAddTable(true)}
                className="flex-1 h-11 bg-[#0F2A71] text-white rounded-[12px] flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
              >
                <Plus size={18} />
                <span style={{ fontSize: '14px', fontWeight: 600 }}>Add Table</span>
              </button>
              {selectedTable && (
                <button
                  onClick={deleteSelected}
                  className="h-11 px-6 bg-[#FEE2E2] text-[#DC2626] rounded-[12px] hover:bg-[#FECACA] transition-colors"
                  style={{ fontSize: '14px', fontWeight: 600 }}
                >
                  Delete
                </button>
              )}
            </div>
          )}
          
          <div className="mt-4 p-3 bg-[#F5F5F5] rounded-[12px] flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <span style={{ fontSize: '16px' }}>🔑</span>
              <span className="text-[#6B6B6B]" style={{ fontSize: '12px' }}>Primary Key</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span style={{ fontSize: '16px' }}>🔗</span>
              <span className="text-[#6B6B6B]" style={{ fontSize: '12px' }}>Foreign Key</span>
            </div>
          </div>
        </div>

        {/* Canvas */}
        <div className="bg-white rounded-[16px] border border-[#E8E8E8] p-4">
          <canvas
            ref={canvasRef}
            width={400}
            height={500}
            className="border border-[#E8E8E8] rounded-[8px] w-full cursor-pointer"
            onClick={handleCanvasClick}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav currentScreen="erd-viewer" navigate={navigate} userRole={userRole} />
    </div>
  );
}