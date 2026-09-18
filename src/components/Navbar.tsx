import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  ShieldAlert, 
  Volume2, 
  VolumeX, 
  Upload,
  Lock,
  Camera
} from 'lucide-react';
import { audioEngine } from './AudioDrone';

interface NavbarProps {
  activePage: string;
  onNavigate: (page: string) => void;
  showScanlines: boolean;
  onToggleScanlines: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  activePage, 
  onNavigate,
  showScanlines,
  onToggleScanlines
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioOn, setIsAudioOn] = useState(false);

  const toggleSound = () => {
    const running = audioEngine.toggle();
    setIsAudioOn(running);
  };

  // Requested order: Home, Gallery, Media Coverage, DOS Vault, Equipment, Team, Contact
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'media', label: 'Media Coverage' },
    { id: 'vault', label: 'DOS Vault' },
    { id: 'equipment', label: 'Equipment' },
    { id: 'team', label: 'Team' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (pageId: string) => {
    onNavigate(pageId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-black/35 backdrop-blur-md border-b border-red-950/40 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Left Cluster: DOS Logo + Navbar placed directly beside it */}
          <div className="flex items-center space-x-3 sm:space-x-5 lg:space-x-6">
            {/* DOS Logo: Emblem only, without writing DETECTIVES OF SUPERNATURALS */}
            <button 
              onClick={() => handleNavClick('home')}
              className="flex items-center text-left group focus:outline-none"
              title="DOS - Detectives of Supernaturals"
              aria-label="DOS Home"
            >
              <div className="relative w-11 h-11 bg-black rounded border border-red-600/60 flex items-center justify-center transition-all duration-300 group-hover:border-red-500 group-hover:box-glow-red shadow-[0_0_15px_rgba(220,38,38,0.3)]">
                <div className="absolute inset-0 bg-red-950/30 rounded" />
                <span className="font-cinzel-dec text-red-500 font-black text-xl tracking-tighter glow-red-sm group-hover:scale-105 transition-transform">
                  DOS
                </span>
                <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-red-600 rounded-full animate-ping opacity-60" />
              </div>
            </button>

            {/* Desktop Navigation directly beside the DOS logo */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navItems.map((item) => {
                const isActive = activePage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`px-2.5 lg:px-3 py-2 text-xs xl:text-sm uppercase tracking-[0.14em] font-medium transition-all duration-200 relative whitespace-nowrap ${
                      isActive 
                        ? 'text-red-400 font-semibold glow-red-sm' 
                        : 'text-gray-300 hover:text-white hover:bg-red-950/25'
                    } rounded`}
                  >
                    {item.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-2 right-2 h-[2px] bg-red-600 shadow-[0_0_8px_#ef4444]" />
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Right Action Controls: Audio Drone, Admin Panel (Image Uploads), Report Activity */}
          <div className="hidden md:flex items-center space-x-2.5 lg:space-x-3.5">
            
            {/* Ambient Sound Drone Toggle */}
            <button
              onClick={toggleSound}
              title={isAudioOn ? "Mute Atmospheric Drone" : "Enable Investigation Ambient Audio"}
              className={`p-2.5 rounded border transition-colors ${
                isAudioOn 
                  ? 'bg-red-950/40 border-red-600 text-red-400 box-glow-red' 
                  : 'bg-black/60 border-neutral-800 text-gray-400 hover:text-gray-200 hover:border-neutral-700'
              }`}
            >
              {isAudioOn ? <Volume2 size={16} className="animate-pulse" /> : <VolumeX size={16} />}
            </button>

            {/* Admin Panel button beside Report Activity (where images will be uploaded) */}
            <button
              onClick={() => handleNavClick('admin')}
              title="Admin Panel — Image Uploads & Investigation Archive Management"
              className={`flex items-center space-x-2 px-3.5 py-2.5 rounded font-cinzel text-xs font-bold tracking-[0.14em] uppercase transition-all duration-300 border ${
                activePage === 'admin' 
                  ? 'bg-red-950/80 border-red-500 text-red-300 shadow-[0_0_15px_rgba(220,38,38,0.4)]' 
                  : 'bg-neutral-900/90 hover:bg-neutral-800 border-neutral-700 hover:border-red-500 text-gray-200 hover:text-white shadow-[0_0_10px_rgba(0,0,0,0.5)]'
              }`}
            >
              <Upload size={14} className="text-red-400" />
              <span>ADMIN PANEL</span>
            </button>

            {/* MANDATORY PROMINENT CTA: [ REPORT ACTIVITY ] */}
            <button
              onClick={() => handleNavClick('report')}
              className="relative group overflow-hidden px-4 lg:px-5 py-2.5 rounded bg-gradient-to-r from-red-700 via-red-600 to-red-800 text-white font-cinzel text-xs lg:text-sm font-bold tracking-[0.16em] uppercase shadow-[0_0_20px_rgba(220,38,38,0.4)] hover:shadow-[0_0_30px_rgba(239,68,68,0.7)] transition-all duration-300 border border-red-500/80 active:scale-95 whitespace-nowrap"
            >
              <span className="relative z-10 flex items-center space-x-2">
                <ShieldAlert size={16} className="text-red-200 animate-pulse" />
                <span>REPORT ACTIVITY</span>
              </span>
              <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </button>
          </div>

          {/* Mobile navigation buttons */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => handleNavClick('admin')}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded bg-neutral-900 border border-neutral-700 text-gray-200 text-[11px] font-bold font-cinzel tracking-wider uppercase hover:border-red-500"
              title="Admin Panel & Image Uploads"
            >
              <Upload size={12} className="text-red-400" />
              <span>ADMIN</span>
            </button>

            <button
              onClick={() => handleNavClick('report')}
              className="px-3 py-1.5 rounded bg-red-700 text-white text-[11px] font-bold tracking-wider uppercase border border-red-500 shadow-[0_0_12px_rgba(220,38,38,0.5)]"
            >
              REPORT
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded bg-neutral-900 border border-neutral-800 text-gray-300 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-b border-red-900/40 px-4 pt-3 pb-6 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {navItems.map((item) => {
              const isActive = activePage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`text-left px-3 py-2.5 rounded text-xs uppercase tracking-wider font-medium transition-colors ${
                    isActive 
                      ? 'bg-red-950/60 text-red-300 border border-red-800' 
                      : 'text-gray-300 hover:bg-neutral-900'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>

          <div className="pt-2 border-t border-neutral-900 flex items-center justify-between">
            <button
              onClick={toggleSound}
              className="flex items-center space-x-2 text-xs text-gray-400 hover:text-white py-1"
            >
              {isAudioOn ? <Volume2 size={16} className="text-red-400" /> : <VolumeX size={16} />}
              <span>{isAudioOn ? 'Atmosphere Drone Active' : 'Enable Drone Audio'}</span>
            </button>
          </div>

          {/* Action CTAs in Mobile menu */}
          <div className="pt-2 grid grid-cols-2 gap-2">
            <button
              onClick={() => handleNavClick('admin')}
              className="w-full py-3 rounded bg-neutral-900 hover:bg-neutral-800 text-gray-200 font-cinzel text-xs font-bold tracking-[0.16em] uppercase flex items-center justify-center space-x-2 border border-neutral-700 hover:border-red-500"
            >
              <Upload size={14} className="text-red-400" />
              <span>ADMIN PANEL</span>
            </button>

            <button
              onClick={() => handleNavClick('report')}
              className="w-full py-3 rounded bg-red-700 hover:bg-red-600 text-white font-cinzel text-xs font-bold tracking-[0.16em] uppercase flex items-center justify-center space-x-2 shadow-[0_0_20px_rgba(220,38,38,0.5)] border border-red-500"
            >
              <ShieldAlert size={15} />
              <span>REPORT CASE</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
