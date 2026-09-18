import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AtmosphericEffects } from './components/AtmosphericEffects';
import { Home } from './pages/Home';
import { Vault } from './pages/Vault';
import { Gallery } from './pages/Gallery';
import { EquipmentPage } from './pages/EquipmentPage';
import { MediaCoverage } from './pages/MediaCoverage';
import { ReportActivity } from './pages/ReportActivity';
import { Contact } from './pages/Contact';
import { AdminPanel } from './pages/AdminPanel';
import { TeamCard } from './components/TeamCard';
import { 
  SiteSettings, 
  TeamMember, 
  Investigation, 
  VaultCase, 
  EquipmentItem, 
  MediaItem, 
  GalleryImage 
} from './types';
import { 
  initialSiteSettings, 
  initialTeamMembers, 
  initialInvestigations, 
  initialVaultCases, 
  initialEquipment, 
  initialMediaCoverage, 
  initialGalleryImages 
} from './db/initialData';
import { api } from './services/api';

export function App() {
  const [activePage, setActivePage] = useState<string>('home');
  const [showScanlines, setShowScanlines] = useState<boolean>(true);

  // App Data States (with robust defaults)
  const [settings, setSettings] = useState<SiteSettings>(initialSiteSettings);
  const [team, setTeam] = useState<TeamMember[]>(initialTeamMembers);
  const [investigations, setInvestigations] = useState<Investigation[]>(initialInvestigations);
  const [vaultCases, setVaultCases] = useState<VaultCase[]>(initialVaultCases);
  const [equipment, setEquipment] = useState<EquipmentItem[]>(initialEquipment);
  const [media, setMedia] = useState<MediaItem[]>(initialMediaCoverage);
  const [gallery, setGallery] = useState<GalleryImage[]>(initialGalleryImages);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const loadData = async () => {
    try {
      const [
        fetchedSettings,
        fetchedTeam,
        fetchedInvestigations,
        fetchedVault,
        fetchedEquipment,
        fetchedMedia,
        fetchedGallery
      ] = await Promise.allSettled([
        api.getSettings(),
        api.getTeam(),
        api.getInvestigations(),
        api.getVaultCases(),
        api.getEquipment(),
        api.getMedia(),
        api.getGallery()
      ]);

      if (fetchedSettings.status === 'fulfilled' && fetchedSettings.value) {
        setSettings(fetchedSettings.value);
      }
      if (fetchedTeam.status === 'fulfilled' && fetchedTeam.value?.length) {
        setTeam(fetchedTeam.value);
      }
      if (fetchedInvestigations.status === 'fulfilled' && fetchedInvestigations.value?.length) {
        setInvestigations(fetchedInvestigations.value);
      }
      if (fetchedVault.status === 'fulfilled' && fetchedVault.value?.length) {
        setVaultCases(fetchedVault.value);
      }
      if (fetchedEquipment.status === 'fulfilled' && fetchedEquipment.value?.length) {
        setEquipment(fetchedEquipment.value);
      }
      if (fetchedMedia.status === 'fulfilled' && fetchedMedia.value?.length) {
        setMedia(fetchedMedia.value);
      }
      if (fetchedGallery.status === 'fulfilled' && fetchedGallery.value?.length) {
        setGallery(fetchedGallery.value);
      }
    } catch (e) {
      console.warn('Using embedded paranormal initial records', e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    // Check hash for direct linking
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash && ['home', 'media', 'gallery', 'vault', 'equipment', 'team', 'contact', 'report', 'admin'].includes(hash)) {
        setActivePage(hash);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleNavigate = (page: string) => {
    setActivePage(page);
    window.location.hash = page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Special case: 'team' redirects to Home's team section or displays focused team view
  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return (
          <Home
            settings={settings}
            team={team}
            investigations={investigations}
            vaultCases={vaultCases}
            onNavigate={handleNavigate}
          />
        );
      case 'team':
        return (
          <div className="min-h-screen bg-black/40 backdrop-blur-md text-gray-200 py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-3xl mx-auto mb-16">
                <div className="inline-flex items-center space-x-2 text-xs font-mono-tech tracking-[0.25em] text-red-500 uppercase font-semibold mb-3">
                  <span>SPECIALIZED FIELD INVESTIGATORS</span>
                </div>
                <h1 className="font-cinzel text-3xl sm:text-4xl lg:text-5xl font-bold tracking-wide text-gray-100 uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  THE INVESTIGATION TEAM
                </h1>
                <p className="mt-3 text-xs sm:text-sm text-gray-300 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                  Specialists combining historical archives, audio forensics, RF measurement, and sensory hardware.
                </p>
              </div>

              {/* Grid of the 4 Team Member Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {team.map((member) => (
                  <TeamCard 
                    key={member.id} 
                    member={member} 
                    onPhotoUpdated={(updated) => {
                      setTeam(prev => prev.map(m => m.id === updated.id ? updated : m));
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      case 'vault':
        return <Vault cases={vaultCases} />;
      case 'gallery':
        return <Gallery images={gallery} />;
      case 'equipment':
        return <EquipmentPage equipment={equipment} />;
      case 'media':
        return <MediaCoverage media={media} />;
      case 'report':
        return <ReportActivity />;
      case 'contact':
        return <Contact settings={settings} onNavigate={handleNavigate} />;
      case 'admin':
        return (
          <AdminPanel
            initialSettings={settings}
            onSettingsUpdate={(updated) => setSettings(updated)}
            onRefreshData={loadData}
          />
        );
      default:
        return (
          <Home
            settings={settings}
            team={team}
            investigations={investigations}
            vaultCases={vaultCases}
            onNavigate={handleNavigate}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-transparent text-gray-200 flex flex-col selection:bg-red-900 selection:text-white relative font-sans">
      {/* Full-Canvas Gothic Horror Background Wallpaper */}
      <div
        id="fixed-background-container"
        className="fixed inset-0 w-full h-full min-h-screen pointer-events-none z-0 overflow-hidden select-none bg-cover bg-center bg-no-repeat"
        style={{
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
        }}
      >
        <picture className="absolute inset-0 w-full h-full block">
          <source media="(max-width: 768px)" srcSet="/horror_background.png" />
          <img
            src="/horror_background_wide.jpg"
            alt="DOS Gothic Manor Ambient Wallpaper"
            referrerPolicy="no-referrer"
            className="w-full h-full min-w-full min-h-full object-cover object-center sm:object-[center_top] filter brightness-100 contrast-105 saturate-100"
            style={{
              objectFit: 'cover',
              objectPosition: 'center 20%',
            }}
          />
        </picture>
        {/* Transparent atmospheric overlay so wallpaper is completely visible with high readability */}
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-radial-[circle_at_center] from-transparent via-transparent to-black/35 pointer-events-none" />
      </div>

      {/* Cinematic Horror Effects Overlay (Film Grain, CRT Scanlines, Vignette) */}
      <AtmosphericEffects showScanlines={showScanlines} />

      {/* Persistent Navigation Bar */}
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        showScanlines={showScanlines}
        onToggleScanlines={() => setShowScanlines(!showScanlines)}
      />

      {/* Main Routed Page Content */}
      <main className="flex-grow">
        {renderPage()}
      </main>

      {/* Footer with Disclaimer & Links (hidden in Admin tab for clean dashboard work) */}
      {activePage !== 'admin' && (
        <Footer onNavigate={handleNavigate} />
      )}
    </div>
  );
}

export default App;
