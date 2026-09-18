import React, { useState, useEffect } from 'react';
import { 
  Lock, 
  Unlock, 
  LogOut, 
  ShieldAlert, 
  LayoutDashboard, 
  Users, 
  FolderLock, 
  Camera, 
  Tv, 
  Cpu, 
  Inbox, 
  Settings, 
  Plus, 
  Trash2, 
  Edit, 
  Save, 
  X, 
  Upload, 
  CheckCircle2, 
  AlertCircle,
  FileText,
  Eye,
  Search,
  MessageSquare,
  Copy,
  ExternalLink,
  Image as ImageIcon,
  Sparkles
} from 'lucide-react';
import { 
  SiteSettings, 
  TeamMember, 
  Investigation, 
  VaultCase, 
  EquipmentItem, 
  MediaItem, 
  GalleryImage, 
  ActivityReport, 
  ContactMessage, 
  DashboardStats,
  CaseStatus
} from '../types';
import { api, authService } from '../services/api';

interface AdminPanelProps {
  initialSettings: SiteSettings;
  onSettingsUpdate: (settings: SiteSettings) => void;
  onRefreshData: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  initialSettings,
  onSettingsUpdate,
  onRefreshData
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(authService.isAuthenticated());
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);

  // Active Tab
  const [activeTab, setActiveTab] = useState<'stats' | 'settings' | 'team' | 'investigations' | 'vault' | 'equipment' | 'media' | 'gallery' | 'uploads' | 'reports' | 'messages'>('stats');

  // Data States
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [settingsForm, setSettingsForm] = useState<SiteSettings>(initialSettings);
  const [teamList, setTeamList] = useState<TeamMember[]>([]);
  const [investigationsList, setInvestigationsList] = useState<Investigation[]>([]);
  const [vaultList, setVaultList] = useState<VaultCase[]>([]);
  const [equipmentList, setEquipmentList] = useState<EquipmentItem[]>([]);
  const [mediaList, setMediaList] = useState<MediaItem[]>([]);
  const [galleryList, setGalleryList] = useState<GalleryImage[]>([]);
  const [reportsList, setReportsList] = useState<ActivityReport[]>([]);
  const [messagesList, setMessagesList] = useState<ContactMessage[]>([]);
  const [uploadedFilesList, setUploadedFilesList] = useState<{ filename: string; url: string; size: number; mtime: string }[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  // Modals & Edit States
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      loadAllAdminData();
    }
  }, [isAuthenticated]);

  const loadAllAdminData = async () => {
    try {
      const [
        statsData, 
        teamData, 
        invData, 
        vaultData, 
        eqData, 
        mediaData, 
        galData, 
        repData, 
        msgData,
        uploadsData
      ] = await Promise.all([
        api.getStats().catch(() => null),
        api.getTeam().catch(() => []),
        api.getInvestigations().catch(() => []),
        api.getVaultCases().catch(() => []),
        api.getEquipment().catch(() => []),
        api.getMedia().catch(() => []),
        api.getGallery().catch(() => []),
        api.getReports().catch(() => []),
        api.getContactMessages().catch(() => []),
        api.getUploadedFiles().catch(() => [])
      ]);

      if (statsData) setStats(statsData);
      setTeamList(teamData);
      setInvestigationsList(invData);
      setVaultList(vaultData);
      setEquipmentList(eqData);
      setMediaList(mediaData);
      setGalleryList(galData);
      setReportsList(repData);
      setMessagesList(msgData);
      setUploadedFilesList(uploadsData);
    } catch (e) {
      console.error('Error loading admin data', e);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError(null);
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: loginEmail, password: loginPassword })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication rejected');
      }
      authService.setToken(data.token);
      setIsAuthenticated(true);
    } catch (err: any) {
      setLoginError(err.message || 'Login failed');
    }
  };

  const handleLogout = () => {
    authService.logout();
    setIsAuthenticated(false);
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const updated = await api.updateSettings(settingsForm);
      onSettingsUpdate(updated);
      setStatusMessage('Settings updated successfully');
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (err) {
      alert('Failed to save settings');
    }
  };

  // Upload handler helper
  const handleUploadImage = async (file: File): Promise<string> => {
    const res = await api.uploadFile(file);
    return res.url;
  };

  // ----------------------------------------------------
  // LOGIN SCREEN
  // ----------------------------------------------------
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-transparent flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-black/50 backdrop-blur-md border border-red-900/60 rounded-xl p-8 shadow-[0_0_50px_rgba(220,38,38,0.25)]">
          <div className="text-center mb-8">
            <div className="w-14 h-14 rounded-full bg-red-950/80 border border-red-600 flex items-center justify-center text-red-500 mx-auto mb-3 box-glow-red">
              <Lock size={26} />
            </div>
            <h1 className="font-cinzel text-2xl font-bold text-gray-100 uppercase tracking-wider">
              COMMAND CLEARANCE
            </h1>
            <p className="font-mono-tech text-xs text-red-400 tracking-widest uppercase mt-1">
              DOS STAFF & ARCHIVE MANAGEMENT
            </p>
          </div>

          {loginError && (
            <div className="mb-4 p-3 rounded bg-red-950/50 border border-red-800 text-red-300 text-xs font-mono-tech flex items-center space-x-2">
              <AlertCircle size={15} />
              <span>{loginError}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 font-mono-tech text-xs">
            <div>
              <label className="block text-gray-400 mb-1.5 uppercase text-[11px]">
                Investigator Email / Username
              </label>
              <input
                type="text"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="admin@dos.in"
                className="w-full bg-black/70 border border-neutral-800 focus:border-red-600 rounded px-3.5 py-2.5 text-gray-200 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-gray-400 mb-1.5 uppercase text-[11px]">
                Security Passcode
              </label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-black/70 border border-neutral-800 focus:border-red-600 rounded px-3.5 py-2.5 text-gray-200 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded bg-red-700 hover:bg-red-600 text-white font-cinzel text-xs font-bold tracking-[0.2em] uppercase transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] mt-6 border border-red-500"
            >
              AUTHENTICATE CLEARANCE
            </button>

            <div className="pt-4 text-center border-t border-neutral-900 text-[11px] text-neutral-500">
              Default Credentials: <span className="text-gray-300">admin@dos.in</span> / <span className="text-gray-300">RiseAboveFear2026!</span>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // ADMIN DASHBOARD
  // ----------------------------------------------------
  return (
    <div className="min-h-screen bg-transparent text-gray-200">
      
      {/* Top Admin Bar */}
      <header className="bg-black/50 backdrop-blur-md border-b border-red-950/80 px-6 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded bg-black border border-red-600 flex items-center justify-center">
            <span className="font-cinzel text-red-500 font-bold text-sm">DOS</span>
          </div>
          <div>
            <span className="font-cinzel text-sm font-bold text-gray-100 uppercase tracking-wider">
              DOS COMMAND CENTER
            </span>
            <span className="font-mono-tech text-[10px] text-red-400 tracking-widest uppercase ml-3">
              CLEARANCE: SUPERADMIN
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-4 font-mono-tech text-xs">
          <span className="text-neutral-400 hidden sm:inline">
            USER: <strong className="text-gray-200">admin@dos.in</strong>
          </span>
          <button
            onClick={handleLogout}
            className="flex items-center space-x-1.5 px-3 py-1.5 rounded bg-neutral-900 hover:bg-red-950/60 border border-neutral-800 text-gray-300 hover:text-red-400 transition-colors"
          >
            <LogOut size={13} />
            <span>LOGOUT</span>
          </button>
        </div>
      </header>

      {/* Main Layout: Sidebar & Content Area */}
      <div className="flex flex-col md:flex-row min-h-[calc(100vh-57px)]">
        
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 bg-black/40 backdrop-blur-md border-r border-neutral-900/80 p-4 space-y-1 font-mono-tech text-xs">
          <div className="text-[10px] tracking-widest uppercase text-neutral-500 px-3 py-2">
            MANAGEMENT MODULES
          </div>

          {[
            { id: 'stats', label: 'Overview & Stats', icon: LayoutDashboard },
            { id: 'settings', label: 'Site Settings', icon: Settings },
            { id: 'team', label: 'Team Members', icon: Users },
            { id: 'investigations', label: 'Investigations', icon: FileText },
            { id: 'vault', label: 'DOS Vault Cases', icon: FolderLock },
            { id: 'equipment', label: 'Equipment Arsenal', icon: Cpu },
            { id: 'media', label: 'Media Coverage', icon: Tv },
            { id: 'gallery', label: 'Evidence Gallery', icon: Camera },
            { id: 'uploads', label: 'Image Upload & Media', icon: Upload, badge: uploadedFilesList.length > 0 ? uploadedFilesList.length : undefined },
            { id: 'reports', label: 'Activity Reports', icon: ShieldAlert, badge: reportsList.filter(r => r.status === 'New').length },
            { id: 'messages', label: 'Contact Inquiries', icon: MessageSquare, badge: messagesList.filter(m => m.status === 'unread').length },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setEditingItem(null);
                  setIsCreating(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded transition-colors ${
                  isActive
                    ? 'bg-red-950/60 text-red-300 border border-red-800/80'
                    : 'text-gray-400 hover:bg-neutral-900 hover:text-gray-200'
                }`}
              >
                <div className="flex items-center space-x-2.5">
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </div>
                {tab.badge && tab.badge > 0 ? (
                  <span className="px-1.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-bold">
                    {tab.badge}
                  </span>
                ) : null}
              </button>
            );
          })}
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6 md:p-10 bg-transparent overflow-y-auto">
          
          {statusMessage && (
            <div className="mb-6 p-3.5 rounded bg-emerald-950/40 border border-emerald-700 text-emerald-300 text-xs font-mono-tech flex items-center space-x-2">
              <CheckCircle2 size={16} />
              <span>{statusMessage}</span>
            </div>
          )}

          {/* 1. STATS OVERVIEW */}
          {activeTab === 'stats' && (
            <div className="space-y-8">
              <div>
                <h2 className="font-cinzel text-2xl font-bold uppercase tracking-wider text-gray-100">
                  SYSTEM TELEMETRY & OVERVIEW
                </h2>
                <p className="font-mono-tech text-xs text-gray-400 mt-1">
                  Real-time database records and active field activity counts.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono-tech">
                <div className="bg-[#09090d] border border-neutral-800 p-5 rounded-lg">
                  <div className="text-[10px] text-gray-400 uppercase">Total Field Investigations</div>
                  <div className="text-3xl font-bold text-red-500 mt-1">{investigationsList.length}</div>
                </div>
                <div className="bg-[#09090d] border border-neutral-800 p-5 rounded-lg">
                  <div className="text-[10px] text-gray-400 uppercase">Classified Vault Cases</div>
                  <div className="text-3xl font-bold text-gray-100 mt-1">{vaultList.length}</div>
                </div>
                <div className="bg-[#09090d] border border-neutral-800 p-5 rounded-lg">
                  <div className="text-[10px] text-gray-400 uppercase">Public Activity Reports</div>
                  <div className="text-3xl font-bold text-amber-400 mt-1">{reportsList.length}</div>
                  <div className="text-[10px] text-red-400 mt-1">
                    {reportsList.filter(r => r.status === 'New').length} pending review
                  </div>
                </div>
                <div className="bg-[#09090d] border border-neutral-800 p-5 rounded-lg">
                  <div className="text-[10px] text-gray-400 uppercase">Gallery Evidence Images</div>
                  <div className="text-3xl font-bold text-gray-100 mt-1">{galleryList.length}</div>
                </div>
              </div>

              {/* Quick Image Upload Action Banner */}
              <div className="bg-gradient-to-r from-red-950/40 via-[#0a0a0e] to-black border border-red-900/60 rounded-xl p-6 shadow-[0_0_30px_rgba(220,38,38,0.15)] flex flex-col md:flex-row items-start md:items-center justify-between gap-4 font-mono-tech">
                <div className="space-y-1 max-w-xl">
                  <div className="inline-flex items-center space-x-2 text-[10px] text-red-400 uppercase tracking-widest font-bold">
                    <Upload size={13} />
                    <span>DIRECT EVIDENCE & IMAGE UPLOADER</span>
                  </div>
                  <h3 className="font-cinzel text-lg font-bold text-gray-100 uppercase tracking-wider">
                    UPLOAD INVESTIGATION PHOTOGRAPHS & RECON FILES
                  </h3>
                  <p className="text-xs text-gray-400">
                    Host .jfif, .jpg, .png, or .webp images directly to the server. Instantly accessible for the Evidence Gallery, Team Profiles, or Dossier Cases.
                  </p>
                </div>

                <div className="flex items-center space-x-3 w-full md:w-auto">
                  <label className="cursor-pointer w-full md:w-auto px-5 py-3 rounded bg-red-700 hover:bg-red-600 text-white font-cinzel text-xs font-bold tracking-widest uppercase transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)] flex items-center justify-center space-x-2 border border-red-500">
                    <Upload size={15} />
                    <span>{isUploading ? 'UPLOADING...' : 'UPLOAD IMAGES'}</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*,.jfif"
                      disabled={isUploading}
                      className="hidden"
                      onChange={async (e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          setIsUploading(true);
                          try {
                            const files = Array.from(e.target.files);
                            for (const file of files) {
                              await api.uploadFile(file);
                            }
                            const refreshed = await api.getUploadedFiles();
                            setUploadedFilesList(refreshed);
                            setStatusMessage(`Successfully uploaded ${files.length} image(s)!`);
                            setTimeout(() => setStatusMessage(null), 4000);
                          } catch (err) {
                            alert('Failed to upload file');
                          } finally {
                            setIsUploading(false);
                          }
                        }
                      }}
                    />
                  </label>
                  <button
                    onClick={() => setActiveTab('uploads')}
                    className="px-4 py-3 rounded bg-neutral-900 hover:bg-neutral-800 text-gray-300 hover:text-white text-xs uppercase tracking-wider border border-neutral-700 transition-colors whitespace-nowrap"
                  >
                    View All ({uploadedFilesList.length})
                  </button>
                </div>
              </div>

              {/* Recent Incoming Reports */}
              <div className="bg-[#09090d] border border-neutral-800 rounded-lg p-6">
                <h3 className="font-mono-tech text-xs tracking-widest text-red-400 uppercase font-bold mb-4">
                  LATEST SUBMITTED ACTIVITY REPORTS
                </h3>
                <div className="divide-y divide-neutral-900 font-mono-tech text-xs">
                  {reportsList.slice(0, 5).map((rep) => (
                    <div key={rep.id} className="py-3 flex items-center justify-between">
                      <div>
                        <span className="text-red-500 font-bold mr-3">{rep.caseId}</span>
                        <span className="text-gray-200">{rep.fullName}</span>
                        <span className="text-neutral-500 mx-2">•</span>
                        <span className="text-gray-400">{rep.location}, {rep.city}</span>
                        <span className="text-neutral-500 mx-2">•</span>
                        <span className="text-red-400">{rep.activityType}</span>
                      </div>
                      <button
                        onClick={() => {
                          setActiveTab('reports');
                          setEditingItem(rep);
                        }}
                        className="text-xs text-neutral-400 hover:text-white px-2 py-1 bg-neutral-900 rounded"
                      >
                        Review Dossier
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 2. SITE SETTINGS & HOME CONTENT */}
          {activeTab === 'settings' && (
            <div className="max-w-3xl space-y-6">
              <div>
                <h2 className="font-cinzel text-2xl font-bold uppercase tracking-wider text-gray-100">
                  SITE SETTINGS & HOME CONTENT
                </h2>
                <p className="font-mono-tech text-xs text-gray-400 mt-1">
                  Control the hero statement, taglines, who-we-are narrative, and contact coordinates.
                </p>
              </div>

              <form onSubmit={handleSaveSettings} className="space-y-4 font-mono-tech text-xs bg-[#09090d] p-6 rounded-lg border border-neutral-800">
                <div>
                  <label className="block text-gray-400 mb-1 uppercase">Organization Name</label>
                  <input
                    type="text"
                    value={settingsForm.siteName}
                    onChange={(e) => setSettingsForm({ ...settingsForm, siteName: e.target.value })}
                    className="w-full bg-black border border-neutral-800 rounded p-2.5 text-gray-200"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-1 uppercase">Hero Tagline</label>
                  <input
                    type="text"
                    value={settingsForm.heroTagline}
                    onChange={(e) => setSettingsForm({ ...settingsForm, heroTagline: e.target.value })}
                    className="w-full bg-black border border-neutral-800 rounded p-2.5 text-gray-200"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-1 uppercase">Hero Statement / Description</label>
                  <textarea
                    rows={4}
                    value={settingsForm.heroDescription}
                    onChange={(e) => setSettingsForm({ ...settingsForm, heroDescription: e.target.value })}
                    className="w-full bg-black border border-neutral-800 rounded p-2.5 text-gray-200 font-sans"
                  />
                </div>

                <div>
                  <label className="block text-gray-400 mb-1 uppercase">Hero Background Wallpaper Image URL</label>
                  <div className="flex space-x-3 items-center">
                    <input
                      type="text"
                      value={settingsForm.heroBgUrl || ''}
                      onChange={(e) => setSettingsForm({ ...settingsForm, heroBgUrl: e.target.value })}
                      placeholder="/horror_background_wide.jpg"
                      className="flex-1 bg-black border border-neutral-800 rounded p-2.5 text-gray-200"
                    />
                    {settingsForm.heroBgUrl && (
                      <div className="w-16 h-10 rounded overflow-hidden border border-red-900/60 flex-shrink-0 bg-black">
                        <img 
                          src={settingsForm.heroBgUrl} 
                          alt="Hero Wallpaper Preview" 
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover" 
                        />
                      </div>
                    )}
                  </div>
                  <p className="mt-1 text-[11px] text-gray-500">Current wallpaper: Abandoned haunted mansion under full moon with twisted tree & crow (/horror_background_wide.jpg)</p>
                </div>

                <div>
                  <label className="block text-gray-400 mb-1 uppercase">Who We Are Narrative</label>
                  <textarea
                    rows={4}
                    value={settingsForm.whoWeAreText}
                    onChange={(e) => setSettingsForm({ ...settingsForm, whoWeAreText: e.target.value })}
                    className="w-full bg-black border border-neutral-800 rounded p-2.5 text-gray-200 font-sans"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-400 mb-1 uppercase">Contact Email</label>
                    <input
                      type="email"
                      value={settingsForm.contactEmail}
                      onChange={(e) => setSettingsForm({ ...settingsForm, contactEmail: e.target.value })}
                      className="w-full bg-black border border-neutral-800 rounded p-2.5 text-gray-200"
                    />
                  </div>

                  <div>
                    <label className="block text-gray-400 mb-1 uppercase">Contact Phone</label>
                    <input
                      type="text"
                      value={settingsForm.contactPhone}
                      onChange={(e) => setSettingsForm({ ...settingsForm, contactPhone: e.target.value })}
                      className="w-full bg-black border border-neutral-800 rounded p-2.5 text-gray-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 mb-1 uppercase">Headquarters Address</label>
                  <input
                    type="text"
                    value={settingsForm.contactAddress}
                    onChange={(e) => setSettingsForm({ ...settingsForm, contactAddress: e.target.value })}
                    className="w-full bg-black border border-neutral-800 rounded p-2.5 text-gray-200"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded bg-red-700 hover:bg-red-600 text-white font-cinzel text-xs font-bold tracking-widest uppercase transition-colors"
                  >
                    SAVE SITE SETTINGS
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* 3. TEAM MEMBERS MANAGEMENT */}
          {activeTab === 'team' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-cinzel text-2xl font-bold uppercase tracking-wider text-gray-100">
                    INVESTIGATION TEAM ROSTER
                  </h2>
                  <p className="font-mono-tech text-xs text-gray-400 mt-1">
                    Manage team member cards, portraits, roles, and expertise.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setIsCreating(true);
                    setEditingItem({
                      name: '',
                      role: '',
                      photoUrl: '',
                      biography: '',
                      bio: '',
                      expertise: '',
                      displayOrder: teamList.length + 1,
                      isActive: true
                    });
                  }}
                  className="px-4 py-2 rounded bg-red-700 hover:bg-red-600 text-white font-mono-tech text-xs font-bold uppercase flex items-center space-x-1.5 shadow-[0_0_15px_rgba(220,38,38,0.4)]"
                >
                  <Plus size={14} />
                  <span>ADD MEMBER</span>
                </button>
              </div>

              {/* Team Table / Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {teamList.map((member) => (
                  <div key={member.id} className="bg-[#09090d] border border-neutral-800 rounded-lg p-5 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                    <div className="flex flex-col items-center shrink-0 space-y-2">
                      <img
                        src={member.photoUrl ? member.photoUrl.replace(/ /g, '%20') : 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop'}
                        alt={member.name}
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          e.currentTarget.src = 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop';
                        }}
                        className="w-24 h-32 object-cover rounded border border-red-900/60 bg-neutral-900 shadow-md"
                      />
                      <label className="cursor-pointer px-2 py-1 rounded bg-neutral-900 hover:bg-red-950 border border-neutral-700 hover:border-red-600 text-[10px] font-mono-tech text-gray-300 hover:text-white flex items-center space-x-1 transition-all">
                        <Camera size={11} className="text-red-400" />
                        <span>Change Photo</span>
                        <input
                          type="file"
                          accept="image/*,.jfif"
                          className="hidden"
                          onChange={async (e) => {
                            if (e.target.files?.[0]) {
                              const file = e.target.files[0];
                              try {
                                const uploadRes = await api.uploadMemberPhoto(file, member.id, member.name);
                                const newUrl = uploadRes?.photoUrl || (await handleUploadImage(file));
                                await api.updateTeamMember(member.id, { ...member, photoUrl: newUrl });
                                setStatusMessage(`Portrait updated for ${member.name}`);
                                setTimeout(() => setStatusMessage(null), 3000);
                                loadAllAdminData();
                                onRefreshData();
                              } catch (err: any) {
                                console.error('Error updating portrait:', err);
                              }
                            }
                          }}
                        />
                      </label>
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between">
                          <h3 className="font-cinzel text-base font-bold text-gray-100">{member.name}</h3>
                          <span className="text-[10px] font-mono-tech px-2 py-0.5 rounded bg-black text-red-400 border border-neutral-800">
                            ORDER {member.displayOrder}
                          </span>
                        </div>
                        <p className="font-mono-tech text-xs text-red-500 font-semibold mt-0.5">{member.role}</p>
                        {member.expertise && (
                          <p className="text-[11px] font-mono-tech text-neutral-400 mt-1">
                            <span className="text-neutral-500">Expertise:</span> {member.expertise}
                          </p>
                        )}
                        <p className="text-xs text-gray-300 mt-2 line-clamp-3 leading-relaxed border-t border-neutral-900/80 pt-2 font-sans">
                          {member.biography || member.bio || 'No biography set.'}
                        </p>
                      </div>

                      <div className="flex items-center space-x-2 mt-3 pt-2 border-t border-neutral-900">
                        <button
                          onClick={() => {
                            setIsCreating(false);
                            setEditingItem({ 
                              ...member,
                              biography: member.biography || member.bio || '',
                              bio: member.bio || member.biography || ''
                            });
                          }}
                          className="px-2.5 py-1 rounded bg-neutral-900 hover:bg-neutral-800 text-xs font-mono-tech text-gray-300 flex items-center space-x-1"
                        >
                          <Edit size={12} />
                          <span>Edit Details</span>
                        </button>
                        <button
                          onClick={async () => {
                            if (confirm(`Delete ${member.name}?`)) {
                              await api.deleteTeamMember(member.id);
                              loadAllAdminData();
                              onRefreshData();
                            }
                          }}
                          className="px-2.5 py-1 rounded bg-neutral-900 hover:bg-red-950/60 text-xs font-mono-tech text-red-400 flex items-center space-x-1"
                        >
                          <Trash2 size={12} />
                          <span>Delete</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Edit / Create Member Modal */}
              {editingItem && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                  <div className="bg-[#09090d] border border-red-900 rounded-xl p-6 max-w-lg w-full font-mono-tech text-xs space-y-4 max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                      <h3 className="font-cinzel text-lg font-bold text-gray-100 uppercase">
                        {isCreating ? 'ADD TEAM MEMBER' : 'EDIT TEAM MEMBER'}
                      </h3>
                      <button onClick={() => setEditingItem(null)} className="text-gray-400 hover:text-white">
                        <X size={18} />
                      </button>
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-1">Full Name</label>
                      <input
                        type="text"
                        value={editingItem.name}
                        onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                        className="w-full bg-black border border-neutral-800 rounded p-2 text-gray-200"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-1">Role / Designation</label>
                      <input
                        type="text"
                        value={editingItem.role}
                        onChange={(e) => setEditingItem({ ...editingItem, role: e.target.value })}
                        className="w-full bg-black border border-neutral-800 rounded p-2 text-gray-200"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-1">Photo URL / File Upload</label>
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={editingItem.photoUrl}
                          onChange={(e) => setEditingItem({ ...editingItem, photoUrl: e.target.value })}
                          className="flex-1 bg-black border border-neutral-800 rounded p-2 text-gray-200"
                          placeholder="/uploads/photo.jpg or https://..."
                        />
                        <label className="cursor-pointer px-3 py-2 bg-neutral-900 hover:bg-neutral-800 rounded border border-neutral-700 text-gray-300 flex items-center space-x-1">
                          <Upload size={13} />
                          <span>Upload</span>
                          <input
                            type="file"
                            accept="image/*,.jfif"
                            className="hidden"
                            onChange={async (e) => {
                              if (e.target.files?.[0]) {
                                const file = e.target.files[0];
                                const url = await handleUploadImage(file);
                                setEditingItem({ ...editingItem, photoUrl: url });
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-1">Field Biography</label>
                      <textarea
                        rows={4}
                        value={editingItem.biography || editingItem.bio || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, biography: e.target.value, bio: e.target.value })}
                        className="w-full bg-black border border-neutral-800 rounded p-2 text-gray-200 font-sans leading-relaxed"
                        placeholder="Detailed investigator biography..."
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-1">Specialized Expertise</label>
                      <input
                        type="text"
                        value={editingItem.expertise || ''}
                        onChange={(e) => setEditingItem({ ...editingItem, expertise: e.target.value })}
                        className="w-full bg-black border border-neutral-800 rounded p-2 text-gray-200"
                        placeholder="e.g. Lead Investigator & Technical Strategy"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-400 mb-1">Display Order</label>
                        <input
                          type="number"
                          value={editingItem.displayOrder || 1}
                          onChange={(e) => setEditingItem({ ...editingItem, displayOrder: parseInt(e.target.value, 10) || 1 })}
                          className="w-full bg-black border border-neutral-800 rounded p-2 text-gray-200"
                        />
                      </div>
                      <div className="flex items-center pt-5">
                        <label className="flex items-center space-x-2 text-gray-300 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={editingItem.isActive !== false}
                            onChange={(e) => setEditingItem({ ...editingItem, isActive: e.target.checked })}
                            className="rounded border-neutral-800 bg-black text-red-600 focus:ring-0"
                          />
                          <span>Active on public site</span>
                        </label>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
                      <button
                        onClick={() => setEditingItem(null)}
                        className="px-4 py-2 rounded bg-neutral-900 text-gray-300"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={async () => {
                          const payload = {
                            ...editingItem,
                            biography: editingItem.biography || editingItem.bio || '',
                            bio: editingItem.bio || editingItem.biography || ''
                          };
                          if (isCreating) {
                            await api.createTeamMember(payload);
                          } else {
                            await api.updateTeamMember(editingItem.id, payload);
                          }
                          setEditingItem(null);
                          loadAllAdminData();
                          onRefreshData();
                        }}
                        className="px-6 py-2 rounded bg-red-700 hover:bg-red-600 text-white font-bold"
                      >
                        Save Member
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 4. ACTIVITY REPORTS MANAGEMENT (INCOMING PUBLIC REPORTS) */}
          {activeTab === 'reports' && (
            <div className="space-y-6 font-mono-tech text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-cinzel text-2xl font-bold uppercase tracking-wider text-gray-100">
                    PUBLIC ACTIVITY REPORTS INTAKE
                  </h2>
                  <p className="text-gray-400 mt-1">
                    Manage incoming citizen reports, triage priority, set internal notes, and assign status.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {reportsList.map((report) => (
                  <div key={report.id} className="bg-[#09090d] border border-neutral-800 rounded-lg p-5 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-neutral-850 pb-3">
                      <div className="flex items-center space-x-3">
                        <span className="text-base font-bold text-red-500 font-cinzel">{report.caseId}</span>
                        <span className="text-gray-300 font-bold">{report.fullName}</span>
                        <span className="text-neutral-500">({report.email} {report.phone ? `/ ${report.phone}` : ''})</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-[10px] text-neutral-400">STATUS:</span>
                        <select
                          value={report.status}
                          onChange={async (e) => {
                            await api.updateReport(report.id, { status: e.target.value as any });
                            loadAllAdminData();
                          }}
                          className="bg-black border border-neutral-800 rounded px-2 py-1 text-gray-200 text-xs"
                        >
                          {['New', 'Reviewing', 'Contacted', 'Scheduled', 'Investigating', 'Closed', 'Archived'].map((st) => (
                            <option key={st} value={st}>{st}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-neutral-400">
                      <div><span className="text-neutral-500">Location:</span> {report.location}, {report.city}</div>
                      <div><span className="text-neutral-500">Date/Time:</span> {report.dateOfActivity || 'N/A'} ({report.approximateTime || 'N/A'})</div>
                      <div><span className="text-neutral-500">Activity Type:</span> <strong className="text-red-400">{report.activityType}</strong></div>
                    </div>

                    <div className="p-3 bg-black/60 rounded border border-neutral-900 text-gray-300 font-sans">
                      {report.description}
                    </div>

                    {report.attachments && report.attachments.length > 0 && (
                      <div className="flex items-center space-x-2 pt-1">
                        <span className="text-neutral-500">Attachments ({report.attachments.length}):</span>
                        {report.attachments.map((att, i) => (
                          <a
                            key={i}
                            href={att}
                            target="_blank"
                            rel="noreferrer"
                            className="px-2 py-0.5 rounded bg-neutral-900 text-red-400 hover:underline text-[10px]"
                          >
                            File {i + 1}
                          </a>
                        ))}
                      </div>
                    )}

                    {/* Internal Notes */}
                    <div className="pt-2 border-t border-neutral-900 flex items-center space-x-3">
                      <span className="text-neutral-500 shrink-0">Internal Notes:</span>
                      <input
                        type="text"
                        defaultValue={report.internalNotes || ''}
                        placeholder="Add investigator triage notes..."
                        onBlur={async (e) => {
                          await api.updateReport(report.id, { internalNotes: e.target.value });
                        }}
                        className="flex-1 bg-black/80 border border-neutral-900 focus:border-red-600 rounded px-2 py-1 text-gray-300"
                      />
                      <button
                        onClick={async () => {
                          if (confirm(`Delete case record ${report.caseId}?`)) {
                            await api.deleteReport(report.id);
                            loadAllAdminData();
                          }
                        }}
                        className="text-neutral-500 hover:text-red-500 p-1"
                        title="Delete report"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. INVESTIGATIONS MANAGEMENT */}
          {activeTab === 'investigations' && (
            <div className="space-y-6 font-mono-tech text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-cinzel text-2xl font-bold uppercase tracking-wider text-gray-100">
                    FIELD INVESTIGATIONS
                  </h2>
                  <p className="text-gray-400 mt-1">
                    Manage documented cases showcased across the home page and archives.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setIsCreating(true);
                    setEditingItem({
                      title: '',
                      location: '',
                      investigationDate: new Date().toISOString().split('T')[0],
                      status: 'DOCUMENTED',
                      shortDescription: '',
                      fullDescription: '',
                      heroImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=1200&auto=format&fit=crop',
                      evidenceCount: 4
                    });
                  }}
                  className="px-4 py-2 rounded bg-red-700 hover:bg-red-600 text-white font-mono-tech text-xs font-bold uppercase flex items-center space-x-1.5"
                >
                  <Plus size={14} />
                  <span>NEW INVESTIGATION</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {investigationsList.map((inv) => (
                  <div key={inv.id} className="bg-[#09090d] border border-neutral-800 rounded p-4 flex space-x-4">
                    <img src={inv.heroImage} alt="" className="w-20 h-20 object-cover rounded border border-neutral-800 shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-red-400 font-bold">{inv.status}</span>
                        <span className="text-neutral-500">{inv.investigationDate}</span>
                      </div>
                      <h4 className="font-cinzel font-bold text-gray-200 mt-1">{inv.title}</h4>
                      <p className="text-neutral-400 line-clamp-2 mt-1">{inv.shortDescription}</p>

                      <div className="mt-3 flex space-x-2">
                        <button
                          onClick={() => {
                            setIsCreating(false);
                            setEditingItem({ ...inv });
                          }}
                          className="px-2 py-1 rounded bg-neutral-900 hover:bg-neutral-800 text-gray-300"
                        >
                          Edit
                        </button>
                        <button
                          onClick={async () => {
                            if (confirm(`Delete investigation ${inv.title}?`)) {
                              await api.deleteInvestigation(inv.id);
                              loadAllAdminData();
                              onRefreshData();
                            }
                          }}
                          className="px-2 py-1 rounded bg-neutral-900 hover:bg-red-950 text-red-400"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Edit Investigation Modal */}
              {editingItem && activeTab === 'investigations' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                  <div className="bg-[#09090d] border border-red-900 rounded-xl p-6 max-w-lg w-full font-mono-tech text-xs space-y-4 max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                      <h3 className="font-cinzel text-lg font-bold text-gray-100">
                        {isCreating ? 'NEW INVESTIGATION' : 'EDIT INVESTIGATION'}
                      </h3>
                      <button onClick={() => setEditingItem(null)} className="text-gray-400 hover:text-white">
                        <X size={18} />
                      </button>
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-1">Title</label>
                      <input
                        type="text"
                        value={editingItem.title}
                        onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                        className="w-full bg-black border border-neutral-800 rounded p-2 text-gray-200"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-gray-400 mb-1">Location</label>
                        <input
                          type="text"
                          value={editingItem.location}
                          onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                          className="w-full bg-black border border-neutral-800 rounded p-2 text-gray-200"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-1">Date</label>
                        <input
                          type="text"
                          value={editingItem.investigationDate}
                          onChange={(e) => setEditingItem({ ...editingItem, investigationDate: e.target.value })}
                          className="w-full bg-black border border-neutral-800 rounded p-2 text-gray-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-1">Status</label>
                      <select
                        value={editingItem.status}
                        onChange={(e) => setEditingItem({ ...editingItem, status: e.target.value as CaseStatus })}
                        className="w-full bg-black border border-neutral-800 rounded p-2 text-gray-200"
                      >
                        {['OPEN', 'UNDER_INVESTIGATION', 'DOCUMENTED', 'CLOSED', 'ARCHIVED'].map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-1">Hero Image URL / Upload</label>
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={editingItem.heroImage}
                          onChange={(e) => setEditingItem({ ...editingItem, heroImage: e.target.value })}
                          className="flex-1 bg-black border border-neutral-800 rounded p-2 text-gray-200"
                        />
                        <label className="cursor-pointer px-3 py-2 bg-neutral-900 rounded border border-neutral-700 text-gray-300 flex items-center space-x-1">
                          <Upload size={13} />
                          <span>Upload</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={async (e) => {
                              if (e.target.files?.[0]) {
                                const url = await handleUploadImage(e.target.files[0]);
                                setEditingItem({ ...editingItem, heroImage: url });
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-1">Short Description</label>
                      <textarea
                        rows={3}
                        value={editingItem.shortDescription}
                        onChange={(e) => setEditingItem({ ...editingItem, shortDescription: e.target.value })}
                        className="w-full bg-black border border-neutral-800 rounded p-2 text-gray-200 font-sans"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
                      <button onClick={() => setEditingItem(null)} className="px-4 py-2 rounded bg-neutral-900 text-gray-300">
                        Cancel
                      </button>
                      <button
                        onClick={async () => {
                          if (isCreating) {
                            await api.createInvestigation(editingItem);
                          } else {
                            await api.updateInvestigation(editingItem.id, editingItem);
                          }
                          setEditingItem(null);
                          loadAllAdminData();
                          onRefreshData();
                        }}
                        className="px-6 py-2 rounded bg-red-700 hover:bg-red-600 text-white font-bold"
                      >
                        Save Investigation
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 6. DOS VAULT CASES */}
          {activeTab === 'vault' && (
            <div className="space-y-6 font-mono-tech text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-cinzel text-2xl font-bold uppercase tracking-wider text-gray-100">
                    DOS VAULT ARCHIVE DOSSIERS
                  </h2>
                  <p className="text-gray-400 mt-1">
                    Manage classified documents, sensor telemetry findings, and evidence links.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setIsCreating(true);
                    setEditingItem({
                      caseId: `DOS-VLT-${String(vaultList.length + 1).padStart(3, '0')}`,
                      title: '',
                      location: '',
                      date: new Date().toISOString().split('T')[0],
                      status: 'DOCUMENTED',
                      summary: '',
                      conclusion: '',
                      clearanceLevel: 3,
                      evidenceItems: []
                    });
                  }}
                  className="px-4 py-2 rounded bg-red-700 hover:bg-red-600 text-white font-mono-tech text-xs font-bold uppercase flex items-center space-x-1.5"
                >
                  <Plus size={14} />
                  <span>ADD VAULT CASE</span>
                </button>
              </div>

              <div className="space-y-3">
                {vaultList.map((vc) => (
                  <div key={vc.id} className="bg-[#09090d] border border-neutral-800 rounded p-4 flex items-center justify-between">
                    <div>
                      <div className="flex items-center space-x-3">
                        <span className="text-red-500 font-bold">{vc.caseId}</span>
                        <span className="font-cinzel font-bold text-gray-200">{vc.title}</span>
                        <span className="text-neutral-500">• {vc.location}</span>
                        <span className="text-neutral-500">• {vc.status}</span>
                      </div>
                      <p className="text-neutral-400 line-clamp-1 mt-1 font-sans">{vc.summary}</p>
                    </div>

                    <div className="flex space-x-2 shrink-0">
                      <button
                        onClick={() => {
                          setIsCreating(false);
                          setEditingItem({ ...vc });
                        }}
                        className="px-2.5 py-1 rounded bg-neutral-900 text-gray-300 hover:text-white"
                      >
                        Edit
                      </button>
                      <button
                        onClick={async () => {
                          if (confirm(`Delete case ${vc.caseId}?`)) {
                            await api.deleteVaultCase(vc.id);
                            loadAllAdminData();
                            onRefreshData();
                          }
                        }}
                        className="px-2.5 py-1 rounded bg-neutral-900 text-red-400 hover:bg-red-950"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Edit Vault Case Modal */}
              {editingItem && activeTab === 'vault' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                  <div className="bg-[#09090d] border border-red-900 rounded-xl p-6 max-w-lg w-full font-mono-tech text-xs space-y-4 max-h-[90vh] overflow-y-auto">
                    <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                      <h3 className="font-cinzel text-lg font-bold text-gray-100">
                        {isCreating ? 'NEW VAULT DOSSIER' : 'EDIT VAULT DOSSIER'}
                      </h3>
                      <button onClick={() => setEditingItem(null)} className="text-gray-400 hover:text-white">
                        <X size={18} />
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-gray-400 mb-1">Case ID</label>
                        <input
                          type="text"
                          value={editingItem.caseId}
                          onChange={(e) => setEditingItem({ ...editingItem, caseId: e.target.value })}
                          className="w-full bg-black border border-neutral-800 rounded p-2 text-gray-200"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-1">Clearance Level (1-5)</label>
                        <input
                          type="number"
                          min="1"
                          max="5"
                          value={editingItem.clearanceLevel || 3}
                          onChange={(e) => setEditingItem({ ...editingItem, clearanceLevel: parseInt(e.target.value) || 3 })}
                          className="w-full bg-black border border-neutral-800 rounded p-2 text-gray-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-1">Case Title</label>
                      <input
                        type="text"
                        value={editingItem.title}
                        onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                        className="w-full bg-black border border-neutral-800 rounded p-2 text-gray-200"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-gray-400 mb-1">Location</label>
                        <input
                          type="text"
                          value={editingItem.location}
                          onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                          className="w-full bg-black border border-neutral-800 rounded p-2 text-gray-200"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-1">Date</label>
                        <input
                          type="text"
                          value={editingItem.date}
                          onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
                          className="w-full bg-black border border-neutral-800 rounded p-2 text-gray-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-1">Incident Summary</label>
                      <textarea
                        rows={3}
                        value={editingItem.summary}
                        onChange={(e) => setEditingItem({ ...editingItem, summary: e.target.value })}
                        className="w-full bg-black border border-neutral-800 rounded p-2 text-gray-200 font-sans"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-1">Conclusion & Technical Finding</label>
                      <textarea
                        rows={3}
                        value={editingItem.conclusion}
                        onChange={(e) => setEditingItem({ ...editingItem, conclusion: e.target.value })}
                        className="w-full bg-black border border-neutral-800 rounded p-2 text-gray-200 font-sans"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
                      <button onClick={() => setEditingItem(null)} className="px-4 py-2 rounded bg-neutral-900 text-gray-300">
                        Cancel
                      </button>
                      <button
                        onClick={async () => {
                          if (isCreating) {
                            await api.createVaultCase(editingItem);
                          } else {
                            await api.updateVaultCase(editingItem.id, editingItem);
                          }
                          setEditingItem(null);
                          loadAllAdminData();
                          onRefreshData();
                        }}
                        className="px-6 py-2 rounded bg-red-700 hover:bg-red-600 text-white font-bold"
                      >
                        Save Dossier
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 7. GALLERY MANAGEMENT */}
          {activeTab === 'gallery' && (
            <div className="space-y-6 font-mono-tech text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-cinzel text-2xl font-bold uppercase tracking-wider text-gray-100">
                    EVIDENCE GALLERY ARCHIVE
                  </h2>
                  <p className="text-gray-400 mt-1">
                    Upload new field photographs, assign classifications, locations, and captions.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setIsCreating(true);
                    setEditingItem({
                      title: '',
                      category: 'Investigations',
                      imageUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
                      location: '',
                      date: new Date().toISOString().split('T')[0],
                      caption: ''
                    });
                  }}
                  className="px-4 py-2 rounded bg-red-700 hover:bg-red-600 text-white font-mono-tech text-xs font-bold uppercase flex items-center space-x-1.5"
                >
                  <Plus size={14} />
                  <span>UPLOAD IMAGE</span>
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {galleryList.map((img) => (
                  <div key={img.id} className="group relative bg-[#09090d] border border-neutral-800 rounded overflow-hidden">
                    <img src={img.imageUrl} alt="" className="w-full aspect-[4/3] object-cover" />
                    <div className="p-2.5">
                      <div className="text-[10px] text-red-400 font-bold uppercase">{img.category}</div>
                      <h5 className="font-cinzel font-bold text-gray-200 truncate mt-0.5">{img.title}</h5>
                      
                      <div className="flex justify-between items-center mt-2 pt-2 border-t border-neutral-900">
                        <button
                          onClick={async () => {
                            if (confirm(`Delete image ${img.title}?`)) {
                              await api.deleteGalleryImage(img.id);
                              loadAllAdminData();
                              onRefreshData();
                            }
                          }}
                          className="text-red-400 hover:text-red-300 text-[10px]"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Upload Image Modal */}
              {editingItem && activeTab === 'gallery' && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
                  <div className="bg-[#09090d] border border-red-900 rounded-xl p-6 max-w-md w-full font-mono-tech text-xs space-y-4">
                    <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                      <h3 className="font-cinzel text-lg font-bold text-gray-100">
                        UPLOAD GALLERY IMAGE
                      </h3>
                      <button onClick={() => setEditingItem(null)} className="text-gray-400 hover:text-white">
                        <X size={18} />
                      </button>
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-1">Image Title</label>
                      <input
                        type="text"
                        value={editingItem.title}
                        onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                        className="w-full bg-black border border-neutral-800 rounded p-2 text-gray-200"
                      />
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-1">Category</label>
                      <select
                        value={editingItem.category}
                        onChange={(e) => setEditingItem({ ...editingItem, category: e.target.value })}
                        className="w-full bg-black border border-neutral-800 rounded p-2 text-gray-200"
                      >
                        {['Investigations', 'Haunted Locations', 'Equipment', 'Evidence', 'Team', 'Events', 'Media', 'Behind The Scenes'].map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-1">Image File / URL</label>
                      <div className="flex space-x-2">
                        <input
                          type="text"
                          value={editingItem.imageUrl}
                          onChange={(e) => setEditingItem({ ...editingItem, imageUrl: e.target.value })}
                          className="flex-1 bg-black border border-neutral-800 rounded p-2 text-gray-200"
                        />
                        <label className="cursor-pointer px-3 py-2 bg-neutral-900 rounded border border-neutral-700 text-gray-300 flex items-center space-x-1">
                          <Upload size={13} />
                          <span>Browse</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={async (e) => {
                              if (e.target.files?.[0]) {
                                const url = await handleUploadImage(e.target.files[0]);
                                setEditingItem({ ...editingItem, imageUrl: url });
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-gray-400 mb-1">Location</label>
                        <input
                          type="text"
                          value={editingItem.location}
                          onChange={(e) => setEditingItem({ ...editingItem, location: e.target.value })}
                          className="w-full bg-black border border-neutral-800 rounded p-2 text-gray-200"
                        />
                      </div>
                      <div>
                        <label className="block text-gray-400 mb-1">Date</label>
                        <input
                          type="text"
                          value={editingItem.date}
                          onChange={(e) => setEditingItem({ ...editingItem, date: e.target.value })}
                          className="w-full bg-black border border-neutral-800 rounded p-2 text-gray-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-gray-400 mb-1">Caption / Field Notes</label>
                      <textarea
                        rows={3}
                        value={editingItem.caption}
                        onChange={(e) => setEditingItem({ ...editingItem, caption: e.target.value })}
                        className="w-full bg-black border border-neutral-800 rounded p-2 text-gray-200 font-sans"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-neutral-800">
                      <button onClick={() => setEditingItem(null)} className="px-4 py-2 rounded bg-neutral-900 text-gray-300">
                        Cancel
                      </button>
                      <button
                        onClick={async () => {
                          await api.createGalleryImage(editingItem);
                          setEditingItem(null);
                          loadAllAdminData();
                          onRefreshData();
                        }}
                        className="px-6 py-2 rounded bg-red-700 hover:bg-red-600 text-white font-bold"
                      >
                        Save Image
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 9. IMAGE UPLOADS & MEDIA ASSETS */}
          {activeTab === 'uploads' && (
            <div className="space-y-8 font-mono-tech text-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="font-cinzel text-2xl font-bold uppercase tracking-wider text-gray-100 flex items-center space-x-2">
                    <span>IMAGE UPLOAD & EVIDENCE MEDIA VAULT</span>
                  </h2>
                  <p className="text-gray-400 mt-1">
                    Upload and host investigation evidence, team portraits, equipment photos, and field anomalies (.jfif, .jpg, .png, .webp).
                  </p>
                </div>

                <div className="flex items-center space-x-3">
                  <label className="cursor-pointer px-4 py-2.5 rounded bg-red-700 hover:bg-red-600 text-white font-cinzel text-xs font-bold tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(220,38,38,0.4)] flex items-center space-x-2 border border-red-500">
                    <Upload size={15} />
                    <span>{isUploading ? 'UPLOADING...' : 'UPLOAD NEW IMAGES'}</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*,.jfif"
                      disabled={isUploading}
                      className="hidden"
                      onChange={async (e) => {
                        if (e.target.files && e.target.files.length > 0) {
                          setIsUploading(true);
                          try {
                            const files = Array.from(e.target.files);
                            for (const file of files) {
                              await api.uploadFile(file);
                            }
                            const refreshed = await api.getUploadedFiles();
                            setUploadedFilesList(refreshed);
                            setStatusMessage(`Successfully uploaded ${files.length} file(s)`);
                            setTimeout(() => setStatusMessage(null), 4000);
                          } catch (err) {
                            alert('Failed to upload file');
                          } finally {
                            setIsUploading(false);
                          }
                        }
                      }}
                    />
                  </label>
                </div>
              </div>

              {/* Drag and Drop Zone */}
              <div 
                onDragOver={(e) => { e.preventDefault(); e.stopPropagation(); }}
                onDrop={async (e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                    setIsUploading(true);
                    try {
                      const files = Array.from(e.dataTransfer.files);
                      for (const file of files) {
                        await api.uploadFile(file);
                      }
                      const refreshed = await api.getUploadedFiles();
                      setUploadedFilesList(refreshed);
                      setStatusMessage(`Successfully uploaded ${files.length} file(s) via drag-and-drop`);
                      setTimeout(() => setStatusMessage(null), 4000);
                    } catch (err) {
                      alert('Failed to upload file');
                    } finally {
                      setIsUploading(false);
                    }
                  }
                }}
                className="border-2 border-dashed border-red-900/60 hover:border-red-500 bg-[#08080c] rounded-xl p-8 text-center transition-all group"
              >
                <div className="max-w-md mx-auto space-y-3">
                  <div className="w-14 h-14 mx-auto rounded-full bg-red-950/40 border border-red-800/80 flex items-center justify-center text-red-400 group-hover:scale-110 transition-transform">
                    <Upload size={24} />
                  </div>
                  <div className="text-gray-200 font-cinzel text-sm font-bold tracking-wider uppercase">
                    DRAG & DROP PHOTOGRAPHS HERE
                  </div>
                  <p className="text-gray-500 text-[11px]">
                    Supports JFIF, JPG, PNG, WEBP, and GIF formats up to 25MB each.
                  </p>
                  <div>
                    <label className="inline-flex items-center space-x-2 px-3.5 py-2 rounded bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-gray-300 text-xs cursor-pointer">
                      <ImageIcon size={14} className="text-red-400" />
                      <span>Browse From Computer</span>
                      <input
                        type="file"
                        multiple
                        accept="image/*,.jfif"
                        disabled={isUploading}
                        className="hidden"
                        onChange={async (e) => {
                          if (e.target.files && e.target.files.length > 0) {
                            setIsUploading(true);
                            try {
                              const files = Array.from(e.target.files);
                              for (const file of files) {
                                await api.uploadFile(file);
                              }
                              const refreshed = await api.getUploadedFiles();
                              setUploadedFilesList(refreshed);
                              setStatusMessage(`Successfully uploaded ${files.length} file(s)`);
                              setTimeout(() => setStatusMessage(null), 4000);
                            } catch (err) {
                              alert('Failed to upload file');
                            } finally {
                              setIsUploading(false);
                            }
                          }
                        }}
                      />
                    </label>
                  </div>
                </div>
              </div>

              {/* Media Repository Grid */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-mono-tech text-xs tracking-widest text-red-400 uppercase font-bold">
                    HOSTED IMAGES ({uploadedFilesList.length} FILES IN SERVER VAULT)
                  </h3>
                  {copiedUrl && (
                    <span className="text-emerald-400 text-xs font-mono flex items-center space-x-1">
                      <CheckCircle2 size={13} />
                      <span>URL copied to clipboard!</span>
                    </span>
                  )}
                </div>

                {uploadedFilesList.length === 0 ? (
                  <div className="text-center py-12 bg-[#09090d] border border-neutral-800 rounded-lg text-neutral-500">
                    No files uploaded yet. Drag and drop photos above to begin hosting evidence.
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {uploadedFilesList.map((file, idx) => (
                      <div key={idx} className="group bg-[#09090d] border border-neutral-800 hover:border-red-600/70 rounded-lg overflow-hidden transition-all flex flex-col">
                        <div className="relative aspect-video bg-black overflow-hidden flex items-center justify-center">
                          <img
                            src={file.url}
                            alt={file.filename}
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2">
                            <a
                              href={file.url}
                              target="_blank"
                              rel="noreferrer"
                              className="p-2 rounded bg-neutral-900/90 text-white hover:text-red-400 transition-colors"
                              title="Open Full Image"
                            >
                              <ExternalLink size={14} />
                            </a>
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(file.url);
                                setCopiedUrl(file.url);
                                setTimeout(() => setCopiedUrl(null), 2500);
                              }}
                              className="p-2 rounded bg-neutral-900/90 text-white hover:text-red-400 transition-colors"
                              title="Copy Image URL"
                            >
                              <Copy size={14} />
                            </button>
                          </div>
                        </div>

                        <div className="p-3 flex-1 flex flex-col justify-between space-y-2">
                          <div className="truncate text-gray-200 text-xs font-semibold" title={file.filename}>
                            {file.filename}
                          </div>
                          <div className="flex items-center justify-between text-[10px] text-neutral-500">
                            <span>{(file.size / 1024).toFixed(1)} KB</span>
                            <span>{new Date(file.mtime).toLocaleDateString()}</span>
                          </div>
                          <div className="pt-2 border-t border-neutral-900 flex items-center space-x-2">
                            <button
                              onClick={() => {
                                navigator.clipboard.writeText(file.url);
                                setCopiedUrl(file.url);
                                setTimeout(() => setCopiedUrl(null), 2500);
                              }}
                              className="flex-1 py-1.5 rounded bg-neutral-900 hover:bg-neutral-800 text-gray-300 text-[10px] uppercase tracking-wider flex items-center justify-center space-x-1 border border-neutral-800"
                            >
                              <Copy size={11} />
                              <span>Copy URL</span>
                            </button>
                            <button
                              onClick={async () => {
                                try {
                                  const newImg: GalleryImage = {
                                    id: `gal-${Date.now()}`,
                                    title: file.filename.replace(/\.[^/.]+$/, "").replace(/[-_]/g, ' '),
                                    category: 'Evidence',
                                    imageUrl: file.url,
                                    location: 'Field Reconnaissance',
                                    date: new Date().toISOString().split('T')[0],
                                    caption: `Archival evidence image hosted in DOS investigation server: ${file.filename}`
                                  };
                                  await api.createGalleryImage(newImg);
                                  loadAllAdminData();
                                  onRefreshData();
                                  setStatusMessage(`Added "${newImg.title}" directly to Evidence Gallery!`);
                                  setTimeout(() => setStatusMessage(null), 4000);
                                } catch (err) {
                                  alert('Failed to add to gallery');
                                }
                              }}
                              title="Add directly to Evidence Gallery"
                              className="py-1.5 px-2.5 rounded bg-red-950/60 hover:bg-red-900/80 text-red-300 text-[10px] uppercase tracking-wider border border-red-800 flex items-center space-x-1"
                            >
                              <Sparkles size={11} />
                              <span>+ Gallery</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 8. CONTACT MESSAGES */}
          {activeTab === 'messages' && (
            <div className="space-y-6 font-mono-tech text-xs">
              <div>
                <h2 className="font-cinzel text-2xl font-bold uppercase tracking-wider text-gray-100">
                  INCOMING CONTACT INQUIRIES
                </h2>
                <p className="text-gray-400 mt-1">
                  General inquiries, press contacts, and collaboration requests.
                </p>
              </div>

              <div className="space-y-3">
                {messagesList.map((msg) => (
                  <div key={msg.id} className="bg-[#09090d] border border-neutral-800 rounded p-4 space-y-2">
                    <div className="flex items-center justify-between border-b border-neutral-900 pb-2">
                      <div className="flex items-center space-x-3">
                        <span className="font-bold text-gray-200">{msg.name}</span>
                        <span className="text-neutral-500">({msg.email} {msg.phone ? `/ ${msg.phone}` : ''})</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] ${msg.status === 'unread' ? 'bg-red-950 text-red-300 border border-red-800' : 'bg-neutral-900 text-neutral-400'}`}>
                          {msg.status.toUpperCase()}
                        </span>
                      </div>
                      <span className="text-neutral-500 text-[10px]">{msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : ''}</span>
                    </div>

                    <div className="text-red-400 font-bold">{msg.subject}</div>
                    <div className="text-gray-300 font-sans">{msg.message}</div>

                    <div className="pt-2 flex justify-end">
                      {msg.status === 'unread' && (
                        <button
                          onClick={async () => {
                            await api.updateContactMessage(msg.id, { status: 'read' });
                            loadAllAdminData();
                          }}
                          className="px-3 py-1 rounded bg-neutral-900 text-gray-300 hover:text-white"
                        >
                          Mark as Read
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 9. EQUIPMENT MANAGEMENT */}
          {activeTab === 'equipment' && (
            <div className="space-y-6 font-mono-tech text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-cinzel text-2xl font-bold uppercase tracking-wider text-gray-100">
                    EQUIPMENT ARSENAL
                  </h2>
                  <p className="text-gray-400 mt-1">
                    Manage hardware, technical specifications, and calibration status.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setIsCreating(true);
                    setEditingItem({
                      name: '',
                      category: 'Detection',
                      description: '',
                      specifications: { 'Operational Range': '0 - 50 mG', 'Sampling Rate': '1 kHz' },
                      methodology: '',
                      imageUrl: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=800&auto=format&fit=crop',
                      status: 'Active'
                    });
                  }}
                  className="px-4 py-2 rounded bg-red-700 hover:bg-red-600 text-white font-mono-tech text-xs font-bold uppercase flex items-center space-x-1.5"
                >
                  <Plus size={14} />
                  <span>ADD EQUIPMENT</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {equipmentList.map((eq) => (
                  <div key={eq.id} className="bg-[#09090d] border border-neutral-800 rounded p-4 flex space-x-4">
                    <img src={eq.imageUrl} alt="" className="w-20 h-20 object-cover rounded border border-neutral-800 shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-red-400 font-bold">{eq.category}</span>
                        <span className="text-emerald-400">{eq.status}</span>
                      </div>
                      <h4 className="font-cinzel font-bold text-gray-200 mt-1">{eq.name}</h4>
                      <p className="text-neutral-400 line-clamp-2 mt-1">{eq.description}</p>
                      
                      <div className="mt-3 flex space-x-2">
                        <button
                          onClick={async () => {
                            if (confirm(`Delete equipment ${eq.name}?`)) {
                              await api.deleteEquipment(eq.id);
                              loadAllAdminData();
                              onRefreshData();
                            }
                          }}
                          className="px-2 py-1 rounded bg-neutral-900 hover:bg-red-950 text-red-400"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 10. MEDIA COVERAGE */}
          {activeTab === 'media' && (
            <div className="space-y-6 font-mono-tech text-xs">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-cinzel text-2xl font-bold uppercase tracking-wider text-gray-100">
                    MEDIA & PRESS COVERAGE
                  </h2>
                  <p className="text-gray-400 mt-1">
                    Manage documentary episodes, news features, and podcast links.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setIsCreating(true);
                    setEditingItem({
                      title: '',
                      category: 'Television',
                      publisher: '',
                      date: new Date().toISOString().split('T')[0],
                      summary: '',
                      thumbnailUrl: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=800&auto=format&fit=crop',
                      videoUrl: ''
                    });
                  }}
                  className="px-4 py-2 rounded bg-red-700 hover:bg-red-600 text-white font-mono-tech text-xs font-bold uppercase flex items-center space-x-1.5"
                >
                  <Plus size={14} />
                  <span>ADD MEDIA FEATURE</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mediaList.map((m) => (
                  <div key={m.id} className="bg-[#09090d] border border-neutral-800 rounded p-4 flex space-x-4">
                    <img src={m.thumbnailUrl} alt="" className="w-20 h-20 object-cover rounded border border-neutral-800 shrink-0" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-red-400 font-bold">{m.publisher}</span>
                        <span className="text-neutral-500">{m.date}</span>
                      </div>
                      <h4 className="font-cinzel font-bold text-gray-200 mt-1">{m.title}</h4>
                      <p className="text-neutral-400 line-clamp-2 mt-1">{m.summary}</p>
                      
                      <div className="mt-3 flex space-x-2">
                        <button
                          onClick={async () => {
                            if (confirm(`Delete media item ${m.title}?`)) {
                              await api.deleteMedia(m.id);
                              loadAllAdminData();
                              onRefreshData();
                            }
                          }}
                          className="px-2 py-1 rounded bg-neutral-900 hover:bg-red-950 text-red-400"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>

    </div>
  );
};
