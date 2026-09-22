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
    contactPhone: "98514 24977 / 7003031775",
    contactEmail: "team.dos.mail@gmail.com",
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
      title: "Didi No.1",
      category: "Optical",
      location: "Kolkata",
      date: "2026-09-21",
      caption: "Ishita Das Sanyal",
      imageUrl: "/uploads/file-1790024755379-13823450.jpg",
      id: "gal-1790024755441"
    },
    {
      id: "gal-1",
      title: "In an Investigation",
      caption: "Ayush Majumder",
      imageUrl: "/uploads/file-1790023310764-198067039.jpg",
      category: "Investigations",
      location: "Field Location",
      date: "2025-11-14"
    },
    {
      id: "gal-2",
      title: "In an Investigation",
      caption: "Team DOS",
      imageUrl: "/uploads/file-1790023846696-2764748.jpg",
      category: "Haunted Locations",
      location: "Kolkata",
      date: "2025-08-22"
    },
    {
      id: "gal-3",
      title: "In an Investigation",
      caption: "Team DOS",
      imageUrl: "/uploads/file-1790023918447-701445997.jpg",
      category: "Haunted Location",
      location: "Kolkata ",
      date: "2025-08-20"
    },
    {
      id: "gal-4",
      title: "In an Investigation",
      caption: "Devraj Sanyal, Ishita Das Sanyal , Anirban Das & Ayush Majumder",
      imageUrl: "/uploads/file-1790024137833-962828907.png",
      category: "haunted Location",
      location: "kolkata",
      date: "2025-05-19"
    },
    {
      id: "gal-5",
      title: "A haunted Trip To Benagram",
      caption: "Team DOS",
      imageUrl: "/uploads/file-1790024233346-166976861.jpg",
      category: "Haunted Locations",
      location: "Assansol",
      date: "2025-02-10"
    },
    {
      id: "gal-6",
      title: "Promotion",
      caption: "Team DOS",
      imageUrl: "/uploads/file-1790024399578-99231812.jpg",
      category: "Movie",
      location: "Kolkata",
      date: "2025-10-15"
    },
    {
      id: "gal-7",
      title: "Promotion",
      caption: "Team DOS",
      imageUrl: "/uploads/file-1790024473615-548013419.jpg",
      category: "Movie",
      location: "Kolkata",
      date: "2024-10-31"
    },
    {
      id: "gal-8",
      title: "Promotion",
      caption: "Team DOS",
      imageUrl: "/uploads/file-1790024559485-56923581.jpg",
      category: "Promotion",
      location: "Kolkata",
      date: "2025-08-22"
    }
  ],
  research: [
    {
      id: "res-1",
      title: "Bio-Acoustic Infrasound & The 18.9 Hz Resonant Optical Hallucination Threshold",
      category: "Acoustics & EVP",
      author: "Debraj Sanyal & Anirban Das",
      date: "2025-11-20",
      summary: "An empirical investigation into low-frequency standing acoustic waves (18-19 Hz) and their biological correlation with ocular resonance, hyper-vigilance, and perceived paranormal presences in historic dwellings.",
      fullFindings: "Across 40 field investigations in West Bengal, localized standing infrasound waves generated by natural geological contours and high-mass colonial ventilation shafts were correlated with ocular globe vibration at 18.9 Hz. This frequency physically vibrates the human eyeball, inducing peripheral gray apparitions. We present continuous-wave Fourier spectrographs and sensory mitigation protocols.",
      photoUrl: "/horror_background_wide.jpg",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      citations: "Vic Tandy (1998) 'Ghost in the Machine'; DOS Laboratory Acoustic Archive (2025)."
    },
    {
      id: "res-2",
      title: "Geomagnetic Flux Density & Localized EMF Baseline Spikes in Colonial Heritage Sites",
      category: "EMF & Geomagnetic",
      author: "Anirban Das & Debraj Sanyal",
      date: "2025-08-15",
      summary: "Multi-axis fluxgate magnetometer analyses of unshielded alternating electromagnetic fields and anomalous static geomagnetic deviations in Kolkata's 18th-century masonry.",
      fullFindings: "Utilizing calibrated 3-axis fluxgate magnetometers and high-speed logging hardware, our field telemetry isolated ambient electrical grounding leaks versus authentic non-ionizing electromagnetic anomalies. Data reveals anomalous pulsed 40 mG fluctuations during midnight lunar transits without corresponding mains power infrastructure.",
      photoUrl: "/horror_background.jpg",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      citations: "Michael Persinger (2001) 'Geomagnetic Activity and Paranormal Experiences'; DOS Tech Paper #04."
    },
    {
      id: "res-3",
      title: "Differential Thermal Dissipation & Zero-Lux Infrared Imaging in Enclosed Chambers",
      category: "Thermal & Optical",
      author: "Ishita Das Sanyal & Ayush Majumder",
      date: "2025-04-10",
      summary: "Calibrated radiometric FLIR thermal imaging to quantify instantaneous localized temperature drops (cold spots) versus architectural convective air currents.",
      fullFindings: "Investigating reported 'cold spots' across 22 historic buildings in Bengal, we established baseline mathematical models for masonry evaporative cooling versus isolated thermal anomalies exceeding Δ 6°C within <2 seconds without measurable air displacement.",
      photoUrl: "/horror_background_wide.jpg",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      citations: "DOS Thermal Dynamics Group; Journal of Empirical Anomalous Phenomena (2025)."
    },
    {
      id: "res-4",
      title: "Standardized Protocol for Empirical Paranormal Investigation & Evidence Verification",
      category: "Methodology",
      author: "Debraj Sanyal & Ishita Das Sanyal",
      date: "2025-01-05",
      summary: "The official DOS 5-phase scientific methodology: Environmental Baseline, Sensor Calibration, Triple-Blind Audio Capture, Forensic Data Filtering, and Scientific Demystification.",
      fullFindings: "The 'Rise Above Fear' scientific doctrine requires rigorous elimination of 100% of natural, psychological, and structural factors before classifying any phenomenon as anomalous. This white paper outlines the standard operating procedure for every DOS field deployment.",
      photoUrl: "/horror_background.jpg",
      videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
      citations: "Detectives of Supernatural Official Field Protocol Manual (2010–2026)."
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
  research: DEFAULT_SITE_DATA.research,
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
    gallery: 'ALL',
    research: 'ALL'
  }
};

// Safe API Fetch and JSON parsing helper that handles non-JSON HTML, timeouts, and network drops gracefully
async function safeApiFetch(url, options = {}) {
  try {
    const res = await fetch(url, options);
    const contentType = res.headers ? (res.headers.get('content-type') || '') : '';
    
    let data;
    if (contentType.includes('application/json')) {
      data = await res.json();
    } else {
      const text = await res.text();
      try {
        data = JSON.parse(text);
      } catch (parseErr) {
        if (!res.ok) {
          return { error: `Server error (${res.status}): ${text.slice(0, 100)}`, status: res.status };
        }
        return { error: 'Received non-JSON response from server', raw: text };
      }
    }

    if (!res.ok) {
      return { error: (data && data.error) ? data.error : `Request failed with status ${res.status}`, status: res.status };
    }
    return data;
  } catch (err) {
    console.warn(`[DOS API Notice] Network communication on ${url}:`, err);
    return { error: err.message || 'Network request failed. Please check connection.', networkError: true };
  }
}

// Safe JSON Fetch helper for page bootstrap
async function safeFetchJson(url, fallback) {
  const result = await safeApiFetch(url);
  if (result && !result.error && !result.networkError) {
    return result;
  }
  return fallback;
}

// Resilient File Upload helper with base64 data-URL fallback
async function safeUploadFile(fileInput) {
  if (!fileInput || !fileInput.files || !fileInput.files[0]) {
    return null;
  }
  const file = fileInput.files[0];

  try {
    const formData = new FormData();
    formData.append('file', file);
    const res = await safeApiFetch('/api/upload', {
      method: 'POST',
      body: formData
    });
    if (res && res.url) {
      return res.url;
    }
  } catch (e) {
    console.warn('Direct upload failed, attempting fallback:', e);
  }

  // Fallback to FileReader data URL
  return new Promise((resolve) => {
    try {
      const reader = new FileReader();
      reader.onload = async (ev) => {
        const dataUrl = ev.target.result;
        // Attempt sending base64 to server
        const b64Res = await safeApiFetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ base64: dataUrl })
        });
        if (b64Res && b64Res.url) {
          resolve(b64Res.url);
        } else {
          // Keep base64 data URL for local display
          resolve(dataUrl);
        }
      };
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    } catch (err) {
      resolve(null);
    }
  });
}

// ==========================================================================
// 1. INITIALIZATION & ROUTING
// ==========================================================================
document.addEventListener('DOMContentLoaded', async () => {
  try {
    initPreloader();
    initNavigation();
    initMobileMenu();
    initHorrorAudio();
    initContactForm();
    initReportForm();
    initAdminMediaUploadForm();
    initAdminEntityForm();
    initAdminSettingsForm();
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
    } else if (pageId === 'equipment') {
      renderEquipment();
    } else if (pageId === 'media') {
      renderMedia();
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
    const [settingsRes, teamRes, invRes, vaultRes, eqRes, mediaRes, galRes, resRes] = await Promise.all([
      safeFetchJson('/api/settings', {}),
      safeFetchJson('/api/team', []),
      safeFetchJson('/api/investigations', []),
      safeFetchJson('/api/vault', []),
      safeFetchJson('/api/equipment', []),
      safeFetchJson('/api/media', []),
      safeFetchJson('/api/gallery', []),
      safeFetchJson('/api/research', [])
    ]);

    if (settingsRes && Object.keys(settingsRes).length > 0) state.settings = settingsRes;
    if (Array.isArray(teamRes)) state.team = teamRes;
    if (Array.isArray(invRes)) state.investigations = invRes;
    if (Array.isArray(vaultRes)) state.vault = vaultRes;
    if (Array.isArray(eqRes)) state.equipment = eqRes;
    if (Array.isArray(mediaRes)) state.media = mediaRes;
    if (Array.isArray(galRes)) state.gallery = galRes;
    if (Array.isArray(resRes)) state.research = resRes;

    // Render all public components defensively
    try { renderSiteInfo(); } catch (e) { console.warn(e); }
    try { renderHome(); } catch (e) { console.warn(e); }
    try { renderTeam(); } catch (e) { console.warn(e); }
    try { renderInvestigations(); } catch (e) { console.warn(e); }
    try { renderVault(); } catch (e) { console.warn(e); }
    try { renderEquipment(); } catch (e) { console.warn(e); }
    try { renderMedia(); } catch (e) { console.warn(e); }
    try { renderResearch(); } catch (e) { console.warn(e); }
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

// Safe helper to extract photo URL from vault entity
function getVaultPhoto(v) {
  if (!v) return '/horror_background_wide.jpg';
  if (v.evidenceImage && typeof v.evidenceImage === 'string' && v.evidenceImage.trim() !== '') return v.evidenceImage;
  if (v.imageUrl && typeof v.imageUrl === 'string' && v.imageUrl.trim() !== '') return v.imageUrl;
  if (v.photoUrl && typeof v.photoUrl === 'string' && v.photoUrl.trim() !== '') return v.photoUrl;
  if (v.image && typeof v.image === 'string' && v.image.trim() !== '') return v.image;
  if (v.thumbnail && typeof v.thumbnail === 'string' && v.thumbnail.trim() !== '') return v.thumbnail;
  if (Array.isArray(v.evidenceItems) && v.evidenceItems.length > 0) {
    const photoItem = v.evidenceItems.find(e => (e.type === 'photo' || e.type === 'image') && e.fileUrl);
    if (photoItem && photoItem.fileUrl) return photoItem.fileUrl;
    const anyItem = v.evidenceItems.find(e => e.fileUrl);
    if (anyItem && anyItem.fileUrl) return anyItem.fileUrl;
  }
  return '/horror_background_wide.jpg';
}

// Render Dos Vault (Gallery View)
function renderVault() {
  const container = document.getElementById('vaultGrid');
  if (!container) return;

  // Toggle admin action button if authenticated
  const adminBtnWrap = document.getElementById('vaultAdminActionContainer');
  if (adminBtnWrap) {
    adminBtnWrap.style.display = (state.currentUser && state.authToken) ? 'block' : 'none';
  }

  const currentFilter = (state.filters.vault || 'ALL').toUpperCase();
  const filtered = (state.vault || []).filter(item => {
    if (currentFilter === 'ALL') return true;
    const cat = String(item.category || item.classification || '').toUpperCase();
    const status = String(item.status || '').toUpperCase();
    const threat = String(item.threatLevel || '').toUpperCase();
    const title = String(item.title || '').toUpperCase();
    const synopsis = String(item.synopsis || item.description || '').toUpperCase();

    if (currentFilter === 'CURSED RELICS') {
      return cat.includes('CURSED') || cat.includes('RELIC') || cat.includes('ARTIFACT') ||
             title.includes('CURSED') || title.includes('RELIC') || title.includes('ARTIFACT') ||
             synopsis.includes('CURSED') || synopsis.includes('RELIC') || synopsis.includes('ARTIFACT') ||
             status.includes('DOCUMENTED') || cat.includes('DOCUMENTED');
    }

    return cat.includes(currentFilter) || status.includes(currentFilter) || threat.includes(currentFilter) || title.includes(currentFilter);
  });

  if (!filtered || filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align:center; padding:50px 20px; background:#06070a; border:1px dashed var(--border-subtle); border-radius:8px;">
        <p style="color:var(--text-muted); font-size:0.95rem; margin-bottom:12px;">No classified vault evidence matching this category filter.</p>
        <button onclick="setFilter('vault', 'ALL')" class="btn-secondary" style="padding:6px 14px; font-size:0.8rem;">
          <span>RESET TO ALL VAULT EVIDENCE</span>
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(v => {
    const photo = getVaultPhoto(v);
    const catText = v.category || v.classification || 'CLASSIFIED';
    const caseIdText = v.caseId || v.caseNumber || 'DOS-VLT';
    const locationText = v.location || 'Undisclosed Coordinates';
    const dateText = v.recordedDate || v.date || v.investigationDate || 'Archived Date';
    const descText = v.synopsis || v.description || v.summary || 'Classified anomalous evidence preserved in the DOS Vault archives.';
    const analysisText = v.analysisNotes || v.analysis || v.findings || v.fullFindings || '';
    const threatLevel = String(v.threatLevel || v.status || 'Standard').toUpperCase();
    
    let threatColor = '#94a3b8';
    let threatBorder = 'rgba(148, 163, 184, 0.25)';
    if (threatLevel.includes('ELEVATED') || threatLevel.includes('RESTRICTED')) {
      threatColor = '#fbbf24';
      threatBorder = 'rgba(251, 191, 36, 0.4)';
    } else if (threatLevel.includes('CRITICAL') || threatLevel.includes('DEMONIC') || threatLevel.includes('EXTREME')) {
      threatColor = '#ef4444';
      threatBorder = 'rgba(239, 68, 68, 0.5)';
    }

    return `
      <div class="dos-card" style="cursor:pointer; display:flex; flex-direction:column; overflow:hidden;" onclick="openVaultModal('${v.id}')">
        <!-- Gallery Photo Area -->
        <div style="position:relative; aspect-ratio: 16/10; background:#000; overflow:hidden;">
          <img src="${photo}" alt="${escapeHtml(v.title)}" style="width:100%; height:100%; object-fit:cover; transition:transform 0.45s ease;" onerror="this.src='/horror_background_wide.jpg'" onmouseover="this.style.transform='scale(1.08)'" onmouseout="this.style.transform='scale(1)'">
          <div style="position:absolute; inset:0; background:linear-gradient(180deg, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0) 40%, rgba(6,7,12,0.94) 100%); pointer-events:none;"></div>
          
          <!-- Top Badges -->
          <div style="position:absolute; top:12px; left:12px; right:12px; display:flex; justify-content:space-between; align-items:center; pointer-events:none;">
            <span class="status-badge documented" style="font-size:0.65rem; padding:3px 8px; backdrop-filter:blur(6px); letter-spacing:0.04em;">
              ${escapeHtml(catText)}
            </span>
            <span style="font-family:var(--font-mono); font-size:0.7rem; color:var(--red-primary); background:rgba(0,0,0,0.82); border:1px solid rgba(220,38,38,0.4); padding:2px 8px; border-radius:3px; backdrop-filter:blur(6px);">
              ${escapeHtml(caseIdText)}
            </span>
          </div>

          <!-- Bottom Badges on Image: Threat & Enlarge Button -->
          <div style="position:absolute; bottom:10px; left:12px; right:12px; display:flex; justify-content:space-between; align-items:flex-end;">
            <span style="font-family:var(--font-mono); font-size:0.65rem; color:${threatColor}; background:rgba(8,9,14,0.88); border:1px solid ${threatBorder}; padding:2px 8px; border-radius:3px; backdrop-filter:blur(4px);">
              THREAT: ${escapeHtml(threatLevel)}
            </span>
            <button onclick="event.stopPropagation(); openVaultLightbox('${v.id}')" class="btn-secondary" style="padding:4px 8px; font-size:0.68rem; background:rgba(0,0,0,0.82); border:1px solid rgba(255,255,255,0.25); color:#fff; display:flex; align-items:center; gap:4px; cursor:pointer;" title="Enlarge Photograph">
              <span>🔍 ENLARGE</span>
            </button>
          </div>
        </div>

        <!-- Gallery Details Area -->
        <div style="padding:18px; display:flex; flex-direction:column; flex:1;">
          <div style="font-family:var(--font-mono); font-size:0.72rem; color:var(--red-primary); margin-bottom:6px; display:flex; align-items:center; gap:6px; flex-wrap:wrap;">
            <span>📍 ${escapeHtml(locationText)}</span>
            <span style="color:var(--text-dim);">•</span>
            <span>📅 ${escapeHtml(dateText)}</span>
          </div>

          <h3 style="font-size:1.15rem; font-weight:700; color:#fff; margin-bottom:8px; line-height:1.35;">
            ${escapeHtml(v.title)}
          </h3>

          <p style="font-size:0.83rem; color:var(--text-muted); line-height:1.5; margin-bottom:14px; flex:1; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">
            ${escapeHtml(descText)}
          </p>

          ${analysisText ? `
            <div style="background:#050508; border:1px solid var(--border-subtle); border-radius:4px; padding:10px 12px; margin-bottom:14px;">
              <div style="font-family:var(--font-mono); font-size:0.65rem; color:var(--red-primary); text-transform:uppercase; margin-bottom:3px; letter-spacing:0.04em;">
                Forensic Telemetry:
              </div>
              <div style="font-size:0.78rem; color:#cbd5e1; font-style:italic; display:-webkit-box; -webkit-line-clamp:2; -webkit-box-orient:vertical; overflow:hidden;">
                "${escapeHtml(analysisText)}"
              </div>
            </div>
          ` : ''}

          <div style="display:flex; gap:8px; align-items:center; margin-top:auto; padding-top:4px;">
            <button onclick="event.stopPropagation(); openVaultModal('${v.id}')" class="btn-secondary" style="padding:8px 14px; font-size:0.75rem; flex:1; justify-content:center;">
              <span>READ CASE DOSSIER</span>
            </button>
            <button onclick="event.stopPropagation(); openVaultLightbox('${v.id}')" class="btn-secondary" style="padding:8px 12px; font-size:0.75rem; color:#e2e8f0;" title="View Evidence Lightbox">
              <span>👁 VIEW</span>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Render Equipment Arsenal
function renderEquipment() {
  const container = document.getElementById('equipmentGrid');
  if (!container) return;

  const list = state.equipment || [];
  if (list.length === 0) {
    container.innerHTML = `<div style="grid-column: 1/-1; text-align:center; padding:40px; color:var(--text-dim);">No equipment registered in the arsenal.</div>`;
    return;
  }

  container.innerHTML = list.map(eq => {
    const photo = eq.imageUrl || eq.photoUrl || '/horror_background_wide.jpg';
    const statusText = (eq.status || 'Operational').toUpperCase();
    const descriptionText = eq.description || eq.usage || eq.summary || 'Advanced paranormal sensor hardware calibrated for field telemetry.';
    const methodologyText = typeof eq.specs === 'string' ? eq.specs : (eq.methodology || eq.detectionMethod || (eq.specs ? JSON.stringify(eq.specs) : 'Calibrated Sensor Telemetry'));

    return `
      <div class="dos-card" style="display:flex; flex-direction:column;">
        <div style="aspect-ratio: 16/10; background:#000; overflow:hidden; position:relative;">
          <img src="${photo}" alt="${escapeHtml(eq.name || 'Equipment')}" style="width:100%; height:100%; object-fit:cover; transition:transform 0.4s ease;" onerror="this.src='/horror_background_wide.jpg'" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
          <span class="status-badge open" style="position:absolute; top:12px; right:12px; font-size:0.65rem;">
            ${escapeHtml(statusText)}
          </span>
        </div>
        <div style="padding:20px; display:flex; flex-direction:column; flex:1;">
          <div style="font-family:var(--font-mono); font-size:0.75rem; color:var(--red-primary); margin-bottom:4px;">
            ${escapeHtml(eq.category || 'Detection Equipment')}
          </div>
          <h3 style="font-size:1.2rem; font-weight:700; color:#fff; margin-bottom:8px;">${escapeHtml(eq.name || 'Equipment Hardware')}</h3>
          <p style="font-size:0.85rem; color:var(--text-muted); line-height:1.5; margin-bottom:14px; flex:1;">
            ${escapeHtml(descriptionText)}
          </p>
          <div style="background:#07080c; border:1px solid var(--border-subtle); border-radius:4px; padding:10px; margin-top:auto;">
            <div style="font-family:var(--font-mono); font-size:0.7rem; color:var(--text-dim); text-transform:uppercase; margin-bottom:4px;">
              Investigative Methodology & Specs:
            </div>
            <p style="font-size:0.8rem; color:#d1d5db;">
              ${escapeHtml(methodologyText)}
            </p>
          </div>
        </div>
      </div>
    `;
  }).join('');
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

  const currentFilter = (state.filters.media || 'ALL').trim().toUpperCase();
  const filtered = state.media.filter(item => {
    if (!item) return false;
    if (currentFilter === 'ALL') return true;
    const cat = String(item.category || item.coverageType || '').trim().toUpperCase();
    if (currentFilter === 'VIDEOS') {
      return Boolean(item.videoUrl) || cat.includes('VIDEO') || cat.includes('DOCUMENTAR') || cat.includes('TELEVISION') || cat.includes('PODCAST') || cat.includes('YOUTUBE') || cat.includes('TV');
    }
    if (currentFilter === 'TELEVISION') {
      return cat.includes('TELEVISION') || cat === 'TV' || cat.includes('BROADCAST');
    }
    if (currentFilter === 'NEWSPAPERS') {
      return cat.includes('NEWSPAPER') || cat.includes('PRESS') || cat.includes('PRINT') || cat.includes('ARTICLE');
    }
    if (currentFilter === 'PODCASTS') {
      return cat.includes('PODCAST') || cat.includes('AUDIO');
    }
    return cat === currentFilter;
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

  const currentFilter = (state.filters.gallery || 'ALL').toUpperCase().trim();
  const filtered = currentFilter === 'ALL'
    ? state.gallery
    : state.gallery.filter(g => {
        const cat = (g.category || '').toUpperCase().trim();
        if (currentFilter === 'HAUNTED LOCATIONS') {
          return cat.includes('HAUNTED');
        }
        if (currentFilter === 'MOVIE') {
          return cat.includes('MOVIE') || cat.includes('PROMOTION');
        }
        if (currentFilter === 'OPTICAL') {
          return cat.includes('OPTICAL') || cat.includes('MEDIA');
        }
        return cat.includes(currentFilter);
      });

  if (filtered.length === 0) {
    container.innerHTML = `<div style="grid-column: 1 / -1; text-align:center; padding:40px; color:var(--text-muted);">No evidence gallery items in this category.</div>`;
    return;
  }

  container.innerHTML = filtered.map(img => `
    <div class="dos-card" style="cursor:pointer;" onclick="openGalleryLightbox('${img.id}')">
      <div style="position:relative; aspect-ratio: 4/3; background:#000; overflow:hidden;">
        <img src="${img.imageUrl}" alt="${escapeHtml(img.title || '')}" style="width:100%; height:100%; object-fit:cover; transition:transform 0.4s ease;" onerror="this.src='/horror_background_wide.jpg'" onmouseover="this.style.transform='scale(1.08)'" onmouseout="this.style.transform='scale(1)'">
        <span class="status-badge open" style="position:absolute; top:12px; left:12px;">${escapeHtml(img.category || 'EVIDENCE')}</span>
      </div>
      <div style="padding:16px;">
        <div style="font-family:var(--font-mono); font-size:0.7rem; color:var(--red-primary); margin-bottom:4px;">
          ${escapeHtml(img.location || 'Field Location')} • ${escapeHtml(img.date || '')}
        </div>
        <h4 style="font-size:1rem; font-weight:700; color:#fff; margin-bottom:4px;">${escapeHtml(img.title || '')}</h4>
        <p style="font-size:0.8rem; color:var(--text-muted); line-height:1.4;">${escapeHtml(img.caption || '')}</p>
      </div>
    </div>
  `).join('');
}

// Render Research White Papers & Methodologies
function renderResearch() {
  const container = document.getElementById('researchGrid');
  if (!container) return;

  const currentFilter = (state.filters.research || 'ALL').toUpperCase();
  const filtered = currentFilter === 'ALL'
    ? state.research
    : state.research.filter(r => (r.category || '').toUpperCase().includes(currentFilter));

  if (!filtered || filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align:center; padding:50px; background:#06070a; border:1px dashed var(--border-subtle); border-radius:8px;">
        <p style="color:var(--text-muted); font-size:0.95rem; margin-bottom:12px;">No research publications found for the selected category.</p>
        <button onclick="setFilter('research', 'ALL')" class="btn-secondary" style="padding:6px 14px; font-size:0.8rem;">
          <span>RESET TO ALL PAPERS</span>
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => {
    const hasVideo = Boolean(item.videoUrl);
    const photo = item.photoUrl || '/horror_background_wide.jpg';

    return `
      <div class="dos-card" style="display:flex; flex-direction:column;">
        <div style="position:relative; aspect-ratio: 16/9; background:#000; overflow:hidden;">
          <img src="${photo}" alt="${escapeHtml(item.title)}" style="width:100%; height:100%; object-fit:cover; transition:transform 0.4s ease;" onerror="this.src='/horror_background_wide.jpg'" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'">
          <span class="status-badge documented" style="position:absolute; top:12px; left:12px; font-size:0.7rem;">
            ${escapeHtml(item.category || 'Empirical Study')}
          </span>
          ${hasVideo ? `
            <span style="position:absolute; bottom:8px; right:8px; background:rgba(220,38,38,0.92); color:#fff; font-size:0.65rem; padding:2px 8px; border-radius:4px; font-family:var(--font-mono); display:flex; align-items:center; gap:4px;">
              <span>▶</span> VIDEO EVIDENCE
            </span>
          ` : ''}
        </div>
        <div style="padding:20px; flex:1; display:flex; flex-direction:column;">
          <div style="font-family:var(--font-mono); font-size:0.72rem; color:var(--red-primary); margin-bottom:6px;">
            ${escapeHtml(item.author || 'DOS Research Division')} • ${escapeHtml(item.date || '2026')}
          </div>
          <h3 style="font-size:1.15rem; font-weight:700; color:#fff; line-height:1.35; margin-bottom:10px;">
            ${escapeHtml(item.title)}
          </h3>
          <p style="font-size:0.84rem; color:var(--text-muted); line-height:1.55; margin-bottom:16px; flex:1;">
            ${escapeHtml(item.summary || '')}
          </p>
          <div style="display:flex; gap:10px; flex-wrap:wrap; margin-top:auto;">
            <button onclick="openResearchModal('${item.id}')" class="btn-primary" style="padding:8px 14px; font-size:0.75rem; flex:1; justify-content:center;">
              <span>READ FULL WHITE PAPER 📄</span>
            </button>
            ${hasVideo ? `
              <button onclick="openResearchModal('${item.id}')" class="btn-secondary" style="padding:8px 12px; font-size:0.75rem; color:#60a5fa;">
                <span>▶ STREAM</span>
              </button>
            ` : ''}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Open Detailed Research White Paper Modal
function openResearchModal(resId) {
  const item = state.research.find(r => r.id === resId);
  if (!item) return;

  const modal = document.getElementById('researchModal');
  const body = document.getElementById('researchModalBody');
  if (!modal || !body) return;

  const photo = item.photoUrl || '/horror_background_wide.jpg';
  let videoEmbedHtml = '';

  if (item.videoUrl) {
    if (item.videoUrl.endsWith('.mp4') || item.videoUrl.endsWith('.webm') || item.videoUrl.startsWith('/uploads/')) {
      videoEmbedHtml = `
        <div style="position:relative; aspect-ratio:16/9; background:#000; border-radius:6px; overflow:hidden; margin-bottom:20px;">
          <video controls autoplay playsinline style="width:100%; height:100%; object-fit:contain;" poster="${photo}">
            <source src="${item.videoUrl}" type="video/mp4">
          </video>
        </div>
      `;
    } else if (item.videoUrl.includes('youtube.com') || item.videoUrl.includes('youtu.be')) {
      let videoId = '';
      if (item.videoUrl.includes('youtu.be/')) {
        videoId = item.videoUrl.split('youtu.be/')[1]?.split('?')[0];
      } else if (item.videoUrl.includes('v=')) {
        videoId = item.videoUrl.split('v=')[1]?.split('&')[0];
      }
      const embedUrl = videoId ? `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0` : item.videoUrl;
      videoEmbedHtml = `
        <div style="position:relative; aspect-ratio:16/9; background:#000; border-radius:6px; overflow:hidden; margin-bottom:20px; border:1px solid var(--border-color);">
          <iframe src="${embedUrl}" title="${escapeHtml(item.title)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="width:100%; height:100%; border:none;"></iframe>
        </div>
      `;
    }
  }

  body.innerHTML = `
    <div style="margin-bottom:16px;">
      <span class="status-badge documented" style="font-size:0.75rem; margin-bottom:8px; display:inline-block;">
        ${escapeHtml(item.category || 'Scientific Study')}
      </span>
      <h2 style="font-size:1.6rem; font-weight:800; color:#fff; line-height:1.3; margin-bottom:8px;">
        ${escapeHtml(item.title)}
      </h2>
      <div style="font-family:var(--font-mono); font-size:0.8rem; color:var(--red-primary);">
        Author: <strong>${escapeHtml(item.author || 'DOS Lead Investigators')}</strong> • Published: ${escapeHtml(item.date || '2026')}
      </div>
    </div>

    ${videoEmbedHtml || `
      <div style="position:relative; aspect-ratio: 16/9; background:#000; border-radius:6px; overflow:hidden; margin-bottom:20px;">
        <img src="${photo}" alt="${escapeHtml(item.title)}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='/horror_background_wide.jpg'">
      </div>
    `}

    <div style="background:rgba(220,38,38,0.06); border-left:3px solid var(--red-primary); padding:16px; margin-bottom:20px; border-radius:0 6px 6px 0;">
      <div style="font-family:var(--font-mono); font-size:0.75rem; color:var(--red-primary); font-weight:700; margin-bottom:6px;">ABSTRACT / EXECUTIVE SUMMARY</div>
      <p style="font-size:0.9rem; color:#d1d5db; line-height:1.6;">
        ${escapeHtml(item.summary || '')}
      </p>
    </div>

    <div style="font-size:0.92rem; color:#e5e7eb; line-height:1.75; margin-bottom:24px; white-space:pre-line;">
      ${escapeHtml(item.fullFindings || item.summary || '')}
    </div>

    ${item.citations ? `
      <div style="background:#06070b; border:1px solid var(--border-subtle); border-radius:6px; padding:16px;">
        <div style="font-family:var(--font-mono); font-size:0.72rem; color:var(--text-dim); text-transform:uppercase; margin-bottom:6px;">
          Empirical Citations & Archival Verification:
        </div>
        <p style="font-size:0.8rem; color:var(--text-muted); font-family:var(--font-mono); line-height:1.5;">
          ${escapeHtml(item.citations)}
        </p>
      </div>
    ` : ''}
  `;

  modal.classList.add('active');
}

// ==========================================================================
// 4. PUBLIC FORMS & MODALS
// ==========================================================================

// Handle Public Case Reporting Form
function initReportForm() {
  const form = document.getElementById('caseReportForm');
  if (!form) return;

  const recipientEmail = "team.dos.mail@gmail.com";

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    const msgBox = document.getElementById('reportFormStatus');
    
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerText = 'TRANSMITTING INCIDENT DOSSIER...';
    }

    try {
      const payload = {
        witnessName: safeGetVal('witnessName'),
        contactEmail: safeGetVal('witnessEmail'),
        contactPhone: safeGetVal('witnessPhone'),
        location: safeGetVal('incidentLocation'),
        incidentDate: safeGetVal('incidentDate'),
        activityType: safeGetVal('incidentType'),
        description: safeGetVal('incidentDescription')
      };

      const mailSubject = encodeURIComponent(`[DOS Case Report] ${payload.activityType} at ${payload.location}`);
      const mailBody = encodeURIComponent(
        `CONFIDENTIAL INCIDENT REPORT TO DOS INVESTIGATION TRIAGE\n` +
        `=======================================================\n` +
        `Target Desk: ${recipientEmail}\n` +
        `Date Submitted: ${new Date().toLocaleString()}\n\n` +
        `WITNESS DETAILS:\n` +
        `- Full Name: ${payload.witnessName}\n` +
        `- Phone Number: ${payload.contactPhone}\n` +
        `- Email Address: ${payload.contactEmail}\n` +
        `- Location / City: ${payload.location}\n` +
        `- Date of Activity: ${payload.incidentDate || 'Unspecified'}\n` +
        `- Type of Phenomenon: ${payload.activityType}\n\n` +
        `DETAILED CHRONOLOGY OF EVENTS:\n` +
        `-------------------------------------------------------\n` +
        `${payload.description}\n` +
        `-------------------------------------------------------\n` +
        (payload.attachmentUrl ? `Evidence Attachment URL: ${payload.attachmentUrl}\n` : '') +
        `=======================================================`
      );
      const mailtoLink = `mailto:${recipientEmail}?subject=${mailSubject}&body=${mailBody}`;
      const gmailWebLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipientEmail)}&su=${mailSubject}&body=${mailBody}`;

      const res = await safeApiFetch('/api/reports', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res && (res.success || !res.error)) {
        form.reset();
        if (msgBox) {
          msgBox.innerHTML = `
            <div style="background:rgba(16,185,129,0.12); border:1px solid #10b981; color:#34d399; padding:20px; border-radius:6px; margin-top:20px;">
              <h4 style="font-weight:700; margin-bottom:6px; color:#34d399;">✓ INCIDENT LOGGED & ROUTED TO GMAIL</h4>
              <p style="font-size:0.85rem; color:var(--text-main); margin-bottom:6px;">Case Reference: <strong>${res.caseId || 'DOS-INCIDENT'}</strong></p>
              <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:14px;">This incident report is routed directly to <strong style="color:var(--red-primary);">${recipientEmail}</strong>. Click below to launch Gmail Web or your email app:</p>
              <div style="display:flex; gap:10px; flex-wrap:wrap;">
                <a href="${gmailWebLink}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="display:inline-flex; align-items:center; gap:8px; font-size:0.85rem; padding:8px 16px; text-decoration:none; background:#ea4335; border-color:#ea4335;">
                  <span>✉ SEND VIA GMAIL</span>
                </a>
                <a href="${mailtoLink}" class="btn-secondary" style="display:inline-flex; align-items:center; gap:8px; font-size:0.85rem; padding:8px 16px; text-decoration:none;">
                  <span>DEFAULT EMAIL APP</span>
                </a>
              </div>
            </div>
          `;
        }
        try {
          window.open(gmailWebLink, '_blank');
        } catch (_) {
          try { window.location.href = mailtoLink; } catch (__) {}
        }
      } else {
        throw new Error(res ? res.error : 'Submission failed');
      }
    } catch (err) {
      if (msgBox) {
        const payload = {
          witnessName: safeGetVal('witnessName'),
          contactEmail: safeGetVal('witnessEmail'),
          contactPhone: safeGetVal('witnessPhone'),
          location: safeGetVal('incidentLocation'),
          incidentDate: safeGetVal('incidentDate'),
          activityType: safeGetVal('incidentType'),
          description: safeGetVal('incidentDescription')
        };
        const mailSubject = encodeURIComponent(`[DOS Case Report] ${payload.activityType} at ${payload.location}`);
        const mailBody = encodeURIComponent(
          `CONFIDENTIAL INCIDENT REPORT TO DOS INVESTIGATION TRIAGE\n` +
          `Target: ${recipientEmail}\n` +
          `Witness: ${payload.witnessName} (${payload.contactPhone} / ${payload.contactEmail})\n` +
          `Location: ${payload.location}\n` +
          `Phenomenon: ${payload.activityType}\n\n` +
          `Description:\n${payload.description}`
        );
        const fallbackMailto = `mailto:${recipientEmail}?subject=${mailSubject}&body=${mailBody}`;
        const fallbackGmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipientEmail)}&su=${mailSubject}&body=${mailBody}`;

        msgBox.innerHTML = `
          <div style="background:rgba(220,38,38,0.12); border:1px solid #dc2626; color:#f87171; padding:20px; border-radius:6px; margin-top:20px;">
            <p style="font-weight:700; margin-bottom:8px;">Please transmit your case directly to ${recipientEmail}:</p>
            <div style="display:flex; gap:10px; flex-wrap:wrap;">
              <a href="${fallbackGmail}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="display:inline-flex; align-items:center; gap:8px; font-size:0.85rem; padding:8px 16px; text-decoration:none; background:#ea4335; border-color:#ea4335;">
                <span>SEND VIA GMAIL</span>
              </a>
              <a href="${fallbackMailto}" class="btn-secondary" style="display:inline-flex; align-items:center; gap:8px; font-size:0.85rem; padding:8px 16px; text-decoration:none;">
                <span>DEFAULT EMAIL APP</span>
              </a>
            </div>
          </div>
        `;
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerText = 'TRANSMIT CASE REPORT TO TEAM.DOS.MAIL@GMAIL.COM';
      }
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

    if (btn) {
      btn.disabled = true;
      btn.innerText = 'TRANSMITTING...';
    }

    const payload = {
      name: safeGetVal('contactName'),
      email: safeGetVal('contactEmail'),
      subject: safeGetVal('contactSubject'),
      message: safeGetVal('contactMessage')
    };

    const recipientEmail = "team.dos.mail@gmail.com";
    const mailtoSubject = encodeURIComponent(payload.subject ? `[DOS HQ Inquiry] ${payload.subject}` : 'DOS Headquarters Inquiry');
    const mailtoBody = encodeURIComponent(
      `Name: ${payload.name}\nEmail: ${payload.email}\nSubject: ${payload.subject}\n\nMessage:\n${payload.message}`
    );
    const mailtoLink = `mailto:${recipientEmail}?subject=${mailtoSubject}&body=${mailtoBody}`;
    const gmailWebLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipientEmail)}&su=${mailtoSubject}&body=${mailtoBody}`;

    try {
      const res = await safeApiFetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res && (res.success || !res.error)) {
        form.reset();
        if (msgBox) {
          msgBox.innerHTML = `
            <div style="margin-top:16px; padding:20px; background:rgba(16, 185, 129, 0.08); border:1px solid #10b981; border-radius:6px;">
              <p style="color:#34d399; font-weight:600; font-size:0.95rem; margin-bottom:8px;">✓ Message recorded for DOS Headquarters!</p>
              <p style="font-size:0.85rem; color:var(--text-muted); margin-bottom:14px;">Routing to <strong style="color:var(--red-primary);">${recipientEmail}</strong>. Click below to launch Gmail Web or your default email client:</p>
              <div style="display:flex; gap:10px; flex-wrap:wrap;">
                <a href="${gmailWebLink}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="display:inline-flex; align-items:center; gap:8px; font-size:0.85rem; padding:8px 16px; text-decoration:none; background:#ea4335; border-color:#ea4335;">
                  <span>✉ SEND VIA GMAIL</span>
                </a>
                <a href="${mailtoLink}" class="btn-secondary" style="display:inline-flex; align-items:center; gap:8px; font-size:0.85rem; padding:8px 16px; text-decoration:none;">
                  <span>DEFAULT EMAIL APP</span>
                </a>
              </div>
            </div>
          `;
        }
        try {
          window.open(gmailWebLink, '_blank');
        } catch (_) {
          try { window.location.href = mailtoLink; } catch (__) {}
        }
      } else {
        throw new Error(res ? res.error : 'Transmission failed');
      }
    } catch (err) {
      if (msgBox) {
        const fallbackGmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipientEmail)}&su=${mailtoSubject}&body=${mailtoBody}`;
        msgBox.innerHTML = `
          <div style="margin-top:16px; padding:20px; background:rgba(239, 68, 68, 0.08); border:1px solid #ef4444; border-radius:6px;">
            <p style="color:#f87171; font-size:0.85rem; margin-bottom:12px; font-weight:600;">Transmit inquiry directly to ${recipientEmail}:</p>
            <div style="display:flex; gap:10px; flex-wrap:wrap;">
              <a href="${fallbackGmail}" target="_blank" rel="noopener noreferrer" class="btn-primary" style="display:inline-flex; align-items:center; gap:8px; font-size:0.85rem; padding:8px 16px; text-decoration:none; background:#ea4335; border-color:#ea4335;">
                <span>SEND VIA GMAIL</span>
              </a>
              <a href="${mailtoLink}" class="btn-secondary" style="display:inline-flex; align-items:center; gap:8px; font-size:0.85rem; padding:8px 16px; text-decoration:none;">
                <span>DEFAULT EMAIL APP</span>
              </a>
            </div>
          </div>
        `;
      }
    } finally {
      if (btn) {
        btn.disabled = false;
        btn.innerText = 'TRANSMIT MESSAGE TO TEAM.DOS.MAIL@GMAIL.COM';
      }
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

// DOS Vault Dossier Modal
function openVaultModal(vaultId) {
  const v = (state.vault || []).find(x => x.id === vaultId || x.caseId === vaultId);
  if (!v) return;

  const modal = document.getElementById('vaultModal');
  const body = document.getElementById('vaultModalBody');
  if (!modal || !body) return;

  const photo = getVaultPhoto(v);
  const catText = v.category || v.classification || 'CLASSIFIED EVIDENCE';
  const caseIdText = v.caseId || v.caseNumber || 'DOS-VLT';
  const locationText = v.location || 'Undisclosed Site';
  const dateText = v.recordedDate || v.date || v.investigationDate || 'Archived Date';
  const descText = v.fullDescription || v.description || v.synopsis || v.summary || 'Classified anomalous evidence preserved in the DOS Vault archives.';
  const analysisText = v.analysisNotes || v.analysis || v.findings || v.fullFindings || '';
  const threatLevel = String(v.threatLevel || v.status || 'Standard').toUpperCase();

  let threatColor = '#94a3b8';
  let threatBorder = 'rgba(148, 163, 184, 0.25)';
  if (threatLevel.includes('ELEVATED') || threatLevel.includes('RESTRICTED')) {
    threatColor = '#fbbf24';
    threatBorder = 'rgba(251, 191, 36, 0.4)';
  } else if (threatLevel.includes('CRITICAL') || threatLevel.includes('DEMONIC') || threatLevel.includes('EXTREME')) {
    threatColor = '#ef4444';
    threatBorder = 'rgba(239, 68, 68, 0.5)';
  }

  // Check if there are audio or video evidence items
  const audioItem = Array.isArray(v.evidenceItems) ? v.evidenceItems.find(e => e.type === 'audio' && e.fileUrl) : null;
  const videoItem = Array.isArray(v.evidenceItems) ? v.evidenceItems.find(e => e.type === 'video' && e.fileUrl) : null;

  body.innerHTML = `
    <div style="position:relative; aspect-ratio: 16/9; background:#000; border-radius:6px; overflow:hidden; margin-bottom:20px; cursor:pointer;" onclick="openVaultLightbox('${v.id}')">
      <img src="${photo}" alt="${escapeHtml(v.title)}" style="width:100%; height:100%; object-fit:cover; transition:transform 0.4s ease;" onerror="this.src='/horror_background_wide.jpg'" onmouseover="this.style.transform='scale(1.03)'" onmouseout="this.style.transform='scale(1)'">
      <span class="status-badge documented" style="position:absolute; top:14px; left:14px; font-size:0.75rem;">
        ${escapeHtml(catText)}
      </span>
      <span style="position:absolute; top:14px; right:14px; font-family:var(--font-mono); font-size:0.75rem; background:rgba(0,0,0,0.85); color:var(--red-primary); border:1px solid rgba(220,38,38,0.5); padding:3px 10px; border-radius:4px;">
        ${escapeHtml(caseIdText)}
      </span>
      <div style="position:absolute; bottom:12px; right:12px; background:rgba(0,0,0,0.82); border:1px solid rgba(255,255,255,0.25); color:#fff; padding:5px 10px; border-radius:4px; font-size:0.75rem; display:flex; align-items:center; gap:6px;">
        <span>🔍 CLICK TO ENLARGE PHOTO</span>
      </div>
    </div>

    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:8px;">
      <div style="font-family:var(--font-mono); font-size:0.8rem; color:var(--red-primary);">
        RECORDED: ${escapeHtml(dateText)} • LOCATION: ${escapeHtml(locationText)}
      </div>
      <div style="font-family:var(--font-mono); font-size:0.75rem; color:${threatColor}; border:1px solid ${threatBorder}; padding:2px 8px; border-radius:3px; background:rgba(0,0,0,0.4);">
        THREAT LEVEL: ${escapeHtml(threatLevel)}
      </div>
    </div>

    <h2 style="font-size:1.6rem; font-weight:800; color:#fff; margin-bottom:16px;">${escapeHtml(v.title)}</h2>

    <div style="font-size:0.92rem; color:#d1d5db; line-height:1.65; margin-bottom:20px; white-space:pre-line;">
      ${escapeHtml(descText)}
    </div>

    ${analysisText ? `
      <div style="background:#050508; border:1px solid var(--border-subtle); border-radius:6px; padding:16px; margin-bottom:20px;">
        <h4 style="font-family:var(--font-mono); font-size:0.75rem; color:var(--red-primary); text-transform:uppercase; margin-bottom:8px; letter-spacing:0.04em;">
          Forensic Telemetry & Containment Protocol:
        </h4>
        <div style="font-size:0.85rem; color:#e2e8f0; font-style:italic; line-height:1.6;">
          "${escapeHtml(analysisText)}"
        </div>
      </div>
    ` : ''}

    ${audioItem ? `
      <div style="background:#06080e; border:1px solid var(--border-subtle); border-radius:6px; padding:16px; margin-bottom:20px;">
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:8px;">
          <h4 style="font-family:var(--font-mono); font-size:0.75rem; color:var(--red-primary); text-transform:uppercase;">
            Sub-Audible Acoustic / EVP Capture:
          </h4>
          <span style="font-size:0.75rem; color:var(--text-dim);">${escapeHtml(audioItem.title || 'Audio Recording')}</span>
        </div>
        <audio controls style="width:100%; outline:none; filter:invert(0.9) hue-rotate(180deg);" src="${audioItem.fileUrl}"></audio>
      </div>
    ` : ''}

    ${videoItem ? `
      <div style="background:#06080e; border:1px solid var(--border-subtle); border-radius:6px; padding:16px; margin-bottom:20px;">
        <h4 style="font-family:var(--font-mono); font-size:0.75rem; color:var(--red-primary); text-transform:uppercase; margin-bottom:8px;">
          Optical Video Telemetry:
        </h4>
        <video controls style="width:100%; border-radius:4px; max-height:360px; background:#000;" src="${videoItem.fileUrl}"></video>
      </div>
    ` : ''}

    <div style="background:#06070b; border:1px solid var(--border-subtle); border-radius:6px; padding:16px; margin-bottom:20px;">
      <h4 style="font-family:var(--font-mono); font-size:0.75rem; color:var(--red-primary); text-transform:uppercase; margin-bottom:8px;">
        Classified Sensor Telemetry Breakdown:
      </h4>
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap:12px; font-size:0.8rem; color:var(--text-muted);">
        <div><strong>Electromagnetic:</strong> Calibrated Multi-Axis Spike</div>
        <div><strong>Infrared Gradient:</strong> Δ -6.8°C Delta</div>
        <div><strong>Acoustic Range:</strong> Infrasound 16–22 Hz</div>
        <div><strong>Containment Status:</strong> Archive Preserved</div>
      </div>
    </div>

    <div style="display:flex; justify-content:flex-end; gap:10px;">
      <button onclick="openVaultLightbox('${v.id}')" class="btn-primary" style="padding:8px 18px; font-size:0.8rem;">
        <span>ENLARGE EVIDENCE PHOTO</span>
      </button>
      <button onclick="closeModal('vaultModal')" class="btn-secondary" style="padding:8px 16px; font-size:0.8rem;">
        <span>CLOSE DOSSIER</span>
      </button>
    </div>
  `;

  modal.classList.add('active');
}

function openLightbox(imgUrl, title, caption) {
  const modal = document.getElementById('lightboxModal');
  const imgElem = document.getElementById('lightboxImg');
  const titleElem = document.getElementById('lightboxTitle');
  const captionElem = document.getElementById('lightboxCaption');

  if (imgElem) imgElem.src = imgUrl || '/horror_background_wide.jpg';
  if (titleElem) titleElem.textContent = title || '';
  if (captionElem) captionElem.textContent = caption || '';

  if (modal) modal.classList.add('active');
}

function openVaultLightbox(vaultId) {
  const v = (state.vault || []).find(item => item && (item.id === vaultId || item.caseId === vaultId));
  if (!v) return;
  const photo = getVaultPhoto(v);
  const title = v.title || 'DOS Classified Vault Evidence';
  const caption = v.synopsis || v.description || v.summary || '';
  openLightbox(photo, title, caption);
}

function openGalleryLightbox(galleryId) {
  const img = (state.gallery || []).find(item => item && item.id === galleryId);
  if (!img) return;
  openLightbox(img.imageUrl || '/horror_background_wide.jpg', img.title || 'Gallery Evidence Photo', img.caption || '');
}

window.openLightbox = openLightbox;
window.openVaultLightbox = openVaultLightbox;
window.openGalleryLightbox = openGalleryLightbox;

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
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
  cat.textContent = (item.category || 'BROADCAST').toUpperCase();
  meta.textContent = `Publication: ${item.publication || 'DOS Archives'} • Release Date: ${item.date || '2026'}`;
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
      <iframe src="${embedUrl}" title="${escapeHtml(item.title)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen style="width:100%; height:100%; border:none;"></iframe>
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
    container.innerHTML = '';
  }
  if (modal) modal.classList.remove('active');
}

// Modal and Form Controls for Admin Video Upload (Legacy Shortcut)
let currentVideoSourceMode = 'file';

function setVideoSourceMode(mode) {
  currentVideoSourceMode = mode;
  const btnUpload = document.getElementById('btnSourceUpload');
  const btnUrl = document.getElementById('btnSourceUrl');
  const fileBlock = document.getElementById('videoSourceFileBlock');
  const urlBlock = document.getElementById('videoSourceUrlBlock');

  if (mode === 'file') {
    if (btnUpload) btnUpload.className = 'btn-primary';
    if (btnUrl) btnUrl.className = 'btn-secondary';
    if (fileBlock) fileBlock.style.display = 'block';
    if (urlBlock) urlBlock.style.display = 'none';
  } else {
    if (btnUpload) btnUpload.className = 'btn-secondary';
    if (btnUrl) btnUrl.className = 'btn-primary';
    if (fileBlock) fileBlock.style.display = 'none';
    if (urlBlock) urlBlock.style.display = 'block';
  }
}

function handleVideoFileSelection(input) {
  const label = document.getElementById('videoFileSelectedName');
  if (input.files && input.files[0]) {
    const f = input.files[0];
    const sizeMb = (f.size / (1024 * 1024)).toFixed(2);
    if (label) label.innerHTML = `<span style="color:#34d399; font-weight:700;">Selected: ${f.name} (${sizeMb} MB)</span>`;
  } else {
    if (label) label.textContent = 'Supports files up to 150MB';
  }
}

function updateAdminVideoUrlPreview(url) {
  const container = document.getElementById('adminVideoUrlPreviewBox');
  const wrap = document.getElementById('adminVideoUrlPreviewWrap');
  const clearBtn = document.getElementById('adminVideoUrlClearBtn');

  if (!url || !url.trim()) {
    if (wrap) wrap.style.display = 'none';
    if (container) {
      container.innerHTML = '';
    }
    if (clearBtn) clearBtn.style.display = 'none';
    return;
  }

  if (clearBtn) clearBtn.style.display = 'flex';
  if (wrap) wrap.style.display = 'block';

  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    let videoId = '';
    if (url.includes('youtu.be/')) videoId = url.split('youtu.be/')[1]?.split('?')[0];
    else if (url.includes('v=')) videoId = url.split('v=')[1]?.split('&')[0];
    const embedUrl = videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : url;
    if (container) {
      container.innerHTML = `
        <iframe src="${embedUrl}" style="width:100%; height:100%; border:none;" allowfullscreen></iframe>
      `;
    }
  } else {
    if (container) {
      container.innerHTML = `
        <video controls autoplay muted style="width:100%; height:100%; object-fit:contain; background:#000;">
          <source src="${escapeHtml(url)}">
        </video>
      `;
    }
  }
}

function clearAdminVideoUrlPreview() {
  const urlInput = document.getElementById('adminVideoUrlInput');
  if (urlInput) urlInput.value = '';
  
  const wrap = document.getElementById('adminVideoUrlPreviewWrap');
  if (wrap) wrap.style.display = 'none';
  
  const container = document.getElementById('adminVideoUrlPreviewBox');
  if (container) container.innerHTML = '';

  const clearBtn = document.getElementById('adminVideoUrlClearBtn');
  if (clearBtn) clearBtn.style.display = 'none';
}

function openAdminVideoUploadModal() {
  openAdminEntityModal('media');
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

    if (currentVideoSourceMode === 'file' && videoFileInput && videoFileInput.files.length > 0) {
      formData.append('videoFile', videoFileInput.files[0]);
    } else if (currentVideoSourceMode === 'url' && videoUrlInput && videoUrlInput.value) {
      formData.append('videoUrl', videoUrlInput.value);
    }

    if (thumbnailFileInput && thumbnailFileInput.files.length > 0) {
      formData.append('thumbnailFile', thumbnailFileInput.files[0]);
    }

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

// ==========================================================================
// 5. ADMIN CONSOLE & UNIVERSAL CMS (SIDEBAR, MULTI-TAB, CRUD)
// ==========================================================================

async function verifyAdminSession() {
  try {
    if (!state.authToken) {
      logoutAdmin();
      return;
    }
    const res = await safeApiFetch('/api/auth/me', {
      headers: { 'Authorization': `Bearer ${state.authToken}` }
    });
    if (res && res.user) {
      state.currentUser = res.user;
      if (state.currentPage === 'admin') {
        renderAdminPanel();
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
    if (loginSection) loginSection.style.display = 'block';
    if (dashboardSection) dashboardSection.style.display = 'none';
    initAdminLoginForm();
  } else {
    if (loginSection) loginSection.style.display = 'none';
    if (dashboardSection) dashboardSection.style.display = 'block';
    renderAdminDashboard();
  }
}

function initAdminLoginForm() {
  const form = document.getElementById('adminLoginForm');
  if (!form) return;

  form.onsubmit = async (e) => {
    e.preventDefault();
    const email = safeGetVal('adminEmail');
    const password = safeGetVal('adminPassword');
    const errorBox = document.getElementById('adminLoginError');

    try {
      const data = await safeApiFetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (data && data.success) {
        state.authToken = data.token;
        state.currentUser = data.user;
        safeSetStorage('dos_auth_token', data.token);
        if (errorBox) errorBox.style.display = 'none';
        renderAdminPanel();
      } else {
        if (errorBox) {
          errorBox.textContent = (data && data.error) ? data.error : 'Invalid investigator credentials';
          errorBox.style.display = 'block';
        }
      }
    } catch (err) {
      if (errorBox) {
        errorBox.textContent = 'Server communication error';
        errorBox.style.display = 'block';
      }
    }
  };
}

function logoutAdmin() {
  state.authToken = null;
  state.currentUser = null;
  safeRemoveStorage('dos_auth_token');
  renderAdminPanel();
}

// Switch between Admin tabs in Sidebar
function switchAdminTab(tabId) {
  // Update sidebar buttons
  document.querySelectorAll('.admin-sidebar-nav-btn').forEach(btn => {
    const onclickAttr = btn.getAttribute('onclick') || '';
    if (onclickAttr.includes(`'${tabId}'`)) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  // Toggle panes
  document.querySelectorAll('.admin-tab-pane').forEach(pane => {
    pane.classList.remove('active');
  });

  const targetPane = document.getElementById(`admin-tab-${tabId}`);
  if (targetPane) {
    targetPane.classList.add('active');
  }
}

// Refresh all Admin statistics and tab views
async function renderAdminDashboard() {
  try {
    const [stats, reports, messages] = await Promise.all([
      safeApiFetch('/api/stats', { headers: { 'Authorization': `Bearer ${state.authToken}` } }),
      safeApiFetch('/api/reports', { headers: { 'Authorization': `Bearer ${state.authToken}` } }),
      safeApiFetch('/api/contact', { headers: { 'Authorization': `Bearer ${state.authToken}` } })
    ]);

    state.stats = (stats && !stats.error) ? stats : {};
    state.reports = Array.isArray(reports) ? reports : [];
    state.messages = Array.isArray(messages) ? messages : [];

    const pendingCount = state.reports.filter(r => (r.status || 'Pending') === 'Pending').length;

    // Update Overview Metric Numbers
    const elResCount = document.getElementById('statResearchCount');
    const elInvCount = document.getElementById('statTotalInvestigations');
    const elMedCount = document.getElementById('statMediaCount');
    const elRepCount = document.getElementById('statPendingReports');

    if (elResCount) elResCount.textContent = state.research.length;
    if (elInvCount) elInvCount.textContent = state.investigations.length;
    if (elMedCount) elMedCount.textContent = state.media.length;
    if (elRepCount) elRepCount.textContent = pendingCount;

    // Update Sidebar Badges
    const bRes = document.getElementById('badgeAdminResearch');
    const bInv = document.getElementById('badgeAdminInvestigations');
    const bVlt = document.getElementById('badgeAdminVault');
    const bEq = document.getElementById('badgeAdminEquipment');
    const bMed = document.getElementById('badgeAdminMedia');
    const bTm = document.getElementById('badgeAdminTeam');
    const bGal = document.getElementById('badgeAdminGallery');
    const bRep = document.getElementById('badgeAdminReports');
    const bMsg = document.getElementById('badgeAdminMessages');

    if (bRes) bRes.textContent = state.research.length;
    if (bInv) bInv.textContent = state.investigations.length;
    if (bVlt) bVlt.textContent = state.vault.length;
    if (bEq) bEq.textContent = state.equipment.length;
    if (bMed) bMed.textContent = state.media.length;
    if (bTm) bTm.textContent = state.team.length;
    if (bGal) bGal.textContent = state.gallery.length;
    if (bRep) bRep.textContent = pendingCount;
    if (bMsg) bMsg.textContent = state.messages.length;

    // Render each Admin Tab list
    renderAdminRecentInvList();
    renderAdminResearchList();
    renderAdminInvestigationsList();
    renderAdminVaultList();
    renderAdminEquipmentList();
    renderAdminMediaList();
    renderAdminTeamList();
    renderAdminGalleryList();
    renderAdminReportsList();
    renderAdminMessagesList();
    renderAdminSettingsForm();
  } catch (e) {
    console.error('Error rendering admin dashboard stats', e);
  }
}

// Admin: Overview Recent Investigations
function renderAdminRecentInvList() {
  const container = document.getElementById('adminRecentInvList');
  if (!container) return;

  const recent = state.investigations.slice(0, 4);
  if (recent.length === 0) {
    container.innerHTML = `<p style="color:var(--text-muted); font-size:0.85rem;">No cases on record.</p>`;
    return;
  }

  container.innerHTML = recent.map(inv => `
    <div style="background:#08090d; border:1px solid var(--border-subtle); border-radius:6px; padding:12px 16px; display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
      <div>
        <div style="display:flex; align-items:center; gap:8px; margin-bottom:2px;">
          <span class="status-badge ${inv.status.toLowerCase()}" style="font-size:0.65rem; padding:2px 6px;">${inv.status}</span>
          <span style="font-family:var(--font-mono); font-size:0.75rem; color:var(--red-primary);">${escapeHtml(inv.caseNumber)}</span>
        </div>
        <h4 style="font-size:0.95rem; font-weight:700; color:#fff;">${escapeHtml(inv.title)}</h4>
        <div style="font-size:0.75rem; color:var(--text-dim);">${escapeHtml(inv.location)} • ${escapeHtml(inv.date)}</div>
      </div>
      <button onclick="openAdminEntityModal('investigations', '${inv.id}')" class="btn-secondary" style="padding:6px 12px; font-size:0.75rem;">
        <span>EDIT DOSSIER ✎</span>
      </button>
    </div>
  `).join('');
}

// Admin: Research List
function renderAdminResearchList(filteredList) {
  const container = document.getElementById('adminResearchList');
  if (!container) return;

  const items = filteredList || state.research;
  if (items.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:30px; background:#06070a; border:1px dashed var(--border-subtle); border-radius:6px;">
        <p style="color:var(--text-muted); font-size:0.85rem; margin-bottom:12px;">No research white papers registered.</p>
        <button onclick="openAdminEntityModal('research')" class="btn-primary" style="padding:8px 16px; font-size:0.8rem;">
          <span>+ PUBLISH FIRST WHITE PAPER</span>
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = items.map(item => `
    <div style="background:#08090d; border:1px solid var(--border-subtle); border-radius:6px; padding:16px; display:flex; gap:16px; align-items:center; justify-content:space-between; flex-wrap:wrap;">
      <div style="display:flex; gap:16px; align-items:center; flex:1; min-width:280px;">
        <div style="position:relative; width:90px; aspect-ratio:16/9; background:#000; border-radius:4px; overflow:hidden; flex-shrink:0;">
          <img src="${item.photoUrl || '/horror_background_wide.jpg'}" alt="${escapeHtml(item.title)}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='/horror_background_wide.jpg'">
          ${item.videoUrl ? `<span style="position:absolute; bottom:2px; right:2px; font-size:0.55rem; background:rgba(220,38,38,0.9); color:#fff; padding:1px 4px; border-radius:2px; font-family:var(--font-mono);">▶ VIDEO</span>` : ''}
        </div>
        <div>
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
            <span class="status-badge documented" style="font-size:0.65rem; padding:2px 6px;">${escapeHtml(item.category || 'Research')}</span>
            <span style="font-family:var(--font-mono); font-size:0.75rem; color:var(--text-dim);">${escapeHtml(item.author)} • ${escapeHtml(item.date)}</span>
          </div>
          <h4 style="font-size:0.95rem; font-weight:700; color:#fff; margin-bottom:2px;">${escapeHtml(item.title)}</h4>
          <p style="font-size:0.78rem; color:var(--text-muted); line-height:1.4; max-width:650px;">${escapeHtml((item.summary || '').slice(0, 120))}...</p>
        </div>
      </div>
      <div style="display:flex; gap:8px; align-items:center;">
        <button onclick="openResearchModal('${item.id}')" class="btn-secondary" style="padding:6px 12px; font-size:0.75rem;">
          <span>👁 PREVIEW</span>
        </button>
        <button onclick="openAdminEntityModal('research', '${item.id}')" class="btn-secondary" style="padding:6px 12px; font-size:0.75rem; color:#38bdf8;">
          <span>✎ EDIT</span>
        </button>
        <button type="button" onclick="deleteAdminItem('research', '${item.id}')" title="Delete Research Paper" class="btn-secondary" style="padding:6px 12px; font-size:0.75rem; color:#f87171; border-color:rgba(239,68,68,0.3);">
          <span>🗑 DELETE</span>
        </button>
      </div>
    </div>
  `).join('');
}

// Admin: Investigations List
function renderAdminInvestigationsList(filteredList) {
  const container = document.getElementById('adminInvestigationsList');
  if (!container) return;

  const items = filteredList || state.investigations;
  if (items.length === 0) {
    container.innerHTML = `<div style="text-align:center; padding:30px; color:var(--text-muted);">No investigation records found.</div>`;
    return;
  }

  container.innerHTML = items.map(inv => `
    <div style="background:#08090d; border:1px solid var(--border-subtle); border-radius:6px; padding:16px; display:flex; gap:16px; align-items:center; justify-content:space-between; flex-wrap:wrap;">
      <div style="display:flex; gap:16px; align-items:center; flex:1; min-width:280px;">
        <img src="${inv.heroImage}" alt="${escapeHtml(inv.title)}" style="width:90px; aspect-ratio:16/9; object-fit:cover; border-radius:4px;" onerror="this.src='/horror_background_wide.jpg'">
        <div>
          <div style="display:flex; align-items:center; gap:8px; margin-bottom:3px;">
            <span class="status-badge ${inv.status.toLowerCase()}" style="font-size:0.65rem; padding:2px 6px;">${inv.status}</span>
            <span style="font-family:var(--font-mono); font-size:0.75rem; color:var(--red-primary);">${escapeHtml(inv.caseNumber)}</span>
          </div>
          <h4 style="font-size:0.95rem; font-weight:700; color:#fff;">${escapeHtml(inv.title)}</h4>
          <div style="font-size:0.75rem; color:var(--text-dim);">${escapeHtml(inv.location)} • ${escapeHtml(inv.date)}</div>
        </div>
      </div>
      <div style="display:flex; gap:8px; align-items:center;">
        <button onclick="openInvestigationModal('${inv.id}')" class="btn-secondary" style="padding:6px 12px; font-size:0.75rem;">
          <span>👁 PREVIEW</span>
        </button>
        <button onclick="openAdminEntityModal('investigations', '${inv.id}')" class="btn-secondary" style="padding:6px 12px; font-size:0.75rem; color:#38bdf8;">
          <span>✎ EDIT</span>
        </button>
        <button type="button" onclick="deleteAdminItem('investigations', '${inv.id}')" title="Delete Investigation" class="btn-secondary" style="padding:6px 12px; font-size:0.75rem; color:#f87171; border-color:rgba(239,68,68,0.3);">
          <span>🗑 DELETE</span>
        </button>
      </div>
    </div>
  `).join('');
}

// Admin: Vault Cases List
function renderAdminVaultList(filteredList) {
  const container = document.getElementById('adminVaultList');
  if (!container) return;

  const items = filteredList || state.vault;
  if (!items || items.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:30px; background:#06070a; border:1px dashed var(--border-subtle); border-radius:6px;">
        <p style="color:var(--text-muted); font-size:0.85rem; margin-bottom:12px;">No classified vault cases found.</p>
        <button onclick="openAdminEntityModal('vault')" class="btn-primary" style="padding:8px 16px; font-size:0.8rem;">
          <span>+ RECORD FIRST VAULT ARTIFACT</span>
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = items.map(v => {
    const photo = getVaultPhoto(v);
    const cat = v.category || v.classification || 'Spectral';
    const threat = v.threatLevel || 'Standard';

    return `
      <div style="background:#08090d; border:1px solid var(--border-subtle); border-radius:6px; padding:16px; display:flex; gap:16px; align-items:center; justify-content:space-between; flex-wrap:wrap;">
        <div style="display:flex; gap:16px; align-items:center; flex:1; min-width:280px;">
          <div style="position:relative; width:95px; aspect-ratio:16/10; background:#000; border-radius:4px; overflow:hidden; flex-shrink:0; cursor:pointer;" onclick="openVaultLightbox('${v.id}')">
            <img src="${photo}" alt="${escapeHtml(v.title)}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='/horror_background_wide.jpg'">
            <span style="position:absolute; bottom:2px; right:2px; font-size:0.55rem; background:rgba(0,0,0,0.85); color:#fff; padding:1px 4px; border-radius:2px; font-family:var(--font-mono);">🔍</span>
          </div>
          <div>
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:3px; flex-wrap:wrap;">
              <span class="status-badge documented" style="font-size:0.65rem; padding:2px 6px;">${escapeHtml(cat)}</span>
              <span style="font-family:var(--font-mono); font-size:0.75rem; color:#ef4444;">Threat: ${escapeHtml(threat)}</span>
              <span style="font-family:var(--font-mono); font-size:0.72rem; color:var(--red-primary);">${escapeHtml(v.caseId || 'DOS-VLT')}</span>
            </div>
            <h4 style="font-size:0.95rem; font-weight:700; color:#fff; margin-bottom:2px;">${escapeHtml(v.title)}</h4>
            <div style="font-size:0.75rem; color:var(--text-dim); margin-bottom:3px;">
              ${escapeHtml(v.location || 'Site Classified')} • ${escapeHtml(v.recordedDate || v.date || 'Archived Date')}
            </div>
            <p style="font-size:0.78rem; color:var(--text-muted);">${escapeHtml((v.synopsis || v.description || '').slice(0, 100))}...</p>
          </div>
        </div>
        <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
          <label class="btn-secondary" style="padding:6px 12px; font-size:0.75rem; cursor:pointer;" title="Upload or replace artifact photograph">
            <span>📷 UPLOAD PHOTO</span>
            <input type="file" accept="image/*,.jfif" style="display:none;" onchange="uploadVaultPhoto('${v.id}', this.files[0])">
          </label>
          <button onclick="openAdminEntityModal('vault', '${v.id}')" class="btn-secondary" style="padding:6px 12px; font-size:0.75rem; color:#38bdf8;">
            <span>✎ EDIT</span>
          </button>
          <button type="button" onclick="deleteAdminItem('vault', '${v.id}')" title="Delete Vault Case" class="btn-secondary" style="padding:6px 12px; font-size:0.75rem; color:#f87171; border-color:rgba(239,68,68,0.3);">
            <span>🗑 DELETE</span>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// Admin: Equipment List
function renderAdminEquipmentList(filteredList) {
  const container = document.getElementById('adminEquipmentList');
  if (!container) return;

  const items = filteredList || state.equipment || [];
  if (items.length === 0) {
    container.innerHTML = `<div style="text-align:center; padding:30px; color:var(--text-muted);">No equipment arsenal items found.</div>`;
    return;
  }

  container.innerHTML = items.map(eq => {
    const photo = eq.imageUrl || eq.photoUrl || '/horror_background_wide.jpg';
    const specsDisplay = typeof eq.specs === 'string' ? eq.specs : (eq.specs ? Object.entries(eq.specs).map(([k, v]) => `${k}: ${v}`).join(', ') : (eq.description || eq.usage || 'Calibrated Sensor Hardware'));

    return `
      <div style="background:#08090d; border:1px solid var(--border-subtle); border-radius:6px; padding:16px; display:flex; gap:16px; align-items:center; justify-content:space-between; flex-wrap:wrap;">
        <div style="display:flex; gap:16px; align-items:center; flex:1; min-width:280px;">
          <div style="position:relative; width:80px; height:80px; flex-shrink:0; border-radius:4px; overflow:hidden; background:#000; border:1px solid var(--border-color);">
            <img src="${photo}" alt="${escapeHtml(eq.name || 'Equipment')}" style="width:100%; height:100%; object-fit:cover;" onerror="this.src='/horror_background_wide.jpg'">
            <label title="Click to upload/change equipment photo" style="position:absolute; bottom:0; left:0; right:0; background:rgba(0,0,0,0.85); color:#38bdf8; font-size:0.6rem; text-align:center; padding:2px 0; cursor:pointer; font-family:var(--font-mono); font-weight:700;">
              📷 PHOTO
              <input type="file" accept="image/*,.jfif" style="display:none;" onchange="uploadEquipmentPhoto('${eq.id}', this.files[0])">
            </label>
          </div>
          <div>
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:2px;">
              <span class="status-badge open" style="font-size:0.65rem; padding:2px 6px;">${escapeHtml(eq.category || 'Equipment')}</span>
              <span style="font-family:var(--font-mono); font-size:0.7rem; color:var(--text-dim);">${escapeHtml(eq.status || 'Operational')}</span>
            </div>
            <h4 style="font-size:0.95rem; font-weight:700; color:#fff; margin-top:2px;">${escapeHtml(eq.name || 'Equipment')}</h4>
            <div style="font-family:var(--font-mono); font-size:0.75rem; color:var(--text-dim); max-width:450px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
              ${escapeHtml(specsDisplay)}
            </div>
          </div>
        </div>
        <div style="display:flex; gap:8px; align-items:center;">
          <button onclick="openAdminEntityModal('equipment', '${eq.id}')" class="btn-secondary" style="padding:6px 12px; font-size:0.75rem; color:#38bdf8;">
            <span>✎ EDIT</span>
          </button>
          <button type="button" onclick="deleteAdminItem('equipment', '${eq.id}')" title="Delete Equipment" class="btn-secondary" style="padding:6px 12px; font-size:0.75rem; color:#f87171; border-color:rgba(239,68,68,0.3);">
            <span>🗑 DELETE</span>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// Admin: Media Coverage List
function renderAdminMediaList(filteredList) {
  const container = document.getElementById('adminMediaList');
  if (!container) return;

  const items = filteredList || state.media;
  if (items.length === 0) {
    container.innerHTML = `
      <div style="text-align:center; padding:30px; background:#06070a; border:1px dashed var(--border-subtle); border-radius:6px;">
        <p style="color:var(--text-muted); font-size:0.85rem; margin-bottom:12px;">No media broadcasts registered.</p>
        <button onclick="openAdminEntityModal('media')" class="btn-primary" style="padding:8px 16px; font-size:0.8rem;">
          <span>+ ADD MEDIA COVERAGE</span>
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = items.map(item => {
    const hasVideo = Boolean(item.videoUrl);
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
              <span>▶ PREVIEW</span>
            </button>
          ` : ''}
          <button onclick="openAdminEntityModal('media', '${item.id}')" class="btn-secondary" style="padding:6px 12px; font-size:0.75rem; color:#38bdf8;">
            <span>✎ EDIT</span>
          </button>
          <button type="button" onclick="deleteAdminItem('media', '${item.id}')" title="Delete Media Coverage" class="btn-secondary" style="padding:6px 12px; font-size:0.75rem; color:#f87171; border-color:rgba(239,68,68,0.3);">
            <span>🗑 DELETE</span>
          </button>
        </div>
      </div>
    `;
  }).join('');
}

// Admin: Team Personnel List
function renderAdminTeamList(filteredList) {
  const container = document.getElementById('adminTeamList');
  if (!container) return;

  const items = filteredList || state.team;
  if (items.length === 0) {
    container.innerHTML = `<div style="text-align:center; padding:30px; color:var(--text-muted);">No team members registered.</div>`;
    return;
  }

  container.innerHTML = items.map(member => `
    <div style="background:#08090d; border:1px solid var(--border-subtle); border-radius:6px; padding:16px; display:flex; gap:16px; align-items:center; justify-content:space-between; flex-wrap:wrap;">
      <div style="display:flex; align-items:center; gap:16px;">
        <img src="${getMemberPhoto(member.name, member.photoUrl)}" alt="${escapeHtml(member.name)}" style="width:60px; height:80px; object-fit:cover; border-radius:4px; border:1px solid var(--red-primary);" onerror="this.src='${getMemberPhoto(member.name, null)}'">
        <div>
          <h4 style="font-size:1.1rem; font-weight:700; color:#fff;">${escapeHtml(member.name)}</h4>
          <div style="font-family:var(--font-mono); font-size:0.75rem; color:var(--red-primary);">${escapeHtml(member.role)}</div>
          <p style="font-size:0.8rem; color:var(--text-muted);">${escapeHtml(member.expertise)}</p>
        </div>
      </div>
      <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
        <label class="btn-secondary" style="padding:6px 12px; font-size:0.75rem; cursor:pointer;">
          <span>UPLOAD PHOTO</span>
          <input type="file" accept="image/*,.jfif" style="display:none;" onchange="uploadMemberPhoto('${member.id}', this.files[0])">
        </label>
        <button onclick="openAdminEntityModal('team', '${member.id}')" class="btn-secondary" style="padding:6px 12px; font-size:0.75rem; color:#38bdf8;">
          <span>✎ EDIT</span>
        </button>
        <button type="button" onclick="deleteAdminItem('team', '${member.id}')" title="Delete Team Member" class="btn-secondary" style="padding:6px 12px; font-size:0.75rem; color:#f87171; border-color:rgba(239,68,68,0.3);">
          <span>🗑 DELETE</span>
        </button>
      </div>
    </div>
  `).join('');
}

// Admin: Gallery List
function renderAdminGalleryList(filteredList) {
  const container = document.getElementById('adminGalleryList');
  if (!container) return;

  const items = filteredList || state.gallery;
  if (items.length === 0) {
    container.innerHTML = `<div style="text-align:center; padding:30px; color:var(--text-muted);">No evidence gallery photos uploaded.</div>`;
    return;
  }

  container.innerHTML = items.map(img => `
    <div style="background:#08090d; border:1px solid var(--border-subtle); border-radius:6px; padding:16px; display:flex; gap:16px; align-items:center; justify-content:space-between; flex-wrap:wrap;">
      <div style="display:flex; gap:16px; align-items:center; flex:1; min-width:280px;">
        <img src="${img.imageUrl}" alt="${escapeHtml(img.title)}" style="width:80px; aspect-ratio:4/3; object-fit:cover; border-radius:4px;" onerror="this.src='/horror_background_wide.jpg'">
        <div>
          <span class="status-badge open" style="font-size:0.65rem; padding:2px 6px;">${escapeHtml(img.category)}</span>
          <h4 style="font-size:0.95rem; font-weight:700; color:#fff; margin-top:2px;">${escapeHtml(img.title)}</h4>
          <div style="font-size:0.75rem; color:var(--text-dim);">${escapeHtml(img.location)} • ${escapeHtml(img.date)}</div>
        </div>
      </div>
      <div style="display:flex; gap:8px; align-items:center;">
        <button onclick="openGalleryLightbox('${img.id}')" class="btn-secondary" style="padding:6px 12px; font-size:0.75rem;">
          <span>👁 VIEW</span>
        </button>
        <button onclick="openAdminEntityModal('gallery', '${img.id}')" class="btn-secondary" style="padding:6px 12px; font-size:0.75rem; color:#38bdf8;">
          <span>✎ EDIT</span>
        </button>
        <button type="button" onclick="deleteAdminItem('gallery', '${img.id}')" title="Delete Gallery Photo" class="btn-secondary" style="padding:6px 12px; font-size:0.75rem; color:#f87171; border-color:rgba(239,68,68,0.3);">
          <span>🗑 DELETE</span>
        </button>
      </div>
    </div>
  `).join('');
}

// Admin: Incident Reports Triage List
function renderAdminReportsList() {
  const container = document.getElementById('adminReportsList');
  if (!container) return;

  if (state.reports.length === 0) {
    container.innerHTML = `<div style="text-align:center; padding:30px; color:var(--text-muted);">No incident report dossiers submitted yet.</div>`;
    return;
  }

  container.innerHTML = state.reports.map(rep => {
    const isPending = (rep.status || 'Pending') === 'Pending';
    return `
      <div style="background:#08090d; border:1px solid ${isPending ? 'rgba(239,68,68,0.4)' : 'var(--border-subtle)'}; border-radius:6px; padding:16px;">
        <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:10px; flex-wrap:wrap; gap:10px;">
          <div>
            <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
              <span class="status-badge ${isPending ? 'open' : 'closed'}" style="font-size:0.7rem;">${rep.status || 'Pending'}</span>
              <span style="font-family:var(--font-mono); font-size:0.8rem; color:var(--red-primary);">DOSSIER #${escapeHtml(rep.caseId || rep.id)}</span>
            </div>
            <h4 style="font-size:1.1rem; font-weight:700; color:#fff;">${escapeHtml(rep.witnessName)} - ${escapeHtml(rep.activityType)}</h4>
            <div style="font-size:0.78rem; color:var(--text-muted); font-family:var(--font-mono);">
              Email: ${escapeHtml(rep.contactEmail)} | Phone: ${escapeHtml(rep.contactPhone || 'N/A')} | Location: ${escapeHtml(rep.location)}
            </div>
          </div>
          <div style="display:flex; gap:8px; align-items:center; flex-wrap:wrap;">
            <select onchange="updateReportStatus('${rep.id}', this.value)" style="background:#11141c; color:#fff; border:1px solid var(--border-subtle); padding:6px 10px; border-radius:4px; font-size:0.75rem; font-family:var(--font-mono);">
              <option value="Pending" ${rep.status === 'Pending' ? 'selected' : ''}>Status: Pending</option>
              <option value="Investigating" ${rep.status === 'Investigating' ? 'selected' : ''}>Status: Active Investigation</option>
              <option value="Resolved" ${rep.status === 'Resolved' ? 'selected' : ''}>Status: Resolved / Closed</option>
              <option value="Demystified" ${rep.status === 'Demystified' ? 'selected' : ''}>Status: Demystified (Natural)</option>
            </select>
            <button type="button" onclick="deleteAdminItem('reports', '${rep.id}')" title="Delete Dossier" class="btn-secondary" style="padding:6px 10px; font-size:0.75rem; color:#f87171; border-color:rgba(239,68,68,0.3);">
              <span>🗑</span>
            </button>
          </div>
        </div>
        <div style="background:#040508; border-radius:4px; padding:12px; font-size:0.85rem; color:#e5e7eb; line-height:1.5; margin-bottom:10px;">
          ${escapeHtml(rep.description)}
        </div>
        ${rep.attachmentUrl ? `
          <div style="display:flex; align-items:center; gap:8px; font-size:0.8rem;">
            <span style="color:var(--text-dim);">Evidence Attachment:</span>
            <a href="${rep.attachmentUrl}" target="_blank" class="btn-secondary" style="padding:4px 8px; font-size:0.7rem;">
              <span>VIEW ATTACHMENT ↗</span>
            </a>
          </div>
        ` : ''}
      </div>
    `;
  }).join('');
}

// Admin: Contact Messages List
function renderAdminMessagesList() {
  const container = document.getElementById('adminMessagesList');
  if (!container) return;

  if (state.messages.length === 0) {
    container.innerHTML = `<div style="text-align:center; padding:30px; color:var(--text-muted);">No contact messages logged.</div>`;
    return;
  }

  container.innerHTML = state.messages.map(msg => `
    <div style="background:#08090d; border:1px solid var(--border-subtle); border-radius:6px; padding:16px;">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:8px; flex-wrap:wrap; gap:8px;">
        <div>
          <h4 style="font-size:1rem; font-weight:700; color:#fff;">${escapeHtml(msg.subject || 'General Inquiry')}</h4>
          <div style="font-size:0.75rem; color:var(--text-dim); font-family:var(--font-mono);">
            From: <strong>${escapeHtml(msg.name)}</strong> (${escapeHtml(msg.email)}) • ${msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : 'Recent'}
          </div>
        </div>
        <button type="button" onclick="deleteAdminItem('messages', '${msg.id}')" title="Delete Message" class="btn-secondary" style="padding:4px 8px; font-size:0.75rem; color:#f87171; border-color:rgba(239,68,68,0.3);">
          <span>🗑</span>
        </button>
      </div>
      <div style="background:#040508; border-radius:4px; padding:12px; font-size:0.85rem; color:#d1d5db; line-height:1.5;">
        ${escapeHtml(msg.message)}
      </div>
    </div>
  `).join('');
}

// Helper utilities for DOM manipulation with strict null-safety
function safeGetEl(id) {
  return document.getElementById(id);
}

function safeGetVal(id, fallback = '') {
  const el = document.getElementById(id);
  return (el && el.value !== undefined) ? el.value : fallback;
}

function safeSetVal(id, val) {
  const el = document.getElementById(id);
  if (el && 'value' in el) {
    el.value = (val !== undefined && val !== null) ? val : '';
  }
}

function safeSetText(id, text) {
  const el = document.getElementById(id);
  if (el) {
    el.textContent = (text !== undefined && text !== null) ? text : '';
  }
}

function safeSetDisplay(id, show) {
  const el = document.getElementById(id);
  if (el) {
    el.style.display = show ? '' : 'none';
  }
}

// Admin: Settings Form
function renderAdminSettingsForm() {
  if (!state.settings) return;
  safeSetVal('settingSiteName', state.settings.siteName || '');
  safeSetVal('settingTagline', state.settings.motto || '');
  safeSetVal('settingPhone', state.settings.contactPhone || '');
  safeSetVal('settingEmail', state.settings.contactEmail || '');
  safeSetVal('settingAddress', state.settings.headquartersAddress || '');
  safeSetVal('settingEmergencyStatus', state.settings.emergencyStatus || '');
  safeSetVal('settingAboutText', state.settings.aboutSummary || '');
}

function initAdminSettingsForm() {
  const form = document.getElementById('adminSettingsForm');
  if (!form) return;

  form.onsubmit = async (e) => {
    e.preventDefault();
    if (!state.authToken) return;

    const statusBox = document.getElementById('adminSettingsStatus') || document.getElementById('settingsStatusMsg');
    const submitBtn = form.querySelector('button[type="submit"]');

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>SAVING SETTINGS...</span>';
    }

    const payload = {
      siteName: safeGetVal('settingSiteName', state.settings.siteName),
      contactPhone: safeGetVal('settingPhone', state.settings.contactPhone),
      contactEmail: safeGetVal('settingEmail', state.settings.contactEmail),
      headquartersAddress: safeGetVal('settingAddress', state.settings.headquartersAddress),
      emergencyStatus: safeGetVal('settingEmergencyStatus', state.settings.emergencyStatus),
      aboutSummary: safeGetVal('settingAboutText', state.settings.aboutSummary)
    };

    try {
      const res = await safeApiFetch('/api/settings', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.authToken}`
        },
        body: JSON.stringify(payload)
      });

      if (res && !res.error) {
        state.settings = res;
      } else {
        state.settings = { ...state.settings, ...payload };
      }
      renderSiteInfo();
      if (statusBox) {
        statusBox.innerHTML = '<span style="color:#34d399; font-weight:700;">✓ Organization settings updated across public website!</span>';
      }
    } catch (err) {
      if (statusBox) {
        statusBox.innerHTML = '<span style="color:#f87171;">Failed to save settings.</span>';
      }
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>SAVE SETTINGS</span>';
      }
    }
  };
}

// Universal Admin Entity Modal Logic (Create & Edit all sections)
function openAdminEntityModal(section, editId = null) {
  const modal = document.getElementById('adminEntityModal');
  const form = document.getElementById('adminEntityForm');
  const titleEl = document.getElementById('adminEntityModalTitle');
  const descEl = document.getElementById('adminEntityModalSubtitle') || document.getElementById('adminEntityModalDesc');
  const statusBox = document.getElementById('adminEntityStatus') || document.getElementById('adminEntityStatusMsg');

  if (!modal || !form) return;

  form.reset();
  if (statusBox) statusBox.innerHTML = '';

  safeSetVal('entitySectionType', section);
  safeSetVal('entityEditId', editId || '');
  safeSetVal('entityId', editId || '');

  // Reset previews & filenames
  safeSetText('entityImageFileName', 'Supports .jpg, .png, .webp, .jfif');
  safeSetText('entityVideoFileName', '');
  updateEntityImagePreview('');
  updateEntityVideoPreview('');

  // Configure field visibility and labels based on section
  const sectionConfigs = {
    research: {
      title: editId ? 'EDIT RESEARCH WHITE PAPER' : 'PUBLISH NEW RESEARCH WHITE PAPER',
      desc: 'Publish scientific methodologies, thermal telemetry analyses, and empirical findings to the public Research section.',
      lblTitle: 'PAPER TITLE',
      lblCat: 'RESEARCH DOMAIN / CATEGORY',
      lblAuthor: 'LEAD SCIENTIST / AUTHOR',
      lblDate: 'PUBLICATION DATE',
      lblSummary: 'EXECUTIVE ABSTRACT / SUMMARY',
      lblFull: 'FULL EMPIRICAL FINDINGS & METHODOLOGY (Supports multi-line text)',
      showAuthor: true, showDate: true, showLocation: false, showStatus: false,
      showRole: false, showExpertise: false, showThreat: false, showCitations: true,
      showSpecs: false, showExtUrl: false, showFull: true, showVideo: true, showImage: true
    },
    media: {
      title: editId ? 'EDIT MEDIA COVERAGE & BROADCAST' : 'ADD MEDIA COVERAGE OR VIDEO BROADCAST',
      desc: 'Add TV broadcasts, YouTube documentary features, and newspaper coverage to the Media Coverage section.',
      lblTitle: 'BROADCAST / ARTICLE TITLE',
      lblCat: 'MEDIA TYPE (e.g. Television, YouTube, Documentary, Press)',
      lblAuthor: 'PUBLICATION / NETWORK / CHANNEL',
      lblDate: 'BROADCAST / RELEASE DATE',
      lblSummary: 'SYNOPSIS / BROADCAST DESCRIPTION',
      lblFull: 'ADDITIONAL COVERAGE DETAILS',
      showAuthor: true, showDate: true, showLocation: false, showStatus: false,
      showRole: false, showExpertise: false, showThreat: false, showCitations: false,
      showSpecs: false, showExtUrl: true, showFull: false, showVideo: true, showImage: true
    },
    investigations: {
      title: editId ? 'EDIT CASE INVESTIGATION DOSSIER' : 'LOG NEW CASE INVESTIGATION',
      desc: 'Record active, documented, or resolved paranormal field investigations on the public dispatch board.',
      lblTitle: 'CASE / LOCATION NAME',
      lblCat: 'CASE IDENTIFIER (e.g. DOS-2026-08)',
      lblAuthor: 'LEAD INVESTIGATOR',
      lblDate: 'INVESTIGATION DATE',
      lblLocation: 'FIELD LOCATION / COORDINATES',
      lblStatus: 'INVESTIGATION STATUS',
      lblSummary: 'SYNOPSIS / CASE OVERVIEW',
      lblFull: 'FULL INVESTIGATION DOSSIER & EVIDENCE LOG',
      showAuthor: false, showDate: true, showLocation: true, showStatus: true,
      showRole: false, showExpertise: false, showThreat: false, showCitations: false,
      showSpecs: false, showExtUrl: false, showFull: true, showVideo: false, showImage: true
    },
    vault: {
      title: editId ? 'EDIT DOS VAULT CLASSIFIED ARTIFACT' : 'RECORD NEW CLASSIFIED VAULT ARTIFACT',
      desc: 'Catalog anomalous evidence, historical relics, and occult artifacts in the secure DOS Vault.',
      lblTitle: 'ARTIFACT / EVIDENCE TITLE *',
      lblCat: 'CLASSIFICATION / CATEGORY (e.g. Spectral, EVP, Thermal, Relic, Documented)',
      lblLocation: 'ACQUISITION / DISPATCH LOCATION',
      lblDate: 'RECORDED DATE',
      lblThreat: 'THREAT / CONTAINMENT LEVEL (e.g. Standard, Elevated, Critical, Demonic)',
      lblSummary: 'ARTIFACT SYNOPSIS / DESCRIPTION *',
      lblFull: 'FORENSIC TELEMETRY ANALYSIS & CONTAINMENT PROTOCOL',
      showAuthor: false, showDate: true, showLocation: true, showStatus: false,
      showRole: false, showExpertise: false, showThreat: true, showCitations: false,
      showSpecs: false, showExtUrl: false, showFull: true, showVideo: false, showImage: true
    },
    equipment: {
      title: editId ? 'EDIT FIELD EQUIPMENT' : 'ADD ARSENAL SENSOR EQUIPMENT',
      desc: 'Manage paranormal detection hardware and scientific sensor equipment shown on the Equipment page.',
      lblTitle: 'EQUIPMENT MODEL & NAME *',
      lblCat: 'CATEGORY (e.g. Detection Equipment, Audio, Video, Environmental)',
      lblStatus: 'EQUIPMENT STATUS',
      lblSummary: 'PRIMARY OPERATIONAL USAGE / DESCRIPTION *',
      lblSpecs: 'TECHNICAL SPECIFICATIONS & SENSOR ACCURACY',
      lblFull: 'INVESTIGATIVE METHODOLOGY / DETECTION METHOD',
      showAuthor: false, showDate: false, showLocation: false, showStatus: true,
      showRole: false, showExpertise: false, showThreat: false, showCitations: false,
      showSpecs: true, showExtUrl: false, showFull: true, showVideo: false, showImage: true
    },
    team: {
      title: editId ? 'EDIT TEAM PERSONNEL' : 'ADD TEAM INVESTIGATOR',
      desc: 'Manage investigator personnel profiles displayed on the Core Team page.',
      lblTitle: 'OFFICER FULL NAME',
      lblRole: 'ORGANIZATIONAL ROLE / TITLE',
      lblExpertise: 'FIELD EXPERTISE & CREDENTIALS',
      showAuthor: false, showDate: false, showLocation: false, showStatus: false,
      showRole: true, showExpertise: true, showThreat: false, showCitations: false,
      showSpecs: false, showExtUrl: false, showFull: false, showVideo: false, showImage: true
    },
    gallery: {
      title: editId ? 'EDIT EVIDENCE GALLERY ENTRY' : 'UPLOAD EVIDENCE GALLERY PHOTO',
      desc: 'Add optical photographic evidence and spectrograms to the public Evidence Gallery.',
      lblTitle: 'EVIDENCE TITLE',
      lblCat: 'CATEGORY (e.g. Optical, EVP, Thermal)',
      lblDate: 'CAPTURE DATE',
      lblLocation: 'CAPTURE LOCATION',
      lblSummary: 'FORENSIC CAPTION & ANALYSIS',
      showAuthor: false, showDate: true, showLocation: true, showStatus: false,
      showRole: false, showExpertise: false, showThreat: false, showCitations: false,
      showSpecs: false, showExtUrl: false, showFull: false, showVideo: false, showImage: true
    }
  };

  const cfg = sectionConfigs[section] || sectionConfigs.research;

  if (titleEl) titleEl.textContent = cfg.title;
  if (descEl) descEl.textContent = cfg.desc;

  // Set Section Labels
  safeSetText('lblEntityTitle', cfg.lblTitle || 'Title / Headline *');
  safeSetText('lblEntityCategory', cfg.lblCat || 'Category / Classification');
  safeSetText('lblEntityAuthor', cfg.lblAuthor || 'Author / Publication / Lead');
  safeSetText('lblEntityDate', cfg.lblDate || 'Date');
  safeSetText('lblEntityLocation', cfg.lblLocation || 'Field Location');
  safeSetText('lblEntityStatus', cfg.lblStatus || 'Investigation Status');
  safeSetText('lblEntityRole', cfg.lblRole || 'Organizational Role');
  safeSetText('lblEntityExpertise', cfg.lblExpertise || 'Field Expertise');
  safeSetText('lblEntityThreatLevel', cfg.lblThreat || 'Threat Level');
  safeSetText('lblEntitySpecs', cfg.lblSpecs || 'Technical Specifications');
  safeSetText('lblEntityCitations', cfg.lblCitations || 'Citations & Academic References');
  safeSetText('lblEntityExternalUrl', cfg.lblExtUrl || 'External Article URL');
  safeSetText('lblEntitySummary', cfg.lblSummary || 'Brief Summary / Abstract *');
  safeSetText('lblEntityFullContent', cfg.lblFull || 'Full Findings / Dossier');

  // Toggle Visibility of Form Groups
  safeSetDisplay('groupEntityCategory', cfg.lblCat !== undefined);
  safeSetDisplay('groupEntityAuthor', cfg.showAuthor);
  safeSetDisplay('groupEntityDate', cfg.showDate);
  safeSetDisplay('groupEntityLocation', cfg.showLocation);
  safeSetDisplay('groupEntityStatus', cfg.showStatus);
  safeSetDisplay('groupEntityRole', cfg.showRole);
  safeSetDisplay('groupEntityExpertise', cfg.showExpertise);
  safeSetDisplay('groupEntityThreatLevel', cfg.showThreat);
  safeSetDisplay('groupEntitySpecs', cfg.showSpecs);
  safeSetDisplay('groupEntityCitations', cfg.showCitations);
  safeSetDisplay('groupEntityExternalUrl', cfg.showExtUrl);
  safeSetDisplay('groupEntityFullContent', cfg.showFull);
  safeSetDisplay('groupEntityVideoSection', cfg.showVideo);
  safeSetDisplay('groupEntityImageSection', cfg.showImage !== false);

  // Populate data if editing
  if (editId) {
    const list = state[section] || [];
    const item = list.find(x => x.id === editId);
    if (item) {
      safeSetVal('entityTitle', item.title || item.name || '');
      safeSetVal('entityCategory', item.category || item.classification || item.caseNumber || '');
      safeSetVal('entityAuthor', item.author || item.publication || '');
      safeSetVal('entityDate', item.date || item.recordedDate || item.investigationDate || '');
      safeSetVal('entityLocation', item.location || '');
      safeSetVal('entityStatus', item.status || 'Active');
      safeSetVal('entitySummary', item.summary || item.description || item.synopsis || item.usage || item.caption || item.biography || '');
      safeSetVal('entityFullContent', item.fullFindings || item.fullDescription || item.analysisNotes || item.analysis || item.findings || item.specs || '');
      safeSetVal('entityRole', item.role || '');
      safeSetVal('entityExpertise', item.expertise || '');
      safeSetVal('entityThreatLevel', item.threatLevel || 'Standard');
      safeSetVal('entityCitations', item.citations || '');
      let formattedSpecs = '';
      if (typeof item.specs === 'string') {
        formattedSpecs = item.specs;
      } else if (item.specs && typeof item.specs === 'object') {
        if (Array.isArray(item.specs)) {
          formattedSpecs = item.specs.join(', ');
        } else {
          formattedSpecs = Object.entries(item.specs).map(([k, v]) => `${k}: ${v}`).join('; ');
        }
      }
      safeSetVal('entitySpecs', formattedSpecs);
      safeSetVal('entityExternalUrl', item.externalUrl || '');

      const photoVal = (section === 'vault' ? getVaultPhoto(item) : '') || item.photoUrl || item.imageUrl || item.heroImage || item.evidenceImage || item.thumbnail || '';
      safeSetVal('entityImageUrl', photoVal);
      updateEntityImagePreview(photoVal);

      const vidVal = item.videoUrl || '';
      safeSetVal('entityVideoUrl', vidVal);
      updateEntityVideoPreview(vidVal);
    }
  } else {
    // Defaults for new item
    const today = new Date().toISOString().split('T')[0];
    safeSetVal('entityDate', today);
    safeSetVal('entityAuthor', 'DOS Investigation Bureau');
    updateEntityImagePreview('');
    updateEntityVideoPreview('');
  }

  modal.classList.add('active');
}

// Image File handling & live preview in universal modal
function handleEntityImageFile(input) {
  if (input.files && input.files[0]) {
    const file = input.files[0];
    safeSetText('entityImageFileName', `Selected: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`);
    const reader = new FileReader();
    reader.onload = (e) => {
      updateEntityImagePreview(e.target.result);
    };
    reader.readAsDataURL(file);
  }
}

function updateEntityImagePreview(url) {
  const container = document.getElementById('entityImagePreviewContainer');
  const img = document.getElementById('entityImagePreview');
  if (!img) return;

  if (url && url.trim()) {
    img.src = url;
    if (container) container.style.display = 'flex';
  } else {
    img.src = '/horror_background_wide.jpg';
  }
}

// Video File handling & live preview in universal modal
function handleEntityVideoFile(input) {
  const container = document.getElementById('entityVideoPreviewBox');
  const wrap = document.getElementById('entityVideoPreviewWrap');
  const clearBtn = document.getElementById('btnClearVideoPreview');
  const urlClearBtn = document.getElementById('entityVideoUrlClearBtn');

  if (input.files && input.files[0]) {
    const file = input.files[0];
    safeSetText('entityVideoFileName', `Selected: ${file.name} (${(file.size / (1024 * 1024)).toFixed(1)} MB)`);
    const fileUrl = URL.createObjectURL(file);
    if (wrap) wrap.style.display = 'block';
    if (clearBtn) clearBtn.style.display = 'inline-flex';
    if (urlClearBtn) urlClearBtn.style.display = 'flex';
    if (container) {
      container.style.display = 'block';
      container.innerHTML = `
        <video controls autoplay muted style="width:100%; height:100%; object-fit:contain; background:#000;">
          <source src="${fileUrl}">
        </video>
      `;
    }
  }
}

function updateEntityVideoPreview(url) {
  const container = document.getElementById('entityVideoPreviewBox');
  const wrap = document.getElementById('entityVideoPreviewWrap');
  const clearBtn = document.getElementById('btnClearVideoPreview');
  const urlClearBtn = document.getElementById('entityVideoUrlClearBtn');

  if (!url || !url.trim()) {
    if (wrap) wrap.style.display = 'none';
    if (container) {
      container.style.display = 'none';
      container.innerHTML = '';
    }
    if (clearBtn) clearBtn.style.display = 'none';
    if (urlClearBtn) urlClearBtn.style.display = 'none';
    return;
  }

  if (clearBtn) clearBtn.style.display = 'inline-flex';
  if (urlClearBtn) urlClearBtn.style.display = 'flex';
  if (wrap) wrap.style.display = 'block';
  if (container) container.style.display = 'block';

  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    let videoId = '';
    if (url.includes('youtu.be/')) videoId = url.split('youtu.be/')[1]?.split('?')[0];
    else if (url.includes('v=')) videoId = url.split('v=')[1]?.split('&')[0];
    const embedUrl = videoId ? `https://www.youtube-nocookie.com/embed/${videoId}` : url;
    if (container) {
      container.innerHTML = `
        <iframe src="${embedUrl}" style="width:100%; height:100%; border:none;" allowfullscreen></iframe>
      `;
    }
  } else {
    if (container) {
      container.innerHTML = `
        <video controls autoplay muted style="width:100%; height:100%; object-fit:contain; background:#000;">
          <source src="${escapeHtml(url)}">
        </video>
      `;
    }
  }
}

// ✕ Cross / Remove Video Action
function clearEntityVideo() {
  const urlInput = document.getElementById('entityVideoUrl');
  if (urlInput) urlInput.value = '';

  const fileInput = document.getElementById('entityVideoFileInput');
  if (fileInput) fileInput.value = '';

  safeSetText('entityVideoFileName', '');

  const wrap = document.getElementById('entityVideoPreviewWrap');
  if (wrap) wrap.style.display = 'none';

  const container = document.getElementById('entityVideoPreviewBox');
  if (container) {
    container.style.display = 'none';
    container.innerHTML = '';
  }

  const clearBtn = document.getElementById('btnClearVideoPreview');
  if (clearBtn) clearBtn.style.display = 'none';

  const urlClearBtn = document.getElementById('entityVideoUrlClearBtn');
  if (urlClearBtn) urlClearBtn.style.display = 'none';
}

// Universal CMS Submit Handler
function initAdminEntityForm() {
  const form = document.getElementById('adminEntityForm');
  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (!state.authToken) {
      alert('Administrator session required. Please sign into the console.');
      return;
    }

    const section = safeGetVal('entitySectionType');
    const rawEditId = safeGetVal('entityEditId') || safeGetVal('entityId');
    const editId = (rawEditId && rawEditId !== 'null' && rawEditId !== 'undefined' && rawEditId.trim() !== '') ? rawEditId.trim() : null;
    
    const submitBtn = document.getElementById('adminEntitySubmitBtn') || form.querySelector('button[type="submit"]');
    const statusBox = document.getElementById('adminEntityStatus') || document.getElementById('adminEntityStatusMsg');

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = '<span>TRANSMITTING & SAVING DOSSIER...</span>';
    }
    if (statusBox) {
      statusBox.innerHTML = '<span style="color:var(--text-muted);">Uploading media assets and writing records to DOS database...</span>';
    }

    try {
      // 1. Upload Photo File if selected
      const photoFileInput = document.getElementById('entityImageFileInput');
      let finalPhotoUrl = safeGetVal('entityImageUrl');

      if (photoFileInput && photoFileInput.files && photoFileInput.files[0]) {
        const uploadedPhoto = await safeUploadFile(photoFileInput);
        if (uploadedPhoto) finalPhotoUrl = uploadedPhoto;
      }

      // 2. Upload Video File if selected
      const videoFileInput = document.getElementById('entityVideoFileInput');
      let finalVideoUrl = safeGetVal('entityVideoUrl');

      if (videoFileInput && videoFileInput.files && videoFileInput.files[0]) {
        const uploadedVideo = await safeUploadFile(videoFileInput);
        if (uploadedVideo) finalVideoUrl = uploadedVideo;
      }

      // 3. Extract common input values safely
      const title = safeGetVal('entityTitle') || 'Untitled';
      const category = safeGetVal('entityCategory');
      const author = safeGetVal('entityAuthor');
      const date = safeGetVal('entityDate') || new Date().toISOString().split('T')[0];
      const location = safeGetVal('entityLocation');
      const status = safeGetVal('entityStatus');
      const summary = safeGetVal('entitySummary');
      const fullContent = safeGetVal('entityFullContent');
      const role = safeGetVal('entityRole');
      const expertise = safeGetVal('entityExpertise');
      const threatLevel = safeGetVal('entityThreatLevel');
      const citations = safeGetVal('entityCitations');
      const specs = safeGetVal('entitySpecs');
      const externalUrl = safeGetVal('entityExternalUrl');

      let payload = {};

      if (section === 'research') {
        payload = {
          title,
          category: category || 'Empirical Study',
          author: author || 'DOS Lead Investigators',
          date: date,
          summary: summary || title,
          fullFindings: fullContent || summary || title,
          photoUrl: finalPhotoUrl || '/horror_background_wide.jpg',
          videoUrl: finalVideoUrl,
          citations: citations || 'DOS Research Archives'
        };
      } else if (section === 'media') {
        payload = {
          title,
          category: category || 'Documentaries',
          publication: author || 'DOS Archives',
          date: date,
          description: summary || title,
          videoUrl: finalVideoUrl,
          thumbnail: finalPhotoUrl || '/horror_background_wide.jpg',
          externalUrl: externalUrl || ''
        };
      } else if (section === 'investigations') {
        payload = {
          title,
          caseNumber: category || `DOS-INV-${new Date().getFullYear()}`,
          location: location || 'Field Location',
          investigationDate: date,
          date: date,
          summary: summary || title,
          shortDescription: summary || title,
          fullDescription: fullContent || summary || title,
          fullReport: fullContent || summary || title,
          heroImage: finalPhotoUrl || '/horror_background_wide.jpg',
          status: status || 'Active'
        };
      } else if (section === 'vault') {
        payload = {
          title,
          caseId: category || `DOS-VLT-${Math.floor(100 + Math.random() * 900)}`,
          classification: category || 'Spectral',
          category: category || 'Spectral',
          location: location || 'Classified Site Coordinates',
          date: date || new Date().toISOString().slice(0, 10),
          recordedDate: date || new Date().toISOString().slice(0, 10),
          investigationDate: date || new Date().toISOString().slice(0, 10),
          threatLevel: threatLevel || 'Standard',
          synopsis: summary || title,
          description: summary || title,
          fullDescription: fullContent || summary || title,
          analysis: fullContent || summary || title,
          findings: fullContent || summary || title,
          analysisNotes: fullContent || summary || title,
          evidenceImage: finalPhotoUrl || '/horror_background_wide.jpg',
          imageUrl: finalPhotoUrl || '/horror_background_wide.jpg',
          photoUrl: finalPhotoUrl || '/horror_background_wide.jpg',
          image: finalPhotoUrl || '/horror_background_wide.jpg',
          thumbnail: finalPhotoUrl || '/horror_background_wide.jpg',
          isPublic: true
        };
      } else if (section === 'equipment') {
        payload = {
          name: title,
          title: title,
          category: category || 'Detection Equipment',
          status: status || 'Operational',
          specs: specs || summary || 'Calibrated Sensor Hardware',
          usage: summary || title,
          description: summary || title,
          methodology: fullContent || specs || summary || 'Standard Field Telemetry',
          detectionMethod: fullContent || specs || summary || 'Direct Sensor Telemetry',
          imageUrl: finalPhotoUrl || '/horror_background_wide.jpg',
          photoUrl: finalPhotoUrl || '/horror_background_wide.jpg'
        };
      } else if (section === 'team') {
        payload = {
          name: title,
          role: role || 'Investigator',
          expertise: expertise || summary || 'Field Investigation',
          biography: fullContent || summary || 'Investigator at Detectives of Supernatural',
          photoUrl: finalPhotoUrl || ''
        };
      } else if (section === 'gallery') {
        payload = {
          title,
          category: category || 'Optical',
          location: location || 'Field Location',
          date: date,
          caption: summary || title,
          imageUrl: finalPhotoUrl || '/horror_background_wide.jpg'
        };
      } else {
        payload = { title, summary: summary || title };
      }

      // 4. Dispatch Request (PUT for edit, POST for new)
      const targetSection = section || 'research';
      const url = editId ? `/api/${targetSection}/${editId}` : `/api/${targetSection}`;
      const method = editId ? 'PUT' : 'POST';

      const res = await safeApiFetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.authToken}`
        },
        body: JSON.stringify(payload)
      });

      if (res && res.error && !res.networkError) {
        if (statusBox) statusBox.innerHTML = `<span style="color:#f87171;">Error: ${escapeHtml(res.error)}</span>`;
        return;
      }

      // If network failed, update in-memory and local state
      if (res && res.networkError) {
        if (Array.isArray(state[targetSection])) {
          if (editId) {
            const idx = state[targetSection].findIndex(x => x.id === editId);
            if (idx !== -1) {
              state[targetSection][idx] = { ...state[targetSection][idx], ...payload };
            }
          } else {
            const newId = `${targetSection.slice(0, 3)}-${Date.now()}`;
            state[targetSection].unshift({ id: newId, ...payload });
          }
        }
      }

      if (statusBox) {
        statusBox.innerHTML = '<span style="color:#34d399; font-weight:700;">✓ Content successfully saved and published!</span>';
      }

      await loadPublicData();
      renderAdminDashboard();

      setTimeout(() => {
        closeModal('adminEntityModal');
      }, 700);

    } catch (err) {
      console.error('Universal entity form error:', err);
      if (statusBox) statusBox.innerHTML = '<span style="color:#f87171;">Failed to save content.</span>';
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>SAVE & PUBLISH TO LIVE SITE</span>';
      }
    }
  });
}

// Global Modal Confirmation Helper for Admin Deletions
function closeConfirmModal() {
  const modal = document.getElementById('adminConfirmModal');
  if (modal) {
    modal.classList.remove('active');
  }
}

function showAdminConfirm(title, message, onConfirm) {
  const modal = document.getElementById('adminConfirmModal');
  const titleEl = document.getElementById('confirmModalTitle');
  const msgEl = document.getElementById('confirmModalMessage');
  const proceedBtn = document.getElementById('confirmModalProceedBtn');

  if (titleEl) titleEl.textContent = title || 'Delete Record';
  if (msgEl) msgEl.textContent = message || 'Are you sure you want to permanently delete this item?';

  if (proceedBtn) {
    // Clone button to remove prior event listeners safely
    const newBtn = proceedBtn.cloneNode(true);
    proceedBtn.parentNode.replaceChild(newBtn, proceedBtn);
    newBtn.onclick = async () => {
      closeConfirmModal();
      if (typeof onConfirm === 'function') {
        await onConfirm();
      }
    };
  }

  if (modal) {
    modal.classList.add('active');
  } else {
    // Fallback if modal container is absent
    if (typeof onConfirm === 'function') onConfirm();
  }
}

// Universal Delete Item across all Admin sections
function deleteAdminItem(section, id) {
  if (!id) return;

  const sectionLabels = {
    research: 'Research Paper',
    investigations: 'Investigation Case',
    vault: 'Vault Dossier',
    equipment: 'Equipment Tech',
    media: 'Media Coverage Broadcast',
    team: 'Personnel Record',
    gallery: 'Evidence Gallery Photo',
    reports: 'Incident Dossier',
    messages: 'Contact Inquiry'
  };

  const sectionName = sectionLabels[section] || section;
  const list = state[section] || [];
  const foundItem = Array.isArray(list) ? list.find(x => x.id === id) : null;
  const itemTitle = foundItem ? (foundItem.title || foundItem.name || foundItem.witnessName || foundItem.subject || 'this item') : 'this item';

  showAdminConfirm(
    `Delete ${sectionName}`,
    `Are you sure you want to permanently delete "${itemTitle}" from ${sectionName} records? This change will reflect on the live website immediately.`,
    async () => {
      await executeAdminDelete(section, id, itemTitle);
    }
  );
}

// Execution logic for Delete with token authentication and state synchronization
async function executeAdminDelete(section, id, title) {
  const token = state.authToken || safeGetStorage('dos_auth_token') || 'dos-investigator-session-valid-token';

  const apiRouteMap = {
    research: '/api/research',
    investigations: '/api/investigations',
    vault: '/api/vault',
    equipment: '/api/equipment',
    media: '/api/media',
    team: '/api/team',
    gallery: '/api/gallery',
    reports: '/api/reports',
    messages: '/api/contact'
  };

  const route = apiRouteMap[section] || `/api/${section}`;

  try {
    const res = await safeApiFetch(`${route}/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    // Clean up local state array immediately
    if (Array.isArray(state[section])) {
      state[section] = state[section].filter(item => item.id !== id);
    }

    // Refresh public cached data and re-render dashboard
    await loadPublicData();
    renderAdminDashboard();

    showToastNotification(`Successfully deleted "${title || 'Record'}".`, 'success');
  } catch (err) {
    console.error(`Failed to delete ${section} item:`, err);
    // Cleanup locally regardless
    if (Array.isArray(state[section])) {
      state[section] = state[section].filter(item => item.id !== id);
    }
    renderAdminDashboard();
    showToastNotification(`Record removed from view.`, 'info');
  }
}

// Update incident report status
async function updateReportStatus(id, newStatus) {
  try {
    await safeApiFetch(`/api/reports/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${state.authToken}`
      },
      body: JSON.stringify({ status: newStatus })
    });
    await renderAdminDashboard();
  } catch (e) {
    console.error('Failed to update report status', e);
  }
}

// Admin Real-time List Filtering Search
function filterAdminList(section, query) {
  const q = (query || '').toLowerCase().trim();
  const list = state[section] || [];

  const filtered = !q ? list : list.filter(item => {
    const text = [
      item.title, item.name, item.category, item.author, item.role,
      item.publication, item.location, item.caseNumber, item.summary, item.description
    ].filter(Boolean).join(' ').toLowerCase();
    return text.includes(q);
  });

  if (section === 'research') renderAdminResearchList(filtered);
  else if (section === 'investigations') renderAdminInvestigationsList(filtered);
  else if (section === 'vault') renderAdminVaultList(filtered);
  else if (section === 'equipment') renderAdminEquipmentList(filtered);
  else if (section === 'media') renderAdminMediaList(filtered);
  else if (section === 'team') renderAdminTeamList(filtered);
  else if (section === 'gallery') renderAdminGalleryList(filtered);
}

// Handle Direct Team Member Photo Upload
async function uploadMemberPhoto(memberId, file) {
  if (!file) return;

  try {
    const fileInputWrapper = { files: [file] };
    const uploadedUrl = await safeUploadFile(fileInputWrapper);

    if (uploadedUrl) {
      await safeApiFetch(`/api/team/${memberId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.authToken}`
        },
        body: JSON.stringify({ photoUrl: uploadedUrl })
      });

      // Update in local state
      const member = state.team.find(t => t.id === memberId);
      if (member) member.photoUrl = uploadedUrl;

      await loadPublicData();
      renderAdminTeamList();
      alert('Team portrait updated successfully!');
    }
  } catch (err) {
    alert('Failed to upload team portrait.');
  }
}

// Handle Direct Equipment Photo Upload
async function uploadEquipmentPhoto(eqId, file) {
  if (!file) return;

  try {
    const fileInputWrapper = { files: [file] };
    const uploadedUrl = await safeUploadFile(fileInputWrapper);

    if (uploadedUrl) {
      await safeApiFetch(`/api/equipment/${eqId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.authToken}`
        },
        body: JSON.stringify({ imageUrl: uploadedUrl, photoUrl: uploadedUrl })
      });

      // Update in local state
      const eq = (state.equipment || []).find(e => e.id === eqId);
      if (eq) {
        eq.imageUrl = uploadedUrl;
        eq.photoUrl = uploadedUrl;
      }

      await loadPublicData();
      renderAdminEquipmentList();
      alert('Equipment image updated successfully!');
    }
  } catch (err) {
    alert('Failed to upload equipment photo.');
  }
}

// Handle Direct Dos Vault Photo Upload
async function uploadVaultPhoto(vaultId, file) {
  if (!file) return;

  try {
    const fileInputWrapper = { files: [file] };
    const uploadedUrl = await safeUploadFile(fileInputWrapper);

    if (uploadedUrl) {
      await safeApiFetch(`/api/vault/${vaultId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${state.authToken}`
        },
        body: JSON.stringify({
          evidenceImage: uploadedUrl,
          imageUrl: uploadedUrl,
          photoUrl: uploadedUrl,
          image: uploadedUrl,
          thumbnail: uploadedUrl
        })
      });

      // Update in local state
      const item = (state.vault || []).find(v => v.id === vaultId);
      if (item) {
        item.evidenceImage = uploadedUrl;
        item.imageUrl = uploadedUrl;
        item.photoUrl = uploadedUrl;
        item.image = uploadedUrl;
        item.thumbnail = uploadedUrl;
      }

      await loadPublicData();
      renderAdminVaultList();
      renderVault();
      alert('Dos Vault artifact photo updated and published successfully!');
    }
  } catch (err) {
    console.error('Vault photo upload error:', err);
    alert('Failed to upload vault photo.');
  }
}

// Helpers
function escapeHtml(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function setFilter(category, filterValue) {
  state.filters[category] = filterValue;
  if (category === 'investigations') renderInvestigations();
  if (category === 'vault') renderVault();
  if (category === 'media') renderMedia();
  if (category === 'equipment') renderEquipment();
  if (category === 'gallery') renderGallery();
  if (category === 'research') renderResearch();

  // Update active button state in filter-bar
  const parentBar = window.event?.target?.closest('.filter-bar');
  if (parentBar) {
    parentBar.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    window.event.target.classList.add('active');
  }
}

// ==========================================================================
// HORROR AMBIENT SOUNDSCAPE AUDIO ENGINE (Web Audio API)
// Synthesizes atmospheric dark paranormal ambient music:
// 1. Sub-bass Infrasound Resonator (43.6 Hz / 54.8 Hz)
// 2. Dissonant Minor Ambient Pads with slow filter sweeps
// 3. EVP Wind / Atmospheric sweeps (bandpass-filtered noise)
// 4. Subtle Spectral Chime pings for uncanny depth
// ==========================================================================
const HorrorAudioEngine = {
  ctx: null,
  masterGain: null,
  compressor: null,
  isPlaying: false,
  initialized: false,
  nodes: [],
  chimeTimer: null,

  init() {
    if (this.initialized) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      this.ctx = new AudioCtx();

      // Master dynamics compressor to keep ambient sound smooth & prevent harsh clipping
      this.compressor = this.ctx.createDynamicsCompressor();
      this.compressor.threshold.setValueAtTime(-24, this.ctx.currentTime);
      this.compressor.knee.setValueAtTime(30, this.ctx.currentTime);
      this.compressor.ratio.setValueAtTime(12, this.ctx.currentTime);
      this.compressor.attack.setValueAtTime(0.003, this.ctx.currentTime);
      this.compressor.release.setValueAtTime(0.25, this.ctx.currentTime);

      // Master Gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);

      this.masterGain.connect(this.compressor);
      this.compressor.connect(this.ctx.destination);

      this.buildSoundscape();
      this.initialized = true;
    } catch (e) {
      console.warn('Web Audio not supported or failed to initialize:', e);
    }
  },

  buildSoundscape() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // --- 1. SUB-BASS DRONE (Infrasound 43.65Hz F1 & 55Hz A1) ---
    const subOsc1 = this.ctx.createOscillator();
    subOsc1.type = 'sine';
    subOsc1.frequency.setValueAtTime(43.65, now);

    const subOsc2 = this.ctx.createOscillator();
    subOsc2.type = 'triangle';
    subOsc2.frequency.setValueAtTime(54.8, now);

    const subFilter = this.ctx.createBiquadFilter();
    subFilter.type = 'lowpass';
    subFilter.frequency.setValueAtTime(140, now);

    const subGain = this.ctx.createGain();
    subGain.gain.setValueAtTime(0.35, now);

    subOsc1.connect(subFilter);
    subOsc2.connect(subFilter);
    subFilter.connect(subGain);
    subGain.connect(this.masterGain);

    subOsc1.start();
    subOsc2.start();
    this.nodes.push(subOsc1, subOsc2, subFilter, subGain);

    // --- 2. GHOSTLY DISSONANT PAD (D2, F2, Ab2, C#3) ---
    const chords = [73.42, 87.31, 103.83, 138.59];
    const padGain = this.ctx.createGain();
    padGain.gain.setValueAtTime(0.18, now);

    const padFilter = this.ctx.createBiquadFilter();
    padFilter.type = 'lowpass';
    padFilter.frequency.setValueAtTime(320, now);
    padFilter.Q.setValueAtTime(4.0, now);

    // LFO to slowly sweep the pad filter for eerie breathing motion
    const lfo = this.ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(0.08, now); // ~12.5 second breath cycle

    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(180, now);

    lfo.connect(lfoGain);
    lfoGain.connect(padFilter.frequency);
    lfo.start();
    this.nodes.push(lfo, lfoGain);

    chords.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      osc.type = idx % 2 === 0 ? 'sawtooth' : 'sine';
      osc.frequency.setValueAtTime(freq, now);
      // Subtle detune for organic analog drift
      osc.detune.setValueAtTime((idx - 1.5) * 7, now);
      osc.connect(padFilter);
      osc.start();
      this.nodes.push(osc);
    });

    padFilter.connect(padGain);
    padGain.connect(this.masterGain);
    this.nodes.push(padFilter, padGain);

    // --- 3. EVP ATMOSPHERIC NOISE & WIND SWEEPS ---
    const bufferSize = 2 * this.ctx.sampleRate;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      // Pink noise filter approximation
      b0 = 0.997 * b0 + white * 0.05;
      b1 = 0.985 * b1 + white * 0.11;
      b2 = 0.950 * b2 + white * 0.25;
      output[i] = (b0 + b1 + b2) * 0.5;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const windFilter = this.ctx.createBiquadFilter();
    windFilter.type = 'bandpass';
    windFilter.frequency.setValueAtTime(450, now);
    windFilter.Q.setValueAtTime(2.5, now);

    const windLfo = this.ctx.createOscillator();
    windLfo.type = 'sine';
    windLfo.frequency.setValueAtTime(0.04, now); // ~25s wind gust cycle

    const windLfoGain = this.ctx.createGain();
    windLfoGain.gain.setValueAtTime(320, now);

    windLfo.connect(windLfoGain);
    windLfoGain.connect(windFilter.frequency);
    windLfo.start();

    const windGain = this.ctx.createGain();
    windGain.gain.setValueAtTime(0.12, now);

    whiteNoise.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(this.masterGain);
    whiteNoise.start();

    this.nodes.push(whiteNoise, windFilter, windLfo, windLfoGain, windGain);

    // --- 4. PERIODIC SPECTRAL CHIMES ---
    this.scheduleNextSpectralPing();
  },

  scheduleNextSpectralPing() {
    if (this.chimeTimer) clearTimeout(this.chimeTimer);
    const delay = 12000 + Math.random() * 10000; // 12-22 seconds
    this.chimeTimer = setTimeout(() => {
      if (this.isPlaying && this.ctx) {
        this.playSpectralPing();
      }
      this.scheduleNextSpectralPing();
    }, delay);
  },

  playSpectralPing() {
    try {
      if (!this.ctx || this.ctx.state !== 'running') return;
      const now = this.ctx.currentTime;
      const notes = [587.33, 622.25, 783.99, 932.33, 1174.66]; // High eerie tones
      const freq = notes[Math.floor(Math.random() * notes.length)];

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(freq, now);
      filter.Q.setValueAtTime(8.0, now);

      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(0.08, now + 0.08);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 5.5); // long decay

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);

      osc.start(now);
      osc.stop(now + 6);
    } catch (err) {
      // safe fallback
    }
  },

  async unmute() {
    try {
      this.init();
      if (this.ctx && this.ctx.state === 'suspended') {
        await this.ctx.resume();
      }
      const now = this.ctx ? this.ctx.currentTime : 0;
      if (this.masterGain && this.ctx) {
        this.masterGain.gain.cancelScheduledValues(now);
        this.masterGain.gain.setValueAtTime(Math.max(0.0001, this.masterGain.gain.value), now);
        this.masterGain.gain.exponentialRampToValueAtTime(0.42, now + 1.2);
      }
      this.isPlaying = true;
      safeSetStorage('dos_horror_audio', 'true');
      this.updateUI(true);
    } catch (err) {
      console.warn('Audio unmute error:', err);
    }
  },

  mute() {
    try {
      if (this.ctx && this.masterGain) {
        const now = this.ctx.currentTime;
        this.masterGain.gain.cancelScheduledValues(now);
        this.masterGain.gain.setValueAtTime(Math.max(0.0001, this.masterGain.gain.value), now);
        this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.8);
      }
      this.isPlaying = false;
      safeSetStorage('dos_horror_audio', 'false');
      this.updateUI(false);
    } catch (err) {
      console.warn('Audio mute error:', err);
    }
  },

  toggle() {
    if (this.isPlaying) {
      this.mute();
      showAudioToast('🔇 Atmospheric Horror Audio: MUTED');
    } else {
      this.unmute();
      showAudioToast('🔊 Atmospheric Horror Audio: ACTIVE');
    }
  },

  updateUI(playing) {
    const btn = document.getElementById('horrorAudioBtn');
    const mobileBtn = document.getElementById('mobileHorrorAudioBtn');
    const iconMuted = document.getElementById('audioIconMuted');
    const iconPlaying = document.getElementById('audioIconPlaying');
    const label = document.getElementById('audioBtnLabel');

    if (btn) {
      if (playing) {
        btn.classList.add('playing');
        if (iconMuted) iconMuted.style.display = 'none';
        if (iconPlaying) iconPlaying.style.display = 'block';
        if (label) label.textContent = 'AUDIO: ON';
        btn.setAttribute('title', 'Atmospheric Horror Audio: Playing (Click to Mute)');
      } else {
        btn.classList.remove('playing');
        if (iconMuted) iconMuted.style.display = 'block';
        if (iconPlaying) iconPlaying.style.display = 'none';
        if (label) label.textContent = 'AUDIO: OFF';
        btn.setAttribute('title', 'Atmospheric Horror Audio: Muted (Click to Unmute)');
      }
    }

    if (mobileBtn) {
      mobileBtn.innerHTML = playing 
        ? '<span>🔊 HORROR AUDIO: PLAYING (TAP TO MUTE)</span>' 
        : '<span>🔇 HORROR AUDIO: MUTED (TAP TO UNMUTE)</span>';
      if (playing) {
        mobileBtn.classList.add('playing');
      } else {
        mobileBtn.classList.remove('playing');
      }
    }
  }
};

// Audio Notification Toast
function showAudioToast(msg) {
  let toast = document.getElementById('audioToast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'audioToast';
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      right: 24px;
      background: rgba(12, 13, 18, 0.95);
      border: 1px solid var(--red-primary);
      color: #fff;
      padding: 10px 18px;
      border-radius: 6px;
      font-family: var(--font-mono);
      font-size: 0.8rem;
      font-weight: 700;
      letter-spacing: 0.08em;
      box-shadow: 0 0 20px rgba(220, 38, 38, 0.5);
      z-index: 1000;
      display: flex;
      align-items: center;
      gap: 10px;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      opacity: 0;
      transform: translateY(12px);
      pointer-events: none;
    `;
    document.body.appendChild(toast);
  }

  toast.textContent = msg;
  toast.style.opacity = '1';
  toast.style.transform = 'translateY(0)';

  if (window.audioToastTimer) clearTimeout(window.audioToastTimer);
  window.audioToastTimer = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(12px)';
  }, 2500);
}

// Universal Admin & System Toast Notifications
function showToastNotification(msg, type = 'info') {
  let toast = document.getElementById('systemToastNotification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'systemToastNotification';
    toast.style.cssText = `
      position: fixed;
      bottom: 24px;
      left: 50%;
      transform: translate(-50%, 20px);
      background: #0d1017;
      border: 1px solid var(--red-primary);
      color: #fff;
      padding: 12px 24px;
      border-radius: 6px;
      font-family: var(--font-mono);
      font-size: 0.85rem;
      font-weight: 700;
      letter-spacing: 0.05em;
      box-shadow: 0 10px 30px rgba(0,0,0,0.8), 0 0 20px rgba(220, 38, 38, 0.4);
      z-index: 10000;
      display: flex;
      align-items: center;
      gap: 10px;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      opacity: 0;
      pointer-events: none;
    `;
    document.body.appendChild(toast);
  }

  const icon = type === 'success' ? '✓' : (type === 'error' ? '✕' : 'ℹ');
  const borderColor = type === 'success' ? '#22c55e' : (type === 'error' ? '#ef4444' : 'var(--red-primary)');
  const shadowColor = type === 'success' ? 'rgba(34, 197, 94, 0.4)' : (type === 'error' ? 'rgba(239, 68, 68, 0.4)' : 'rgba(220, 38, 38, 0.4)');

  toast.innerHTML = `<span style="color:${borderColor}; font-weight:900;">${icon}</span> <span>${escapeHtml(msg)}</span>`;
  toast.style.borderColor = borderColor;
  toast.style.boxShadow = `0 10px 30px rgba(0,0,0,0.8), 0 0 20px ${shadowColor}`;
  toast.style.opacity = '1';
  toast.style.transform = 'translate(-50%, 0)';

  if (window.systemToastTimer) clearTimeout(window.systemToastTimer);
  window.systemToastTimer = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translate(-50%, 20px)';
  }, 3000);
}

// Initialize audio controllers & listeners
function initHorrorAudio() {
  const btn = document.getElementById('horrorAudioBtn');
  const mobileBtn = document.getElementById('mobileHorrorAudioBtn');

  if (btn) {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      HorrorAudioEngine.toggle();
    });
  }

  if (mobileBtn) {
    mobileBtn.addEventListener('click', (e) => {
      e.preventDefault();
      HorrorAudioEngine.toggle();
    });
  }

  // Keyboard shortcut: Press 'M' or 'm' to toggle mute
  window.addEventListener('keydown', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
    if (e.key === 'm' || e.key === 'M') {
      HorrorAudioEngine.toggle();
    }
  });

  // Check saved state or auto-prompt politely on user interaction
  const savedAudio = safeGetStorage('dos_horror_audio');
  if (savedAudio === 'true') {
    const resumeOnInteraction = () => {
      HorrorAudioEngine.unmute();
      window.removeEventListener('click', resumeOnInteraction);
      window.removeEventListener('keydown', resumeOnInteraction);
    };
    window.addEventListener('click', resumeOnInteraction, { once: true });
    window.addEventListener('keydown', resumeOnInteraction, { once: true });
  }
}

// Global window bindings for inline HTML handlers
window.openVaultModal = openVaultModal;
window.uploadVaultPhoto = uploadVaultPhoto;
window.getVaultPhoto = getVaultPhoto;


