import { Grid3x3, Building2, Pencil, Database } from 'lucide-react';
import { Screen } from '../App';
import imgToolsHome from "figma:asset/26705343f1a706b1601b562869b52206a8a4c585.png";

interface ToolsHomeProps {
  navigate: (screen: Screen) => void;
}

export default function ToolsHome({ navigate }: ToolsHomeProps) {
  const tools = [
    {
      id: 'requirements',
      icon: Grid3x3,
      title: 'Requirements',
      description: 'MoSCoW prioritization board',
      color: 'bg-blue-50',
      iconColor: 'text-[var(--brand-blue)]',
      screen: 'requirements' as Screen,
    },
    {
      id: 'enterprise',
      icon: Building2,
      title: 'Enterprise Architecture',
      description: 'Value stream & capabilities',
      color: 'bg-purple-50',
      iconColor: 'text-purple-600',
      screen: 'enterprise-architecture' as Screen,
    },
    {
      id: 'diagram',
      icon: Pencil,
      title: 'Diagram Viewer',
      description: 'System modeling tools',
      color: 'bg-green-50',
      iconColor: 'text-green-600',
      screen: 'diagram-viewer' as Screen,
    },
    {
      id: 'erd',
      icon: Database,
      title: 'ERD Viewer',
      description: 'Entity relationship design',
      color: 'bg-orange-50',
      iconColor: 'text-orange-600',
      screen: 'erd-viewer' as Screen,
    },
  ];

  return (
    <div className="min-h-full bg-[#FAFAFA]">
      {/* Header with Background Image */}
      <div className="sticky top-0 bg-white z-10 border-b border-[rgba(17,17,17,0.1)]">
        <div className="relative px-6 pt-4 pb-4" style={{ minHeight: '80px' }}>
          {/* Background Image */}
          <img 
            className="absolute top-0 left-0 w-full h-full object-cover pointer-events-none rounded-b-none" 
            src={imgToolsHome} 
            alt=""
            style={{ objectFit: 'cover', objectPosition: 'left top' }}
          />
          
          {/* Content */}
          <div className="relative z-10">
            <h2 className="text-white mb-1" style={{ fontSize: '16px', fontWeight: 700, lineHeight: '24px' }}>
              Tools
            </h2>
            <p className="text-white opacity-70" style={{ fontSize: '14px', lineHeight: '20px' }}>
              System analysis and design tools
            </p>
          </div>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="px-6 py-6">
        <div className="grid grid-cols-2 gap-4">
          {tools.map((tool) => {
            const Icon = tool.icon;
            
            return (
              <button
                key={tool.id}
                onClick={() => navigate(tool.screen)}
                className="bg-white border border-[var(--brand-divider)] rounded-[16px] p-5 text-left hover:shadow-[var(--shadow-card)] transition-shadow"
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-[12px] ${tool.color} flex items-center justify-center mb-4`}>
                  <Icon size={24} className={tool.iconColor} strokeWidth={2} />
                </div>

                {/* Title */}
                <h3 className="mb-2">{tool.title}</h3>

                {/* Description */}
                <p className="text-caption text-[var(--text-secondary)] leading-relaxed">
                  {tool.description}
                </p>
              </button>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="mt-8 bg-[var(--brand-surface)] rounded-[16px] p-5">
          <h4 className="mb-2">About These Tools</h4>
          <p className="text-caption text-[var(--text-secondary)] leading-relaxed">
            These interactive tools help you practice system analysis, design, and modeling techniques used in real-world software development projects.
          </p>
        </div>
      </div>
    </div>
  );
}