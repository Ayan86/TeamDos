export type CaseStatus = 'OPEN' | 'UNDER_INVESTIGATION' | 'DOCUMENTED' | 'CLOSED' | 'ARCHIVED';

export type ReportStatus = 
  | 'New' 
  | 'Reviewing' 
  | 'Contacted' 
  | 'Investigation Scheduled' 
  | 'Investigating' 
  | 'Closed' 
  | 'Archived';

export type ActivityType = 
  | 'Apparition'
  | 'Unexplained Sounds'
  | 'Object Movement'
  | 'Unexplained Lights'
  | 'Shadow Figure'
  | 'Electronic Disturbance'
  | 'Temperature Anomaly'
  | 'Unusual Smell'
  | 'Physical Interaction'
  | 'Other';

export type GalleryCategory = 
  | 'Investigations'
  | 'Haunted Locations'
  | 'Team'
  | 'Equipment'
  | 'Evidence'
  | 'Events'
  | 'Media'
  | 'Behind The Scenes';

export type MediaCategory = 
  | 'Television'
  | 'Newspapers'
  | 'Magazines'
  | 'YouTube'
  | 'Podcasts'
  | 'Interviews'
  | 'Online Media'
  | 'Documentaries';

export type VaultCategory = 
  | 'Case Files'
  | 'Evidence'
  | 'EVP'
  | 'Audio Analysis'
  | 'Video Evidence'
  | 'Photographic Evidence'
  | 'Investigation Reports'
  | 'Historical Records';

export type EquipmentCategory = 
  | 'Detection Equipment'
  | 'Audio Equipment'
  | 'Video Equipment'
  | 'Environmental Equipment'
  | 'Investigation Tools'
  | 'Detection'
  | 'Audio'
  | 'Video'
  | 'Environmental'
  | 'Tools';

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  photoUrl: string;
  biography?: string;
  bio?: string;
  expertise?: string;
  displayOrder: number;
  isActive: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface SiteSettings {
  organizationName?: string;
  siteName?: string;
  shortName?: string;
  tagline?: string;
  heroTagline?: string;
  foundedYear?: string;
  heroHeading?: string;
  heroSubheading?: string;
  heroDescription?: string;
  heroBgUrl?: string;
  whoWeAreTitle?: string;
  whoWeAreDescription?: string;
  whoWeAreText?: string;
  whoWeArePoints?: string[];
  missionHeading?: string;
  missionStatement?: string;
  contactEmail?: string;
  contactPhone?: string;
  contactLocation?: string;
  contactAddress?: string;
  socialLinks?: {
    youtube?: string;
    facebook?: string;
    instagram?: string;
    twitter?: string;
  };
}

export interface ResearchItem {
  id: string;
  title: string;
  category: string;
  author?: string;
  publicationDate: string;
  abstract: string;
  fullContent?: string;
  findings?: string;
  imageUrl?: string;
  videoUrl?: string; // YouTube or video file
  documentUrl?: string;
  tags?: string[];
  isFeatured?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface Investigation {
  id: string;
  caseNumber?: string;
  title: string;
  location: string;
  investigationDate: string;
  status: CaseStatus;
  shortDescription: string;
  fullDescription?: string;
  fullReport?: string;
  heroImage: string;
  imageUrl?: string;
  videoUrl?: string;
  isFeatured?: boolean;
  evidenceCount?: number;
  findings?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GalleryImage {
  id: string;
  title: string;
  caption?: string;
  imageUrl: string;
  videoUrl?: string;
  category: GalleryCategory | string;
  location?: string;
  date?: string;
  featured?: boolean;
  createdAt?: string;
}

export interface MediaItem {
  id: string;
  title: string;
  publication?: string;
  publisher?: string;
  outletName?: string;
  coverageType?: string;
  publishDate?: string;
  date: string;
  category: MediaCategory | string;
  description?: string;
  summary?: string;
  shortSummary?: string;
  externalUrl?: string;
  linkUrl?: string;
  videoUrl?: string;
  thumbnail?: string;
  thumbnailUrl?: string;
  isPublished?: boolean;
  createdAt?: string;
}

export interface VaultEvidence {
  id: string;
  caseId: string;
  title: string;
  type: 'audio' | 'video' | 'photo' | 'document' | 'sensor_log' | string;
  fileUrl: string;
  audioWaveform?: number[];
  description?: string;
  timestamp?: string;
  classified?: boolean;
}

export interface VaultCase {
  id: string;
  caseId: string; // e.g. DOS-VLT-042
  title: string;
  location: string;
  investigationDate?: string;
  date?: string;
  status: CaseStatus;
  category?: VaultCategory | string;
  description?: string;
  summary?: string;
  findings?: string;
  conclusion?: string;
  imageUrl?: string;
  videoUrl?: string;
  classificationLevel?: 'PUBLIC ARCHIVE' | 'RESTRICTED EVIDENCE' | 'CLASSIFIED RESEARCH' | string;
  clearanceLevel?: number;
  redactedSummary?: string;
  evidenceItems?: VaultEvidence[];
  isPublic?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface EquipmentItem {
  id: string;
  name: string;
  category: EquipmentCategory | string;
  modelNumber?: string;
  manufacturer?: string;
  description: string;
  tag?: string;
  serialNumber?: string;
  specs?: { [key: string]: string | number };
  specifications?: { [key: string]: string | number } | string;
  imageUrl: string;
  videoUrl?: string;
  status: 'Operational' | 'Field Deployed' | 'Calibration' | 'Archived' | 'Active' | 'Calibrating' | string;
  detectionMethod?: string;
  methodology?: string;
  createdAt?: string;
}

export interface ActivityReport {
  id: string;
  caseId: string; // e.g. DOS-2026-000001
  fullName: string;
  email: string;
  phone: string;
  location: string;
  city: string;
  state: string;
  dateOfActivity: string;
  approximateTime: string;
  activityType: ActivityType;
  description: string;
  numberOfWitnesses?: number;
  witnessCount?: number;
  previousInvestigation?: boolean;
  hasPreviousInvestigation?: boolean;
  attachments: string[];
  additionalInfo?: string;
  status: ReportStatus;
  internalNotes?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'unread' | 'read' | 'archived';
  createdAt?: string;
}

export interface AdminUser {
  id: string;
  email: string;
  username: string;
  role: 'superadmin' | 'investigator' | 'archivist';
}

export interface DashboardStats {
  totalInvestigations: number;
  researchCount: number;
  galleryImages: number;
  mediaCoverage: number;
  vaultCases: number;
  equipmentCount: number;
  teamMembers: number;
  activityReports: number;
  contactMessages: number;
  pendingReports: number;
}
