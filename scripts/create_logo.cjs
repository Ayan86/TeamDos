const fs = require('fs');
const path = require('path');

// Detailed SVG reproducing the iconic Detectives of Supernatural (DOS) emblem:
// - Gothic shield/crest backdrop (pitch black with beveled edges)
// - Central detailed knight/gothic broadsword/dagger with carved quillons, textured wire grip, and steel blade
// - Intricate gothic calligraphy letters "D", "O", "S" in chiseled silver and dark chrome textures
// - Metallic highlights, depth shading, and crisp drop-shadow accents

const logoSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 600" width="100%" height="100%">
  <defs>
    <!-- Metallic Silver/Chrome Gradients -->
    <linearGradient id="silverChrome" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="20%" stop-color="#e2e8f0"/>
      <stop offset="45%" stop-color="#94a3b8"/>
      <stop offset="55%" stop-color="#f8fafc"/>
      <stop offset="80%" stop-color="#64748b"/>
      <stop offset="100%" stop-color="#cbd5e1"/>
    </linearGradient>

    <linearGradient id="darkChrome" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#475569"/>
      <stop offset="50%" stop-color="#1e293b"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>

    <linearGradient id="bladeLeft" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#ffffff"/>
      <stop offset="35%" stop-color="#cbd5e1"/>
      <stop offset="100%" stop-color="#64748b"/>
    </linearGradient>

    <linearGradient id="bladeRight" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#475569"/>
      <stop offset="60%" stop-color="#94a3b8"/>
      <stop offset="100%" stop-color="#f1f5f9"/>
    </linearGradient>

    <linearGradient id="crimsonAcc" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ef4444"/>
      <stop offset="50%" stop-color="#991b1b"/>
      <stop offset="100%" stop-color="#450a0a"/>
    </linearGradient>

    <radialGradient id="emblemGlow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#ef4444" stop-opacity="0.3"/>
      <stop offset="60%" stop-color="#dc2626" stop-opacity="0.05"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="0"/>
    </radialGradient>

    <filter id="metalGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#000000" flood-opacity="0.9"/>
      <feDropShadow dx="0" dy="0" stdDeviation="10" flood-color="#ef4444" flood-opacity="0.35"/>
    </filter>

    <filter id="dropDark" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="8" stdDeviation="8" flood-color="#000" flood-opacity="0.95"/>
    </filter>
  </defs>

  <rect width="600" height="600" fill="#000000" fill-opacity="0"/>
  
  <!-- Subtle Ambient Glow -->
  <circle cx="300" cy="300" r="260" fill="url(#emblemGlow)" />

  <!-- Outer Black Shield / Contour Backdrop with Gothic Silhouette -->
  <g filter="url(#dropDark)">
    <!-- Main silhouette path forming the iconic outer contour of the patch -->
    <path d="M 300 35 
             C 335 35, 370 70, 395 105 
             C 455 130, 520 195, 545 280 
             C 565 350, 555 435, 510 490 
             C 460 550, 385 535, 345 470 
             C 330 450, 315 540, 300 575 
             C 285 540, 270 450, 255 470 
             C 215 535, 140 550, 90 490 
             C 45 435, 35 350, 55 280 
             C 80 195, 145 130, 205 105 
             C 230 70, 265 35, 300 35 Z" 
          fill="#0c0d10" 
          stroke="#262a33" 
          stroke-width="5" 
          stroke-linejoin="round"/>
    
    <!-- Secondary inner dark border contour -->
    <path d="M 300 48 
             C 330 48, 360 80, 385 112 
             C 440 135, 505 198, 528 275 
             C 545 340, 538 418, 498 472 
             C 452 525, 385 515, 345 450 
             C 328 425, 312 510, 300 550 
             C 288 510, 272 425, 255 450 
             C 215 515, 148 525, 102 472 
             C 62 418, 55 340, 72 275 
             C 95 198, 160 135, 215 112 
             C 240 80, 270 48, 300 48 Z" 
          fill="#13151b" 
          stroke="#3b4252" 
          stroke-width="1.5"/>
  </g>

  <!-- =================================================================== -->
  <!-- GOTHIC LETTER 'D' (LEFT)                                            -->
  <!-- =================================================================== -->
  <g filter="url(#metalGlow)">
    <!-- Outer Gothic Spine & Flourishes of 'D' -->
    <path d="M 125 455 
             C 85 465, 55 405, 80 340 
             C 98 290, 140 240, 185 195 
             C 220 160, 245 140, 260 150 
             C 245 175, 230 210, 210 250 
             C 195 280, 180 305, 155 320 
             C 185 310, 225 330, 235 370 
             C 245 410, 215 450, 160 455 
             Z" 
          fill="url(#silverChrome)" 
          stroke="#1e293b" 
          stroke-width="3" 
          stroke-linejoin="miter"/>
    
    <!-- Inner faceted chiseled cuts of 'D' -->
    <path d="M 180 205 
             C 145 245, 110 290, 95 335 
             C 78 385, 100 435, 130 425 
             C 165 415, 185 365, 175 325 
             C 195 305, 215 265, 235 215 
             Z" 
          fill="#334155" 
          opacity="0.85"/>

    <path d="M 185 195 
             L 165 315 
             L 135 450 
             L 160 455 
             C 205 445, 230 405, 225 365 
             C 220 330, 190 315, 165 315 
             Z" 
          fill="url(#silverChrome)"/>
    
    <!-- Sharp Gothic Accents on D -->
    <polygon points="175,150 205,170 185,185 155,160" fill="#f8fafc"/>
    <polygon points="65,360 85,340 95,375 75,395" fill="#94a3b8"/>
    <polygon points="120,465 145,445 165,475 135,485" fill="#cbd5e1"/>
  </g>

  <!-- =================================================================== -->
  <!-- GOTHIC LETTER 'S' (RIGHT)                                           -->
  <!-- =================================================================== -->
  <g filter="url(#metalGlow)">
    <!-- Main Gothic Silhouette of 'S' -->
    <path d="M 410 145 
             C 435 155, 475 200, 485 245 
             C 495 285, 470 315, 430 330 
             C 465 335, 520 365, 530 415 
             C 540 470, 485 515, 425 505 
             C 370 495, 360 445, 395 425 
             C 425 410, 475 425, 485 390 
             C 495 355, 445 340, 410 335 
             C 365 325, 360 270, 390 220 
             C 415 180, 400 155, 410 145 Z" 
          fill="url(#silverChrome)" 
          stroke="#1e293b" 
          stroke-width="3" 
          stroke-linejoin="miter"/>

    <!-- Inner chiseled shade of 'S' -->
    <path d="M 425 160 
             C 455 190, 470 230, 460 265 
             C 450 300, 415 315, 385 320 
             C 375 275, 395 230, 420 190 Z" 
          fill="#1e293b" 
          opacity="0.8"/>

    <path d="M 410 345 
             C 445 355, 490 370, 480 405 
             C 470 435, 430 430, 405 440 
             C 385 450, 395 475, 430 485 
             C 480 490, 515 455, 510 410 
             C 505 375, 460 355, 425 345 Z" 
          fill="#475569" 
          opacity="0.9"/>
          
    <!-- Sharp Gothic Accents on S -->
    <polygon points="410,145 440,135 435,160 395,165" fill="#f8fafc"/>
    <polygon points="515,225 540,240 520,265 500,250" fill="#e2e8f0"/>
    <polygon points="520,470 545,490 515,510 495,490" fill="#cbd5e1"/>
  </g>

  <!-- =================================================================== -->
  <!-- CENTRAL LETTER 'O' & SHIELD CHAMBER                                 -->
  <!-- =================================================================== -->
  <g filter="url(#metalGlow)">
    <!-- Central Gothic Letter 'O' framing the vertical dagger -->
    <path d="M 300 150 
             L 345 220 
             L 345 380 
             L 300 450 
             L 255 380 
             L 255 220 
             Z" 
          fill="url(#darkChrome)" 
          stroke="url(#silverChrome)" 
          stroke-width="5" 
          stroke-linejoin="miter"/>

    <!-- Inner facets of 'O' -->
    <path d="M 300 175 
             L 330 230 
             L 330 370 
             L 300 425 
             L 270 370 
             L 270 230 
             Z" 
          fill="#090b10" 
          stroke="#475569" 
          stroke-width="2"/>
  </g>

  <!-- =================================================================== -->
  <!-- CENTRAL GOTHIC KNIGHT DAGGER / BROADSWORD                           -->
  <!-- =================================================================== -->
  <g filter="url(#dropDark)">
    <!-- 1. Pommel (Top Cap) -->
    <g transform="translate(300, 55)">
      <polygon points="0,-22 10,-12 12,0 0,6 -12,0 -10,-12" fill="url(#silverChrome)" stroke="#0f172a" stroke-width="1.5"/>
      <circle cx="0" cy="-6" r="4" fill="#f8fafc" />
      <rect x="-8" y="4" width="16" height="4" rx="2" fill="#94a3b8" />
    </g>

    <!-- 2. Hilt / Grip -->
    <g transform="translate(300, 75)">
      <!-- Leather / Ribbed Metal Handle -->
      <rect x="-7" y="0" width="14" height="42" rx="2" fill="#0f172a" stroke="#475569" stroke-width="1"/>
      <!-- Wire Wrapping Ribs -->
      <line x1="-7" y1="8" x2="7" y2="8" stroke="#cbd5e1" stroke-width="1.5"/>
      <line x1="-7" y1="16" x2="7" y2="16" stroke="#cbd5e1" stroke-width="1.5"/>
      <line x1="-7" y1="24" x2="7" y2="24" stroke="#cbd5e1" stroke-width="1.5"/>
      <line x1="-7" y1="32" x2="7" y2="32" stroke="#cbd5e1" stroke-width="1.5"/>
      <line x1="-7" y1="40" x2="7" y2="40" stroke="#cbd5e1" stroke-width="1.5"/>
    </g>

    <!-- 3. Elaborate Gothic Crossguard / Quillons with Carved Wings -->
    <g transform="translate(300, 125)">
      <!-- Main guard silhouette -->
      <path d="M 0 -8 
               C 18 -18, 45 -22, 68 -6 
               C 74 2, 65 14, 52 10 
               C 38 6, 25 18, 14 16 
               L 0 24 
               L -14 16 
               C -25 18, -38 6, -52 10 
               C -65 14, -74 2, -68 -6 
               C -45 -22, -18 -18, 0 -8 Z" 
            fill="url(#silverChrome)" 
            stroke="#0f172a" 
            stroke-width="2.5"/>
      
      <!-- Engraved Filigree & Skull / Gothic Motif on Guard Center -->
      <path d="M -20 -4 C -10 -15, 10 -15, 20 -4 C 12 12, -12 12, -20 -4 Z" fill="#1e293b"/>
      <circle cx="0" cy="-2" r="5" fill="#f8fafc" stroke="#dc2626" stroke-width="1"/>
      <polygon points="0,4 4,10 -4,10" fill="#ef4444"/>
      <line x1="-45" y1="0" x2="-20" y2="0" stroke="#0f172a" stroke-width="1.5"/>
      <line x1="20" y1="0" x2="45" y2="0" stroke="#0f172a" stroke-width="1.5"/>
    </g>

    <!-- 4. Steel Blade with Fuller (Center Groove) & Chiseled Edges -->
    <g transform="translate(300, 148)">
      <!-- Left Bevel (High Reflective Chrome) -->
      <path d="M 0 0 L -14 15 L -12 280 L 0 375 L 0 0 Z" fill="url(#bladeLeft)" stroke="#334155" stroke-width="0.75"/>
      
      <!-- Right Bevel (Dark Steel Chrome) -->
      <path d="M 0 0 L 14 15 L 12 280 L 0 375 L 0 0 Z" fill="url(#bladeRight)" stroke="#334155" stroke-width="0.75"/>
      
      <!-- Central Fuller (Blood Groove) -->
      <path d="M 0 10 L -3 20 L -2 240 L 0 260 L 2 240 L 3 20 Z" fill="#0f172a" opacity="0.9"/>
      <line x1="0" y1="10" x2="0" y2="350" stroke="#f8fafc" stroke-width="1.2" opacity="0.8"/>
      
      <!-- Blade Tip Sparkle -->
      <polygon points="0,375 -4,340 0,330 4,340" fill="#ffffff"/>
    </g>
  </g>

  <!-- =================================================================== -->
  <!-- LOWER BANNER / ACCENT FLARES                                        -->
  <!-- =================================================================== -->
  <g transform="translate(300, 520)" filter="url(#dropDark)">
    <!-- Lower Diamond Star Accent -->
    <polygon points="0,-16 6,0 0,16 -6,0" fill="#f8fafc" stroke="#ef4444" stroke-width="1.5"/>
    <line x1="-40" y1="0" x2="-10" y2="0" stroke="url(#silverChrome)" stroke-width="2"/>
    <line x1="10" y1="0" x2="40" y2="0" stroke="url(#silverChrome)" stroke-width="2"/>
  </g>
</svg>`;

// Write to public/ and public/uploads/ directories
const targets = [
  'public/paranormal_logo.svg',
  'public/logo.svg',
  'public/uploads/paranormal_logo.svg',
  'public/uploads/logo.svg',
  'public/horror_preloader.svg',
  'dist/paranormal_logo.svg',
  'dist/logo.svg'
];

targets.forEach(target => {
  const dir = path.dirname(target);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(target, logoSvg, 'utf8');
  console.log('Generated:', target);
});

console.log('DOS Logo SVG generated successfully.');
