const fs = require('fs');
const path = require('path');

const publicUploads = path.join(process.cwd(), 'public', 'uploads');
const distUploads = path.join(process.cwd(), 'dist', 'uploads');

if (!fs.existsSync(publicUploads)) fs.mkdirSync(publicUploads, { recursive: true });
if (!fs.existsSync(distUploads)) fs.mkdirSync(distUploads, { recursive: true });

function writeAsset(filename, svgContent) {
  const p1 = path.join(publicUploads, filename);
  const p2 = path.join(distUploads, filename);
  fs.writeFileSync(p1, svgContent, 'utf8');
  fs.writeFileSync(p2, svgContent, 'utf8');
  console.log(`Generated: ${filename}`);
}

// 1. EMF Meter
const emfSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="768" height="500" viewBox="0 0 768 500">
  <defs>
    <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0a0c10"/>
      <stop offset="100%" stop-color="#141824"/>
    </linearGradient>
    <linearGradient id="emfMeterGrad" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#10b981"/>
      <stop offset="50%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#ef4444"/>
    </linearGradient>
  </defs>
  <rect width="768" height="500" fill="url(#bgGrad)"/>
  <rect x="24" y="24" width="720" height="452" rx="10" fill="none" stroke="#262f45" stroke-width="1.5" stroke-dasharray="8 6"/>
  
  <!-- EMF Body -->
  <rect x="234" y="80" width="300" height="340" rx="16" fill="#12151e" stroke="#dc2626" stroke-width="2"/>
  
  <!-- LED Arc / Scale -->
  <path d="M 274 200 A 110 110 0 0 1 494 200" fill="none" stroke="#1f2937" stroke-width="16" stroke-linecap="round"/>
  <path d="M 274 200 A 110 110 0 0 1 460 130" fill="none" stroke="url(#emfMeterGrad)" stroke-width="16" stroke-linecap="round"/>
  
  <!-- Indicator Lights -->
  <circle cx="284" cy="180" r="7" fill="#10b981" filter="drop-shadow(0 0 4px #10b981)"/>
  <circle cx="324" cy="135" r="7" fill="#10b981"/>
  <circle cx="384" cy="110" r="7" fill="#f59e0b" filter="drop-shadow(0 0 4px #f59e0b)"/>
  <circle cx="444" cy="135" r="7" fill="#ef4444" filter="drop-shadow(0 0 6px #ef4444)"/>
  <circle cx="484" cy="180" r="7" fill="#ef4444"/>

  <!-- Screen -->
  <rect x="274" y="235" width="220" height="70" rx="6" fill="#040608" stroke="#374151" stroke-width="1"/>
  <text x="384" y="275" font-family="'Courier New', monospace" font-weight="900" font-size="28" fill="#ef4444" text-anchor="middle" letter-spacing="2">4.82 mG</text>
  <text x="384" y="295" font-family="'Courier New', monospace" font-size="10" fill="#9ca3af" text-anchor="middle" letter-spacing="1">ELECTROMAGNETIC FIELD FLUX</text>

  <!-- Control Knob -->
  <circle cx="384" cy="360" r="28" fill="#1e2433" stroke="#4b5563" stroke-width="2"/>
  <line x1="384" y1="340" x2="384" y2="355" stroke="#ef4444" stroke-width="3" stroke-linecap="round"/>

  <!-- Labels -->
  <text x="384" y="55" font-family="'Courier New', monospace" font-weight="bold" font-size="14" fill="#ef4444" text-anchor="middle" letter-spacing="3">DOS FORENSIC ARSENAL</text>
  <text x="384" y="450" font-family="'Courier New', monospace" font-size="13" fill="#cbd5e1" text-anchor="middle" letter-spacing="2">TRIFIELD / K-II EMF METER</text>
</svg>`;

// 2. REM-POD
const remPodSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="768" height="500" viewBox="0 0 768 500">
  <rect width="768" height="500" fill="#0b0d14"/>
  <rect x="24" y="24" width="720" height="452" rx="10" fill="none" stroke="#dc2626" stroke-width="1" stroke-opacity="0.3"/>
  
  <!-- Antenna Rod -->
  <line x1="384" y1="60" x2="384" y2="240" stroke="#94a3b8" stroke-width="6" stroke-linecap="round"/>
  <circle cx="384" cy="60" r="10" fill="#ef4444" filter="drop-shadow(0 0 8px #ef4444)"/>
  
  <!-- Radiating Field Rings -->
  <ellipse cx="384" cy="60" rx="60" ry="24" fill="none" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="4 4" opacity="0.8"/>
  <ellipse cx="384" cy="60" rx="110" ry="40" fill="none" stroke="#ef4444" stroke-width="1" stroke-dasharray="6 6" opacity="0.5"/>
  <ellipse cx="384" cy="60" rx="160" ry="60" fill="none" stroke="#ef4444" stroke-width="0.75" stroke-dasharray="8 8" opacity="0.25"/>

  <!-- Cylindrical Base Unit -->
  <rect x="264" y="240" width="240" height="170" rx="14" fill="#131722" stroke="#dc2626" stroke-width="2"/>

  <!-- Multi-Color LED Array -->
  <circle cx="294" cy="275" r="9" fill="#10b981" filter="drop-shadow(0 0 6px #10b981)"/>
  <circle cx="339" cy="275" r="9" fill="#3b82f6" filter="drop-shadow(0 0 6px #3b82f6)"/>
  <circle cx="384" cy="275" r="9" fill="#f59e0b" filter="drop-shadow(0 0 6px #f59e0b)"/>
  <circle cx="429" cy="275" r="9" fill="#ef4444" filter="drop-shadow(0 0 8px #ef4444)"/>
  <circle cx="474" cy="275" r="9" fill="#a855f7" filter="drop-shadow(0 0 6px #a855f7)"/>

  <!-- Speaker Grille -->
  <line x1="334" y1="320" x2="434" y2="320" stroke="#374151" stroke-width="3" stroke-linecap="round"/>
  <line x1="344" y1="335" x2="424" y2="335" stroke="#374151" stroke-width="3" stroke-linecap="round"/>
  <line x1="354" y1="350" x2="414" y2="350" stroke="#374151" stroke-width="3" stroke-linecap="round"/>

  <text x="384" y="390" font-family="'Courier New', monospace" font-weight="bold" font-size="12" fill="#ef4444" text-anchor="middle" letter-spacing="2">360° RADIATING EM POD</text>
  <text x="384" y="450" font-family="'Courier New', monospace" font-size="14" fill="#cbd5e1" text-anchor="middle" letter-spacing="2">REM-POD TELEMETRY SENSOR</text>
</svg>`;

// 3. Thermal Camera
const thermalSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="768" height="500" viewBox="0 0 768 500">
  <defs>
    <linearGradient id="thermalGrad" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#312e81"/>
      <stop offset="25%" stop-color="#4c1d95"/>
      <stop offset="50%" stop-color="#be185d"/>
      <stop offset="75%" stop-color="#ea580c"/>
      <stop offset="100%" stop-color="#fde047"/>
    </linearGradient>
  </defs>
  <rect width="768" height="500" fill="#08090d"/>
  
  <!-- Screen Frame -->
  <rect x="84" y="60" width="600" height="350" rx="12" fill="url(#thermalGrad)" stroke="#1e293b" stroke-width="3"/>

  <!-- Cold Spot Anomaly Silhouette -->
  <circle cx="430" cy="220" r="65" fill="#0f172a" opacity="0.85" filter="blur(15px)"/>
  <circle cx="430" cy="220" r="35" fill="#1e1b4b" opacity="0.9" filter="blur(8px)"/>

  <!-- Crosshair Reticle -->
  <circle cx="430" cy="220" r="28" fill="none" stroke="#22d3ee" stroke-width="2"/>
  <line x1="390" y1="220" x2="470" y2="220" stroke="#22d3ee" stroke-width="1.5"/>
  <line x1="430" y1="180" x2="430" y2="260" stroke="#22d3ee" stroke-width="1.5"/>

  <!-- HUD Telemetry -->
  <text x="110" y="100" font-family="'Courier New', monospace" font-size="16" font-weight="bold" fill="#ffffff">COLD SPOT: 11.4°C</text>
  <text x="110" y="125" font-family="'Courier New', monospace" font-size="12" fill="#94a3b8">AMBIENT: 26.8°C (Δ -15.4°C)</text>
  <text x="560" y="100" font-family="'Courier New', monospace" font-size="14" fill="#fde047" font-weight="bold">FLIR-IR 80Hz</text>

  <!-- Heat Scale Bar -->
  <rect x="640" y="90" width="16" height="290" rx="4" fill="url(#thermalGrad)" stroke="#fff" stroke-width="1"/>
  <text x="630" y="105" font-family="'Courier New', monospace" font-size="10" fill="#fff" text-anchor="end">32°C</text>
  <text x="630" y="375" font-family="'Courier New', monospace" font-size="10" fill="#fff" text-anchor="end">10°C</text>

  <text x="384" y="445" font-family="'Courier New', monospace" font-size="14" fill="#cbd5e1" text-anchor="middle" letter-spacing="2">FLIR INFRARED THERMAL IMAGING CAMERA</text>
</svg>`;

// 4. Full Spectrum Camera
const fullSpectrumSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="768" height="500" viewBox="0 0 768 500">
  <rect width="768" height="500" fill="#0a0a0f"/>
  <rect x="24" y="24" width="720" height="452" rx="10" fill="none" stroke="#a855f7" stroke-width="1" stroke-opacity="0.4"/>
  
  <!-- Optical Glass Lens -->
  <circle cx="384" cy="220" r="130" fill="#181824" stroke="#4b5563" stroke-width="8"/>
  <circle cx="384" cy="220" r="105" fill="#120e24" stroke="#a855f7" stroke-width="3"/>
  <circle cx="384" cy="220" r="75" fill="#2d124d" stroke="#ec4899" stroke-width="2"/>
  <circle cx="384" cy="220" r="45" fill="#090514" stroke="#38bdf8" stroke-width="2"/>
  
  <!-- Dual Light Sensor Flares -->
  <ellipse cx="360" cy="195" rx="35" ry="15" fill="#a855f7" opacity="0.3" transform="rotate(-30 360 195)"/>
  <ellipse cx="410" cy="245" rx="25" ry="10" fill="#38bdf8" opacity="0.3" transform="rotate(-30 410 245)"/>

  <!-- Spectral Bands Indicator -->
  <rect x="184" y="380" width="400" height="24" rx="4" fill="#1e1e2d" stroke="#374151" stroke-width="1"/>
  <rect x="184" y="380" width="130" height="24" fill="#8b5cf6" opacity="0.7"/>
  <rect x="314" y="380" width="140" height="24" fill="#10b981" opacity="0.7"/>
  <rect x="454" y="380" width="130" height="24" fill="#ef4444" opacity="0.7"/>
  <text x="249" y="396" font-family="'Courier New', monospace" font-size="10" font-weight="bold" fill="#fff" text-anchor="middle">UV (300-400nm)</text>
  <text x="384" y="396" font-family="'Courier New', monospace" font-size="10" font-weight="bold" fill="#fff" text-anchor="middle">VISIBLE</text>
  <text x="519" y="396" font-family="'Courier New', monospace" font-size="10" font-weight="bold" fill="#fff" text-anchor="middle">IR (700-1100nm)</text>

  <text x="384" y="65" font-family="'Courier New', monospace" font-weight="bold" font-size="14" fill="#c084fc" text-anchor="middle" letter-spacing="3">OPTICAL SPECTRUM SENSOR ARRAY</text>
  <text x="384" y="445" font-family="'Courier New', monospace" font-size="14" fill="#cbd5e1" text-anchor="middle" letter-spacing="2">FULL SPECTRUM (UV + VIS + IR) CAMERA</text>
</svg>`;

// 5. The Statesman Media Cover
const mediaStatesmanSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
  <rect width="800" height="500" fill="#0b0d12"/>
  <rect x="20" y="20" width="760" height="460" fill="#131720" stroke="#334155" stroke-width="1.5"/>
  <rect x="40" y="40" width="720" height="70" fill="#0f131a" stroke="#1e293b" stroke-width="1"/>
  <text x="60" y="82" font-family="'Cinzel', Georgia, serif" font-weight="900" font-size="28" fill="#e2e8f0" letter-spacing="3">THE STATESMAN</text>
  <text x="740" y="80" font-family="'Courier New', monospace" font-size="12" fill="#ef4444" text-anchor="end">PRESS FEATURE ARCHIVE</text>
  <line x1="40" y1="120" x2="760" y2="120" stroke="#dc2626" stroke-width="2"/>

  <!-- Headline -->
  <text x="60" y="170" font-family="'Cinzel', Georgia, serif" font-weight="bold" font-size="24" fill="#f8fafc">Ghostbusters of Bengal</text>
  <text x="60" y="205" font-family="'Cinzel', Georgia, serif" font-size="18" fill="#94a3b8">Real Life Paranormal Detectives</text>

  <!-- Quote block -->
  <rect x="60" y="230" width="680" height="150" fill="#090b0e" stroke="#1f2937" stroke-width="1" rx="6"/>
  <text x="80" y="265" font-family="sans-serif" font-size="14" fill="#cbd5e1" font-style="italic">"From 2010 to 2015, the team could not even pitch the idea of paranormal investigators to people.</text>
  <text x="80" y="295" font-family="sans-serif" font-size="14" fill="#cbd5e1" font-style="italic">It was an alien concept to Bengal that there are professionals who detect the presence of</text>
  <text x="80" y="325" font-family="sans-serif" font-size="14" fill="#cbd5e1" font-style="italic">unexplained phenomena with scientific instruments like motion sensors and EMF metres..."</text>

  <!-- Badge -->
  <rect x="60" y="410" width="170" height="32" rx="4" fill="#dc2626"/>
  <text x="145" y="431" font-family="'Courier New', monospace" font-size="11" font-weight="bold" fill="#fff" text-anchor="middle">NEWSPAPER ARCHIVE</text>
  <text x="740" y="430" font-family="'Courier New', monospace" font-size="12" fill="#64748b" text-anchor="end">PUBLISHED: THE STATESMAN (KOLKATA)</text>
</svg>`;

// 6 Vault Cases
function createVaultSvg(title, category, caseId, date, description) {
  return `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="500" viewBox="0 0 800 500">
  <defs>
    <radialGradient id="vG" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#1f2937" stop-opacity="0.8"/>
      <stop offset="100%" stop-color="#050608" stop-opacity="1"/>
    </radialGradient>
  </defs>
  <rect width="800" height="500" fill="#050608"/>
  <rect width="800" height="500" fill="url(#vG)"/>
  
  <!-- Tech Grid Background -->
  <line x1="0" y1="250" x2="800" y2="250" stroke="#ef4444" stroke-width="0.75" stroke-opacity="0.25"/>
  <line x1="400" y1="0" x2="400" y2="500" stroke="#ef4444" stroke-width="0.75" stroke-opacity="0.25"/>
  <circle cx="400" cy="250" r="140" fill="none" stroke="#ef4444" stroke-width="1" stroke-opacity="0.3" stroke-dasharray="8 6"/>
  <circle cx="400" cy="250" r="80" fill="none" stroke="#ef4444" stroke-width="1.5" stroke-opacity="0.4"/>

  <!-- Classification Header -->
  <rect x="30" y="25" width="740" height="50" fill="#0a0d14" stroke="#dc2626" stroke-width="1.5"/>
  <text x="50" y="56" font-family="'Courier New', monospace" font-weight="900" font-size="16" fill="#ef4444" letter-spacing="3">DOS VAULT // EVIDENCE FILE</text>
  <text x="750" y="56" font-family="'Courier New', monospace" font-weight="bold" font-size="14" fill="#f87171" text-anchor="end">${caseId}</text>

  <!-- Evidence Body -->
  <text x="400" y="160" font-family="'Cinzel', Georgia, serif" font-weight="bold" font-size="22" fill="#ffffff" text-anchor="middle">${title}</text>
  <text x="400" y="190" font-family="'Courier New', monospace" font-size="13" fill="#ef4444" text-anchor="middle" letter-spacing="2">CATEGORY: ${category}</text>

  <rect x="100" y="295" width="600" height="85" rx="6" fill="#0d1117" stroke="#30363d" stroke-width="1"/>
  <text x="120" y="325" font-family="sans-serif" font-size="13" fill="#cbd5e1">${description.slice(0, 75)}</text>
  <text x="120" y="350" font-family="sans-serif" font-size="13" fill="#94a3b8">${description.slice(75, 150)}...</text>

  <text x="50" y="445" font-family="'Courier New', monospace" font-size="12" fill="#64748b">LOG DATE: ${date}</text>
  <text x="750" y="445" font-family="'Courier New', monospace" font-size="12" fill="#ef4444" text-anchor="end">CLASSIFICATION: EVIDENCE ARCHIVED</text>
</svg>`;
}

// Write the 4 Equipment Images
writeAsset('file-1790002915624-673972776.png', emfSvg);
writeAsset('file-1790003136266-986319573.png', remPodSvg);
writeAsset('file-1790003217001-827818812.png', thermalSvg);
writeAsset('file-1790003310790-124650382.png', fullSpectrumSvg);

// Write the Media Image
writeAsset('file-1790022749216-317677805.jpg', mediaStatesmanSvg);

// Write the 6 Vault Images
writeAsset('file-1790019331890-889947608.jpg', createVaultSvg(
  'Black Mist Capture', 'Shadow Mist / Optical Ectoplasmic Vapor', 'DOS-VLT-001', '2025-10-12',
  'During a structured nighttime baseline investigation, high-resolution continuous infrared camera sensors recorded a distinct localized dense black mass moving against the ambient convection currents.'
));

writeAsset('file-1790019937464-130220790.jpg', createVaultSvg(
  'A Face Within the Mist', 'Anomalous Facial Geometry', 'DOS-VLT-002', '2025-06-18',
  'Acoustic and optical multi-sensor array recording. Micro-analysis of localized mist revealed distinct structural contours matching human facial cranial proportions.'
));

writeAsset('file-1790020206960-650403308.jpg', createVaultSvg(
  'Unexplained Scratches — Dow Hill Investigation', 'Physical Telemetry Trace', 'DOS-VLT-003', '2025-04-03',
  'During a field deployment in the Dow Hill forested sector, three parallel epidermal abrasions materialized on the investigator arm without prior contact or environmental debris.'
));

writeAsset('file-1790020693272-889938878.jpeg', createVaultSvg(
  'Unexplained Smoke-Like Mist — North Kolkata', 'Atmospheric Particulate Anomaly', 'DOS-VLT-004', '2024-11-20',
  'A dense column of vapor observed in a sealed heritage corridor. Particle sensors registered no combustion particulates or thermal differential, ruling out conventional smoke.'
));

writeAsset('file-1790021716515-120129270.jpg', createVaultSvg(
  'Unexplained Black Figure — Tollygunge, Kolkata', 'Full Bodied Shadow Apparition', 'DOS-VLT-005', '2024-08-14',
  'Full spectrum optical capture showing an upright bipedal shadow silhouette standing within a doorway. Infrared thermography logged an instantaneous 4.2°C ambient temperature drop.'
));

writeAsset('file-1790022107107-862794177.jpg', createVaultSvg(
  'UV-Captured Facial Overlap — Tollygunge, Kolkata', 'Ultraviolet Optical Reflection', 'DOS-VLT-006', '2024-03-29',
  'UV photographic band examination of an interior reflective mirror revealed a secondary translucent facial contour overlapping the primary investigator reflection.'
));

console.log('All missing assets successfully generated and synced.');
