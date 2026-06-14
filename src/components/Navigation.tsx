import { useState, useEffect } from 'react';
import { Menu, X, Shield, Clock, Ticket } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Navigation({ activeSection, onNavigate }: NavigationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [countdown, setCountdown] = useState({ days: '00', hours: '00', minutes: '00', seconds: '00' });
  const [systemTime, setSystemTime] = useState('');

  const navItems = [
    { label: 'Home', target: 'home' },
    { label: 'Impact Matrix', target: 'matrix' },
    { label: 'Major Tracks', target: 'verticals' },
    { label: 'Keynote Visionaries', target: 'speakers' },
  ];

  // LIVE COUNTDOWN TO OCT 17, 2026
  useEffect(() => {
    const targetDate = new Date('2026-10-17T09:30:00+05:30'); // IIT Bombay standard launch morning index

    const updateCountdown = () => {
      const now = new Date();
      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setCountdown({ days: '00', hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setCountdown({
        days: String(days).padStart(2, '0'),
        hours: String(hours).padStart(2, '0'),
        minutes: String(minutes).padStart(2, '0'),
        seconds: String(seconds).padStart(2, '0'),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // TICKING LIVE TECH TELEMETRY SYSTEM CLOCK
  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      // Format as YYYY-MM-DD HH:MM:SS format
      const formatted = d.toISOString().replace('T', ' ').substring(0, 19) + ' UTC';
      setSystemTime(formatted);
    };

    updateTime();
    const subInterval = setInterval(updateTime, 1000);
    return () => clearInterval(subInterval);
  }, []);

  const handleLinkClick = (targetId: string) => {
    setIsOpen(false);
    onNavigate(targetId);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 bg-[#05050c]/62 backdrop-blur-md border-b border-white/5 px-4 md:px-8 py-4 transition-all duration-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          {/* HOLO BRAND MARK */}
          <div 
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <Shield className="w-5 h-5 text-cyan-400 group-hover:rotate-12 transition-transform duration-300" />
            <div className="flex flex-col">
              <span className="font-orbitron font-black text-sm tracking-widest text-white uppercase">
                TECHFEST<span className="text-cyan-400">2026</span>
              </span>
              <span className="text-[8px] font-mono text-emerald-400/70 tracking-wider uppercase">
                Neural Void Protocol
              </span>
            </div>
          </div>

          {/* DESKTOP SPEED NAVIGATION */}
          <div className="hidden lg:flex items-center gap-8">
            <nav className="flex gap-6">
              {navItems.map((item) => (
                <button
                  key={item.target}
                  onClick={() => handleLinkClick(item.target)}
                  className={`relative font-mono text-xs uppercase tracking-widest cursor-pointer pb-1 transition-colors duration-200 ${
                    activeSection === item.target ? 'text-cyan-400 font-bold' : 'text-white/40 hover:text-white/80'
                  }`}
                >
                  {item.label}
                  {activeSection === item.target && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-cyan-400 shadow-[0_0_8px_rgb(6,182,212)]" />
                  )}
                </button>
              ))}
            </nav>

            <button
              onClick={() => handleLinkClick('register')}
              className="font-orbitron font-black text-[10px] uppercase tracking-widest text-[#050510] bg-cyan-400 hover:bg-emerald-400 px-5 py-2.5 transition-colors duration-200 cursor-pointer shadow-[0_0_12px_rgba(34,211,238,0.15)] flex items-center gap-1.5"
              style={{
                clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)',
              }}
            >
              <Ticket className="w-3.5 h-3.5" />
              Claim Access Pass ↗
            </button>
          </div>

          {/* MOBILE BURGER TRIGGER */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-1 bg-white/5 border border-white/10 rounded-xs text-white/80 hover:text-white"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* MOBILE OVERLAY TABS */}
        {isOpen && (
          <div className="lg:hidden absolute top-[calc(100%)] left-0 right-0 bg-[#05050f]/95 border-b border-white/10 py-5 px-4 animate-slide-down backdrop-blur-xl flex flex-col gap-4">
            <nav className="flex flex-col gap-3">
              {navItems.map((item) => (
                <button
                  key={item.target}
                  onClick={() => handleLinkClick(item.target)}
                  className={`text-left font-mono text-xs uppercase tracking-widest py-2 border-l-2 pl-3 ${
                    activeSection === item.target
                      ? 'text-cyan-400 border-cyan-400 font-bold bg-cyan-500/5'
                      : 'text-white/40 border-transparent hover:text-white'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            <button
              onClick={() => handleLinkClick('register')}
              className="w-full font-orbitron font-extrabold text-[10px] text-center uppercase tracking-widest text-black bg-cyan-400 py-3 block rounded-sm flex items-center justify-center gap-2"
            >
              <Ticket className="w-3.5 h-3.5" />
              Claim Access Pass ↗
            </button>
          </div>
        )}
      </header>

      {/* FLOAT HUD: LIVE TIMER & SYSTEM TELEMETRY STRIP (Fixed on Large screens) */}
      <div 
        id="cyber-hud-telemetry" 
        className="fixed bottom-[3.5rem] md:bottom-[4.5rem] right-4 md:right-8 z-30 pointer-events-none hidden md:flex flex-col items-end gap-3"
      >
        {/* COUNTDOWN BOARD */}
        <div 
          className="bg-[#050510]/85 border border-cyan-400/25 px-5 py-3 rounded-md backdrop-blur-md flex gap-4 items-center"
          style={{
            clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)'
          }}
        >
          <div className="flex flex-col items-center">
            <span className="font-orbitron font-black text-lg text-white tracking-widest">{countdown.days}</span>
            <span className="text-[8px] font-mono text-cyan-400/65 uppercase tracking-wider">Days</span>
          </div>
          <span className="text-white/20 font-mono text-sm mb-3">:</span>
          <div className="flex flex-col items-center">
            <span className="font-orbitron font-black text-lg text-white tracking-widest">{countdown.hours}</span>
            <span className="text-[8px] font-mono text-cyan-400/65 uppercase tracking-wider">Hrs</span>
          </div>
          <span className="text-white/20 font-mono text-sm mb-3">:</span>
          <div className="flex flex-col items-center">
            <span className="font-orbitron font-black text-lg text-white tracking-widest">{countdown.minutes}</span>
            <span className="text-[8px] font-mono text-cyan-400/65 uppercase tracking-wider">Min</span>
          </div>
          <span className="text-white/20 font-mono text-sm mb-3">:</span>
          <div className="flex flex-col items-center">
            <span className="font-orbitron font-black text-lg text-white tracking-widest">{countdown.seconds}</span>
            <span className="text-[8px] font-mono text-cyan-400/65 uppercase tracking-wider">Sec</span>
          </div>
        </div>

        {/* CLOCK SYSTEM STATS */}
        <div className="flex items-center gap-2 bg-[#05050a]/75 border border-white/5 px-3 py-1.5 rounded-sm backdrop-blur-md">
          <Clock className="w-3 h-3 text-cyan-400/60 animate-spin" style={{ animationDuration: '8s' }} />
          <span className="text-[9px] font-mono text-white/35 uppercase tracking-widest">
            {systemTime}
          </span>
        </div>
      </div>
    </>
  );
}
