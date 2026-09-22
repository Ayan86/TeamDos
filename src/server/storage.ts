import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { initialData } from '../db/initialData';
import {
  DatabaseSchema,
  SiteSettings,
  TeamMember,
  Investigation,
  VaultCase,
  Equipment,
  MediaItem,
  GalleryItem,
  ResearchPaper,
  ActivityReport,
  ContactMessage,
  DashboardStats
} from '../types';

const currentDir = typeof __dirname !== 'undefined' 
  ? __dirname 
  : path.dirname(fileURLToPath(import.meta.url));

export class StorageManager {
  private dbPath: string;
  private data: DatabaseSchema;
  private lastMtime: number = 0;

  constructor() {
    this.dbPath = this.resolveDbPath();
    this.data = this.loadData();
    try {
      if (fs.existsSync(this.dbPath)) {
        this.lastMtime = fs.statSync(this.dbPath).mtimeMs;
      }
    } catch (e) {}
  }

  public checkReload(): void {
    try {
      if (fs.existsSync(this.dbPath)) {
        const stat = fs.statSync(this.dbPath);
        if (stat.mtimeMs > this.lastMtime) {
          const fresh = this.loadData();
          this.data = fresh;
          this.lastMtime = stat.mtimeMs;
        }
      }
    } catch (e) {}
  }

  public getDbPath(): string {
    return this.dbPath;
  }

  private resolveDbPath(): string {
    const candidates = [
      path.join(process.cwd(), 'database.json'),
      path.resolve(currentDir, '../../database.json'),
      path.resolve(currentDir, '../database.json'),
      path.resolve(currentDir, 'database.json'),
      '/app/applet/database.json'
    ];
    for (const p of candidates) {
      if (fs.existsSync(p)) {
        return p;
      }
    }
    return path.join(process.cwd(), 'database.json');
  }

  private loadData(): DatabaseSchema {
    try {
      if (fs.existsSync(this.dbPath)) {
        const raw = fs.readFileSync(this.dbPath, 'utf8');
        if (raw && raw.trim().length > 0) {
          const parsed = JSON.parse(raw);
          return {
            settings: parsed.settings || initialData.settings,
            team: Array.isArray(parsed.team) ? parsed.team : initialData.team,
            investigations: Array.isArray(parsed.investigations) ? parsed.investigations : initialData.investigations,
            vault: Array.isArray(parsed.vault) ? parsed.vault : initialData.vault,
            equipment: Array.isArray(parsed.equipment) ? parsed.equipment : initialData.equipment,
            media: Array.isArray(parsed.media) ? parsed.media : initialData.media,
            gallery: Array.isArray(parsed.gallery) ? parsed.gallery : initialData.gallery,
            research: Array.isArray(parsed.research) ? parsed.research : initialData.research,
            reports: Array.isArray(parsed.reports) ? parsed.reports : initialData.reports,
            messages: Array.isArray(parsed.messages) ? parsed.messages : initialData.messages,
            reportCounter: typeof parsed.reportCounter === 'number' ? parsed.reportCounter : (initialData.reportCounter || 0)
          };
        }
      }
    } catch (err) {
      console.warn('[StorageManager] Failed to read database.json, attempting backup restoration or initializing from seed defaults:', err);
      try {
        const backupPath = `${this.dbPath}.bak`;
        if (fs.existsSync(backupPath)) {
          const backupRaw = fs.readFileSync(backupPath, 'utf8');
          const parsedBackup = JSON.parse(backupRaw);
          console.info('[StorageManager] Successfully recovered data from database.json.bak');
          return parsedBackup;
        }
      } catch (backupErr) {
        console.warn('[StorageManager] Backup recovery also failed:', backupErr);
      }
    }

    // Default: write initialData to file
    this.saveData(initialData);
    return JSON.parse(JSON.stringify(initialData));
  }

  private saveData(dataToSave: DatabaseSchema = this.data): void {
    try {
      const jsonContent = JSON.stringify(dataToSave, null, 2);
      const tmpPath = `${this.dbPath}.tmp`;
      
      // Write to temp file first to prevent corruption during crash or concurrent access
      fs.writeFileSync(tmpPath, jsonContent, 'utf8');
      
      // Keep a valid backup of current database before renaming
      if (fs.existsSync(this.dbPath)) {
        try {
          fs.copyFileSync(this.dbPath, `${this.dbPath}.bak`);
        } catch (copyErr) {
          // Non-critical if backup copy fails
        }
      }

      // Atomic rename
      fs.renameSync(tmpPath, this.dbPath);
      if (fs.existsSync(this.dbPath)) {
        this.lastMtime = fs.statSync(this.dbPath).mtimeMs;
      }
    } catch (err) {
      console.error('[StorageManager] Error persisting to database.json:', err);
      // Direct write fallback
      try {
        fs.writeFileSync(this.dbPath, JSON.stringify(dataToSave, null, 2), 'utf8');
        if (fs.existsSync(this.dbPath)) {
          this.lastMtime = fs.statSync(this.dbPath).mtimeMs;
        }
      } catch (directErr) {
        console.error('[StorageManager] Critical fallback write failed:', directErr);
      }
    }
  }

  // ------------------------------------------------------------------------
  // SETTINGS
  // ------------------------------------------------------------------------
  public getSettings(): SiteSettings {
    this.checkReload();
    return this.data.settings;
  }

  public updateSettings(data: Partial<SiteSettings>): SiteSettings {
    this.checkReload();
    this.data.settings = {
      ...this.data.settings,
      ...data,
      socialLinks: {
        ...this.data.settings.socialLinks,
        ...(data.socialLinks || {})
      }
    };
    this.saveData();
    return this.data.settings;
  }

  // ------------------------------------------------------------------------
  // TEAM
  // ------------------------------------------------------------------------
  public getTeam(): TeamMember[] {
    this.checkReload();
    return [...this.data.team].sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
  }

  public createTeamMember(data: Partial<TeamMember>): TeamMember {
    const now = new Date().toISOString();
    const newMember: TeamMember = {
      id: data.id || `tm-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name: data.name || 'Investigator',
      role: data.role || 'Field Researcher',
      photoUrl: data.photoUrl || '/uploads/Debraj_Sanyal.jpg',
      biography: data.biography || '',
      expertise: data.expertise || 'Field Documentation',
      displayOrder: typeof data.displayOrder === 'number' ? data.displayOrder : this.data.team.length + 1,
      isActive: data.isActive !== undefined ? Boolean(data.isActive) : true,
      createdAt: data.createdAt || now,
      updatedAt: now
    };
    this.data.team.push(newMember);
    this.saveData();
    return newMember;
  }

  public updateTeamMember(id: string, data: Partial<TeamMember>): TeamMember | null {
    const index = this.data.team.findIndex(m => m.id === id);
    if (index === -1) return null;

    const existing = this.data.team[index];
    const updated: TeamMember = {
      ...existing,
      ...data,
      updatedAt: new Date().toISOString()
    };
    this.data.team[index] = updated;
    this.saveData();
    return updated;
  }

  public deleteTeamMember(id: string): boolean {
    const initLen = this.data.team.length;
    this.data.team = this.data.team.filter(m => m.id !== id);
    if (this.data.team.length !== initLen) {
      this.saveData();
      return true;
    }
    return false;
  }

  // ------------------------------------------------------------------------
  // INVESTIGATIONS
  // ------------------------------------------------------------------------
  public getInvestigations(): Investigation[] {
    this.checkReload();
    return [...this.data.investigations].sort((a, b) => 
      new Date(b.investigationDate || b.createdAt).getTime() - new Date(a.investigationDate || a.createdAt).getTime()
    );
  }

  public createInvestigation(data: Partial<Investigation>): Investigation {
    const now = new Date().toISOString();
    const item: Investigation = {
      id: data.id || `inv-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      title: data.title || 'Untitled Case Expedition',
      location: data.location || 'Undisclosed Location',
      investigationDate: data.investigationDate || now.split('T')[0],
      status: (data.status as any) || 'Completed',
      shortDescription: data.shortDescription || '',
      fullReport: data.fullReport || data.shortDescription || '',
      heroImage: data.heroImage || '/horror_background_wide.jpg',
      isFeatured: data.isFeatured !== undefined ? Boolean(data.isFeatured) : false,
      evidenceCount: typeof data.evidenceCount === 'number' ? data.evidenceCount : 0,
      findings: Array.isArray(data.findings) ? data.findings : [],
      createdAt: data.createdAt || now,
      updatedAt: now
    };
    this.data.investigations.push(item);
    this.saveData();
    return item;
  }

  public updateInvestigation(id: string, data: Partial<Investigation>): Investigation | null {
    const index = this.data.investigations.findIndex(i => i.id === id);
    if (index === -1) return null;

    const existing = this.data.investigations[index];
    const updated: Investigation = {
      ...existing,
      ...data,
      updatedAt: new Date().toISOString()
    };
    this.data.investigations[index] = updated;
    this.saveData();
    return updated;
  }

  public deleteInvestigation(id: string): boolean {
    const initLen = this.data.investigations.length;
    this.data.investigations = this.data.investigations.filter(i => i.id !== id);
    if (this.data.investigations.length !== initLen) {
      this.saveData();
      return true;
    }
    return false;
  }

  // ------------------------------------------------------------------------
  // VAULT CASES
  // ------------------------------------------------------------------------
  public getVaultCases(): VaultCase[] {
    this.checkReload();
    return [...this.data.vault].sort((a, b) => 
      new Date(b.investigationDate || b.createdAt).getTime() - new Date(a.investigationDate || a.createdAt).getTime()
    );
  }

  public getVaultCase(id: string): VaultCase | undefined {
    this.checkReload();
    return this.data.vault.find(c => c.id === id || c.caseId === id);
  }

  public createVaultCase(data: Partial<VaultCase>): VaultCase {
    const now = new Date().toISOString();
    const item: VaultCase = {
      id: data.id || `vlt-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      caseId: data.caseId || `DOS-VLT-${String(this.data.vault.length + 1).padStart(3, '0')}`,
      title: data.title || 'Untitled Vault Archive',
      location: data.location || 'Classified Site',
      investigationDate: data.investigationDate || now.split('T')[0],
      status: (data.status as any) || 'Anomalous',
      category: data.category || 'Environmental Acoustic Anomalies',
      description: data.description || '',
      findings: data.findings || '',
      classificationLevel: (data.classificationLevel as any) || 'Tier 1 - Public',
      redactedSummary: data.redactedSummary || '',
      evidenceItems: Array.isArray(data.evidenceItems) ? data.evidenceItems : [],
      isPublic: data.isPublic !== undefined ? Boolean(data.isPublic) : true,
      createdAt: data.createdAt || now,
      updatedAt: now
    };
    this.data.vault.push(item);
    this.saveData();
    return item;
  }

  public updateVaultCase(id: string, data: Partial<VaultCase>): VaultCase | null {
    const index = this.data.vault.findIndex(c => c.id === id || c.caseId === id);
    if (index === -1) return null;

    const existing = this.data.vault[index];
    const updated: VaultCase = {
      ...existing,
      ...data,
      updatedAt: new Date().toISOString()
    };
    this.data.vault[index] = updated;
    this.saveData();
    return updated;
  }

  public deleteVaultCase(id: string): boolean {
    const initLen = this.data.vault.length;
    this.data.vault = this.data.vault.filter(c => c.id !== id && c.caseId !== id);
    if (this.data.vault.length !== initLen) {
      this.saveData();
      return true;
    }
    return false;
  }

  // ------------------------------------------------------------------------
  // EQUIPMENT
  // ------------------------------------------------------------------------
  public getEquipment(): Equipment[] {
    this.checkReload();
    return [...this.data.equipment];
  }

  public createEquipment(data: Partial<Equipment>): Equipment {
    const now = new Date().toISOString();
    const item: Equipment = {
      id: data.id || `eq-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name: data.name || 'Custom Forensic Sensor',
      category: data.category || 'Environmental Logging',
      modelNumber: data.modelNumber || 'DOS-MOD-01',
      manufacturer: data.manufacturer || 'DOS Technical Labs',
      description: data.description || '',
      specs: (data.specs as any) || {},
      imageUrl: data.imageUrl || '/horror_background_wide.jpg',
      status: (data.status as any) || 'Operational',
      detectionMethod: data.detectionMethod || 'Empirical Sensor Array',
      createdAt: data.createdAt || now
    };
    this.data.equipment.push(item);
    this.saveData();
    return item;
  }

  public updateEquipment(id: string, data: Partial<Equipment>): Equipment | null {
    const index = this.data.equipment.findIndex(e => e.id === id);
    if (index === -1) return null;

    const existing = this.data.equipment[index];
    const updated: Equipment = {
      ...existing,
      ...data
    };
    this.data.equipment[index] = updated;
    this.saveData();
    return updated;
  }

  public deleteEquipment(id: string): boolean {
    const initLen = this.data.equipment.length;
    this.data.equipment = this.data.equipment.filter(e => e.id !== id);
    if (this.data.equipment.length !== initLen) {
      this.saveData();
      return true;
    }
    return false;
  }

  // ------------------------------------------------------------------------
  // MEDIA COVERAGE
  // ------------------------------------------------------------------------
  public getMedia(): MediaItem[] {
    this.checkReload();
    return [...this.data.media].sort((a, b) => 
      new Date(b.date || b.createdAt).getTime() - new Date(a.date || a.createdAt).getTime()
    );
  }

  public createMedia(data: Partial<MediaItem>): MediaItem {
    const now = new Date().toISOString();
    const item: MediaItem = {
      id: data.id || `med-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      title: data.title || 'Untitled Media Feature',
      publication: data.publication || 'DOS Press Archives',
      date: data.date || now.split('T')[0],
      category: (data.category as any) || 'Television',
      description: data.description || '',
      externalUrl: data.externalUrl || '',
      videoUrl: data.videoUrl || '',
      thumbnail: data.thumbnail || '/horror_background_wide.jpg',
      isPublished: data.isPublished !== undefined ? Boolean(data.isPublished) : true,
      createdAt: data.createdAt || now
    };
    this.data.media.push(item);
    this.saveData();
    return item;
  }

  public updateMedia(id: string, data: Partial<MediaItem>): MediaItem | null {
    const index = this.data.media.findIndex(m => m.id === id);
    if (index === -1) return null;

    const existing = this.data.media[index];
    const updated: MediaItem = {
      ...existing,
      ...data
    };
    this.data.media[index] = updated;
    this.saveData();
    return updated;
  }

  public deleteMedia(id: string): boolean {
    const initLen = this.data.media.length;
    this.data.media = this.data.media.filter(m => m.id !== id);
    if (this.data.media.length !== initLen) {
      this.saveData();
      return true;
    }
    return false;
  }

  // ------------------------------------------------------------------------
  // GALLERY
  // ------------------------------------------------------------------------
  public getGallery(): GalleryItem[] {
    this.checkReload();
    return [...this.data.gallery];
  }

  public createGalleryImage(data: Partial<GalleryItem>): GalleryItem {
    const now = new Date().toISOString();
    const item: GalleryItem = {
      id: data.id || `gal-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      title: data.title || 'Field Photographic Evidence',
      caption: data.caption || '',
      imageUrl: data.imageUrl || '/horror_background_wide.jpg',
      category: (data.category as any) || 'Field Evidence',
      location: data.location || 'Undisclosed Site',
      date: data.date || now.split('T')[0],
      featured: Boolean(data.featured),
      createdAt: data.createdAt || now
    };
    this.data.gallery.push(item);
    this.saveData();
    return item;
  }

  public updateGalleryImage(id: string, data: Partial<GalleryItem>): GalleryItem | null {
    const index = this.data.gallery.findIndex(g => g.id === id);
    if (index === -1) return null;

    const existing = this.data.gallery[index];
    const updated: GalleryItem = {
      ...existing,
      ...data
    };
    this.data.gallery[index] = updated;
    this.saveData();
    return updated;
  }

  public deleteGalleryImage(id: string): boolean {
    const initLen = this.data.gallery.length;
    this.data.gallery = this.data.gallery.filter(g => g.id !== id);
    if (this.data.gallery.length !== initLen) {
      this.saveData();
      return true;
    }
    return false;
  }

  // ------------------------------------------------------------------------
  // RESEARCH PAPERS
  // ------------------------------------------------------------------------
  public getResearch(): ResearchPaper[] {
    this.checkReload();
    return [...this.data.research].sort((a, b) => 
      new Date(b.publicationDate || b.createdAt).getTime() - new Date(a.publicationDate || a.createdAt).getTime()
    );
  }

  public getResearchById(id: string): ResearchPaper | undefined {
    this.checkReload();
    return this.data.research.find(r => r.id === id);
  }

  public createResearch(data: Partial<ResearchPaper>): ResearchPaper {
    const now = new Date().toISOString();
    const item: ResearchPaper = {
      id: data.id || `res-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      title: data.title || 'Technical Empirical Methodology Report',
      category: data.category || 'Methodologies & Protocols',
      author: data.author || 'DOS Technical Research Group',
      publicationDate: data.publicationDate || now.split('T')[0],
      abstract: data.abstract || '',
      fullContent: data.fullContent || data.abstract || '',
      findings: Array.isArray(data.findings) ? data.findings : [],
      imageUrl: data.imageUrl || '/horror_background_wide.jpg',
      videoUrl: data.videoUrl || '',
      tags: Array.isArray(data.tags) ? data.tags : ['Empirical Protocol', 'DOS Research'],
      isFeatured: Boolean(data.isFeatured),
      createdAt: data.createdAt || now
    };
    this.data.research.push(item);
    this.saveData();
    return item;
  }

  public updateResearch(id: string, data: Partial<ResearchPaper>): ResearchPaper | null {
    const index = this.data.research.findIndex(r => r.id === id);
    if (index === -1) return null;

    const existing = this.data.research[index];
    const updated: ResearchPaper = {
      ...existing,
      ...data
    };
    this.data.research[index] = updated;
    this.saveData();
    return updated;
  }

  public deleteResearch(id: string): boolean {
    const initLen = this.data.research.length;
    this.data.research = this.data.research.filter(r => r.id !== id);
    if (this.data.research.length !== initLen) {
      this.saveData();
      return true;
    }
    return false;
  }

  // ------------------------------------------------------------------------
  // REPORTS
  // ------------------------------------------------------------------------
  public getReports(): ActivityReport[] {
    return [...this.data.reports].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  public createReport(data: any): ActivityReport {
    const now = new Date().toISOString();
    this.data.reportCounter = (this.data.reportCounter || 0) + 1;
    const year = new Date().getFullYear();
    const caseId = `DOS-${year}-${String(this.data.reportCounter).padStart(6, '0')}`;

    const rawAttachments = data.attachments || (data.attachmentUrl ? [data.attachmentUrl] : []);

    const report: ActivityReport = {
      id: data.id || `rep-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      caseId: data.caseId || caseId,
      fullName: data.fullName || data.witnessName || 'Anonymous Citizen',
      email: data.email || data.contactEmail || 'not-provided@dos-india.org',
      phone: data.phone || data.contactPhone || '',
      location: data.location || 'Undisclosed Premises',
      city: data.city || 'Kolkata',
      state: data.state || 'West Bengal',
      dateOfActivity: data.dateOfActivity || data.incidentDate || now.split('T')[0],
      approximateTime: data.approximateTime || 'Night hours',
      activityType: data.activityType || 'Unexplained Activity',
      description: data.description || '',
      numberOfWitnesses: typeof data.numberOfWitnesses === 'number' ? data.numberOfWitnesses : 1,
      previousInvestigation: Boolean(data.previousInvestigation),
      attachments: Array.isArray(rawAttachments) ? rawAttachments : [rawAttachments].filter(Boolean),
      additionalInfo: data.additionalInfo || '',
      status: (data.status as any) || 'Pending',
      internalNotes: data.internalNotes || '',
      createdAt: data.createdAt || now,
      updatedAt: now
    };

    this.data.reports.unshift(report);
    this.saveData();
    return report;
  }

  public updateReport(id: string, data: Partial<ActivityReport>): ActivityReport | null {
    const index = this.data.reports.findIndex(r => r.id === id || r.caseId === id);
    if (index === -1) return null;

    const existing = this.data.reports[index];
    const updated: ActivityReport = {
      ...existing,
      ...data,
      updatedAt: new Date().toISOString()
    };
    this.data.reports[index] = updated;
    this.saveData();
    return updated;
  }

  public deleteReport(id: string): boolean {
    const initLen = this.data.reports.length;
    this.data.reports = this.data.reports.filter(r => r.id !== id && r.caseId !== id);
    if (this.data.reports.length !== initLen) {
      this.saveData();
      return true;
    }
    return false;
  }

  // ------------------------------------------------------------------------
  // MESSAGES
  // ------------------------------------------------------------------------
  public getMessages(): ContactMessage[] {
    return [...this.data.messages].sort((a, b) => 
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  public createMessage(data: Partial<ContactMessage>): ContactMessage {
    const now = new Date().toISOString();
    const item: ContactMessage = {
      id: data.id || `msg-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      name: data.name || 'Anonymous',
      email: data.email || 'team.dos.mail@gmail.com',
      phone: data.phone || '',
      subject: data.subject || 'General Inquiry',
      message: data.message || '',
      status: (data.status as any) || 'unread',
      createdAt: data.createdAt || now
    };
    this.data.messages.unshift(item);
    this.saveData();
    return item;
  }

  public updateMessage(id: string, data: Partial<ContactMessage>): ContactMessage | null {
    const index = this.data.messages.findIndex(m => m.id === id);
    if (index === -1) return null;

    const existing = this.data.messages[index];
    const updated: ContactMessage = {
      ...existing,
      ...data
    };
    this.data.messages[index] = updated;
    this.saveData();
    return updated;
  }

  public deleteMessage(id: string): boolean {
    const initLen = this.data.messages.length;
    this.data.messages = this.data.messages.filter(m => m.id !== id);
    if (this.data.messages.length !== initLen) {
      this.saveData();
      return true;
    }
    return false;
  }

  // ------------------------------------------------------------------------
  // DASHBOARD STATS
  // ------------------------------------------------------------------------
  public getStats(): DashboardStats {
    const pendingReports = this.data.reports.filter(r => (r.status || 'Pending') === 'Pending').length;
    const unreadMessages = this.data.messages.filter(m => (m.status || 'unread') === 'unread').length;

    return {
      totalInvestigations: this.data.investigations.length,
      totalVaultCases: this.data.vault.length,
      totalEquipment: this.data.equipment.length,
      totalMedia: this.data.media.length,
      totalGallery: this.data.gallery.length,
      totalResearch: this.data.research.length,
      totalReports: this.data.reports.length,
      pendingReports,
      totalMessages: this.data.messages.length,
      unreadMessages,
      teamMembersCount: this.data.team.length
    };
  }
}

export const storage = new StorageManager();
