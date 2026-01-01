import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Download, Plus, Square, Circle, Diamond, Minus, Type, Move } from 'lucide-react';
import { Screen, UserRole } from '../App';
import BottomNav from './BottomNav';

interface DiagramViewerProps {
  onBack: () => void;
  navigate: (screen: Screen) => void;
  userRole: UserRole;
}

type ShapeType = 'rectangle' | 'circle' | 'diamond' | 'text' | 'line';

interface DiagramElement {
  id: string;
  type: ShapeType;
  x: number;
  y: number;
  width: number;
  height: number;
  text?: string;
  color?: string;
  endX?: number;
  endY?: number;
}

const templates = [
  { name: 'Blank Canvas', elements: [] },
  {
    name: 'Flowchart',
    elements: [
      { id: '1', type: 'rectangle' as ShapeType, x: 150, y: 50, width: 100, height: 60, text: 'Start', color: '#0F2A71' },
      { id: '2', type: 'diamond' as ShapeType, x: 140, y: 150, width: 120, height: 80, text: 'Decision?', color: '#4169E1' },
      { id: '3', type: 'rectangle' as ShapeType, x: 50, y: 280, width: 100, height: 60, text: 'Process A', color: '#0F2A71' },
      { id: '4', type: 'rectangle' as ShapeType, x: 250, y: 280, width: 100, height: 60, text: 'Process B', color: '#0F2A71' },
    ]
  },
  {
    name: 'Process Flow',
    elements: [
      { id: '1', type: 'circle' as ShapeType, x: 50, y: 100, width: 80, height: 80, text: 'Input', color: '#0F2A71' },
      { id: '2', type: 'rectangle' as ShapeType, x: 180, y: 100, width: 100, height: 80, text: 'Process', color: '#4169E1' },
      { id: '3', type: 'circle' as ShapeType, x: 330, y: 100, width: 80, height: 80, text: 'Output', color: '#0F2A71' },
    ]
  }
];

export default function DiagramViewer({ onBack, navigate, userRole }: DiagramViewerProps) {
  const [elements, setElements] = useState<DiagramElement[]>([]);
  const [selectedTool, setSelectedTool] = useState<ShapeType | 'select'>('select');
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    drawCanvas();
  }, [elements, selectedElement]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    elements.forEach((element) => {
      const isSelected = element.id === selectedElement;
      
      ctx.strokeStyle = isSelected ? '#FF6B00' : '#0F2A71';
      ctx.fillStyle = element.color || '#0F2A71';
      ctx.lineWidth = isSelected ? 3 : 2;

      if (element.type === 'rectangle') {
        ctx.fillStyle = element.color ? element.color + '20' : '#0F2A7120';
        ctx.fillRect(element.x, element.y, element.width, element.height);
        ctx.strokeRect(element.x, element.y, element.width, element.height);
      } else if (element.type === 'circle') {
        ctx.beginPath();
        ctx.arc(element.x + element.width / 2, element.y + element.height / 2, element.width / 2, 0, 2 * Math.PI);
        ctx.fillStyle = element.color ? element.color + '20' : '#0F2A7120';
        ctx.fill();
        ctx.stroke();
      } else if (element.type === 'diamond') {
        ctx.beginPath();
        ctx.moveTo(element.x + element.width / 2, element.y);
        ctx.lineTo(element.x + element.width, element.y + element.height / 2);
        ctx.lineTo(element.x + element.width / 2, element.y + element.height);
        ctx.lineTo(element.x, element.y + element.height / 2);
        ctx.closePath();
        ctx.fillStyle = element.color ? element.color + '20' : '#0F2A7120';
        ctx.fill();
        ctx.stroke();
      } else if (element.type === 'line' && element.endX && element.endY) {
        ctx.beginPath();
        ctx.moveTo(element.x, element.y);
        ctx.lineTo(element.endX, element.endY);
        ctx.stroke();
      }

      if (element.text) {
        ctx.fillStyle = '#111111';
        ctx.font = '14px Plus Jakarta Sans';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(element.text, element.x + element.width / 2, element.y + element.height / 2);
      }
    });
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (selectedTool === 'select') {
      const clickedElement = elements.find((el) => {
        if (el.type === 'circle') {
          const centerX = el.x + el.width / 2;
          const centerY = el.y + el.height / 2;
          const distance = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
          return distance <= el.width / 2;
        }
        return x >= el.x && x <= el.x + el.width && y >= el.y && y <= el.y + el.height;
      });
      setSelectedElement(clickedElement ? clickedElement.id : null);
    } else if (selectedTool !== 'select') {
      const newElement: DiagramElement = {
        id: Date.now().toString(),
        type: selectedTool,
        x: x - 50,
        y: y - 40,
        width: selectedTool === 'line' ? 100 : 100,
        height: selectedTool === 'line' ? 2 : 80,
        text: selectedTool === 'text' ? 'Text' : '',
        color: '#0F2A71',
        endX: selectedTool === 'line' ? x + 50 : undefined,
        endY: selectedTool === 'line' ? y : undefined,
      };
      setElements([...elements, newElement]);
      setSelectedTool('select');
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (selectedTool !== 'select' || !selectedElement) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const element = elements.find((el) => el.id === selectedElement);
    if (element) {
      setDragging(true);
      setDragOffset({ x: x - element.x, y: y - element.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!dragging || !selectedElement) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setElements(elements.map((el) => 
      el.id === selectedElement 
        ? { ...el, x: x - dragOffset.x, y: y - dragOffset.y }
        : el
    ));
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const loadTemplate = (template: typeof templates[0]) => {
    setElements(template.elements);
    setSelectedElement(null);
  };

  const downloadDiagram = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'diagram.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const deleteSelected = () => {
    if (selectedElement) {
      setElements(elements.filter((el) => el.id !== selectedElement));
      setSelectedElement(null);
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
          <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#FFB800' }}>Diagram Builder</h1>
          <p className="text-[#6B6B6B]" style={{ fontSize: '14px' }}>Create interactive diagrams</p>
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

        {/* Toolbar */}
        <div className="bg-white rounded-[16px] border border-[#E8E8E8] p-4 mb-4">
          <h2 className="mb-3" style={{ fontSize: '16px', fontWeight: 600 }}>Tools</h2>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setSelectedTool('select')}
              className={`w-10 h-10 flex items-center justify-center rounded-[8px] transition-colors ${
                selectedTool === 'select' ? 'bg-[#0F2A71] text-white' : 'bg-[#F5F5F5] text-[#111]'
              }`}
            >
              <Move size={18} />
            </button>
            <button
              onClick={() => setSelectedTool('rectangle')}
              className={`w-10 h-10 flex items-center justify-center rounded-[8px] transition-colors ${
                selectedTool === 'rectangle' ? 'bg-[#0F2A71] text-white' : 'bg-[#F5F5F5] text-[#111]'
              }`}
            >
              <Square size={18} />
            </button>
            <button
              onClick={() => setSelectedTool('circle')}
              className={`w-10 h-10 flex items-center justify-center rounded-[8px] transition-colors ${
                selectedTool === 'circle' ? 'bg-[#0F2A71] text-white' : 'bg-[#F5F5F5] text-[#111]'
              }`}
            >
              <Circle size={18} />
            </button>
            <button
              onClick={() => setSelectedTool('diamond')}
              className={`w-10 h-10 flex items-center justify-center rounded-[8px] transition-colors ${
                selectedTool === 'diamond' ? 'bg-[#0F2A71] text-white' : 'bg-[#F5F5F5] text-[#111]'
              }`}
            >
              <Diamond size={18} />
            </button>
            <button
              onClick={() => setSelectedTool('line')}
              className={`w-10 h-10 flex items-center justify-center rounded-[8px] transition-colors ${
                selectedTool === 'line' ? 'bg-[#0F2A71] text-white' : 'bg-[#F5F5F5] text-[#111]'
              }`}
            >
              <Minus size={18} />
            </button>
            <button
              onClick={() => setSelectedTool('text')}
              className={`w-10 h-10 flex items-center justify-center rounded-[8px] transition-colors ${
                selectedTool === 'text' ? 'bg-[#0F2A71] text-white' : 'bg-[#F5F5F5] text-[#111]'
              }`}
            >
              <Type size={18} />
            </button>
            {selectedElement && (
              <button
                onClick={deleteSelected}
                className="ml-auto px-4 h-10 bg-red-50 text-red-600 rounded-[8px] hover:bg-red-100 transition-colors"
                style={{ fontSize: '14px' }}
              >
                Delete
              </button>
            )}
          </div>
        </div>

        {/* Canvas */}
        <div ref={containerRef} className="bg-white rounded-[16px] border border-[#E8E8E8] p-4">
          <canvas
            ref={canvasRef}
            width={400}
            height={500}
            className="border border-[#E8E8E8] rounded-[8px] w-full cursor-crosshair"
            onClick={handleCanvasClick}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
          />
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav currentScreen="diagram-viewer" navigate={navigate} userRole={userRole} />
    </div>
  );
}