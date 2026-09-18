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
  DashboardStats 
} from '../types';

const TOKEN_KEY = 'dos_investigator_token';

export const authService = {
  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },
  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
  },
  logout() {
    localStorage.removeItem(TOKEN_KEY);
  },
  isAuthenticated(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  }
};

function getHeaders() {
  const headers: HeadersInit = {
    'Content-Type': 'application/json'
  };
  const token = authService.getToken();
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export const api = {
  // Settings
  async getSettings(): Promise<SiteSettings> {
    const res = await fetch('/api/settings');
    if (!res.ok) throw new Error('Failed to fetch settings');
    return res.json();
  },
  async updateSettings(settings: Partial<SiteSettings>): Promise<SiteSettings> {
    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(settings)
    });
    if (!res.ok) throw new Error('Failed to update settings');
    return res.json();
  },

  // Team
  async getTeam(): Promise<TeamMember[]> {
    const res = await fetch('/api/team');
    if (!res.ok) throw new Error('Failed to fetch team');
    return res.json();
  },
  async createTeamMember(member: Partial<TeamMember>): Promise<TeamMember> {
    const res = await fetch('/api/team', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(member)
    });
    if (!res.ok) throw new Error('Failed to create team member');
    return res.json();
  },
  async updateTeamMember(id: string, member: Partial<TeamMember>): Promise<TeamMember> {
    const res = await fetch(`/api/team/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(member)
    });
    if (!res.ok) throw new Error('Failed to update team member');
    return res.json();
  },
  async deleteTeamMember(id: string): Promise<boolean> {
    const res = await fetch(`/api/team/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return res.ok;
  },

  // Investigations
  async getInvestigations(): Promise<Investigation[]> {
    const res = await fetch('/api/investigations');
    if (!res.ok) throw new Error('Failed to fetch investigations');
    return res.json();
  },
  async createInvestigation(item: Partial<Investigation>): Promise<Investigation> {
    const res = await fetch('/api/investigations', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(item)
    });
    if (!res.ok) throw new Error('Failed to create investigation');
    return res.json();
  },
  async updateInvestigation(id: string, item: Partial<Investigation>): Promise<Investigation> {
    const res = await fetch(`/api/investigations/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(item)
    });
    if (!res.ok) throw new Error('Failed to update investigation');
    return res.json();
  },
  async deleteInvestigation(id: string): Promise<boolean> {
    const res = await fetch(`/api/investigations/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return res.ok;
  },

  // Vault
  async getVaultCases(): Promise<VaultCase[]> {
    const res = await fetch('/api/vault');
    if (!res.ok) throw new Error('Failed to fetch vault cases');
    return res.json();
  },
  async getVaultCase(id: string): Promise<VaultCase> {
    const res = await fetch(`/api/vault/${id}`);
    if (!res.ok) throw new Error('Failed to fetch case');
    return res.json();
  },
  async createVaultCase(item: Partial<VaultCase>): Promise<VaultCase> {
    const res = await fetch('/api/vault', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(item)
    });
    if (!res.ok) throw new Error('Failed to create vault case');
    return res.json();
  },
  async updateVaultCase(id: string, item: Partial<VaultCase>): Promise<VaultCase> {
    const res = await fetch(`/api/vault/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(item)
    });
    if (!res.ok) throw new Error('Failed to update vault case');
    return res.json();
  },
  async deleteVaultCase(id: string): Promise<boolean> {
    const res = await fetch(`/api/vault/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return res.ok;
  },

  // Equipment
  async getEquipment(): Promise<EquipmentItem[]> {
    const res = await fetch('/api/equipment');
    if (!res.ok) throw new Error('Failed to fetch equipment');
    return res.json();
  },
  async createEquipment(item: Partial<EquipmentItem>): Promise<EquipmentItem> {
    const res = await fetch('/api/equipment', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(item)
    });
    if (!res.ok) throw new Error('Failed to create equipment');
    return res.json();
  },
  async updateEquipment(id: string, item: Partial<EquipmentItem>): Promise<EquipmentItem> {
    const res = await fetch(`/api/equipment/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(item)
    });
    if (!res.ok) throw new Error('Failed to update equipment');
    return res.json();
  },
  async deleteEquipment(id: string): Promise<boolean> {
    const res = await fetch(`/api/equipment/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return res.ok;
  },

  // Media
  async getMedia(): Promise<MediaItem[]> {
    const res = await fetch('/api/media');
    if (!res.ok) throw new Error('Failed to fetch media');
    return res.json();
  },
  async createMedia(item: Partial<MediaItem>): Promise<MediaItem> {
    const res = await fetch('/api/media', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(item)
    });
    if (!res.ok) throw new Error('Failed to create media item');
    return res.json();
  },
  async updateMedia(id: string, item: Partial<MediaItem>): Promise<MediaItem> {
    const res = await fetch(`/api/media/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(item)
    });
    if (!res.ok) throw new Error('Failed to update media item');
    return res.json();
  },
  async deleteMedia(id: string): Promise<boolean> {
    const res = await fetch(`/api/media/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return res.ok;
  },

  // Gallery
  async getGallery(): Promise<GalleryImage[]> {
    const res = await fetch('/api/gallery');
    if (!res.ok) throw new Error('Failed to fetch gallery');
    return res.json();
  },
  async createGalleryImage(item: Partial<GalleryImage>): Promise<GalleryImage> {
    const res = await fetch('/api/gallery', {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(item)
    });
    if (!res.ok) throw new Error('Failed to create gallery image');
    return res.json();
  },
  async updateGalleryImage(id: string, item: Partial<GalleryImage>): Promise<GalleryImage> {
    const res = await fetch(`/api/gallery/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(item)
    });
    if (!res.ok) throw new Error('Failed to update gallery image');
    return res.json();
  },
  async deleteGalleryImage(id: string): Promise<boolean> {
    const res = await fetch(`/api/gallery/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return res.ok;
  },

  // Activity Reports
  async getReports(): Promise<ActivityReport[]> {
    const res = await fetch('/api/reports', {
      headers: getHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch reports');
    return res.json();
  },
  async submitReport(report: Partial<ActivityReport>): Promise<{ success: boolean; caseId: string; message: string; report: ActivityReport }> {
    const res = await fetch('/api/reports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(report)
    });
    if (!res.ok) throw new Error('Failed to submit report');
    return res.json();
  },
  async updateReport(id: string, updates: Partial<ActivityReport>): Promise<ActivityReport> {
    const res = await fetch(`/api/reports/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(updates)
    });
    if (!res.ok) throw new Error('Failed to update report');
    return res.json();
  },
  async deleteReport(id: string): Promise<boolean> {
    const res = await fetch(`/api/reports/${id}`, {
      method: 'DELETE',
      headers: getHeaders()
    });
    return res.ok;
  },

  // Contact
  async getContactMessages(): Promise<ContactMessage[]> {
    const res = await fetch('/api/contact', {
      headers: getHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch messages');
    return res.json();
  },
  async sendContactMessage(msg: { name: string; email: string; phone?: string; subject: string; message: string }) {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(msg)
    });
    if (!res.ok) throw new Error('Failed to send contact message');
    return res.json();
  },
  async updateContactMessage(id: string, updates: Partial<ContactMessage>): Promise<ContactMessage> {
    const res = await fetch(`/api/contact/${id}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(updates)
    });
    if (!res.ok) throw new Error('Failed to update message');
    return res.json();
  },

  // Stats
  async getStats(): Promise<DashboardStats> {
    const res = await fetch('/api/stats', {
      headers: getHeaders()
    });
    if (!res.ok) throw new Error('Failed to fetch stats');
    return res.json();
  },

  // File Upload
  async uploadFile(file: File): Promise<{ url: string; filename: string }> {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const contentType = res.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        const text = await res.text();
        throw new Error(`Upload server error (${res.status}): ${text.slice(0, 100)}`);
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to upload file');
      return data;
    } catch (err: any) {
      console.error('uploadFile error:', err);
      throw err;
    }
  },
  async uploadMemberPhoto(file: File, memberId?: string, memberName?: string): Promise<{ success: boolean; photoUrl: string; member?: TeamMember }> {
    const formData = new FormData();
    formData.append('photo', file);
    if (memberId) formData.append('memberId', memberId);
    if (memberName) formData.append('memberName', memberName);
    
    try {
      const res = await fetch('/api/team/upload-member-photo', {
        method: 'POST',
        body: formData
      });
      const contentType = res.headers.get('content-type') || '';
      if (!contentType.includes('application/json')) {
        const text = await res.text();
        throw new Error(`Server returned non-JSON response (${res.status}): ${text.slice(0, 100)}`);
      }
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to upload team member photo');
      }
      return data;
    } catch (err: any) {
      console.warn('Primary member photo upload failed, trying generic upload endpoint:', err);
      // Fallback: try uploading to general /api/upload
      try {
        const fallbackForm = new FormData();
        fallbackForm.append('file', file);
        const fbRes = await fetch('/api/upload', { method: 'POST', body: fallbackForm });
        const fbContentType = fbRes.headers.get('content-type') || '';
        if (fbContentType.includes('application/json') && fbRes.ok) {
          const fbData = await fbRes.json();
          return {
            success: true,
            photoUrl: fbData.url,
            member: memberId ? { id: memberId, name: memberName || '', role: '', photoUrl: fbData.url, biography: '', expertise: '', displayOrder: 1, isActive: true, createdAt: '', updatedAt: '' } : undefined
          };
        }
      } catch (fbErr) {
        console.warn('Fallback upload also failed:', fbErr);
      }
      throw err;
    }
  },
  async getUploadedFiles(): Promise<{ filename: string; url: string; size: number; mtime: string }[]> {
    const res = await fetch('/api/uploads');
    if (!res.ok) throw new Error('Failed to fetch uploads');
    const data = await res.json();
    return data.files || [];
  }
};
