export interface SocialLinks {
  youtube?: string;
  facebook?: string;
  instagram?: string;
  twitter?: string;
}

export interface SiteSettings {
  organizationName: string;
  shortName: string;
  tagline: string;
  foundedYear: string;
  heroHeading: string;
  heroSubheading: string;
  heroDescription: string;
  heroBgUrl: string;
  whoWeAreTitle: string;
  whoWeAreDescription: string;
  whoWeArePoints: string[];
  missionHeading: string;
  missionStatement: string;
  contactEmail: string;
  contactPhone: string;
  contactLocation: string;
  socialLinks: SocialLinks;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photoUrl: string;
  biography: string;
  expertise: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Finding {
  category?: string;
  detail?: string;
  [key: string]: any;
}

export interface Investigation {
  id: string;
  title: string;
  location: string;
  investigationDate: string;
  status: string;
  shortDescription: string;
  fullReport: string;
  heroImage: string;
  isFeatured: boolean;
  evidenceCount: number;
  findings: Finding[] | string;
  createdAt: string;
  updatedAt: string;
}

export interface EvidenceItem {
  id: string;
  caseId?: string;
  title: string;
  type: string;
  fileUrl: string;
  caption?: string;
  timestamp?: string;
  audioWaveform?: number[] | string;
  description?: string;
  [key: string]: any;
}

export interface VaultCase {
  id: string;
  caseId: string;
  title: string;
  location: string;
  investigationDate: string;
  status: string;
  category: string;
  description: string;
  findings: string;
  classificationLevel: string;
  redactedSummary?: string;
  evidenceItems: EvidenceItem[];
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  [key: string]: any;
}

export interface Equipment {
  id: string;
  name: string;
  category: string;
  modelNumber: string;
  manufacturer: string;
  description: string;
  specs: string[] | Record<string, string>;
  imageUrl: string;
  status: string;
  detectionMethod: string;
  createdAt: string;
}

export interface MediaItem {
  id: string;
  title: string;
  publication: string;
  date: string;
  category: string;
  description: string;
  externalUrl?: string;
  videoUrl?: string;
  thumbnail: string;
  isPublished: boolean;
  createdAt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  caption: string;
  imageUrl: string;
  category: string;
  location: string;
  date: string;
  featured?: boolean;
  createdAt: string;
}

export interface ResearchPaper {
  id: string;
  title: string;
  category: string;
  author: string;
  publicationDate: string;
  abstract: string;
  fullContent: string;
  findings: string[] | string;
  imageUrl?: string;
  videoUrl?: string;
  tags: string[];
  isFeatured: boolean;
  createdAt: string;
}

export interface ActivityReport {
  id: string;
  caseId: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  city: string;
  state: string;
  dateOfActivity: string;
  approximateTime: string;
  activityType: string;
  description: string;
  numberOfWitnesses: number;
  previousInvestigation: boolean;
  attachments: string[];
  additionalInfo?: string;
  status: string;
  internalNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: string;
  createdAt: string;
}

export interface DashboardStats {
  totalInvestigations: number;
  totalVaultCases: number;
  totalEquipment: number;
  totalMedia: number;
  totalGallery: number;
  totalResearch: number;
  totalReports: number;
  pendingReports: number;
  totalMessages: number;
  unreadMessages: number;
  teamMembersCount: number;
}

export interface DatabaseSchema {
  settings: SiteSettings;
  team: TeamMember[];
  investigations: Investigation[];
  vault: VaultCase[];
  equipment: Equipment[];
  media: MediaItem[];
  gallery: GalleryItem[];
  research: ResearchPaper[];
  reports: ActivityReport[];
  messages: ContactMessage[];
  reportCounter: number;
}
