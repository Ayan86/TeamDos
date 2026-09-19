import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  Search, 
  Compass, 
  Activity, 
  Database, 
  ChevronRight, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  Flame,
  Radio,
  FileCheck2,
  Lock,
  Eye,
  Camera,
  Cpu,
  Upload,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import { Investigation, TeamMember, SiteSettings, VaultCase } from '../types';
import { TeamCard } from '../components/TeamCard';
import { api } from '../services/api';

interface HomeProps {
  settings: SiteSettings;
  team: TeamMember[];
  investigations: Investigation[];
  vaultCases: VaultCase[];
  onNavigate: (page: string) => void;
}

export const Home: React.FC<HomeProps> = ({
  settings,
  team,
  investigations,
  vaultCases,
  onNavigate
}) => {
  const [localTeam, setLocalTeam] = useState<TeamMember[]>(team);

  useEffect(() => {
    setLocalTeam(team);
  }, [team]);

  const handleMemberPhotoUpdated = (updatedMember: TeamMember) => {
    setLocalTeam(prev => prev.map(m => m.id === updatedMember.id ? updatedMember : m));
  };

  // Investigation Process Steps (6 steps as specified)
  const processSteps = [
    {
      step: '01',
      title: 'Case Intake & Triage',
      desc: 'Witness interviews, incident chronology compilation, and environmental pre-assessment.',
      icon: Search
    },
    {
      step: '02',
      title: 'Historical & Archival Research',
      desc: 'Deep archival investigation into land records, municipal archives, architectural history, and past incidents.',
      icon: Compass
    },
    {
      step: '03',
      title: 'On-Site Technical Deployment',
      desc: 'Strategic sensor layout with multi-point EMF arrays, FLIR thermography, vibration sensors, and full-spectrum rigs.',
      icon: Cpu
    },
    {
      step: '04',
      title: 'Multi-Spectrum Evidence Collection',
      desc: 'Concurrent overnight baseline audio recording, EVP capture, infrared surveillance, and atmospheric logging.',
      icon: Camera
    },
    {
      step: '05',
      title: 'Forensic Lab Audio & Video Analysis',
      desc: 'Filtering environmental noise, spectral audio frequency isolation, electromagnetic correlation, and blind peer review.',
      icon: Radio
    },
    {
      step: '06',
      title: 'Case Dossier & Archival',
      desc: 'Exhaustive scientific documentation distinguishing between natural anomalies, witness perceptions, and classified records.',
      icon: FileCheck2
    }
  ];

  // Core Pillars
  const missionPillars = [
    {
      title: 'INVESTIGATE',
      desc: 'Deploying rigorous on-site protocols to probe unexplained occurrences without sensationalism or superstition.',
      icon: Search
    },
    {
      title: 'MEASURE',
      desc: 'Utilizing calibrated laboratory hardware to record electromagnetic, thermal, radio, and infrasound variance.',
      icon: Activity
    },
    {
      title: 'ANALYZE',
      desc: 'Subjecting all captured EVP audio, infrared video, and physical anomalies to scientific forensic examination.',
      icon: Cpu
    },
    {
      title: 'DOCUMENT',
      desc: 'Preserving empirical findings in public and classified archives for historical and scientific scrutiny.',
      icon: Database
    }
  ];

  return (
    <div className="min-h-screen bg-transparent text-gray-200">
      
      {/* ---------------------------------------------------- */}
      {/* 1. CINEMATIC HERO SECTION */}
      {/* ---------------------------------------------------- */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-12">
        {/* Ambient subtle vignette */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-radial-[circle_at_center] from-transparent via-transparent to-black/25" />
        </div>

        {/* Hero Content framed with semi-transparent frosted card to keep text ultra-crisp while letting the background artwork remain clear */}
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-10 sm:py-14">
          <div className="bg-black/35 backdrop-blur-md rounded-2xl border border-red-950/40 p-6 sm:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.6)]">
            
            {/* Tactical Top Tag */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-red-950/60 border border-red-800/70 mb-6 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="font-mono-tech text-xs tracking-[0.3em] text-red-300 uppercase font-semibold">
                OFFICIAL PARANORMAL INVESTIGATION REPOSITORY // EST. 2010
              </span>
            </div>

            {/* Organization Name */}
            <h1 className="font-cinzel text-3xl sm:text-5xl md:text-6xl font-bold tracking-[0.14em] text-white uppercase drop-shadow-[0_4px_25px_rgba(0,0,0,0.95)]">
              DETECTIVES OF SUPERNATURAL
            </h1>

            {/* Hero Statement / Tagline */}
            <div className="mt-4 flex items-center justify-center space-x-4">
              <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-r from-transparent to-red-600" />
              <h2 className="font-cinzel text-xl sm:text-2xl md:text-3xl font-bold tracking-[0.35em] text-red-500 uppercase glow-red-sm drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
                RISE ABOVE FEAR
              </h2>
              <div className="h-[1px] w-12 sm:w-20 bg-gradient-to-l from-transparent to-red-600" />
            </div>

            {/* Main Description */}
            <p className="mt-6 text-sm sm:text-base md:text-lg text-gray-200 max-w-3xl mx-auto font-sans leading-relaxed text-balance drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              {settings.heroDescription || "Founded in 2010, Detectives of Supernaturals (DOS) is India’s foremost scientific paranormal research and evidence collection organization. We combine dark technology, environmental telemetrics, and investigative journalism to demystify anomalous phenomena."}
            </p>

            {/* Action Buttons: CONTACT US and INVESTIGATIONS */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => onNavigate('contact')}
                className="w-full sm:w-auto px-8 py-3.5 rounded bg-black/60 hover:bg-black/80 text-gray-100 font-cinzel text-xs sm:text-sm font-bold tracking-[0.2em] uppercase border border-neutral-700 hover:border-gray-400 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.6)] backdrop-blur-sm"
              >
                CONTACT US
              </button>

              <button
                onClick={() => onNavigate('vault')}
                className="w-full sm:w-auto px-8 py-3.5 rounded bg-red-700 hover:bg-red-600 text-white font-cinzel text-xs sm:text-sm font-bold tracking-[0.2em] uppercase border border-red-500 shadow-[0_0_25px_rgba(220,38,38,0.5)] hover:shadow-[0_0_35px_rgba(239,68,68,0.7)] transition-all flex items-center justify-center space-x-2"
              >
                <span>EXPLORE DOS VAULT</span>
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="mt-12 pt-6 border-t border-red-950/60 grid grid-cols-2 md:grid-cols-4 gap-6 text-center font-mono-tech">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-red-500 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">16+</div>
                <div className="text-[11px] text-gray-300 tracking-wider uppercase mt-1">YEARS ACTIVE (EST. 2010)</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">450+</div>
                <div className="text-[11px] text-gray-300 tracking-wider uppercase mt-1">FIELD INVESTIGATIONS</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-red-500 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">1,200+</div>
                <div className="text-[11px] text-gray-300 tracking-wider uppercase mt-1">HOURS OF FORENSIC AUDIO</div>
              </div>
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-gray-100 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">100%</div>
                <div className="text-[11px] text-gray-300 tracking-wider uppercase mt-1">SCIENTIFIC PROTOCOL</div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 2. WHO WE ARE SECTION */}
      {/* ---------------------------------------------------- */}
      <section className="py-20 bg-black/35 backdrop-blur-md border-y border-red-950/30 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center space-x-2 text-xs font-mono-tech tracking-[0.25em] text-red-500 uppercase font-semibold">
                <span className="w-6 h-[1px] bg-red-600" />
                <span>WHO WE ARE</span>
              </div>

              <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-gray-100 tracking-wide uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
                INVESTIGATING THE UNEXPLAINED THROUGH SCIENTIFIC INQUIRY
              </h2>

              <p className="text-sm sm:text-base text-gray-200 leading-relaxed font-sans drop-shadow-[0_1px_4px_rgba(0,0,0,0.9)]">
                {settings.whoWeAreText || "Detectives of Supernatural (DOS) was forged with a singular imperative: to strip folklore, hearsay, and blind hysteria away from the study of anomalous occurrences. As pioneers in Indian paranormal investigation, our field agents and technical analysts subject reported haunting phenomena to rigorous scientific scrutiny."}
              </p>

              <div className="p-4 rounded bg-black/45 backdrop-blur-sm border border-red-950/70 border-l-4 border-l-red-600">
                <p className="font-mono-tech text-xs text-red-300 leading-relaxed uppercase tracking-wider">
                  "Fear thrives in ignorance and darkness. When you deploy precision sensors, cold logic, and systematic documentation, the supernatural reveals its true nature."
                </p>
                <span className="block mt-2 font-mono-tech text-[10px] text-gray-400">
                  — DEBRAJ SANYAL // FOUNDER & LEAD INVESTIGATOR
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 text-xs font-mono-tech text-gray-200">
                <div className="flex items-center space-x-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  <span>Pan-India Field Readiness</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  <span>Zero-Fee Community Assistance</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  <span>Strict Witness Confidentiality</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  <span>Empirical Hardware Verification</span>
                </div>
              </div>
            </div>

            {/* Visual Box */}
            <div className="lg:col-span-5">
              <div className="relative rounded-lg overflow-hidden border border-red-900/50 shadow-[0_0_35px_rgba(220,38,38,0.2)]">
                <img
                  src="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop"
                  alt="DOS Scientific field investigation monitoring console"
                  referrerPolicy="no-referrer"
                  className="w-full h-80 sm:h-96 object-cover filter contrast-125 brightness-90"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 p-3 bg-black/80 backdrop-blur-md rounded border border-neutral-800 text-[11px] font-mono-tech">
                  <div className="text-red-400 font-bold tracking-wider uppercase">FIELD SURVEILLANCE FEED</div>
                  <div className="text-gray-400 mt-0.5">High sensitivity infrared spectrum baseline capture at active historic sites.</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 3. OUR MISSION SECTION (4 PILLARS) */}
      {/* ---------------------------------------------------- */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center space-x-2 text-xs font-mono-tech tracking-[0.25em] text-red-500 uppercase font-semibold mb-3">
            <span>CORE INVESTIGATIVE CODE</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-gray-100 tracking-wide uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            OUR MISSION
          </h2>
          <p className="mt-3 text-sm text-gray-300 font-sans drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
            Every case undertaken by DOS adheres strictly to four foundational scientific pillars designed to ensure transparency, reproducibility, and objective truth.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {missionPillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="group relative bg-black/40 backdrop-blur-md p-6 rounded-lg border border-neutral-800/80 hover:border-red-600/70 transition-all duration-300 shadow-[0_8px_25px_rgba(0,0,0,0.6)] hover:shadow-[0_0_25px_rgba(220,38,38,0.3)] flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded bg-black/60 border border-red-950 flex items-center justify-center text-red-500 mb-6 group-hover:border-red-600 group-hover:box-glow-red transition-all">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-cinzel text-lg font-bold tracking-widest text-gray-100 uppercase mb-3 group-hover:text-red-400 transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-neutral-900/80 flex items-center justify-between text-[10px] font-mono-tech text-neutral-400 group-hover:text-red-400 transition-colors">
                  <span>PILLAR 0{idx + 1}</span>
                  <span>DOS // ARCHIVE</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 4. INVESTIGATION PROCESS (6 STEPS TIMELINE) */}
      {/* ---------------------------------------------------- */}
      <section className="py-20 bg-black/35 backdrop-blur-md border-y border-red-950/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 text-xs font-mono-tech tracking-[0.25em] text-red-500 uppercase font-semibold mb-3">
              <span>SYSTEMATIC SCIENTIFIC METHODOLOGY</span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-gray-100 tracking-wide uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              INVESTIGATION PROCESS
            </h2>
            <p className="mt-3 text-sm text-gray-300 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
              How our team takes an unexplained report from initial witness contact to forensic verification and permanent archival.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
            {processSteps.map((stepItem, idx) => {
              const StepIcon = stepItem.icon;
              return (
                <div 
                  key={idx}
                  className="relative p-6 rounded-lg bg-black/40 backdrop-blur-md border border-neutral-800/80 hover:border-red-900/80 transition-all duration-300 shadow-[0_4px_25px_rgba(0,0,0,0.6)]"
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono-tech text-2xl font-black text-red-600/80 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
                      {stepItem.step}
                    </span>
                    <div className="p-2 rounded bg-black/60 border border-neutral-800 text-gray-200">
                      <StepIcon size={18} />
                    </div>
                  </div>

                  <h3 className="font-cinzel text-base font-bold text-gray-100 tracking-wider uppercase mb-2 drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
                    {stepItem.title}
                  </h3>
                  <p className="text-xs text-gray-300 leading-relaxed font-sans">
                    {stepItem.desc}
                  </p>

                  <div className="mt-4 h-[1px] w-full bg-gradient-to-r from-red-900/40 via-neutral-800 to-transparent" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 5. THE INVESTIGATION TEAM */}
      {/* ---------------------------------------------------- */}
      <section className="py-20 bg-black/30 backdrop-blur-md border-t border-red-950/30 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center space-x-2 text-xs font-mono-tech tracking-[0.25em] text-red-500 uppercase font-semibold mb-3">
              <span>CORE INVESTIGATIVE PERSONNEL</span>
            </div>
            <h2 className="font-cinzel text-3xl sm:text-4xl font-bold text-gray-100 tracking-wide uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              THE INVESTIGATION TEAM
            </h2>
            <p className="mt-3 text-sm text-gray-300 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
              The specialists behind DOS field operations, combining decades of historical research, technical audio engineering, and on-site physical investigation.
            </p>
          </div>

          {/* Grid of the 4 Team Member Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {localTeam.map((member) => (
              <TeamCard 
                key={member.id} 
                member={member} 
                onPhotoUpdated={handleMemberPhotoUpdated}
              />
            ))}
          </div>

        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* 7. URGENT ACTIVITY REPORT BANNER */}
      {/* ---------------------------------------------------- */}
      <section className="py-16 bg-gradient-to-r from-red-950/30 via-black/40 to-red-950/30 backdrop-blur-md border-y border-red-900/40 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <ShieldAlert size={36} className="text-red-500 mx-auto mb-4 animate-pulse drop-shadow-[0_0_12px_rgba(239,68,68,0.8)]" />
          <h2 className="font-cinzel text-2xl sm:text-3xl font-bold text-gray-100 tracking-wide uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            EXPERIENCING UNEXPLAINED OR ANOMALOUS ACTIVITY?
          </h2>
          <p className="mt-3 text-xs sm:text-sm text-gray-200 max-w-2xl mx-auto leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
            Our specialized intake desk investigates reports of apparitions, electronic disturbances, poltergeist behavior, and sudden thermal shifts. All civilian consultations remain strictly confidential.
          </p>
          <div className="mt-8">
            <button
              onClick={() => onNavigate('report')}
              className="px-8 py-3.5 rounded bg-red-700 hover:bg-red-600 text-white font-cinzel text-xs sm:text-sm font-bold tracking-[0.2em] uppercase shadow-[0_0_25px_rgba(220,38,38,0.6)] hover:shadow-[0_0_40px_rgba(239,68,68,0.8)] border border-red-500 transition-all"
            >
              SUBMIT A CONFIDENTIAL REPORT
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
