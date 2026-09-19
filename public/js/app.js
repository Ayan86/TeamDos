/**
 * DETECTIVES OF SUPERNATURAL (DOS) - CORE APPLICATION (VANILLA JS)
 * Simple, readable, modular JavaScript without any framework dependencies.
 * Easy to inspect, customize, and maintain manually.
 */

// Safe Browser Storage Helpers (Guarded against private browsing / iframe domain restrictions)
function safeGetStorage(key, fallback = null) {
  try {
    return localStorage.getItem(key) || fallback;
  } catch (_) {
    return fallback;
  }
}

function safeSetStorage(key, val) {
  try {
    localStorage.setItem(key, val);
  } catch (_) {}
}

function safeRemoveStorage(key) {
  try {
    localStorage.removeItem(key);
  } catch (_) {}
}

// Default Initial Data (ensures site renders instantly even on static hosting or before backend loads)
const DEFAULT_SITE_DATA = {
  settings: {
    siteName: "Detectives of Supernatural",
    tagline: "RISE ABOVE FEAR",
    foundedYear: "2010",
    contactPhone: "+91 98300 00000",
    contactEmail: "investigations@dos-india.org",
    contactLocation: "Kolkata, West Bengal, India"
  },
  team: [
    {
      id: "tm-1",
      name: "Debraj Sanyal",
      role: "Founder",
      photoUrl: "/Debraj_Sanyal.jpg",
      biography: "Debraj Sanyal is the Founder and Lead Investigator of Detectives of Supernatural (DOS), one of India's prominent paranormal research teams. Since 2010, he has dedicated himself to investigating unexplained phenomena through scientific methods, field research, and modern investigative equipment.",
      expertise: "Lead Investigator & Technical Strategy",
      displayOrder: 1
    },
    {
      id: "tm-2",
      name: "Ishita Das Sanyal",
      role: "Director & Lead Investigator",
      photoUrl: "/Ishita_Das_Sanyal.jpg",
      biography: "Ishita Das Sanyal is the Director and Lead Investigator of DOS. Recognized for her contributions to paranormal research and advocacy of the message \"Rise Above Fear,\" she leads investigations and public outreach programs focused on rational inquiry.",
      expertise: "Historical Research & Case Management",
      displayOrder: 2
    },
    {
      id: "tm-3",
      name: "Anirban Das",
      role: "Technical Head",
      photoUrl: "/Anirban_Das.jpg",
      biography: "Anirban Das is the Technical Head of DOS. He specializes in investigation technology and evidence analysis, utilizing scientific instruments to examine reports of unexplained phenomena with high technical precision.",
      expertise: "Sensory Instrumentation & Audio Engineering",
      displayOrder: 3
    },
    {
      id: "tm-4",
      name: "Ayush Majumder",
      role: "Field Investigator",
      photoUrl: "/Ayush_Majumder.jpg",
      biography: "Ayush Majumder is a Field Investigator at DOS, specializing in on-site evidence collection and field research. He supports the organization's mission to promote critical thinking through modern investigative techniques.",
      expertise: "Site Scouting & Environmental Telemetry",
      displayOrder: 4
    }
  ],
  investigations: [
    {
      id: "inv-1",
      caseNumber: "DOS-INV-2025-09",
      title: "Dow Hill Forest Infrasonic Anomaly",
      location: "Kurseong, Darjeeling, West Bengal",
      investigationDate: "2025-11-14",
      status: "DOCUMENTED",
      shortDescription: "Nighttime multi-sensor surveillance inside the pine ridges of Dow Hill documenting localized 18.9Hz infrasonic peaks and concurrent temperature plunges.",
      fullReport: "Over a 72-hour controlled deployment, the team deployed directional microphones, full-spectrum cameras, and tri-field electromagnetic sensors along the historic cart road. Acoustic analysis isolated low-frequency ambient pulses correlating with localized sudden drafts.",
      heroImage: "/horror_background_wide.jpg",
      isFeatured: true,
      evidenceCount: 14,
      findings: "Localized micro-climate barometric anomalies and low-frequency wind resonance; two unverified acoustic waveforms under forensic spectrographic review."
    },
    {
      id: "inv-2",
      caseNumber: "DOS-INV-2025-06",
      title: "Hastings House Midnight Footstep Audit",
      location: "Alipore, Kolkata, West Bengal",
      investigationDate: "2025-08-22",
      status: "DOCUMENTED",
      shortDescription: "Acoustic baseline and seismic accelerometer study at Warren Hastings' 18th-century governor's mansion following repetitive nighttime cadence reports.",
      fullReport: "Dual-channel piezoceramic vibration sensors mounted on original teak rafters recorded synchronized percussive floor impulses without corresponding human entry.",
      heroImage: "/horror_background_wide.jpg",
      isFeatured: true,
      evidenceCount: 8,
      findings: "Structural acoustic transference ruled out for 3 distinct audio signatures occurring at 02:44 AM."
    },
    {
      id: "inv-3",
      caseNumber: "DOS-INV-2025-03",
      title: "South Park Street Cemetery Sepulchral Mapping",
      location: "Park Street, Kolkata",
      investigationDate: "2025-05-19",
      status: "CLOSED",
      shortDescription: "Thermal imaging sweep across 19th-century gothic mausoleums to measure reported cold spot vortexes amidst summer humidity.",
      fullReport: "Utilizing FLIR E8 thermal imaging units and laser thermometers, ambient differential thermal analysis revealed sandstone chimney evaporative effects that accounted for 80% of reported cold spots, with one unresolved thermal drop of -7.2°C at tomb 412.",
      heroImage: "/horror_background_wide.jpg",
      isFeatured: true,
      evidenceCount: 19,
      findings: "Comprehensive thermal baseline established; natural thermal dissipation documented alongside single isolated unverified anomaly."
    }
  ],
  vault: [
    {
      id: "vlt-1",
      caseId: "DOS-VLT-042",
      title: "Dow Hill Acoustic Anomalies & Sub-Audible Waveforms",
      location: "Victoria Boys' School Ridgeway, Kurseong",
      investigationDate: "2025-11-14",
      status: "DOCUMENTED",
      category: "EVP",
      description: "Multi-channel electronic voice phenomena (EVP) captured during silent monitoring sessions inside the misty pine ridge corridor.",
      findings: "Isolated 3 distinct phoneme-like modulations at 410Hz in total ambient silence. Spectrogram demonstrates abnormal resonant harmonic overtone.",
      classificationLevel: "RESTRICTED EVIDENCE",
      evidenceItems: []
    },
    {
      id: "vlt-2",
      caseId: "DOS-VLT-038",
      title: "Hastings Colonial Residence Floor Transduction Analysis",
      location: "Alipore, Kolkata",
      investigationDate: "2025-08-22",
      status: "DOCUMENTED",
      category: "Audio Analysis",
      description: "Seismic accelerometer telemetry isolating nocturnal rhythmic mechanical shocks from subterranean municipal vibrations.",
      findings: "The recurring footsteps reported by caretakers matched an asymmetric bipedal cadence of 108 BPM with zero ambient displacement of dust particles.",
      classificationLevel: "PUBLIC ARCHIVE",
      evidenceItems: []
    }
  ],
  equipment: [
    {
      id: "eq-1",
      name: "TriField TF2 EMF Multi-Field Meter",
      category: "EMF & Magnetic",
      status: "CALIBRATED",
      tag: "STANDARD ISSUE",
      description: "Measures AC magnetic, AC electric, and RF/microwave radiation with omnidirectional 3-axis sensors.",
      specifications: "AC Magnetic: 0.1 - 100.0 mG; RF: 0.001 - 19.999 mW/m²; Peak Hold response < 5ms",
      serialNumber: "DOS-EMF-2018-09"
    },
    {
      id: "eq-2",
      name: "FLIR E8 Infrared Thermal Imager",
      category: "Thermal Imaging",
      status: "ACTIVE",
      tag: "PRIMARY OPTICS",
      description: "High-resolution thermal camera for detecting instantaneous cold spots and localized thermal differentials.",
      specifications: "320 × 240 IR Resolution; <0.05°C Thermal Sensitivity; MSX Multi-Spectral Dynamic Imaging",
      serialNumber: "DOS-FLIR-04"
    },
    {
      id: "eq-3",
      name: "Zoom H6 Six-Track Ultra-Low Noise Audio Recorder",
      category: "Audio & EVP",
      status: "CALIBRATED",
      tag: "EVP LOGGING",
      description: "Studio-grade field recorder with interchangeable XY and shotgun capsules for capturing high-fidelity EVP acoustic anomalies.",
      specifications: "24-bit / 96kHz recording; -120 dBu EIN low-noise preamps; Dual stereo directional arrays",
      serialNumber: "DOS-AUD-012"
    }
  ],
  media: [
    {
      id: "med-1",
      title: "Anandabazar Patrika: 'Science Behind the Unexplained - DOS Investigation Team'",
      outletName: "Anandabazar Patrika",
      coverageType: "PRESS",
      publishDate: "2024-11-02",
      shortSummary: "Front-page feature highlighting DOS's scientific, non-superstitious approach to paranormal field investigations in West Bengal.",
      linkUrl: "https://anandabazar.com"
    },
    {
      id: "med-2",
      title: "Television Feature: Mysteries of Bengal on National Media",
      outletName: "Zee 24 Ghanta / ABP Ananda",
      coverageType: "TV",
      publishDate: "2024-05-18",
      shortSummary: "Special broadcast profiling Debraj Sanyal, Ishita Das Sanyal, and team exploring historic heritage anomalies.",
      linkUrl: "https://youtube.com/@DetectivesOfSupernatural"
    }
  ],
  gallery: [
    {
      id: "gal-1",
      title: "Dow Hill Ridge Expedition Setup",
      location: "Kurseong Pine Forest",
      category: "EXPEDITION",
      imageUrl: "/horror_background_wide.jpg",
      caption: "Nighttime sensory array setup along the Kurseong ridge."
    },
    {
      id: "gal-2",
      title: "Hastings Colonial Mansion Floor Mapping",
      location: "Alipore, Kolkata",
      category: "INVESTIGATION",
      imageUrl: "/horror_background.jpg",
      caption: "Accelerometer and vibration probe placement on historic floorboards."
    }
  ]
};

// Global App State
const state = {
  currentPage: 'home',
  settings: DEFAULT_SITE_DATA.settings,
  team: DEFAULT_SITE_DATA.team,
  investigations: DEFAULT_SITE_DATA.investigations,
  vault: DEFAULT_SITE_DATA.vault,
  equipment: DEFAULT_SITE_DATA.equipment,
  media: DEFAULT_SITE_DATA.media,
  gallery: DEFAULT_SITE_DATA.gallery,
  reports: [],
  messages: [],
  stats: {},
  authToken: safeGetStorage('dos_auth_token', null),
  currentUser: null,
  filters: {
    investigations: 'ALL',
    vault: 'ALL',
    equipment: 'ALL',
    media: 'ALL',
    gallery: 'ALL'
  }
};

// Safe JSON Fetch helper
async function safeFetchJson(url, fallback) {
  try {
    const res = await fetch(url);
    if (!res.ok) return fallback;
    return await res.json();
  } catch (err) {
    console.warn(`[DOS Client] Failed to fetch ${url}:`, err);
    return fallback;
  }
}

// ==========================================================================
// 1. INITIALIZATION & ROUTING
// ==========================================================================
document.addEventListener('DOMContentLoaded', async () => {
  try {
    initPreloader();
    initNavigation();
    initMobileMenu();
    initContactForm();
    initReportForm();
    initAdminMediaUploadForm();
  } catch (err) {
    console.error('Initialization error:', err);
  }
  
  // Fetch initial data from server
  try {
    await loadPublicData();
  } catch (err) {
    console.error('Error in loadPublicData:', err);
  }
  
  // Check URL hash for direct routing (e.g., #investigations, #admin)
  const initialHash = window.location.hash.replace('#', '');
  if (initialHash) {
    navigateTo(initialHash);
  } else {
    navigateTo('home');
  }

  // If token exists, verify admin session
  if (state.authToken) {
    verifyAdminSession();
  }
});

// Preloader controller
function initPreloader() {
  const preloader = document.getElementById('dos-preloader');
  if (!preloader) return;

  const progressFill = document.getElementById('preloaderProgressFill');
  const statusText = document.getElementById('preloaderStatusText');

  const steps = [
    { progress: 25, text: 'INITIALIZING ZERO-LUX OPTICAL SENSORS...', delay: 300 },
    { progress: 55, text: 'CALIBRATING TRI-FIELD EMF & INFRASOUND TELEMETRY...', delay: 800 },
    { progress: 85, text: 'SYNCHRONIZING CLASSIFIED DOSSIER ARCHIVES...', delay: 1400 },
    { progress: 100, text: 'RISE ABOVE FEAR // PROTOCOLS ACTIVE', delay: 2000 }
  ];

  steps.forEach(step => {
    setTimeout(() => {
      if (window.preloaderDismissed) return;
      if (progressFill) progressFill.style.width = `${step.progress}%`;
      if (statusText) statusText.textContent = step.text;
    }, step.delay);
  });

  // Automatically dismiss after completion
  setTimeout(() => {
    if (typeof window.dismissPreloader === 'function') {
      window.dismissPreloader();
    }
  }, 2400);
}

// Setup navigation click handlers
function initNavigation() {
  document.querySelectorAll('[data-nav]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const targetPage = btn.getAttribute('data-nav');
      navigateTo(targetPage);
    });
  });

  window.addEventListener('hashchange', () => {
    const page = window.location.hash.replace('#', '') || 'home';
    navigateTo(page, false);
  });
}

// Switch between views smoothly
function navigateTo(pageId, updateHash = true) {
  // Hide all pages
  document.querySelectorAll('.page-view').forEach(view => {
    view.classList.remove('active');
  });

  // Highlight active nav buttons
  document.querySelectorAll('[data-nav]').forEach(btn => {
    if (btn.getAttribute('data-nav') === pageId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Show target page
  const targetView = document.getElementById(`page-${pageId}`);
  if (targetView) {
    targetView.classList.add('active');
    state.currentPage = pageId;
    if (updateHash) {
      window.location.hash = pageId;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Trigger page-specific refresh if needed
    if (pageId === 'admin') {
      renderAdminPanel();
    }
  }

  // Close mobile drawer if open
  const mobileMenu = document.getElementById('mobileNavMenu');
  if (mobileMenu) mobileMenu.classList.remove('open');
}

function initMobileMenu() {
  const toggleBtn = document.getElementById('mobileMenuToggle');
  const mobileMenu = document.getElementById('mobileNavMenu');
  if (toggleBtn && mobileMenu) {
    toggleBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
    });
  }
}

// ==========================================================================
// 2. DATA FETCHING (REST API)
// ==========================================================================
async function loadPublicData() {
  try {
    const [settingsRes, teamRes, invRes, vaultRes, eqRes, mediaRes, galRes] = await Promise.all([
      safeFetchJson('/api/settings', {}),
      safeFetchJson('/api/team', []),
      safeFetchJson('/api/investigations', []),
      safeFetchJson('/api/vault', []),
      safeFetchJson('/api/equipment', []),
      safeFetchJson('/api/media', []),
      safeFetchJson('/api/gallery', [])
    ]);

    if (settingsRes && Object.keys(settingsRes).length > 0) state.settings = settingsRes;
    if (Array.isArray(teamRes) && teamRes.length > 0) state.team = teamRes;
    if (Array.isArray(invRes) && invRes.length > 0) state.investigations = invRes;
    if (Array.isArray(vaultRes) && vaultRes.length > 0) state.vault = vaultRes;
    if (Array.isArray(eqRes) && eqRes.length > 0) state.equipment = eqRes;
    if (Array.isArray(mediaRes) && mediaRes.length > 0) state.media = mediaRes;
    if (Array.isArray(galRes) && galRes.length > 0) state.gallery = galRes;

    // Render all public components defensively
    try { renderSiteInfo(); } catch (e) { console.warn(e); }
    try { renderHome(); } catch (e) { console.warn(e); }
    try { renderTeam(); } catch (e) { console.warn(e); }
    try { renderInvestigations(); } catch (e) { console.warn(e); }
    try { renderVault(); } catch (e) { console.warn(e); }
    try { renderEquipment(); } catch (e) { console.warn(e); }
    try { renderMedia(); } catch (e) { console.warn(e); }
    try { renderGallery(); } catch (e) { console.warn(e); }
  } catch (err) {
    console.error('Error loading public DOS data:', err);
  }
}

// ==========================================================================
// 3. RENDERERS (VANILLA DOM GENERATION)
// ==========================================================================

function renderSiteInfo() {
  if (state.settings.siteName) {
    document.title = `${state.settings.siteName} | Rise Above Fear`;
  }
  const emergencyPhone = document.getElementById('emergencyPhoneDisplay');
  if (emergencyPhone && state.settings.contactPhone) {
    emergencyPhone.textContent = state.settings.contactPhone;
  }
}

// Render Home Page Elements
function renderHome() {
  // 1. Render Home Team Grid (Featuring Debraj Sanyal, Ishita Das Sanyal, Anirban Das, Ayush Majumder)
  const homeTeamContainer = document.getElementById('homeTeamGrid');
  if (homeTeamContainer) {
    homeTeamContainer.innerHTML = state.team.slice(0, 4).map(member => createTeamCardHtml(member)).join('');
  }

  // 2. Render Featured Investigations on Home
  const homeInvContainer = document.getElementById('homeFeaturedInvestigations');
  if (homeInvContainer) {
    homeInvContainer.innerHTML = state.investigations.slice(0, 3).map(inv => `
      <div class="dos-card">
        <div style="position:relative; aspect-ratio: 16/9; background:#000; overflow:hidden;">
          <img src="${inv.heroImage}" alt="${inv.title}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='/horror_background_wide.jpg'">
          <span class="status-badge ${inv.status.toLowerCase()}" style="position:absolute; top:12px; right:12px;">${inv.status}</span>
        </div>
        <div style="padding:20px; display:flex; flex-direction:column; flex:1;">
          <div style="font-family:var(--font-mono); font-size:0.75rem; color:var(--red-primary); margin-bottom:6px;">
            ${inv.caseNumber} • ${inv.location}
          </div>
          <h3 style="font-size:1.15rem; font-weight:700; color:#fff; margin-bottom:8px;">${inv.title}</h3>
          <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.5; margin-bottom:16px; flex:1;">
            ${inv.shortDescription}
          </p>
          <button onclick="openInvestigationModal('${inv.id}')" class="btn-secondary" style="padding:8px 16px; font-size:0.75rem; width:100%; justify-content:center;">
            <span>EXAMINE EVIDENCE CASE</span>
          </button>
        </div>
      </div>
    `).join('');
  }
}

// Helper to guarantee authentic original portraits
function getMemberPhoto(name, currentPhoto) {
  if (currentPhoto && !currentPhoto.includes('unsplash') && currentPhoto.startsWith('/uploads/')) {
    return currentPhoto;
  }
  const n = (name || '').toLowerCase();
  if (n.includes('debraj')) return '/uploads/Debraj_Sanyal.jpg';
  if (n.includes('ishita')) return '/uploads/Ishita_Das_Sanyal.jpg';
  if (n.includes('anirban')) return '/uploads/Anirban_Das.jpg';
  if (n.includes('ayush')) return '/uploads/Ayush_Majumder.jpg';
  return '/uploads/Debraj_Sanyal.jpg';
}

// Create single team member card HTML
function createTeamCardHtml(member) {
  const safeImg = getMemberPhoto(member.name, member.photoUrl);
  const fallbackImg = getMemberPhoto(member.name, null);
  return `
    <div class="dos-card">
      <div class="team-portrait-box">
        <img 
          src="${safeImg}" 
          alt="${member.name}" 
          class="team-portrait-img"
          onerror="this.src='${fallbackImg}'"
        />
        <div class="team-role-badge">${member.role}</div>
      </div>
      <div class="team-info">
        <h3 class="team-name">${member.name}</h3>
        <div class="team-expertise">${member.expertise}</div>
        <p class="team-bio">${member.biography}</p>
      </div>
    </div>
  `;
}

// Render Team & About Page
function renderTeam() {
  const teamGrid = document.getElementById('aboutTeamGrid');
  if (teamGrid) {
    teamGrid.innerHTML = state.team.map(member => createTeamCardHtml(member)).join('');
  }
}

// Render Investigations with Filtering
function renderInvestigations() {
  const container = document.getElementById('investigationsGrid');
  if (!container) return;

  const currentFilter = state.filters.investigations;
  const filtered = state.investigations.filter(item => {
    if (currentFilter === 'ALL') return true;
    return item.status.toUpperCase() === currentFilter;
  });

  if (filtered.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding:40px; color:var(--text-dim);">No investigation cases match the selected filter.</div>`;
    return;
  }

  container.innerHTML = filtered.map(inv => `
    <div class="dos-card">
      <div style="position:relative; aspect-ratio: 16/9; background:#000; overflow:hidden;">
        <img src="${inv.heroImage}" alt="${inv.title}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='/horror_background_wide.jpg'">
        <span class="status-badge ${inv.status.toLowerCase()}" style="position:absolute; top:12px; right:12px;">${inv.status}</span>
        <div style="position:absolute; bottom:12px; left:12px; font-family:var(--font-mono); font-size:0.7rem; background:rgba(0,0,0,0.8); padding:2px 8px; border-radius:3px; border:1px solid rgba(255,255,255,0.2);">
          ${inv.caseNumber}
        </div>
      </div>
      <div style="padding:20px; display:flex; flex-direction:column; flex:1;">
        <div style="font-family:var(--font-mono); font-size:0.75rem; color:var(--red-primary); margin-bottom:6px;">
          ${inv.date} • ${inv.location}
        </div>
        <h3 style="font-size:1.2rem; font-weight:700; color:#fff; margin-bottom:8px;">${inv.title}</h3>
        <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.5; margin-bottom:16px; flex:1;">
          ${inv.shortDescription}
        </p>
        <button onclick="openInvestigationModal('${inv.id}')" class="btn-secondary" style="padding:8px 16px; font-size:0.75rem; width:100%; justify-content:center;">
          <span>READ CASE TELEMETRY</span>
        </button>
      </div>
    </div>
  `).join('');
}

// Render Evidence Vault
function renderVault() {
  const container = document.getElementById('vaultGrid');
  if (!container) return;

  const currentFilter = state.filters.vault;
  const filtered = state.vault.filter(item => {
    if (currentFilter === 'ALL') return true;
    return item.category.toUpperCase().includes(currentFilter);
  });

  container.innerHTML = filtered.map(v => `
    <div class="dos-card" style="padding:22px;">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px;">
        <span class="status-badge documented">${v.category}</span>
        <span style="font-family:var(--font-mono); font-size:0.7rem; color:var(--red-primary); border:1px solid var(--border-color); padding:2px 6px; border-radius:3px;">
          ${v.caseId}
        </span>
      </div>
      <h3 style="font-size:1.2rem; font-weight:700; color:#fff; margin-bottom:8px;">${v.title}</h3>
      <div style="font-family:var(--font-mono); font-size:0.75rem; color:var(--text-dim); margin-bottom:12px;">
        Recorded: ${v.recordedDate} • Location: ${v.location}
      </div>
      <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.5; margin-bottom:16px;">
        ${v.description}
      </p>
      <div style="background:#050508; border:1px solid var(--border-subtle); border-radius:4px; padding:12px; margin-top:auto;">
        <div style="font-family:var(--font-mono); font-size:0.7rem; color:var(--red-primary); text-transform:uppercase; margin-bottom:4px;">
          Forensic Telemetry Analysis:
        </div>
        <div style="font-size:0.8rem; color:#d1d5db; font-style:italic;">
          "${v.analysisNotes}"
        </div>
      </div>
    </div>
  `).join('');
}

// Render Equipment Arsenal
function renderEquipment() {
  const container = document.getElementById('equipmentGrid');
  if (!container) return;

  container.innerHTML = state.equipment.map(eq => `
    <div class="dos-card">
      <div style="aspect-ratio: 16/10; background:#000; overflow:hidden;">
        <img src="${eq.imageUrl}" alt="${eq.name}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='/horror_background_wide.jpg'">
      </div>
      <div style="padding:20px; display:flex; flex-direction:column; flex:1;">
        <div style="font-family:var(--font-mono); font-size:0.75rem; color:var(--red-primary); margin-bottom:4px;">
          ${eq.category} • STATUS: ${eq.status.toUpperCase()}
        </div>
        <h3 style="font-size:1.2rem; font-weight:700; color:#fff; margin-bottom:8px;">${eq.name}</h3>
        <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.5; margin-bottom:14px;">
          ${eq.description}
        </p>
        <div style="background:#07080c; border:1px solid var(--border-subtle); border-radius:4px; padding:10px; margin-top:auto;">
          <div style="font-family:var(--font-mono); font-size:0.7rem; color:var(--text-dim); text-transform:uppercase; margin-bottom:4px;">
            Investigative Methodology:
          </div>
          <p style="font-size:0.8rem; color:#d1d5db;">
            ${eq.methodology}
          </p>
        </div>
      </div>
    </div>
  `).join('');
}

// Render Media Coverage (Newspapers, TV, Podcasts, Videos)
function renderMedia() {
  const container = document.getElementById('mediaGrid');
  if (!container) return;

  // Toggle admin shortcut button if authenticated
  const adminBtnWrap = document.getElementById('mediaAdminActionContainer');
  if (adminBtnWrap) {
    adminBtnWrap.style.display = (state.currentUser && state.authToken) ? 'block' : 'none';
  }

  const currentFilter = state.filters.media || 'ALL';
  const filtered = state.media.filter(item => {
    if (currentFilter === 'ALL') return true;
    if (currentFilter === 'VIDEOS') {
      return Boolean(item.videoUrl) || item.category === 'Documentaries' || item.category === 'Television' || item.category === 'Podcasts' || item.category === 'Video Reports';
    }
    return item.category.toUpperCase() === currentFilter;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align:center; padding:40px 20px; background:#08090d; border:1px dashed var(--border-subtle); border-radius:8px;">
        <div style="font-size:2rem; margin-bottom:8px;">📹</div>
        <h4 style="color:#fff; font-size:1.1rem; margin-bottom:4px;">No Media Coverage in this Category</h4>
        <p style="color:var(--text-muted); font-size:0.85rem;">Select another filter above or upload new media coverage in the Admin Panel.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(m => {
    const isVideo = Boolean(m.videoUrl) || m.category === 'Documentaries' || m.category === 'Television' || m.category === 'Podcasts' || m.category === 'Video Reports';
    const hasDirectVideo = m.videoUrl && (m.videoUrl.endsWith('.mp4') || m.videoUrl.endsWith('.webm') || m.videoUrl.startsWith('/uploads/'));
    const thumbnailSrc = m.thumbnail || '/horror_background_wide.jpg';

    return `
      <div class="dos-card">
        <div class="media-card-thumbnail-wrap" onclick="openVideoPlayerModal('${m.id}')">
          <img src="${thumbnailSrc}" alt="${escapeHtml(m.title)}" onerror="this.src='/horror_background_wide.jpg'">
          ${isVideo ? `
            <div class="media-play-overlay">
              <div class="media-play-btn">▶</div>
            </div>
            <span class="video-badge-pill">
              <span>●</span> ${hasDirectVideo ? 'BROADCAST MP4' : 'VIDEO ARCHIVE'}
            </span>
          ` : ''}
          <span class="status-badge documented" style="position:absolute; top:12px; right:12px;">${escapeHtml(m.category)}</span>
        </div>
        <div style="padding:20px; display:flex; flex-direction:column; flex:1;">
          <div style="font-family:var(--font-mono); font-size:0.75rem; color:var(--red-primary); margin-bottom:6px;">
            ${escapeHtml(m.publication)} • ${escapeHtml(m.date)}
          </div>
          <h3 style="font-size:1.15rem; font-weight:700; color:#fff; margin-bottom:8px; line-height:1.4;">${escapeHtml(m.title)}</h3>
          <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.5; margin-bottom:16px; flex:1;">
            ${escapeHtml(m.description)}
          </p>
          <div style="display:flex; gap:10px; flex-wrap:wrap;">
            ${isVideo ? `
              <button onclick="openVideoPlayerModal('${m.id}')" class="btn-primary" style="padding:8px 14px; font-size:0.75rem; flex:1; justify-content:center;">
                <span>▶ WATCH VIDEO</span>
              </button>
            ` : ''}
            ${m.externalUrl ? `
              <a href="${m.externalUrl}" target="_blank" rel="noopener" class="btn-secondary" style="padding:8px 14px; font-size:0.75rem; flex:1; justify-content:center;">
                <span>READ ARTICLE ↗</span>
              </a>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Render Evidence Gallery
function renderGallery() {
  const container = document.getElementById('galleryGrid');
  if (!container) return;

  container.innerHTML = state.gallery.map(img => `
    <div class="dos-card" style="cursor:pointer;" onclick="openLightbox('${img.imageUrl}', '${escapeHtml(img.title)}', '${escapeHtml(img.caption)}')">
      <div style="position:relative; aspect-ratio: 4/3; background:#000; overflow:hidden;">
        <img src="${img.imageUrl}" alt="${img.title}" style="width:100%; height:100%; object-fit:cover; transition:transform 0.4s ease;" onerror="this.src='/horror_background_wide.jpg'" onmouseover="this.style.transform='scale(1.08)'" onmouseout="this.style.transform='scale(1)'">
        <span class="status-badge open" style="position:absolute; top:12px; left:12px;">${img.category}</span>
      </div>
      <div style="padding:16px;">
        <div style="font-family:var(--font-mono); font-size:0.7rem; color:var(--red-primary); margin-bottom:4px;">
          ${img.location} • ${img.date}
        </div>
        <h4 style="font-size:1rem; font-weight:700; color:#fff; margin-bottom:4px;">${img.title}</h4>
        <p style="font-size:0.8rem; color:var(--text-muted); line-height:1.4;">${img.caption}</p>
      </div>
    </div>
  `).join('');
}

// ==========================================================================
// 4. PUBLIC FORMS & MODALS
// ==========================================================================

// Handle Public Case Reporting Form
function initReportForm() {
  const form = document.getElementById('caseReportForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const msgBox = document.getElementById('reportFormStatus');
    
    submitBtn.disabled = true;
    submitBtn.innerText = 'TRANSMITTING INCIDENT DOSSIER...';

    const fileInput = document.getElementById('reportEvidenceFile');
    let attachmentUrl = null;

    try {
      if (fileInput && fileInput.files.length > 0) {
        const formData = new FormData();
        formData.append('file', fileInput.files[0]);
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData
        }).then(r => r.json());
        attachmentUrl = uploadRes.url;
      }

      const payload = {
        witnessName: document.getElementById('witnessName').value,
        contactEmail: document.getElementById('witnessEmail').value,
        contactPhone: document.getElementById('witnessPhone').value,
        location: document.getElementById('incidentLocation').value,
        incidentDate: document.getElementById('incidentDate').value,
        activityType: document.getElementById('incidentType').value,
        description: document.getElementById('incidentDescription').value,
        attachmentUrl: attachmentUrl
      };

      const res = await fetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).then(r => r.json());

      if (res.success) {
        form.reset();
        msgBox.innerHTML = `
          <div style="background:rgba(16,185,129,0.15); border:1px solid #10b981; color:#34d399; padding:16px; border-radius:6px; margin-top:20px;">
            <h4 style="font-weight:700; margin-bottom:4px;">INCIDENT LOGGED SUCCESSFULLY</h4>
            <p style="font-size:0.85rem;">Tracking Reference: <strong>${res.trackingNumber}</strong>. The DOS core investigative team has been notified for triage.</p>
          </div>
        `;
      }
    } catch (err) {
      msgBox.innerHTML = `
        <div style="background:rgba(220,38,38,0.15); border:1px solid #dc2626; color:#f87171; padding:16px; border-radius:6px; margin-top:20px;">
          Failed to transmit case report. Please contact the emergency desk directly.
        </div>
      `;
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerText = 'TRANSMIT CASE REPORT FOR TRIAGE';
    }
  });
}

// Handle Contact Inquiries Form
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const msgBox = document.getElementById('contactFormStatus');

    btn.disabled = true;
    btn.innerText = 'TRANSMITTING...';

    const payload = {
      name: document.getElementById('contactName').value,
      email: document.getElementById('contactEmail').value,
      subject: document.getElementById('contactSubject').value,
      message: document.getElementById('contactMessage').value
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).then(r => r.json());

      if (res.success) {
        form.reset();
        msgBox.innerHTML = `<p style="color:#34d399; font-size:0.85rem; margin-top:10px;">Message transmitted to DOS headquarters communications desk.</p>`;
      }
    } catch (err) {
      msgBox.innerHTML = `<p style="color:#f87171; font-size:0.85rem; margin-top:10px;">Transmission error. Please try again.</p>`;
    } finally {
      btn.disabled = false;
      btn.innerText = 'TRANSMIT MESSAGE';
    }
  });
}

// Investigation Modal
function openInvestigationModal(invId) {
  const inv = state.investigations.find(i => i.id === invId);
  if (!inv) return;

  const modal = document.getElementById('investigationModal');
  const body = document.getElementById('investigationModalBody');
  
  body.innerHTML = `
    <div style="position:relative; aspect-ratio: 16/9; background:#000; border-radius:6px; overflow:hidden; margin-bottom:20px;">
      <img src="${inv.heroImage}" alt="${inv.title}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='/horror_background_wide.jpg'">
      <span class="status-badge ${inv.status.toLowerCase()}" style="position:absolute; top:12px; right:12px;">${inv.status}</span>
    </div>
    <div style="font-family:var(--font-mono); font-size:0.8rem; color:var(--red-primary); margin-bottom:6px;">
      ${inv.caseNumber} • ${inv.location} • ${inv.date}
    </div>
    <h2 style="font-size:1.6rem; font-weight:800; color:#fff; margin-bottom:12px;">${inv.title}</h2>
    <div style="font-size:0.9rem; color:#d1d5db; line-height:1.6; margin-bottom:20px;">
      ${inv.fullDescription}
    </div>
    
    <div style="background:#06070b; border:1px solid var(--border-subtle); border-radius:6px; padding:16px; margin-bottom:20px;">
      <h4 style="font-family:var(--font-mono); font-size:0.75rem; color:var(--red-primary); text-transform:uppercase; margin-bottom:8px;">
        Environmental Sensor Telemetry Summary:
      </h4>
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap:12px; font-size:0.8rem; color:var(--text-muted);">
        <div><strong>Ambient Temp Drop:</strong> Δ 8.4°C</div>
        <div><strong>Peak EMF Spike:</strong> 42.6 mG</div>
        <div><strong>Infrasound Frequency:</strong> 18.9 Hz</div>
        <div><strong>Acoustic EVP Class:</strong> Class-A Verified</div>
      </div>
    </div>
  `;

  modal.classList.add('active');
}

function openLightbox(imgUrl, title, caption) {
  const modal = document.getElementById('lightboxModal');
  const imgElem = document.getElementById('lightboxImg');
  const titleElem = document.getElementById('lightboxTitle');
  const captionElem = document.getElementById('lightboxCaption');

  imgElem.src = imgUrl;
  titleElem.textContent = title;
  captionElem.textContent = caption;

  modal.classList.add('active');
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
}

// ==========================================================================
// 5. ADMIN CONSOLE (VANILLA AUTH & CRUD)
// ==========================================================================

async function verifyAdminSession() {
  try {
    const res = await fetch('/api/auth/me', {
      headers: { 'Authorization': `Bearer ${state.authToken}` }
    });
    if (res.ok) {
      const data = await res.json();
      state.currentUser = data.user;
      if (state.currentPage === 'admin') {
        renderAdminDashboard();
      }
    } else {
      logoutAdmin();
    }
  } catch (e) {
    logoutAdmin();
  }
}

function renderAdminPanel() {
  const loginSection = document.getElementById('adminLoginSection');
  const dashboardSection = document.getElementById('adminDashboardSection');

  if (!state.currentUser || !state.authToken) {
    loginSection.style.display = 'block';
    dashboardSection.style.display = 'none';
    initAdminLoginForm();
  } else {
    loginSection.style.display = 'none';
    dashboardSection.style.display = 'block';
    renderAdminDashboard();
  }
}

function initAdminLoginForm() {
  const form = document.getElementById('adminLoginForm');
  if (!form) return;

  form.onsubmit = async (e) => {
    e.preventDefault();
    const email = document.getElementById('adminEmail').value;
    const password = document.getElementById('adminPassword').value;
    const errorBox = document.getElementById('adminLoginError');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();

      if (data.success) {
        state.authToken = data.token;
        state.currentUser = data.user;
        safeSetStorage('dos_auth_token', data.token);
        errorBox.style.display = 'none';
        renderAdminPanel();
      } else {
        errorBox.textContent = data.error || 'Invalid credentials';
        errorBox.style.display = 'block';
      }
    } catch (err) {
      errorBox.textContent = 'Server communication error';
      errorBox.style.display = 'block';
    }
  };
}

function logoutAdmin() {
  state.authToken = null;
  state.currentUser = null;
  safeRemoveStorage('dos_auth_token');
  renderAdminPanel();
}

// Switch between Admin tabs
function switchAdminTab(tabId) {
  document.querySelectorAll('.admin-tab-btn').forEach(btn => {
    if (btn.getAttribute('data-admin-tab') === tabId) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  document.querySelectorAll('.admin-tab-content').forEach(view => {
    view.style.display = 'none';
  });

  const targetView = document.getElementById(`admin-tab-${tabId}`);
  if (targetView) targetView.style.display = 'block';
}

async function renderAdminDashboard() {
  try {
    const stats = await fetch('/api/stats', {
      headers: { 'Authorization': `Bearer ${state.authToken}` }
    }).then(r => r.json());

    document.getElementById('statTotalInvestigations').textContent = stats.totalInvestigations || 0;
    document.getElementById('statMediaCount').textContent = stats.mediaCoverage || 0;
    document.getElementById('statPendingReports').textContent = stats.pendingReports || 0;
    document.getElementById('statTeamCount').textContent = stats.teamMembers || 0;

    renderAdminTeamList();
    renderAdminMediaList();
  } catch (e) {
    console.error('Error rendering admin dashboard stats', e);
  }
}

// Admin: Team List & Photo Upload Manager
function renderAdminTeamList() {
  const container = document.getElementById('adminTeamList');
  if (!container) return;

  container.innerHTML = state.team.map(member => `
    <div style="background:#08090d; border:1px solid var(--border-subtle); border-radius:6px; padding:16px; display:flex; gap:16px; align-items:center; justify-content:space-between; flex-wrap:wrap;">
      <div style="display:flex; align-items:center; gap:16px;">
        <img src="${getMemberPhoto(member.name, member.photoUrl)}" alt="${member.name}" style="width:60px; height:80px; object-fit:cover; border-radius:4px; border:1px solid var(--red-primary);" onerror="this.src='${getMemberPhoto(member.name, null)}'">
        <div>
          <h4 style="font-size:1.1rem; font-weight:700; color:#fff;">${member.name}</h4>
          <div style="font-family:var(--font-mono); font-size:0.75rem; color:var(--red-primary);">${member.role}</div>
          <p style="font-size:0.8rem; color:var(--text-muted);">${member.expertise}</p>
        </div>
      </div>
      <div style="display:flex; gap:8px;">
        <label class="btn-secondary" style="padding:6px 12px; font-size:0.75rem; cursor:pointer;">
          <span>UPLOAD PORTRAIT</span>
          <input type="file" accept="image/*,.jfif" style="display:none;" onchange="uploadMemberPhoto('${member.id}', this.files[0])">
        </label>
      </div>
    </div>
  `).join('');
}

// Admin: Media Coverage & Video Manager
function renderAdminMediaList() {
  const container = document.getElementById('adminMediaList');
  if (!container) return;

  if (state.media.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:30px; background:#06070a; border:1px dashed var(--border-subtle); border-radius:6px;">
        <p style="color:var(--text-muted); font-size:0.85rem; margin-bottom:12px;">No media coverage items registered yet.</p>
        <button onclick="openAdminVideoUploadModal()" class="btn-primary" style="padding:8px 16px; font-size:0.8rem;">
          <span>+ UPLOAD FIRST VIDEO COVERAGE</span>
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = state.media.map(item => {
    const hasVideo = Boolean(item.videoUrl);
    const isDirectMp4 = hasVideo && (item.videoUrl.endsWith('.mp4') || item.videoUrl.endsWith('.webm') || item.videoUrl.startsWith('/uploads/'));
    const thumbnail = item.thumbnail || '/horror_background_wide.jpg';

    return `
      <div style="background:#08090d; border:1px solid var(--border-subtle); border-radius:6px; padding:16px; display:flex; gap:16px; align-items:center; justify-content:space-between; flex-wrap:wrap;">
        <div style="display:flex; gap:16px; align-items:center; flex:1; min-width:280px;">
          <div style="position:relative; width:90px; aspect-ratio:16/9; background:#000; border-radius:4px; overflow:hidden; flex-shrink:0;">
            <img src="${thumbnail}" alt="${escapeHtml(item.title)}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='/horror_background_wide.jpg'" />
            ${hasVideo ? `<span style="position:absolute; bottom:2px; right:2px; font-size:0.6rem; background:rgba(220,38,38,0.9); color:#fff; padding:1px 4px; border-radius:2px; font-family:var(--font-mono);">▶ VIDEO</span>` : ''}
          </div>
          <div>
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:3px;">
              <span class="status-badge documented" style="font-size:0.65rem; padding:2px 6px;">${escapeHtml(item.category)}</span>
              ${isDirectMp4 ? `<span style="font-family:var(--font-mono); font-size:0.65rem; color:#34d399; background:rgba(16,185,129,0.15); padding:2px 6px; border-radius:3px;">MP4 UPLOADED</span>` : (hasVideo ? `<span style="font-family:var(--font-mono); font-size:0.65rem; color:#60a5fa; background:rgba(59,130,246,0.15); padding:2px 6px; border-radius:3px;">YOUTUBE LINKED</span>` : '')}
            </div>
            <h4 style="font-size:0.95rem; font-weight:700; color:#fff; margin-bottom:2px;">${escapeHtml(item.title)}</h4>
            <div style="font-family:var(--font-mono); font-size:0.75rem; color:var(--text-dim);">
              ${escapeHtml(item.publication)} • ${escapeHtml(item.date)}
            </div>
          </div>
        </div>
        <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
          ${hasVideo ? `
            <button onclick="openVideoPlayerModal('${item.id}')" class="btn-primary" style="padding:6px 12px; font-size:0.75rem;">
              <span>▶ PREVIEW VIDEO</span>
            </button>
          ` : ''}
          <button onclick="deleteAdminMediaItem('${item.id}', '${escapeHtml(item.title)}')" class="btn-secondary" style="padding:6px 12px; font-size:0.75rem; color:#f87171; border-color:rgba(239,68,68,0.3);">
            <span>🗑 DELETE</span>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// Open Video Theater Modal
function openVideoPlayerModal(mediaId) {
  const item = state.media.find(m => m.id === mediaId);
  if (!item) return;

  const modal = document.getElementById('videoPlayerModal');
  const container = document.getElementById('videoPlayerContainer');
  const title = document.getElementById('videoPlayerTitle');
  const cat = document.getElementById('videoPlayerCategory');
  const meta = document.getElementById('videoPlayerMeta');
  const desc = document.getElementById('videoPlayerDesc');
  const actions = document.getElementById('videoPlayerActions');

  if (!modal || !container) return;

  title.textContent = item.title;
  cat.textContent = item.category.toUpperCase();
  meta.textContent = `Publication: ${item.publication} • Release Date: ${item.date}`;
  desc.textContent = item.description || 'No additional synopsis available.';

  // Build Actions
  let actionHtml = '';
  if (item.externalUrl) {
    actionHtml += `<a href="${item.externalUrl}" target="_blank" rel="noopener" class="btn-secondary" style="padding:6px 12px; font-size:0.75rem;"><span>READ ORIGINAL ARTICLE ↗</span></a>`;
  }
  if (item.videoUrl) {
    actionHtml += `<a href="${item.videoUrl}" target="_blank" rel="noopener" class="btn-secondary" style="padding:6px 12px; font-size:0.75rem;"><span>OPEN VIDEO SOURCE ↗</span></a>`;
  }
  actions.innerHTML = actionHtml;

  // Build Player
  if (item.videoUrl && (item.videoUrl.endsWith('.mp4') || item.videoUrl.endsWith('.webm') || item.videoUrl.startsWith('/uploads/'))) {
    container.innerHTML = `
      <video controls autoplay playsinline style="width:100%; height:100%; object-fit:contain; background:#000;" poster="${item.thumbnail || ''}">
        <source src="${item.videoUrl}" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    `;
  } else if (item.videoUrl && (item.videoUrl.includes('youtube.com') || item.videoUrl.includes('youtu.be'))) {
    let videoId = '';
    if (item.videoUrl.includes('youtu.be/')) {
      videoId = item.videoUrl.split('youtu.be/')[1]?.split('?')[0];
    } else if (item.videoUrl.includes('v=')) {
      videoId = item.videoUrl.split('v=')[1]?.split('&')[0];
    }
    const embedUrl = videoId ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0` : item.videoUrl;
    container.innerHTML = `
      <iframe src="${embedUrl}" title="${escapeHtml(item.title)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    `;
  } else {
    container.innerHTML = `
      <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; width:100%; height:100%; background:#000; text-align:center; padding:20px;">
        <img src="${item.thumbnail || '/horror_background_wide.jpg'}" alt="${escapeHtml(item.title)}" style="max-height:200px; border-radius:6px; margin-bottom:12px;" onerror="this.src='/horror_background_wide.jpg'" />
        <p style="color:var(--text-muted); font-size:0.9rem; margin-bottom:12px;">Audio/Print Broadcast Document</p>
        ${item.externalUrl ? `<a href="${item.externalUrl}" target="_blank" rel="noopener" class="btn-primary" style="padding:8px 16px;"><span>ACCESS FULL COVERAGE ARTICLE ↗</span></a>` : ''}
      </div>
    `;
  }

  modal.classList.add('active');
}

function closeVideoPlayerModal() {
  const modal = document.getElementById('videoPlayerModal');
  const container = document.getElementById('videoPlayerContainer');
  if (container) {
    container.innerHTML = ''; // Stop video audio/playback immediately
  }
  if (modal) modal.classList.remove('active');
}

// Modal and Form Controls for Admin Video Upload
let currentVideoSourceMode = 'file';

function setVideoSourceMode(mode) {
  currentVideoSourceMode = mode;
  const btnUpload = document.getElementById('btnSourceUpload');
  const btnUrl = document.getElementById('btnSourceUrl');
  const fileBlock = document.getElementById('videoSourceFileBlock');
  const urlBlock = document.getElementById('videoSourceUrlBlock');

  if (mode === 'file') {
    btnUpload.className = 'btn-primary';
    btnUrl.className = 'btn-secondary';
    fileBlock.style.display = 'block';
    urlBlock.style.display = 'none';
  } else {
    btnUpload.className = 'btn-secondary';
    btnUrl.className = 'btn-primary';
    fileBlock.style.display = 'none';
    urlBlock.style.display = 'block';
  }
}

function handleVideoFileSelection(input) {
  const label = document.getElementById('videoFileSelectedName');
  if (input.files && input.files[0]) {
    const f = input.files[0];
    const sizeMb = (f.size / (1024 * 1024)).toFixed(2);
    label.innerHTML = `<span style="color:#34d399; font-weight:700;">Selected: ${f.name} (${sizeMb} MB)</span>`;
  } else {
    label.textContent = 'Supports files up to 150MB';
  }
}

function openAdminVideoUploadModal() {
  const modal = document.getElementById('adminVideoUploadModal');
  const form = document.getElementById('adminMediaUploadForm');
  const progressWrap = document.getElementById('adminVideoUploadProgress');
  const progressBar = document.getElementById('adminVideoUploadProgressBar');
  const statusBox = document.getElementById('adminVideoUploadStatus');
  const nameLabel = document.getElementById('videoFileSelectedName');

  if (form) form.reset();
  if (progressWrap) progressWrap.style.display = 'none';
  if (progressBar) progressBar.style.width = '0%';
  if (statusBox) statusBox.innerHTML = '';
  if (nameLabel) nameLabel.textContent = 'Supports files up to 150MB';

  const dateInput = document.getElementById('adminMediaDate');
  if (dateInput) {
    dateInput.value = new Date().toISOString().split('T')[0];
  }

  setVideoSourceMode('file');
  if (modal) modal.classList.add('active');
}

function initAdminMediaUploadForm() {
  const form = document.getElementById('adminMediaUploadForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!state.authToken) {
      alert('Administrator session required. Please sign into the console.');
      return;
    }

    const title = document.getElementById('adminMediaTitle').value;
    const category = document.getElementById('adminMediaCategory').value;
    const publication = document.getElementById('adminMediaPublication').value;
    const date = document.getElementById('adminMediaDate').value;
    const description = document.getElementById('adminMediaDescription').value;
    const externalUrl = document.getElementById('adminMediaExternalUrl').value;
    const videoFileInput = document.getElementById('adminVideoFileInput');
    const thumbnailFileInput = document.getElementById('adminMediaThumbnailFile');
    const videoUrlInput = document.getElementById('adminVideoUrlInput');

    const submitBtn = document.getElementById('adminMediaSubmitBtn');
    const progressWrap = document.getElementById('adminVideoUploadProgress');
    const progressBar = document.getElementById('adminVideoUploadProgressBar');
    const statusBox = document.getElementById('adminVideoUploadStatus');

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<span>TRANSMITTING & PROCESSING...</span>';
    if (progressWrap) progressWrap.style.display = 'block';
    if (statusBox) statusBox.innerHTML = '<span style="color:var(--text-muted);">Uploading media asset and updating DOS archives...</span>';

    const formData = new FormData();
    formData.append('title', title);
    formData.append('category', category);
    formData.append('publication', publication);
    formData.append('date', date);
    formData.append('description', description);
    formData.append('externalUrl', externalUrl);

    if (currentVideoSourceMode === 'file' && videoFileInput.files.length > 0) {
      formData.append('videoFile', videoFileInput.files[0]);
    } else if (currentVideoSourceMode === 'url' && videoUrlInput.value) {
      formData.append('videoUrl', videoUrlInput.value);
    }

    if (thumbnailFileInput.files.length > 0) {
      formData.append('thumbnailFile', thumbnailFileInput.files[0]);
    }

    // Use XMLHttpRequest for real progress tracking
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/media/upload-video', true);
    xhr.setRequestHeader('Authorization', `Bearer ${state.authToken}`);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && progressBar) {
        const percent = Math.round((event.loaded / event.total) * 100);
        progressBar.style.width = `${percent}%`;
        if (statusBox) {
          statusBox.innerHTML = `<span style="color:#60a5fa; font-family:var(--font-mono);">Uploading video file: ${percent}% complete</span>`;
        }
      }
    };

    xhr.onload = async () => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span>PUBLISH TO MEDIA COVERAGE</span>';

      if (xhr.status >= 200 && xhr.status < 300) {
        if (statusBox) {
          statusBox.innerHTML = '<span style="color:#34d399; font-weight:700;">✓ Video coverage broadcast published successfully to DOS archives!</span>';
        }
        await loadPublicData();
        renderAdminDashboard();
        renderMedia();
        setTimeout(() => {
          closeModal('adminVideoUploadModal');
        }, 900);
      } else {
        let errMessage = 'Failed to upload video.';
        try {
          const errRes = JSON.parse(xhr.responseText);
          if (errRes.error) errMessage = errRes.error;
        } catch (_) {}
        if (statusBox) {
          statusBox.innerHTML = `<span style="color:#f87171;">Error: ${errMessage}</span>`;
        }
      }
    };

    xhr.onerror = () => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<span>PUBLISH TO MEDIA COVERAGE</span>';
      if (statusBox) {
        statusBox.innerHTML = '<span style="color:#f87171;">Connection error during video upload.</span>';
      }
    };

    xhr.send(formData);
  });
}

// Delete media item from admin
async function deleteAdminMediaItem(id, title) {
  if (!confirm(`Are you sure you want to remove "${title}" from the media coverage archive?`)) {
    return;
  }

  try {
    const res = await fetch(`/api/media/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${state.authToken}` }
    }).then(r => r.json());

    if (res.success) {
      await loadPublicData();
      renderAdminDashboard();
      renderMedia();
    } else {
      alert('Failed to delete media item.');
    }
  } catch (err) {
    alert('Server error while deleting media item.');
  }
}

// Handle Direct Team Member Photo Upload
async function uploadMemberPhoto(memberId, file) {
  if (!file) return;
  const formData = new FormData();
  formData.append('file', file);

  try {
    const uploadRes = await fetch('/api/upload', {
      method: 'POST',
      body: formData
    }).then(r => r.json());

    if (uploadRes.url) {
      await fetch(`/api/team/${memberId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.authToken}`
        },
        body: JSON.stringify({ photoUrl: uploadRes.url })
      });

      await loadPublicData();
      renderAdminTeamList();
      alert('Team portrait updated successfully!');
    }
  } catch (err) {
    alert('Failed to upload team portrait.');
  }
}

// Helpers
function escapeHtml(str) {
  if (!str) return '';
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function setFilter(category, filterValue) {
  state.filters[category] = filterValue;
  if (category === 'investigations') renderInvestigations();
  if (category === 'vault') renderVault();
  if (category === 'media') renderMedia();
  if (category === 'equipment') renderEquipment();
  if (category === 'gallery') renderGallery();

  // Update active button state in filter-bar
  const parentBar = event.target.closest('.filter-bar');
  if (parentBar) {
    parentBar.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
  }
}

