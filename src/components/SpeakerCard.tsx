import React, { useState } from 'react';
import { Speaker } from '../types';
import { Calendar, MapPin, Sparkles, X } from 'lucide-react';

interface SpeakerCardProps {
  speaker: Speaker;
  onSelect: (speaker: Speaker) => void;
  key?: React.Key;
}

export default function SpeakerCard({ speaker, onSelect }: SpeakerCardProps) {
  return (
    <div
      onClick={() => onSelect(speaker)}
      className="group relative cursor-pointer bg-[#05050c]/82 border border-white/10 hover:border-cyan-400/40 p-6 md:p-8 rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,242,255,0.08)] hover:-translate-y-1 block backdrop-blur-md"
      style={{
        clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
      }}
    >
      {/* Decorative scanning wire lines */}
      <div className="absolute inset-0 bg-linear-to-b from-cyan-500/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute top-0 left-0 w-8 h-[1px] bg-cyan-400" />
      <div className="absolute top-0 left-0 w-[1px] h-8 bg-cyan-400" />
      <div className="absolute bottom-0 right-0 w-8 h-[1px] bg-violet-500" />
      <div className="absolute bottom-0 right-0 w-[1px] h-8 bg-violet-500" />

      {/* Mini tech header decoration */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-[10px] font-mono tracking-widest text-cyan-400/50 uppercase">
          Keynote Node // {speaker.id.toUpperCase()}
        </span>
        <span className="text-[8px] font-mono text-white/20 group-hover:text-cyan-400/80 transition-colors duration-300">
          SELECT ↗
        </span>
      </div>

      {/* Speaker Avatar & Name Layout */}
      <div className="flex items-center gap-4 mb-4">
        <div
          className={`w-14 h-14 rounded-full bg-gradient-to-tr ${speaker.avatarColor} border border-white/10 flex items-center justify-center font-bold text-lg text-white font-mono tracking-wider shadow-inner group-hover:scale-105 transition-transform duration-300`}
        >
          {speaker.initials}
        </div>
        <div>
          <h3 className="font-orbitron font-bold text-base text-white tracking-wide group-hover:text-cyan-300 transition-colors duration-300">
            {speaker.name}
          </h3>
          <p className="text-xs text-cyan-400/80 font-mono tracking-tight mt-0.5">
            {speaker.role}
          </p>
          <p className="text-[10px] text-white/40 font-mono">
            {speaker.organization}
          </p>
        </div>
      </div>

      {/* Lecture Topic Spotlight */}
      <div className="border-t border-white/5 pt-4 mt-2">
        <div className="flex items-start gap-1.5 mb-2">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0 mt-0.5" />
          <span className="text-[11px] font-mono text-amber-300/90 font-medium tracking-wide uppercase">
            Sovereign Topic
          </span>
        </div>
        <p className="text-sm font-orbitron text-slate-100 font-medium leading-tight line-clamp-2 uppercase tracking-wide group-hover:text-white transition-colors duration-300">
          "{speaker.topic}"
        </p>
      </div>

      {/* Decorative details footer */}
      {speaker.keynoteTime && (
        <div className="flex gap-4 items-center mt-4 pt-4 border-t border-white/5 text-[10px] font-mono text-white/30 group-hover:text-white/50 transition-colors duration-300">
          <span className="flex items-center gap-1">
            <Calendar className="w-3 h-3 text-cyan-400/40" />
            {speaker.keynoteTime.split(',')[0]}
          </span>
          <span className="flex items-center gap-1">
            <MapPin className="w-3 h-3 text-violet-500/40" />
            Hall Arena
          </span>
        </div>
      )}
    </div>
  );
}
