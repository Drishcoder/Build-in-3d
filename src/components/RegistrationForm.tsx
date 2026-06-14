import React, { useState, useId } from 'react';
import { RegistrationForm as RegFormType } from '../types';
import { Check, ShieldCheck, Ticket, Download, Mail, User, Building, Compass, Sparkles } from 'lucide-react';

interface RegistrationFormProps {
  onSuccess: (formData: RegFormType) => void;
}

export default function RegistrationForm({ onSuccess }: RegistrationFormProps) {
  const formId = useId();
  const [formData, setFormData] = useState<RegFormType>({
    firstName: '',
    lastName: '',
    email: '',
    organization: '',
    track: '',
    passType: 'explorer',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof RegFormType, string>>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const passes = [
    {
      id: 'explorer' as const,
      name: 'Explorer Pass',
      price: 'Free',
      description: 'General festival entry for all 3 days, exhibitions, and main tracks.',
      benefits: ['All 6 Track Exhibition Halls', 'Keynote Speeches Access', 'Technical Paper Showcases'],
    },
    {
      id: 'innovator' as const,
      name: 'Innovator Pass',
      price: '₹1,499',
      description: 'Workshops access, specialized bootcamps, and VIP arena lounges.',
      benefits: ['All Explorer Benefits', 'Hands-on Programming Labs', 'Exclusive R&D Summit entry'],
    },
    {
      id: 'pioneer' as const,
      name: 'Pioneer Pass',
      price: '₹3,499',
      description: 'The ultimate VIP tier. Private speaker dinners and research lab tours.',
      benefits: ['All Innovator Benefits', 'Private Speakers Roundtable Dinner', 'Exclusive Laboratory Tours'],
    },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof RegFormType]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof RegFormType, string>> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.organization.trim()) newErrors.organization = 'Organization/College is required';
    if (!formData.track) newErrors.track = 'Please select a primary track';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // Generate cryptographic ticket node ID
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const passCode = formData.passType.toUpperCase().slice(0, 3);
    const code = `TF26-${passCode}-${randomNum}-${formData.track.replace(/[^A-Za-z]/g, '').slice(0, 4).toUpperCase()}`;

    setTicketId(code);
    setIsSubmitted(true);
    onSuccess(formData);
  };

  const handlePrint = () => {
    window.print();
  };

  if (isSubmitted) {
    return (
      <div
        className="w-full bg-[#050510]/95 border border-emerald-500/30 p-6 md:p-8 rounded-lg relative text-left animate-fade-in backdrop-blur-xl shrink-0"
        style={{
          clipPath: 'polygon(0 0, calc(100% - 24px) 0, 100% 24px, 100% 100%, 24px 100%, 0 calc(100% - 24px))',
        }}
      >
        {/* Holographic scanner laser line decoration */}
        <div className="absolute top-0 inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-emerald-400 to-transparent animate-pulse" />

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center mx-auto mb-3 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
          </div>
          <h3 className="font-orbitron font-extrabold text-xl text-white tracking-wide uppercase">
            Pass Node Registered
          </h3>
          <p className="text-[11px] font-mono text-emerald-400 uppercase tracking-widest mt-1">
            Access Protocol Level 01 Initialized
          </p>
        </div>

        {/* PRINTABLE BEAM PASS TICKET */}
        <div
          id="digital-pass-badge"
          className="border border-white/10 bg-[#020205] p-6 rounded-lg relative overflow-hidden flex flex-col md:flex-row gap-6 items-stretch my-6 print:border-black print:bg-white print:text-black"
          style={{
            clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)',
          }}
        >
          {/* Virtual notch marks on pass */}
          <div className="absolute top-1/2 -left-3 w-6 h-6 bg-[#050510] rounded-full border border-white/10 border-t-transparent print:hidden" />
          <div className="absolute top-1/2 -right-3 w-6 h-6 bg-[#050510] rounded-full border border-white/10 border-b-transparent print:hidden" />

          {/* Hologram graphic */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-bl from-cyan-500/5 to-transparent rounded-full mix-blend-screen pointer-events-none" />

          {/* Left Metadata column */}
          <div className="flex-1 flex flex-col justify-between z-10">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Ticket className="w-4 h-4 text-cyan-400" />
                <span className="text-[9px] font-mono text-cyan-400 font-extrabold uppercase tracking-widest">
                  Techfest IIT Bombay
                </span>
              </div>
              <h4 className="font-orbitron font-extrabold text-xl text-white leading-tight uppercase tracking-wider print:text-black mb-1">
                {formData.firstName} {formData.lastName}
              </h4>
              <p className="text-[11px] font-mono text-white/40 print:text-slate-600 block mb-4">
                ID Node / {formData.organization}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-4">
              <div>
                <span className="text-[9px] text-white/30 font-mono block uppercase">ACCESS LEVEL</span>
                <span className="text-xs font-orbitron font-bold text-orange-400 uppercase tracking-widest">
                  {formData.passType}
                </span>
              </div>
              <div>
                <span className="text-[9px] text-white/30 font-mono block uppercase">PRIMARY MODULE TRACK</span>
                <span className="text-xs font-orbitron font-bold text-white uppercase tracking-tight print:text-black">
                  {formData.track.split(' ')[0]}
                </span>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-white/5 text-[9px] font-mono text-white/20 print:text-slate-400 flex flex-col gap-0.5">
              <span>LOCATION: MUMBAI CONVOCATION ARENA, BAY 7-12</span>
              <span>DATES: OCT 17-19, 2026 // EST: 09:30 AM IST</span>
            </div>
          </div>

          {/* Right Holographic / Barcode column */}
          <div className="w-full md:w-36 flex flex-row md:flex-col justify-between items-center bg-white/2 p-4 rounded-md border border-white/5 md:text-center z-10 print:bg-slate-100 print:border-slate-300">
            {/* Barcode representation */}
            <div className="flex flex-col items-center gap-1.5 w-full">
              <span className="text-[9px] text-white/30 font-mono uppercase print:text-slate-500">Node Token</span>
              
              {/* Futuristic procedurally drawn grid representing digital key */}
              <div className="grid grid-cols-6 gap-1 w-20 h-20 bg-black p-2 border border-cyan-400/20 rounded-sm print:border-black">
                {Array.from({ length: 36 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-full h-full rounded-xs transition-colors duration-200 ${(i % 3 === 0 || i % 7 === 1 || i % 11 === 4) ? 'bg-cyan-400' : 'bg-transparent'}`}
                  />
                ))}
              </div>
            </div>

            <div className="text-right md:text-center mt-3">
              <span className="text-[9px] font-mono text-white/40 block print:text-black">TICKET ACCESS ID</span>
              <span className="text-[10px] font-mono text-cyan-300 font-extrabold tracking-wide uppercase break-all">
                {ticketId}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handlePrint}
            className="flex-1 font-orbitron font-bold text-[11px] uppercase tracking-widest bg-emerald-500 hover:bg-emerald-400 text-black py-3 px-4 rounded-sm flex items-center justify-center gap-2 cursor-pointer transition-all duration-200"
            style={{
              clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)',
            }}
          >
            <Download className="w-3.5 h-3.5" />
            Print Entry Pass
          </button>
          <button
            onClick={() => setIsSubmitted(false)}
            className="font-mono text-xs uppercase text-white/40 hover:text-white/80 py-3 px-6 hover:bg-white/5 transition-all duration-200 border border-white/10 rounded-sm"
          >
            Register Another Pass
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-[#05050f]/82 border border-white/10 hover:border-cyan-400/20 p-6 md:p-8 rounded-lg relative backdrop-blur-md transition-all duration-300 text-left"
      style={{
        clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
      }}
    >
      {/* Dynamic line decoration on active focus */}
      <div className="absolute top-0 left-6 right-6 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" />

      {/* Select Pass Tier Header */}
      <div className="mb-6">
        <label className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block mb-3">
          01 // Access Pass Tier
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {passes.map((pass) => (
            <div
              key={pass.id}
              onClick={() => setFormData((prev) => ({ ...prev, passType: pass.id }))}
              className={`border p-4 rounded-md cursor-pointer transition-all duration-200 relative overflow-hidden select-none ${
                formData.passType === pass.id
                  ? 'border-cyan-400 bg-cyan-950/20 shadow-[0_0_12px_rgba(0,242,255,0.06)]'
                  : 'border-white/5 bg-[#020205] hover:border-white/20 hover:bg-white/2'
              }`}
              style={{
                clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)',
              }}
            >
              {formData.passType === pass.id && (
                <div className="absolute top-1 right-1">
                  <Check className="w-3.5 h-3.5 text-cyan-400" />
                </div>
              )}
              <h4 className="font-orbitron font-bold text-xs text-white uppercase tracking-wider mb-0.5">
                {pass.name}
              </h4>
              <p className="text-sm font-semibold font-orbitron text-cyan-300 mb-1.5">{pass.price}</p>
              <p className="text-[10px] text-white/35 font-mono leading-tight mb-2 uppercase tracking-wide">
                {pass.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/5 my-5" />

      <label className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest block mb-4">
        02 // Node Credentials
      </label>

      {/* Two Column Grid for First / Last Name */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label htmlFor={`${formId}-firstName`} className="block text-[9px] font-mono text-white/40 uppercase tracking-widest mb-1.5">
            First Name
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
            <input
              id={`${formId}-firstName`}
              type="text"
              name="firstName"
              placeholder="e.g. Aria"
              value={formData.firstName}
              onChange={handleInputChange}
              className={`w-full bg-[#020205] border text-[13px] font-mono text-white pl-10 pr-4 py-3 rounded-md outline-none focus:border-cyan-400 transition-colors uppercase ${
                errors.firstName ? 'border-red-500/60' : 'border-white/10'
              }`}
            />
          </div>
          {errors.firstName && <span className="text-[10px] font-mono text-red-400 mt-1 block">{errors.firstName}</span>}
        </div>

        <div>
          <label htmlFor={`${formId}-lastName`} className="block text-[9px] font-mono text-white/40 uppercase tracking-widest mb-1.5">
            Last Name
          </label>
          <div className="relative">
            <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
            <input
              id={`${formId}-lastName`}
              type="text"
              name="lastName"
              placeholder="e.g. Kwan"
              value={formData.lastName}
              onChange={handleInputChange}
              className={`w-full bg-[#020205] border text-[13px] font-mono text-white pl-10 pr-4 py-3 rounded-md outline-none focus:border-cyan-400 transition-colors uppercase ${
                errors.lastName ? 'border-red-500/60' : 'border-white/10'
              }`}
            />
          </div>
          {errors.lastName && <span className="text-[10px] font-mono text-red-400 mt-1 block">{errors.lastName}</span>}
        </div>
      </div>

      {/* Email Address */}
      <div className="mb-4">
        <label htmlFor={`${formId}-email`} className="block text-[9px] font-mono text-white/40 uppercase tracking-widest mb-1.5">
          Secure Email Address (Access Token Dispatch)
        </label>
        <div className="relative">
          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
          <input
            id={`${formId}-email`}
            type="email"
            name="email"
            placeholder="e.g. you@neural.void"
            value={formData.email}
            onChange={handleInputChange}
            className={`w-full bg-[#020205] border text-[13px] font-mono text-white pl-10 pr-4 py-3 rounded-md outline-none focus:border-cyan-400 transition-colors ${
              errors.email ? 'border-red-500/60' : 'border-white/10'
            }`}
          />
        </div>
        {errors.email && <span className="text-[10px] font-mono text-red-400 mt-1 block">{errors.email}</span>}
      </div>

      {/* College / Organization */}
      <div className="mb-4">
        <label htmlFor={`${formId}-organization`} className="block text-[9px] font-mono text-white/40 uppercase tracking-widest mb-1.5">
          College / Institution / Organization Name
        </label>
        <div className="relative">
          <Building className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
          <input
            id={`${formId}-organization`}
            type="text"
            name="organization"
            placeholder="e.g. IIT Bombay / NeuraLab"
            value={formData.organization}
            onChange={handleInputChange}
            className={`w-full bg-[#020205] border text-[13px] font-mono text-white pl-10 pr-4 py-3 rounded-md outline-none focus:border-cyan-400 transition-colors uppercase ${
              errors.organization ? 'border-red-500/60' : 'border-white/10'
            }`}
          />
        </div>
        {errors.organization && <span className="text-[10px] font-mono text-red-400 mt-1 block">{errors.organization}</span>}
      </div>

      {/* Primary Track Dropdown */}
      <div className="mb-6">
        <label htmlFor={`${formId}-track`} className="block text-[9px] font-mono text-white/40 uppercase tracking-widest mb-1.5">
          Primary Arena Focus Track
        </label>
        <div className="relative">
          <Compass className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/20" />
          <select
            id={`${formId}-track`}
            name="track"
            value={formData.track}
            onChange={handleInputChange}
            className={`w-full bg-[#020205] border text-[13px] font-mono text-white pl-10 pr-4 py-3 rounded-md outline-none focus:border-cyan-400 appearance-none transition-colors uppercase ${
              errors.track ? 'border-red-500/60' : 'border-white/10'
            }`}
          >
            <option value="">— Chose specialized spectrum —</option>
            <option value="AI (Neural Architectures)">Neural Architectures (AI & Cognition)</option>
            <option value="Quantum (Qubit Horizon)">Qubit Horizon (Quantum Computing)</option>
            <option value="Biotech (Synthetic Biology)">Synthetic Biology (Biotech & CRISPR)</option>
            <option value="Robotics (Embodied Minds)">Embodied Minds (Combat & Humanoids)</option>
            <option value="Space (Orbital Systems)">Orbital Systems (Autonomy & Mars)</option>
            <option value="Security (Zero Perimeter)">Zero Perimeter (Cryptography & Red-team)</option>
          </select>
        </div>
        {errors.track && <span className="text-[10px] font-mono text-red-400 mt-1 block">{errors.track}</span>}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full relative py-4 bg-linear-to-r from-cyan-500 hover:from-cyan-400 to-violet-600 hover:to-violet-500 text-black font-orbitron font-extrabold text-xs tracking-wider uppercase flex items-center justify-center gap-2 cursor-pointer transition-all duration-300"
        style={{
          clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)',
        }}
      >
        <Sparkles className="w-4 h-4" />
        Initialize Access protocol
      </button>

      {/* Form safety notice footer */}
      <span className="text-[9px] font-mono text-white/25 mt-3 block text-center uppercase tracking-wide">
        System Node secured with AES-256 validation. No physical card printing required.
      </span>
    </form>
  );
}
