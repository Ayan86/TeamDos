import React from 'react';
import { 
  ShieldAlert, 
  Radio, 
  Youtube, 
  Instagram, 
  Facebook, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin, 
  Lock 
} from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="relative bg-black/40 backdrop-blur-md text-gray-300 border-t border-red-950/60 overflow-hidden select-none">
      {/* Subtle background red glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-24 bg-red-950/20 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Brand & Mission */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 bg-black rounded border border-red-600/70 flex items-center justify-center">
                <span className="font-cinzel text-red-500 font-black text-lg">DOS</span>
              </div>
              <div>
                <h3 className="font-cinzel text-sm font-bold tracking-[0.18em] text-gray-100 uppercase">
                  Detectives of Supernaturals
                </h3>
                <p className="font-mono-tech text-[10px] tracking-[0.25em] text-red-500 uppercase">
                  Rise Above Fear
                </p>
              </div>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed">
              Founded in 2010, Detectives of Supernaturals (DOS) is India’s foremost scientific paranormal research and evidence collection organization. We combine dark technology, environmental telemetrics, and investigative journalism to demystify anomalous phenomena.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-3 pt-2">
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-600 transition-colors"
                aria-label="YouTube Channel"
              >
                <Youtube size={15} />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-600 transition-colors"
                aria-label="Facebook Page"
              >
                <Facebook size={15} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-600 transition-colors"
                aria-label="Instagram Account"
              >
                <Instagram size={15} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded bg-neutral-900 border border-neutral-800 flex items-center justify-center text-gray-400 hover:text-red-500 hover:border-red-600 transition-colors"
                aria-label="Twitter / X"
              >
                <Twitter size={15} />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="font-mono-tech text-xs tracking-[0.2em] text-red-500 font-bold uppercase mb-4">
              ARCHIVE SECTIONS
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => onNavigate('home')} 
                  className="hover:text-red-400 transition-colors flex items-center space-x-2"
                >
                  <span className="text-red-600 text-[10px]">›</span>
                  <span>Home Headquarters</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('vault')} 
                  className="hover:text-red-400 transition-colors flex items-center space-x-2"
                >
                  <span className="text-red-600 text-[10px]">›</span>
                  <span>DOS Vault (Classified Cases)</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('gallery')} 
                  className="hover:text-red-400 transition-colors flex items-center space-x-2"
                >
                  <span className="text-red-600 text-[10px]">›</span>
                  <span>Evidence & Photography Gallery</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('equipment')} 
                  className="hover:text-red-400 transition-colors flex items-center space-x-2"
                >
                  <span className="text-red-600 text-[10px]">›</span>
                  <span>Scientific Equipment Arsenal</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('media')} 
                  className="hover:text-red-400 transition-colors flex items-center space-x-2"
                >
                  <span className="text-red-600 text-[10px]">›</span>
                  <span>Media & Television Coverage</span>
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('team')} 
                  className="hover:text-red-400 transition-colors flex items-center space-x-2"
                >
                  <span className="text-red-600 text-[10px]">›</span>
                  <span>The Investigation Team</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Field Dispatch */}
          <div>
            <h4 className="font-mono-tech text-xs tracking-[0.2em] text-red-500 font-bold uppercase mb-4">
              DISPATCH & HOTLINE
            </h4>
            <div className="space-y-3 text-xs text-neutral-400">
              <div className="flex items-start space-x-2.5">
                <MapPin size={15} className="text-red-500 mt-0.5 shrink-0" />
                <span>Kolkata, West Bengal, India — Active Pan-India Operations</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Mail size={15} className="text-red-500 shrink-0" />
                <span>intake@detectivesofsupernaturals.com</span>
              </div>
              <div className="flex items-center space-x-2.5">
                <Phone size={15} className="text-red-500 shrink-0" />
                <span>+91 98300 00000 (Case Registry)</span>
              </div>
            </div>

            <div className="mt-5 p-3 rounded bg-black/40 backdrop-blur-sm border border-red-950/80">
              <span className="font-mono-tech text-[10px] text-red-400 font-bold tracking-wider uppercase block mb-1">
                24/7 UNEXPLAINED ACTIVITY INTAKE
              </span>
              <p className="text-[11px] text-neutral-400 mb-2">
                Experiencing anomalous disturbances or poltergeist activity?
              </p>
              <button
                onClick={() => onNavigate('report')}
                className="w-full py-1.5 px-2.5 rounded bg-red-700 hover:bg-red-600 text-white font-mono-tech text-[11px] font-bold tracking-wider uppercase transition-colors"
              >
                SUBMIT ACTIVITY REPORT
              </button>
            </div>
          </div>

          {/* Classified Admin / System Status */}
          <div>
            <h4 className="font-mono-tech text-xs tracking-[0.2em] text-red-500 font-bold uppercase mb-4">
              SYSTEM INTEGRITY
            </h4>
            <div className="bg-black/60 p-3.5 rounded border border-neutral-900 font-mono-tech text-[11px] space-y-2">
              <div className="flex items-center justify-between text-neutral-400">
                <span>RADIAL TELEMETRY</span>
                <span className="text-emerald-500">OPTIMAL</span>
              </div>
              <div className="flex items-center justify-between text-neutral-400">
                <span>ARCHIVAL VAULT</span>
                <span className="text-amber-500">ACTIVE // ENCRYPTED</span>
              </div>
              <div className="flex items-center justify-between text-neutral-400">
                <span>ESTABLISHED</span>
                <span className="text-gray-300">2010 (16 YEARS)</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <button
                onClick={() => onNavigate('admin')}
                className="inline-flex items-center space-x-1.5 text-neutral-500 hover:text-red-400 text-xs font-mono-tech transition-colors"
              >
                <Lock size={12} />
                <span>Staff Portal Access</span>
              </button>
            </div>
          </div>

        </div>

        {/* Scientific Methodology & Evidence Collection Disclaimer */}
        <div className="mt-12 pt-6 border-t border-neutral-900/90">
          <p className="text-[11px] text-neutral-500 leading-relaxed font-mono-tech text-justify">
            <strong className="text-gray-400 uppercase">INVESTIGATIVE PROTOCOL DISCLAIMER:</strong> Detectives of Supernaturals (DOS) maintains a strict empirical standard. In our documentation and public archives, we scrupulously distinguish between reported witness testimonies, ambient environmental measurements, technical telemetrics (EMF, RF, thermography, infrasound), laboratory audio forensics, and scientific conclusions. DOS rejects manufactured superstition and pseudoscience, focusing strictly on verifiable evidence and technical investigation.
          </p>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-neutral-900/60 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 font-mono-tech">
          <div>
            © 2026 Detectives of Supernaturals. All Rights Reserved.
          </div>
          <div className="mt-2 sm:mt-0 flex space-x-4">
            <span>RISE ABOVE FEAR</span>
            <span>•</span>
            <span>DOS-HQ-KOLKATA</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
