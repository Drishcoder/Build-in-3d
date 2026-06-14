import React, { useState, useEffect } from 'react';
import { SPEAKERS, VERTICALS } from './data';
import { Speaker, CoreVertical, RegistrationForm as RegFormType } from './types';
import ThreeCanvas from './components/ThreeCanvas';
import Navigation from './components/Navigation';
import ImpactStats from './components/ImpactStats';
import SpeakerCard from './components/SpeakerCard';
import VerticalCard from './components/VerticalCard';
import RegistrationForm from './components/RegistrationForm';

// Lucide icons for deep modal structures
import { ShieldAlert, ShieldCheck, Sparkles, X, Calendar, MapPin, Compass, ArrowRight, CornerDownRight } from 'lucide-react';

export default function App() {
  const [scrollFraction, setScrollFraction] = useState(0);
  const [activeSection, setActiveSection] = useState('home');
  const [showNotification, setShowNotification] = useState(false);
  const [latestRegistrant, setLatestRegistrant] = useState<RegFormType | null>(null);

  // Modal inspection states for interactive details
  const [selectedSpeaker, setSelectedSpeaker] = useState<Speaker | null>(null);
  const [selectedVertical, setSelectedVertical] = useState<CoreVertical | null>(null);

  // Scroll handler tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        const fraction = window.scrollY / scrollHeight;
        setScrollFraction(fraction);
      }

      // Track active section for HUD highlighters
      const sections = ['home', 'matrix', 'verticals', 'speakers', 'register'];
      let current = 'home';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the section top is close to the active view center
          if (rect.top <= window.innerHeight * 0.45) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToSection = (sectionId: string) => {
    const target = document.getElementById(sectionId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleRegistrationSuccess = (data: RegFormType) => {
    setLatestRegistrant(data);
    setShowNotification(true);
    // Auto fadeout registration notification banner after 6s
    setTimeout(() => {
      setShowNotification(false);
    }, 6000);
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-white overflow-x-hidden selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* 1. IMMERSIVE GLOWING BACKGROUND CANVAS (z-index 0) */}
      <ThreeCanvas scrollFraction={scrollFraction} />

      {/* Decorative cyber grid scanning overlay over canvas */}
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_20%,#000000cc_90%)] z-1" />

      {/* 2. GLOWING SCI-FI NAV HEADER */}
      <Navigation activeSection={activeSection} onNavigate={handleScrollToSection} />

      {/* 3. FLUID CONTENT DIRECTIVES OVERLAY (z-index 10) */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 pt-24 pb-16 flex flex-col gap-12 sm:gap-24">

        {/* ================= HERO SECTION (HOME) ================= */}
        <section
          id="home"
          className="min-h-[calc(100vh-6rem)] flex flex-col justify-center py-8 md:py-16"
        >
          {/* Two column grid prevents text overlapping with our Three.js mesh */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Left Content Column */}
            <div className="text-left max-w-2xl">
              <div 
                className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-400/20 px-3.5 py-1.5 rounded-full mb-6 relative hover:border-cyan-400/40 transition-colors"
                style={{ clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)' }}
              >
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping shrink-0" />
                <span className="text-[10px] font-mono tracking-widest text-cyan-300 uppercase font-bold">
                  Asia's Largest Science & Technology Festival
                </span>
              </div>

              <h1 className="font-orbitron font-black text-5xl sm:text-6xl lg:text-7xl leading-none tracking-tight uppercase select-none">
                <span className="text-white">Techfest</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-400 to-violet-500 block shadow-xs mt-1">
                  2026
                </span>
              </h1>

              <h2 className="text-base sm:text-lg font-orbitron font-bold text-cyan-300 mt-4 uppercase tracking-wide leading-snug">
                Redefining Boundaries, Shaping a Tech-Driven Future
              </h2>

              <p className="text-sm font-mono text-white/40 leading-relaxed mt-4 max-w-lg uppercase">
                A majestic convergence at <span className="text-white/60">IIT Bombay</span> hosting 175,000+ minds exploring quantum biology, machine cognitive emergence, and autonomous systems.
              </p>

              {/* CTA Nodes */}
              <div className="flex flex-wrap gap-4 mt-8">
                <button
                  onClick={() => handleScrollToSection('register')}
                  className="font-orbitron font-extrabold text-xs tracking-widest text-[#050510] bg-cyan-400 hover:bg-emerald-400 px-8 py-4 transition-all duration-300 transform hover:scale-103 cursor-pointer shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                  style={{
                    clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)',
                  }}
                >
                  CLAIM VISITOR PASS ↗
                </button>
                <button
                  onClick={() => handleScrollToSection('verticals')}
                  className="font-mono text-xs tracking-wider text-cyan-400 border border-cyan-400/30 hover:border-cyan-400 bg-cyan-500/5 hover:bg-cyan-500/10 px-8 py-4 transition-all duration-300 cursor-pointer"
                  style={{
                    clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)',
                  }}
                >
                  EXPLORE TRACKS
                </button>
              </div>

              {/* Floating Mobile Countdown Alert */}
              <div className="mt-8 pt-6 border-t border-white/5 md:hidden">
                <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest block mb-1">DATES SPOTLIGHT</span>
                <span className="text-sm font-orbitron text-white uppercase font-bold">OCTOBER 17–19, 2026 // MUMBAI</span>
              </div>
            </div>

            {/* Empty Right Column (Frees viewport for 3D Mesh) */}
            <div className="hidden md:block h-64 pointer-events-none" />
          </div>
        </section>


        {/* ================= IMPACT MATRIX (ABOUT) ================= */}
        <section
          id="matrix"
          className="scroll-mt-24 py-12 md:py-16"
        >
          {/* Glassmorphic about container */}
          <div 
            className="bg-[#050510]/82 border border-white/5 p-8 md:p-12 mb-10 text-left backdrop-blur-md relative"
            style={{
              clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
            }}
          >
            {/* Corner visual glyph */}
            <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-cyan-400/40" />
            
            <div className="flex flex-col md:flex-row gap-8 justify-between items-start">
              <div className="max-w-xl">
                <span className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase block mb-2">
                  01 // HISTORIC IMPACT DECODE
                </span>
                <h2 className="font-orbitron font-black text-2xl md:text-3xl tracking-wide text-white uppercase">
                  Prestige of <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300">IIT Bombay</span>
                </h2>
                <p className="text-sm font-mono text-white/40 leading-relaxed mt-4 uppercase">
                  Techfest stands at the peak of global student technology festivals. It serves as a majestic arena where cutting-edge theory, corporate research, sovereign design, and brilliant engineers collaborate to solve complex technical bottlenecks.
                </p>
              </div>
              
              <div className="border border-white/5 bg-black/40 p-5 rounded-md flex-1 max-w-sm">
                <span className="text-[9px] font-mono text-cyan-400 block mb-1 uppercase">Node Directive</span>
                <p className="text-xs font-mono text-slate-300/80 leading-relaxed uppercase">
                  Our neural core brings together elite colleges and technological visionaries to forge collaborative research frameworks across South Asia.
                </p>
              </div>
            </div>
          </div>

          {/* Render Impact Matrix statistics */}
          <ImpactStats />
        </section>


        {/* ================= MAJOR TRACKS (CORE VERTICALS) ================= */}
        <section
          id="verticals"
          className="scroll-mt-24 py-12 md:py-16 text-left"
        >
          <div className="mb-10 max-w-xl">
            <span className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase block mb-2">
              02 // EXHILARATING ARENAS
            </span>
            <h2 className="font-orbitron font-black text-2xl md:text-3xl tracking-wide text-white uppercase">
              Core Verticals & <span className="text-cyan-400">Tracks</span>
            </h2>
            <p className="text-sm font-mono text-white/40 mt-3 leading-relaxed uppercase">
              Explore our four designated tech vectors. Each module holds multi-session technical lectures, active testing phases, exhibitions, and championships.
            </p>
          </div>

          {/* Grid Layout Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {VERTICALS.map((vertical) => (
              <VerticalCard
                key={vertical.id}
                vertical={vertical}
                onExplore={setSelectedVertical}
              />
            ))}
          </div>
        </section>


        {/* ================= FEATURED SPEAKERS (VISIONARIES) ================= */}
        <section
          id="speakers"
          className="scroll-mt-24 py-12 md:py-16 text-left"
        >
          <div className="mb-10 max-w-xl">
            <span className="text-[10px] font-mono text-[#7000ff] tracking-widest uppercase block mb-1.5 font-bold">
              03 // INTELLECTUAL CAPITALS
            </span>
            <h2 className="font-orbitron font-black text-2xl md:text-3xl tracking-wide text-white uppercase">
              Keynote <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-300">Architects</span>
            </h2>
            <p className="text-sm font-mono text-white/40 mt-3 leading-relaxed uppercase">
              Past and present legendary tech leaders, defence strategists, and space visionaries who have lectured or chaired at the absolute summit of Techfest.
            </p>
          </div>

          {/* Grid of Profile Keynote cells */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
            {SPEAKERS.map((speaker) => (
              <SpeakerCard
                key={speaker.id}
                speaker={speaker}
                onSelect={setSelectedSpeaker}
              />
            ))}
          </div>
        </section>


        {/* ================= ACCESS REGISTRATION NODE ================= */}
        <section
          id="register"
          className="scroll-mt-24 py-12 md:py-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Grid Left informational column */}
            <div className="lg:col-span-5 text-left max-w-xl">
              <span className="text-[10px] font-mono text-cyan-400 tracking-widest uppercase block mb-2">
                04 // DISPATCH ASSIGNMENT
              </span>
              <h2 className="font-orbitron font-black text-2xl md:text-3xl tracking-wide text-white uppercase">
                Claim Admission <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-sky-300">Node</span>
              </h2>
              
              <p className="text-sm font-mono text-white/40 mt-4 leading-relaxed uppercase">
                Select your required pass level, verify institution credentials, and receive your cryptographic entry pass immediately. Let the voyage begin.
              </p>

              {/* Mini detail stats checklist */}
              <div className="mt-8 flex flex-col gap-3 font-mono text-xs uppercase text-slate-300">
                <div className="flex gap-2.5 items-center">
                  <div className="w-5 h-5 bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 flex items-center justify-center font-bold text-[10px]">✓</div>
                  <span>Instant Ticket Key Validation Dispatched</span>
                </div>
                <div className="flex gap-2.5 items-center">
                  <div className="w-5 h-5 bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 flex items-center justify-center font-bold text-[10px]">✓</div>
                  <span>Permits complete access to public pavilions</span>
                </div>
                <div className="flex gap-2.5 items-center">
                  <div className="w-5 h-5 bg-cyan-500/10 border border-cyan-400/20 text-cyan-400 flex items-center justify-center font-bold text-[10px]">✓</div>
                  <span>Compatible with standard wallet layouts</span>
                </div>
              </div>
            </div>

            {/* Grid Right form column */}
            <div className="lg:col-span-7">
              <RegistrationForm onSuccess={handleRegistrationSuccess} />
            </div>

          </div>
        </section>

      </main>

      {/* ================= 4. TICKER BULLETIN FOOTER (z-index 40) ================= */}
      <footer className="relative z-30 bg-[#020205] border-t border-white/5 py-8 px-4 text-center mt-12 font-mono text-[11px] text-white/30 uppercase tracking-widest">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-col items-center sm:items-start">
            <p className="font-orbitron text-[10px] font-black text-white/50 tracking-wider">
              TECHFEST IIT BOMBAY // NEURAL VOID
            </p>
            <span className="text-[9px] text-[#00f2ff]/60 mt-1 uppercase font-bold">
              EST. 2026 // ALL RIGHTS SECURED
            </span>
          </div>

          <div className="flex gap-6">
            <button 
              onClick={() => handleScrollToSection('home')} 
              className="hover:text-white transition-colors cursor-pointer"
            >
              UPWARD // ↑
            </button>
            <a 
              href="https://techfest.org" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-cyan-400 transition-colors"
            >
              IIT BOMBAY PORTAL ↗
            </a>
          </div>
        </div>
      </footer>


      {/* ================= 5. SPEAKER MODAL DETAILED INSPECTION ================= */}
      {selectedSpeaker && (
        <div
          onClick={() => setSelectedSpeaker(null)}
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl bg-[#050510] border border-cyan-400/40 p-6 md:p-8 rounded-lg relative text-left"
            style={{
              clipPath: 'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))',
            }}
          >
            {/* Close Trigger button */}
            <button
              onClick={() => setSelectedSpeaker(null)}
              className="absolute top-4 right-4 p-1.5 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white rounded-full transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-[10px] font-mono tracking-widest text-[#7000ff] uppercase block mb-1.5 font-bold">
              Keynote Lecture Node ID: {selectedSpeaker.id.toUpperCase()}
            </span>

            <h3 className="font-orbitron font-black text-2xl text-white tracking-wide uppercase">
              {selectedSpeaker.name}
            </h3>
            
            <p className="text-xs text-cyan-400 font-mono mt-1 uppercase tracking-tight font-semibold">
              {selectedSpeaker.role} — <span className="text-white/60">{selectedSpeaker.organization}</span>
            </p>

            <div className="border-t border-white/5 my-4" />

            <div className="flex gap-1.5 items-center bg-cyan-950/20 border border-cyan-400/20 p-3.5 rounded-sm mb-4">
              <Sparkles className="w-4 h-4 text-cyan-300 shrink-0" />
              <div className="flex flex-col gap-0.5">
                <span className="text-[9px] text-[#00f2ff]/70 font-mono uppercase tracking-wide">Keynote Discourse Spotlight</span>
                <span className="font-orbitron text-xs font-bold text-white uppercase tracking-tight leading-snug">
                  "{selectedSpeaker.topic}"
                </span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed font-mono uppercase">
              {selectedSpeaker.bio}
            </p>

            <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4 mt-5 font-mono text-[11px] text-white/50">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-cyan-400/60" />
                <span>{selectedSpeaker.keynoteTime || "Scheduled Matrix"}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-violet-500/60" />
                <span>{selectedSpeaker.venue || "Core Pavilion Arena"}</span>
              </div>
            </div>

            <div className="mt-6">
              <button
                onClick={() => {
                  setSelectedSpeaker(null);
                  handleScrollToSection('register');
                }}
                className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-orbitron font-extrabold text-[10px] tracking-widest uppercase cursor-pointer"
                style={{
                  clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)',
                }}
              >
                Secure Disciple Pass ↗
              </button>
            </div>
          </div>
        </div>
      )}


      {/* ================= 6. MAJOR TRACKS MODAL BRIEF DESIGN ================= */}
      {selectedVertical && (
        <div
          onClick={() => setSelectedVertical(null)}
          className="fixed inset-0 z-50 bg-black/92 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-xl bg-[#050512] border border-violet-500/30 p-6 md:p-8 rounded-lg relative text-left animate-slide-up"
            style={{
              clipPath: 'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))',
            }}
          >
            <button
              onClick={() => setSelectedVertical(null)}
              className="absolute top-4 right-4 p-1.5 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white rounded-full transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <span className="text-[10px] font-mono tracking-widest text-[#00f2ff] uppercase block mb-1">
              Vertical Module Core Node: TF26-{selectedVertical.id.toUpperCase()}
            </span>

            <h3 className="font-orbitron font-black text-2xl text-white tracking-wider uppercase mb-1">
              {selectedVertical.title}
            </h3>
            
            <p className="text-xs text-violet-400 font-mono uppercase tracking-widest">
              {selectedVertical.subtitle}
            </p>

            <div className="border-t border-white/5 my-4" />

            <p className="text-xs text-slate-300 leading-relaxed font-mono uppercase mb-4">
              {selectedVertical.description}
            </p>

            {/* List of sub sessions */}
            <div className="bg-[#020208] border border-white/5 p-4 rounded-md mb-6">
              <span className="text-[10px] font-mono text-cyan-300 uppercase tracking-widest block mb-2.5">
                Sub-Focus Spectrums
              </span>
              <div className="flex flex-col gap-2 font-mono text-xs uppercase text-slate-300">
                {selectedVertical.subSessions.map((ss, index) => (
                  <div key={index} className="flex gap-2 items-start">
                    <CornerDownRight className="w-3.5 h-3.5 text-violet-400 shrink-0 mt-0.5" />
                    <span>{ss}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => {
                  setSelectedVertical(null);
                  handleScrollToSection('register');
                }}
                className="flex-1 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-orbitron font-extrabold text-[10px] tracking-widest uppercase cursor-pointer transition-colors"
                style={{
                  clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)',
                }}
              >
                Register For This Track ↗
              </button>
              <button
                onClick={() => setSelectedVertical(null)}
                className="py-3 px-6 border border-white/10 hover:border-white/20 text-white/40 hover:text-white/85 font-mono text-xs uppercase tracking-wider transition-colors"
              >
                Return
              </button>
            </div>
          </div>
        </div>
      )}


      {/* ================= 7. GLOBAL FLOAT REGISTRATION FLOATER ALERT BANNER ================= */}
      {showNotification && latestRegistrant && (
        <div
          className="fixed bottom-[8.5rem] left-4 md:left-8 z-50 max-w-sm bg-emerald-950/80 border border-emerald-400/40 p-4 rounded-md backdrop-blur-xl animate-slide-up flex gap-3.5 items-start text-left shadow-[0_4px_24px_rgba(16,185,129,0.15)]"
          style={{
            clipPath: 'polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)'
          }}
        >
          <div className="p-1 rounded-sm bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-orbitron font-bold text-xs text-white uppercase tracking-wider">
              Cryptographic Pass Generated
            </h4>
            <p className="text-[10px] font-mono text-emerald-300 mt-0.5 lowercase">
              Dispatched passport dispatch token to {latestRegistrant.email}. Prepare for the Void.
            </p>
          </div>
          <button 
            onClick={() => setShowNotification(false)}
            className="text-white/40 hover:text-white shrink-0 ml-1"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

    </div>
  );
}
