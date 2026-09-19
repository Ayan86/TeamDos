import fs from 'fs';
import path from 'path';
import { 
  TeamMember, 
  SiteSettings, 
  Investigation, 
  GalleryImage, 
  MediaItem, 
  VaultCase, 
  EquipmentItem, 
  ActivityReport, 
  ContactMessage,
  DashboardStats,
  ResearchItem
} from '../types';
import { 
  initialSiteSettings, 
  initialTeamMembers, 
  initialInvestigations, 
  initialVaultCases, 
  initialEquipment, 
  initialMediaCoverage, 
  initialGalleryImages, 
  initialActivityReports, 
  initialContactMessages,
  initialResearchItems
} from '../db/initialData';

interface DatabaseData {
  settings: SiteSettings;
  team: TeamMember[];
  investigations: Investigation[];
  vault: VaultCase[];
  equipment: EquipmentItem[];
  media: MediaItem[];
  gallery: GalleryImage[];
  research: ResearchItem[];
  reports: ActivityReport[];
  messages: ContactMessage[];
  reportCounter: number;
}

const DB_FILE = path.join(process.cwd(), 'database.json');

class StorageManager {
  private data: DatabaseData;

  constructor() {
    this.data = this.loadData();
  }

  private loadData(): DatabaseData {
    try {
      if (fs.existsSync(DB_FILE)) {
        const raw = fs.readFileSync(DB_FILE, 'utf-8');
        const parsed = JSON.parse(raw);
        if (!parsed.research || !Array.isArray(parsed.research)) {
          parsed.research = initialResearchItems;
        }
        return parsed;
      }
    } catch (e) {
      console.error('Error loading database.json, falling back to defaults', e);
    }

    const defaultData: DatabaseData = {
      settings: initialSiteSettings,
      team: initialTeamMembers,
      investigations: initialInvestigations,
      vault: initialVaultCases,
      equipment: initialEquipment,
      media: initialMediaCoverage,
      gallery: initialGalleryImages,
      research: initialResearchItems,
      reports: initialActivityReports,
      messages: initialContactMessages,
      reportCounter: 2
    };

    this.saveData(defaultData);
    return defaultData;
  }

  private saveData(dataToSave?: DatabaseData) {
    try {
      const payload = dataToSave || this.data;
      fs.writeFileSync(DB_FILE, JSON.stringify(payload, null, 2), 'utf-8');
    } catch (e) {
      console.error('Failed to save to database.json', e);
    }
  }

  // --- Settings ---
  getSettings(): SiteSettings {
    return this.data.settings;
  }

  updateSettings(updates: Partial<SiteSettings>): SiteSettings {
    this.data.settings = { ...this.data.settings, ...updates };
    this.saveData();
    return this.data.settings;
  }

  // --- Team ---
  getTeam(): TeamMember[] {
    return [...this.data.team].sort((a, b) => a.displayOrder - b.displayOrder);
  }

  createTeamMember(member: Omit<TeamMember, 'id' | 'createdAt' | 'updatedAt'>): TeamMember {
    const newMember: TeamMember = {
      ...member,
      id: `tm-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.data.team.push(newMember);
    this.saveData();
    return newMember;
  }

  updateTeamMember(id: string, updates: Partial<TeamMember>): TeamMember | null {
    const index = this.data.team.findIndex(t => t.id === id);
    if (index === -1) return null;
    this.data.team[index] = {
      ...this.data.team[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.saveData();
    return this.data.team[index];
  }

  deleteTeamMember(id: string): boolean {
    const before = this.data.team.length;
    this.data.team = this.data.team.filter(t => t.id !== id);
    if (this.data.team.length !== before) {
      this.saveData();
      return true;
    }
    return false;
  }

  // --- Investigations ---
  getInvestigations(): Investigation[] {
    return this.data.investigations;
  }

  createInvestigation(item: Omit<Investigation, 'id' | 'createdAt' | 'updatedAt'>): Investigation {
    const newInv: Investigation = {
      ...item,
      id: `inv-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.data.investigations.unshift(newInv);
    this.saveData();
    return newInv;
  }

  updateInvestigation(id: string, updates: Partial<Investigation>): Investigation | null {
    const index = this.data.investigations.findIndex(i => i.id === id);
    if (index === -1) return null;
    this.data.investigations[index] = {
      ...this.data.investigations[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.saveData();
    return this.data.investigations[index];
  }

  deleteInvestigation(id: string): boolean {
    const before = this.data.investigations.length;
    this.data.investigations = this.data.investigations.filter(i => i.id !== id);
    if (this.data.investigations.length !== before) {
      this.saveData();
      return true;
    }
    return false;
  }

  // --- Vault ---
  getVaultCases(): VaultCase[] {
    return this.data.vault;
  }

  getVaultCase(id: string): VaultCase | undefined {
    return this.data.vault.find(v => v.id === id || v.caseId === id);
  }

  createVaultCase(item: Omit<VaultCase, 'id' | 'createdAt' | 'updatedAt'>): VaultCase {
    const newCase: VaultCase = {
      ...item,
      id: `vlt-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    this.data.vault.unshift(newCase);
    this.saveData();
    return newCase;
  }

  updateVaultCase(id: string, updates: Partial<VaultCase>): VaultCase | null {
    const index = this.data.vault.findIndex(v => v.id === id);
    if (index === -1) return null;
    this.data.vault[index] = {
      ...this.data.vault[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.saveData();
    return this.data.vault[index];
  }

  deleteVaultCase(id: string): boolean {
    const before = this.data.vault.length;
    this.data.vault = this.data.vault.filter(v => v.id !== id);
    if (this.data.vault.length !== before) {
      this.saveData();
      return true;
    }
    return false;
  }

  // --- Equipment ---
  getEquipment(): EquipmentItem[] {
    return this.data.equipment;
  }

  createEquipment(item: Omit<EquipmentItem, 'id' | 'createdAt'>): EquipmentItem {
    const newEq: EquipmentItem = {
      ...item,
      id: `eq-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    this.data.equipment.push(newEq);
    this.saveData();
    return newEq;
  }

  updateEquipment(id: string, updates: Partial<EquipmentItem>): EquipmentItem | null {
    const index = this.data.equipment.findIndex(e => e.id === id);
    if (index === -1) return null;
    this.data.equipment[index] = {
      ...this.data.equipment[index],
      ...updates
    };
    this.saveData();
    return this.data.equipment[index];
  }

  deleteEquipment(id: string): boolean {
    const before = this.data.equipment.length;
    this.data.equipment = this.data.equipment.filter(e => e.id !== id);
    if (this.data.equipment.length !== before) {
      this.saveData();
      return true;
    }
    return false;
  }

  // --- Media ---
  getMedia(): MediaItem[] {
    return this.data.media;
  }

  createMedia(item: Omit<MediaItem, 'id' | 'createdAt'>): MediaItem {
    const newMedia: MediaItem = {
      ...item,
      id: `med-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    this.data.media.unshift(newMedia);
    this.saveData();
    return newMedia;
  }

  updateMedia(id: string, updates: Partial<MediaItem>): MediaItem | null {
    const index = this.data.media.findIndex(m => m.id === id);
    if (index === -1) return null;
    this.data.media[index] = {
      ...this.data.media[index],
      ...updates
    };
    this.saveData();
    return this.data.media[index];
  }

  deleteMedia(id: string): boolean {
    const before = this.data.media.length;
    this.data.media = this.data.media.filter(m => m.id !== id);
    if (this.data.media.length !== before) {
      this.saveData();
      return true;
    }
    return false;
  }

  // --- Gallery ---
  getGallery(): GalleryImage[] {
    return this.data.gallery;
  }

  createGalleryImage(item: Omit<GalleryImage, 'id' | 'createdAt'>): GalleryImage {
    const newImg: GalleryImage = {
      ...item,
      id: `gal-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    this.data.gallery.unshift(newImg);
    this.saveData();
    return newImg;
  }

  updateGalleryImage(id: string, updates: Partial<GalleryImage>): GalleryImage | null {
    const index = this.data.gallery.findIndex(g => g.id === id);
    if (index === -1) return null;
    this.data.gallery[index] = {
      ...this.data.gallery[index],
      ...updates
    };
    this.saveData();
    return this.data.gallery[index];
  }

  deleteGalleryImage(id: string): boolean {
    const before = this.data.gallery.length;
    this.data.gallery = this.data.gallery.filter(g => g.id !== id);
    if (this.data.gallery.length !== before) {
      this.saveData();
      return true;
    }
    return false;
  }

  // --- Activity Reports ---
  getReports(): ActivityReport[] {
    return this.data.reports;
  }

  createReport(report: Omit<ActivityReport, 'id' | 'caseId' | 'status' | 'internalNotes' | 'createdAt' | 'updatedAt'>): ActivityReport {
    this.data.reportCounter += 1;
    const padCounter = String(this.data.reportCounter).padStart(6, '0');
    const caseId = `DOS-2026-${padCounter}`;

    const newReport: ActivityReport = {
      ...report,
      id: `rep-${Date.now()}`,
      caseId,
      status: 'New',
      internalNotes: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    this.data.reports.unshift(newReport);
    this.saveData();
    return newReport;
  }

  updateReport(id: string, updates: Partial<ActivityReport>): ActivityReport | null {
    const index = this.data.reports.findIndex(r => r.id === id);
    if (index === -1) return null;
    this.data.reports[index] = {
      ...this.data.reports[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.saveData();
    return this.data.reports[index];
  }

  deleteReport(id: string): boolean {
    const before = this.data.reports.length;
    this.data.reports = this.data.reports.filter(r => r.id !== id);
    if (this.data.reports.length !== before) {
      this.saveData();
      return true;
    }
    return false;
  }

  // --- Contact Messages ---
  getMessages(): ContactMessage[] {
    return this.data.messages;
  }

  createMessage(msg: Omit<ContactMessage, 'id' | 'status' | 'createdAt'>): ContactMessage {
    const newMsg: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      status: 'unread',
      createdAt: new Date().toISOString()
    };
    this.data.messages.unshift(newMsg);
    this.saveData();
    return newMsg;
  }

  updateMessage(id: string, updates: Partial<ContactMessage>): ContactMessage | null {
    const index = this.data.messages.findIndex(m => m.id === id);
    if (index === -1) return null;
    this.data.messages[index] = {
      ...this.data.messages[index],
      ...updates
    };
    this.saveData();
    return this.data.messages[index];
  }

  deleteMessage(id: string): boolean {
    const before = this.data.messages.length;
    this.data.messages = this.data.messages.filter(m => m.id !== id);
    if (this.data.messages.length !== before) {
      this.saveData();
      return true;
    }
    return false;
  }

  // --- Research Papers & Studies ---
  getResearch(): ResearchItem[] {
    return this.data.research || [];
  }

  getResearchById(id: string): ResearchItem | undefined {
    return (this.data.research || []).find(r => r.id === id);
  }

  createResearch(item: Omit<ResearchItem, 'id' | 'createdAt' | 'updatedAt'>): ResearchItem {
    const newItem: ResearchItem = {
      ...item,
      id: `res-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    if (!this.data.research) this.data.research = [];
    this.data.research.unshift(newItem);
    this.saveData();
    return newItem;
  }

  updateResearch(id: string, updates: Partial<ResearchItem>): ResearchItem | null {
    if (!this.data.research) this.data.research = [];
    const index = this.data.research.findIndex(r => r.id === id);
    if (index === -1) return null;
    this.data.research[index] = {
      ...this.data.research[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    this.saveData();
    return this.data.research[index];
  }

  deleteResearch(id: string): boolean {
    if (!this.data.research) return false;
    const before = this.data.research.length;
    this.data.research = this.data.research.filter(r => r.id !== id);
    if (this.data.research.length !== before) {
      this.saveData();
      return true;
    }
    return false;
  }

  // --- Dashboard Stats ---
  getStats(): DashboardStats {
    return {
      totalInvestigations: this.data.investigations.length,
      researchCount: (this.data.research || []).length,
      galleryImages: this.data.gallery.length,
      mediaCoverage: this.data.media.length,
      vaultCases: this.data.vault.length,
      equipmentCount: this.data.equipment.length,
      teamMembers: this.data.team.filter(t => t.isActive).length,
      activityReports: this.data.reports.length,
      contactMessages: this.data.messages.length,
      pendingReports: this.data.reports.filter(r => r.status === 'New' || r.status === 'Reviewing').length
    };
  }
}

export const storage = new StorageManager();
