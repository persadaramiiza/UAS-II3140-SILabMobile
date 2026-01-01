import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Download, Layers, Database, Users, Cog, ArrowRight } from 'lucide-react';
import { Screen, UserRole } from '../App';
import BottomNav from './BottomNav';

interface EnterpriseArchitectureProps {
  onBack: () => void;
  navigate: (screen: Screen) => void;
  userRole: UserRole;
}

type EALayerType = 'business' | 'application' | 'data' | 'technology';

interface EAComponent {
  id: string;
  layer: EALayerType;
  x: number;
  y: number;
  width: number;
  height: number;
  text: string;
  color: string;
}

const layerColors = {
  business: '#0F2A71',
  application: '#4169E1',
  data: '#1E90FF',
  technology: '#87CEEB',
};

const templates = [
  { name: 'Blank Canvas', components: [] },
  {
    name: 'Basic EA Framework',
    components: [
      { id: '1', layer: 'business' as EALayerType, x: 50, y: 30, width: 120, height: 60, text: 'Business Process', color: layerColors.business },
      { id: '2', layer: 'application' as EALayerType, x: 50, y: 120, width: 120, height: 60, text: 'Application', color: layerColors.application },
      { id: '3', layer: 'data' as EALayerType, x: 220, y: 120, width: 120, height: 60, text: 'Database', color: layerColors.data },
      { id: '4', layer: 'technology' as EALayerType, x: 135, y: 210, width: 120, height: 60, text: 'Infrastructure', color: layerColors.technology },
    ]
  },
  {
    name: 'TOGAF Architecture',
    components: [
      { id: '1', layer: 'business' as EALayerType, x: 30, y: 30, width: 100, height: 50, text: 'Strategy', color: layerColors.business },
      { id: '2', layer: 'business' as EALayerType, x: 150, y: 30, width: 100, height: 50, text: 'Operations', color: layerColors.business },
      { id: '3', layer: 'business' as EALayerType, x: 270, y: 30, width: 100, height: 50, text: 'Services', color: layerColors.business },
      { id: '4', layer: 'application' as EALayerType, x: 90, y: 110, width: 100, height: 50, text: 'CRM System', color: layerColors.application },
      { id: '5', layer: 'application' as EALayerType, x: 210, y: 110, width: 100, height: 50, text: 'ERP System', color: layerColors.application },
      { id: '6', layer: 'data' as EALayerType, x: 150, y: 190, width: 100, height: 50, text: 'Data Warehouse', color: layerColors.data },
      { id: '7', layer: 'technology' as EALayerType, x: 150, y: 270, width: 100, height: 50, text: 'Cloud Platform', color: layerColors.technology },
    ]
  },
];

export default function EnterpriseArchitecture({ onBack, navigate, userRole }: EnterpriseArchitectureProps) {
  const [components, setComponents] = useState<EAComponent[]>([]);
  const [selectedLayer, setSelectedLayer] = useState<EALayerType>('business');
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    drawCanvas();
  }, [components, selectedComponent]);

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw layer backgrounds
    const layerHeight = 125;
    const layers: EALayerType[] = ['business', 'application', 'data', 'technology'];
    layers.forEach((layer, idx) => {
      ctx.fillStyle = idx % 2 === 0 ? '#FAFAFA' : '#F5F5F5';
      ctx.fillRect(0, idx * layerHeight, canvas.width, layerHeight);
      
      ctx.fillStyle = '#6B6B6B';
      ctx.font = '12px Plus Jakarta Sans';
      ctx.textAlign = 'left';
      ctx.fillText(layer.toUpperCase(), 10, idx * layerHeight + 20);
    });

    // Draw connections
    ctx.strokeStyle = '#CCCCCC';
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 5]);
    components.forEach((comp, idx) => {
      if (idx < components.length - 1) {
        const nextComp = components[idx + 1];
        ctx.beginPath();
        ctx.moveTo(comp.x + comp.width / 2, comp.y + comp.height);
        ctx.lineTo(nextComp.x + nextComp.width / 2, nextComp.y);
        ctx.stroke();
      }
    });
    ctx.setLineDash([]);

    // Draw components
    components.forEach((component) => {
      const isSelected = component.id === selectedComponent;
      
      ctx.fillStyle = component.color;
      ctx.strokeStyle = isSelected ? '#FF6B00' : component.color;
      ctx.lineWidth = isSelected ? 3 : 2;

      // Draw shadow
      ctx.shadowColor = 'rgba(0, 0, 0, 0.1)';
      ctx.shadowBlur = 8;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 2;

      ctx.fillRect(component.x, component.y, component.width, component.height);
      ctx.strokeRect(component.x, component.y, component.width, component.height);

      ctx.shadowColor = 'transparent';

      // Draw text
      ctx.fillStyle = '#FFFFFF';
      ctx.font = '600 12px Plus Jakarta Sans';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(component.text, component.x + component.width / 2, component.y + component.height / 2);
    });
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const clickedComponent = components.find((comp) => 
      x >= comp.x && x <= comp.x + comp.width && y >= comp.y && y <= comp.y + comp.height
    );

    if (clickedComponent) {
      setSelectedComponent(clickedComponent.id);
    } else {
      // Add new component
      const newComponent: EAComponent = {
        id: Date.now().toString(),
        layer: selectedLayer,
        x: x - 60,
        y: y - 30,
        width: 120,
        height: 60,
        text: selectedLayer.charAt(0).toUpperCase() + selectedLayer.slice(1),
        color: layerColors[selectedLayer],
      };
      setComponents([...components, newComponent]);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!selectedComponent) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const component = components.find((c) => c.id === selectedComponent);
    if (component) {
      setDragging(true);
      setDragOffset({ x: x - component.x, y: y - component.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!dragging || !selectedComponent) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setComponents(components.map((c) => 
      c.id === selectedComponent 
        ? { ...c, x: x - dragOffset.x, y: y - dragOffset.y }
        : c
    ));
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const loadTemplate = (template: typeof templates[0]) => {
    setComponents(template.components);
    setSelectedComponent(null);
  };

  const downloadDiagram = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'enterprise-architecture.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const deleteSelected = () => {
    if (selectedComponent) {
      setComponents(components.filter((c) => c.id !== selectedComponent));
      setSelectedComponent(null);
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
          <h1 style={{ fontSize: '20px', fontWeight: 700, color: '#FFB800' }}>Enterprise Architecture</h1>
          <p className="text-[#6B6B6B]" style={{ fontSize: '14px' }}>Design EA models with TOGAF framework</p>
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

        {/* Layers Toolbar */}
        <div className="bg-white rounded-[16px] border border-[#E8E8E8] p-4 mb-4">
          <h2 className="mb-3" style={{ fontSize: '16px', fontWeight: 600 }}>Architecture Layers</h2>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setSelectedLayer('business')}
              className={`h-12 px-4 rounded-[8px] flex items-center gap-2 transition-colors ${
                selectedLayer === 'business' ? 'bg-[#0F2A71] text-white' : 'bg-[#F5F5F5] text-[#111]'
              }`}
            >
              <Users size={18} />
              <span style={{ fontSize: '14px' }}>Business</span>
            </button>
            <button
              onClick={() => setSelectedLayer('application')}
              className={`h-12 px-4 rounded-[8px] flex items-center gap-2 transition-colors ${
                selectedLayer === 'application' ? 'bg-[#4169E1] text-white' : 'bg-[#F5F5F5] text-[#111]'
              }`}
            >
              <Layers size={18} />
              <span style={{ fontSize: '14px' }}>Application</span>
            </button>
            <button
              onClick={() => setSelectedLayer('data')}
              className={`h-12 px-4 rounded-[8px] flex items-center gap-2 transition-colors ${
                selectedLayer === 'data' ? 'bg-[#1E90FF] text-white' : 'bg-[#F5F5F5] text-[#111]'
              }`}
            >
              <Database size={18} />
              <span style={{ fontSize: '14px' }}>Data</span>
            </button>
            <button
              onClick={() => setSelectedLayer('technology')}
              className={`h-12 px-4 rounded-[8px] flex items-center gap-2 transition-colors ${
                selectedLayer === 'technology' ? 'bg-[#87CEEB] text-white' : 'bg-[#F5F5F5] text-[#111]'
              }`}
            >
              <Cog size={18} />
              <span style={{ fontSize: '14px' }}>Technology</span>
            </button>
          </div>
          {selectedComponent && (
            <button
              onClick={deleteSelected}
              className="w-full mt-3 h-10 bg-red-50 text-red-600 rounded-[8px] hover:bg-red-100 transition-colors"
              style={{ fontSize: '14px' }}
            >
              Delete Selected
            </button>
          )}
        </div>

        {/* Canvas */}
        <div className="bg-white rounded-[16px] border border-[#E8E8E8] p-4">
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
      <BottomNav currentScreen="enterprise-architecture" navigate={navigate} userRole={userRole} />
    </div>
  );
}