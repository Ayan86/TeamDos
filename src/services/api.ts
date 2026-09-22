import {
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

const getAuthHeaders = (): Record<string, string> => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('dos_admin_token') : null;
  const headers: Record<string, string> = {
    'Content-Type': 'application/json'
  };
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
};

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(errorData.error || `HTTP error! status: ${res.status}`);
  }
  return res.json();
}

export const api = {
  // Authentication
  async login(email: string, password: string): Promise<{ success: boolean; token: string; user: any }> {
    const res = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    const data = await handleResponse<{ success: boolean; token: string; user: any }>(res);
    if (data.token) {
      localStorage.setItem('dos_admin_token', data.token);
    }
    return data;
  },

  async getMe(): Promise<{ user: any }> {
    const res = await fetch('/api/auth/me', {
      headers: getAuthHeaders()
    });
    return handleResponse<{ user: any }>(res);
  },

  logout(): void {
    localStorage.removeItem('dos_admin_token');
  },

  // Settings
  async getSettings(): Promise<SiteSettings> {
    const res = await fetch('/api/settings');
    return handleResponse<SiteSettings>(res);
  },

  async updateSettings(data: Partial<SiteSettings>): Promise<SiteSettings> {
    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse<SiteSettings>(res);
  },

  // Team
  async getTeam(): Promise<TeamMember[]> {
    const res = await fetch('/api/team');
    return handleResponse<TeamMember[]>(res);
  },

  async createTeamMember(data: Partial<TeamMember>): Promise<TeamMember> {
    const res = await fetch('/api/team', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse<TeamMember>(res);
  },

  async updateTeamMember(id: string, data: Partial<TeamMember>): Promise<TeamMember> {
    const res = await fetch(`/api/team/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse<TeamMember>(res);
  },

  async deleteTeamMember(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`/api/team/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse<{ success: boolean }>(res);
  },

  async uploadMemberPhoto(formData: FormData): Promise<{ success: boolean; photoUrl: string; member?: TeamMember }> {
    const res = await fetch('/api/team/upload-member-photo', {
      method: 'POST',
      body: formData
    });
    return handleResponse(res);
  },

  // Investigations
  async getInvestigations(): Promise<Investigation[]> {
    const res = await fetch('/api/investigations');
    return handleResponse<Investigation[]>(res);
  },

  async createInvestigation(data: Partial<Investigation>): Promise<Investigation> {
    const res = await fetch('/api/investigations', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse<Investigation>(res);
  },

  async updateInvestigation(id: string, data: Partial<Investigation>): Promise<Investigation> {
    const res = await fetch(`/api/investigations/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse<Investigation>(res);
  },

  async deleteInvestigation(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`/api/investigations/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse<{ success: boolean }>(res);
  },

  // Vault Cases
  async getVaultCases(): Promise<VaultCase[]> {
    const res = await fetch('/api/vault');
    return handleResponse<VaultCase[]>(res);
  },

  async getVaultCase(id: string): Promise<VaultCase> {
    const res = await fetch(`/api/vault/${id}`);
    return handleResponse<VaultCase>(res);
  },

  async createVaultCase(data: Partial<VaultCase>): Promise<VaultCase> {
    const res = await fetch('/api/vault', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse<VaultCase>(res);
  },

  async updateVaultCase(id: string, data: Partial<VaultCase>): Promise<VaultCase> {
    const res = await fetch(`/api/vault/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse<VaultCase>(res);
  },

  async deleteVaultCase(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`/api/vault/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse<{ success: boolean }>(res);
  },

  // Equipment
  async getEquipment(): Promise<Equipment[]> {
    const res = await fetch('/api/equipment');
    return handleResponse<Equipment[]>(res);
  },

  async createEquipment(data: Partial<Equipment>): Promise<Equipment> {
    const res = await fetch('/api/equipment', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse<Equipment>(res);
  },

  async updateEquipment(id: string, data: Partial<Equipment>): Promise<Equipment> {
    const res = await fetch(`/api/equipment/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse<Equipment>(res);
  },

  async deleteEquipment(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`/api/equipment/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse<{ success: boolean }>(res);
  },

  // Media
  async getMedia(): Promise<MediaItem[]> {
    const res = await fetch('/api/media');
    return handleResponse<MediaItem[]>(res);
  },

  async createMedia(data: Partial<MediaItem>): Promise<MediaItem> {
    const res = await fetch('/api/media', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse<MediaItem>(res);
  },

  async updateMedia(id: string, data: Partial<MediaItem>): Promise<MediaItem> {
    const res = await fetch(`/api/media/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse<MediaItem>(res);
  },

  async deleteMedia(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`/api/media/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse<{ success: boolean }>(res);
  },

  // Gallery
  async getGallery(): Promise<GalleryItem[]> {
    const res = await fetch('/api/gallery');
    return handleResponse<GalleryItem[]>(res);
  },

  async createGalleryImage(data: Partial<GalleryItem>): Promise<GalleryItem> {
    const res = await fetch('/api/gallery', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse<GalleryItem>(res);
  },

  async updateGalleryImage(id: string, data: Partial<GalleryItem>): Promise<GalleryItem> {
    const res = await fetch(`/api/gallery/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse<GalleryItem>(res);
  },

  async deleteGalleryImage(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`/api/gallery/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse<{ success: boolean }>(res);
  },

  // Research
  async getResearch(): Promise<ResearchPaper[]> {
    const res = await fetch('/api/research');
    return handleResponse<ResearchPaper[]>(res);
  },

  async getResearchById(id: string): Promise<ResearchPaper> {
    const res = await fetch(`/api/research/${id}`);
    return handleResponse<ResearchPaper>(res);
  },

  async createResearch(data: Partial<ResearchPaper>): Promise<ResearchPaper> {
    const res = await fetch('/api/research', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse<ResearchPaper>(res);
  },

  async updateResearch(id: string, data: Partial<ResearchPaper>): Promise<ResearchPaper> {
    const res = await fetch(`/api/research/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse<ResearchPaper>(res);
  },

  async deleteResearch(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`/api/research/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse<{ success: boolean }>(res);
  },

  // Reports
  async getReports(): Promise<ActivityReport[]> {
    const res = await fetch('/api/reports', {
      headers: getAuthHeaders()
    });
    return handleResponse<ActivityReport[]>(res);
  },

  async submitReport(data: Partial<ActivityReport>): Promise<{ success: boolean; caseId: string; message: string; report: ActivityReport }> {
    const res = await fetch('/api/reports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return handleResponse(res);
  },

  async updateReport(id: string, data: Partial<ActivityReport>): Promise<ActivityReport> {
    const res = await fetch(`/api/reports/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse<ActivityReport>(res);
  },

  async deleteReport(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`/api/reports/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse<{ success: boolean }>(res);
  },

  // Contact Messages
  async getContactMessages(): Promise<ContactMessage[]> {
    const res = await fetch('/api/contact', {
      headers: getAuthHeaders()
    });
    return handleResponse<ContactMessage[]>(res);
  },

  async sendContactMessage(data: Partial<ContactMessage>): Promise<{ success: boolean; message: string; item: ContactMessage }> {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    return handleResponse(res);
  },

  async updateContactMessage(id: string, data: Partial<ContactMessage>): Promise<ContactMessage> {
    const res = await fetch(`/api/contact/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(data)
    });
    return handleResponse<ContactMessage>(res);
  },

  async deleteContactMessage(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`/api/contact/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders()
    });
    return handleResponse<{ success: boolean }>(res);
  },

  // Stats
  async getStats(): Promise<DashboardStats> {
    const res = await fetch('/api/stats', {
      headers: getAuthHeaders()
    });
    return handleResponse<DashboardStats>(res);
  }
};
