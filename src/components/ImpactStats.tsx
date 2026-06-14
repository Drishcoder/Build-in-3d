import { IMPACT_STATS } from '../data';
import { Award, Trophy, Users, Landmark } from 'lucide-react';

export default function ImpactStats() {
  // Safe helper to return themed icons for stats
  const getIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <Users className="w-5 h-5 text-cyan-400" />;
      case 1:
        return <Landmark className="w-5 h-5 text-purple-400" />;
      case 2:
        return <Trophy className="w-5 h-5 text-amber-400" />;
      default:
        return <Award className="w-5 h-5 text-emerald-400" />;
    }
  };

  const colors = [
    'border-cyan-500/10 hover:border-cyan-400/30 text-cyan-400',
    'border-purple-500/10 hover:border-purple-400/30 text-purple-400',
    'border-amber-500/10 hover:border-amber-400/30 text-amber-400',
    'border-emerald-500/10 hover:border-emerald-400/30 text-emerald-400',
  ];

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {IMPACT_STATS.map((stat, idx) => (
          <div
            key={stat.label}
            className={`relative bg-[#050510]/85 border ${colors[idx]} p-6 rounded-lg transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.02)] hover:-translate-y-0.5 backdrop-blur-md`}
            style={{
              clipPath: 'polygon(0 0, calc(100% - 12px) 0, 100% 12px, 100% 100%, 12px 100%, 0 calc(100% - 12px))',
            }}
          >
            {/* Holographic light accent corner */}
            <div className="absolute top-0 right-0 w-2 h-2 bg-white/10 rounded-bl-sm" />

            <div className="flex justify-between items-start mb-4">
              <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                Prestige Metrics
              </span>
              <div>{getIcon(idx)}</div>
            </div>

            {/* Glowing Big Value */}
            <div className="flex items-baseline gap-0.5">
              <span className="font-orbitron font-extrabold text-3xl md:text-4xl text-white tracking-wider glow-accent">
                {stat.value}
              </span>
              {stat.symbol && (
                <span className="font-orbitron font-black text-xl text-cyan-400 ml-0.5">
                  {stat.symbol}
                </span>
              )}
            </div>

            {/* Label and description */}
            <p className="text-xs font-orbitron font-bold text-slate-100 tracking-wider mt-1.5 mb-2 uppercase">
              {stat.label}
            </p>
            <p className="text-[11px] text-white/40 font-mono leading-relaxed lowercase">
              {stat.detail}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
