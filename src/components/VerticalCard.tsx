import React from 'react';
import { CoreVertical } from '../types';
import { Swords, Cpu, Globe, Atom, ArrowRight } from 'lucide-react';

interface VerticalCardProps {
  vertical: CoreVertical;
  onExplore: (vertical: CoreVertical) => void;
  key?: React.Key;
}

// Map strings to Lucide components safely
const iconMap: Record<string, React.ComponentType<any>> = {
  Swords: Swords,
  Cpu: Cpu,
  Globe: Globe,
  Atom: Atom,
};

export default function VerticalCard({ vertical, onExplore }: VerticalCardProps) {
  const IconComponent = iconMap[vertical.iconName] || Atom;

  const colorStyles: Record<string, { border: string; text: string; bg: string }> = {
    cyan: {
      border: 'hover:border-cyan-400/40',
      text: 'text-cyan-400',
      bg: 'bg-cyan-500/5',
    },
    purple: {
      border: 'hover:border-purple-400/40',
      text: 'text-purple-400',
      bg: 'bg-purple-500/5',
    },
    indigo: {
      border: 'hover:border-indigo-400/40',
      text: 'text-indigo-400',
      bg: 'bg-indigo-500/5',
    },
    amber: {
      border: 'hover:border-amber-400/40',
      text: 'text-amber-400',
      bg: 'bg-amber-500/5',
    },
  };

  const style = colorStyles[vertical.color] || colorStyles.cyan;

  return (
    <div
      onClick={() => onExplore(vertical)}
      className={`group relative cursor-pointer bg-[#05050c]/82 border border-white/10 ${style.border} p-6 md:p-8 rounded-lg transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.03)] backdrop-blur-md`}
      style={{
        clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
      }}
    >
      {/* Structural corner decor */}
      <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/20 group-hover:border-white/50 transition-colors" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/20 group-hover:border-white/50 transition-colors" />

      {/* Track Label */}
      <div className="flex justify-between items-center mb-6">
        <span className={`text-[10px] font-mono tracking-widest uppercase ${style.text}`}>
          Arena Track // {vertical.id.toUpperCase()}
        </span>
        <div className={`p-1.5 rounded-sm ${style.bg}`}>
          <IconComponent className={`w-4 h-4 ${style.text}`} />
        </div>
      </div>

      {/* Header and description */}
      <h3 className="font-orbitron font-extrabold text-lg text-white mb-2 uppercase tracking-wide group-hover:text-cyan-300 transition-colors duration-200">
        {vertical.title}
      </h3>
      <p className="text-xs text-white/40 font-mono mb-4 leading-relaxed uppercase">
        {vertical.subtitle}
      </p>
      
      <p className="text-sm text-slate-300/85 font-mono leading-relaxed line-clamp-3 mb-6">
        {vertical.description}
      </p>

      {/* Decorative Session Count Pill */}
      <div className="flex justify-between items-center pt-4 border-t border-white/5">
        <div className="flex flex-col gap-0.5">
          <span className="text-[9px] text-white/30 font-mono tracking-tight uppercase">Tracks Modules</span>
          <span className="text-xs text-cyan-400 font-mono font-medium">
            {vertical.subSessions.length} Specialized Matrices
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-white/30 font-mono group-hover:text-white/80 transition-colors duration-200">
          <span>DECODE</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </div>
  );
}
