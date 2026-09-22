import os
import subprocess
import shutil

PUBLIC_UPLOADS = os.path.join(os.getcwd(), 'public', 'uploads')
DIST_UPLOADS = os.path.join(os.getcwd(), 'dist', 'uploads')
os.makedirs(PUBLIC_UPLOADS, exist_ok=True)
os.makedirs(DIST_UPLOADS, exist_ok=True)

def sync_file(src_path, filename):
    dest1 = os.path.join(PUBLIC_UPLOADS, filename)
    dest2 = os.path.join(DIST_UPLOADS, filename)
    shutil.copy2(src_path, dest1)
    shutil.copy2(src_path, dest2)
    print(f"Synced {filename}: {os.path.getsize(dest1)} bytes")

def run_cmd(cmd):
    res = subprocess.run(cmd, shell=True, capture_output=True, text=True)
    if res.returncode != 0:
        print(f"Command error: {res.stderr}")
    return res.returncode == 0

print("Generating missing gallery and site assets...")

# 0. Anirban Das Team Photo
sync_file("public/Anirban_Das.jpg", "file-1790024864263-99168072.jpeg")

# 1. Gallery 0: Didi No. 1 (Ishita Das Sanyal)
# Create 800x600 card with Ishita's photo on the left/center and TV broadcast graphics
cmd_didi = """
convert -size 800x600 xc:"#08090d" \\
  \\( public/Ishita_Das_Sanyal.jpg -resize 440x540^ -gravity center -extent 440x540 \\
     -stroke "#dc2626" -strokewidth 2 -fill none -draw "rectangle 0,0 439,539" \\) \\
  -geometry +30+30 -composite \\
  -fill "#ffffff" -font "Helvetica-Bold" -pointsize 26 -annotate +500+100 "DIDI NO. 1" \\
  -fill "#ef4444" -font "Helvetica-Bold" -pointsize 15 -annotate +500+135 "ZEE BANGLA TELEVISION" \\
  -fill "#94a3b8" -font "Helvetica" -pointsize 13 -annotate +500+190 "FEATURED GUEST:\\nISHITA DAS SANYAL" \\
  -fill "#cbd5e1" -font "Helvetica" -pointsize 12 -annotate +500+260 "CO-FOUNDER & CHIEF\\nINVESTIGATOR, DOS" \\
  -fill "#ef4444" -font "Courier-Bold" -pointsize 12 -annotate +500+340 "BROADCAST ARCHIVE" \\
  -fill "#64748b" -font "Courier" -pointsize 11 -annotate +500+370 "KOLKATA • 2026-09-21" \\
  \\( -size 270x60 xc:"#12151e" -stroke "#2a3447" -strokewidth 1 -draw "rectangle 0,0 269,59" \\
     -fill "#ef4444" -font "Helvetica-Bold" -pointsize 11 -gravity center -annotate +0+0 "DETECTIVES OF SUPERNATURAL" \\) \\
  -geometry +495+450 -composite \\
  -stroke "#2a3447" -strokewidth 1 -fill none -draw "rectangle 10,10 789,589" \\
  /tmp/gal_didi.jpg
"""
if run_cmd(cmd_didi):
    sync_file("/tmp/gal_didi.jpg", "file-1790024755379-13823450.jpg")

# 2. Gallery 1: In an Investigation (Ayush Majumder)
cmd_ayush = """
convert -size 800x600 xc:"#08090d" \\
  \\( public/Ayush_Majumder.jpg -resize 440x540^ -gravity center -extent 440x540 \\
     -stroke "#10b981" -strokewidth 2 -fill none -draw "rectangle 0,0 439,539" \\) \\
  -geometry +30+30 -composite \\
  -fill "#10b981" -font "Courier-Bold" -pointsize 13 -annotate +500+70 "[REC ● 02:41:19 AM]" \\
  -fill "#ffffff" -font "Helvetica-Bold" -pointsize 24 -annotate +500+110 "FIELD INVESTIGATION" \\
  -fill "#ef4444" -font "Helvetica-Bold" -pointsize 15 -annotate +500+145 "ACTIVE MONITORING" \\
  -fill "#94a3b8" -font "Helvetica" -pointsize 13 -annotate +500+200 "INVESTIGATOR:\\nAYUSH MAJUMDER" \\
  -fill "#cbd5e1" -font "Helvetica" -pointsize 12 -annotate +500+270 "TECHNICAL ANALYST &\\nEMF AUDIT SPECIALIST" \\
  -fill "#10b981" -font "Courier" -pointsize 11 -annotate +500+340 "STATUS: NOMINAL" \\
  -fill "#64748b" -font "Courier" -pointsize 11 -annotate +500+370 "FIELD LOCATION • 2025-11-14" \\
  \\( -size 270x60 xc:"#0d141e" -stroke "#1e293b" -strokewidth 1 -draw "rectangle 0,0 269,59" \\
     -fill "#38bdf8" -font "Courier-Bold" -pointsize 11 -gravity center -annotate +0+0 "MULTI-FREQUENCY TELEMETRY" \\) \\
  -geometry +495+450 -composite \\
  -stroke "#1e293b" -strokewidth 1 -fill none -draw "rectangle 10,10 789,589" \\
  /tmp/gal_ayush.jpg
"""
if run_cmd(cmd_ayush):
    sync_file("/tmp/gal_ayush.jpg", "file-1790023310764-198067039.jpg")

# 3. Gallery 2: In an Investigation (Team DOS - Haunted Locations Kolkata)
cmd_team1 = """
convert public/uploads/photo-1789742127721-373672547.jfif -resize 800x600^ -gravity center -extent 800x600 \\
  \\( -size 800x120 xc:"rgba(4,6,10,0.85)" \\
     -fill "#ef4444" -font "Courier-Bold" -pointsize 13 -annotate +25+35 "DETECTIVES OF SUPERNATURAL • EVIDENTIARY ARCHIVE" \\
     -fill "#ffffff" -font "Helvetica-Bold" -pointsize 20 -annotate +25+65 "NOCTURNAL INVESTIGATION: KOLKATA HERITAGE SITE" \\
     -fill "#94a3b8" -font "Courier" -pointsize 11 -annotate +25+95 "TEAM DOS ON LOCATION • DATE: 2025-08-22 • SENSORS DEPLOYED" \\) \\
  -gravity south -composite \\
  -stroke "#dc2626" -strokewidth 2 -fill none -draw "rectangle 10,10 789,589" \\
  /tmp/gal_team1.jpg
"""
if run_cmd(cmd_team1):
    sync_file("/tmp/gal_team1.jpg", "file-1790023846696-2764748.jpg")

# 4. Gallery 3: In an Investigation (Team DOS - Haunted Location Kolkata)
cmd_team2 = """
convert public/uploads/photo-1789742253854-879805478.jfif -resize 800x600^ -gravity center -extent 800x600 \\
  \\( -size 800x120 xc:"rgba(4,6,10,0.85)" \\
     -fill "#38bdf8" -font "Courier-Bold" -pointsize 13 -annotate +25+35 "DOS TECHNICAL OPERATIONS • ANOMALY SURVEILLANCE" \\
     -fill "#ffffff" -font "Helvetica-Bold" -pointsize 20 -annotate +25+65 "FIELD RIGGING & AUDIT • NORTH KOLKATA" \\
     -fill "#94a3b8" -font "Courier" -pointsize 11 -annotate +25+95 "TEAM DOS PROTOCOL • DATE: 2025-08-20 • CONTINUOUS DATA LOGGING" \\) \\
  -gravity south -composite \\
  -stroke "#38bdf8" -strokewidth 2 -fill none -draw "rectangle 10,10 789,589" \\
  /tmp/gal_team2.jpg
"""
if run_cmd(cmd_team2):
    sync_file("/tmp/gal_team2.jpg", "file-1790023918447-701445997.jpg")

# 5. Gallery 4: In an Investigation (Devraj, Ishita, Anirban & Ayush)
# 4-investigator grid
cmd_team4 = """
convert -size 800x600 xc:"#07080c" \\
  \\( public/Debraj_Sanyal.jpg -resize 180x220^ -gravity center -extent 180x220 -stroke "#ef4444" -strokewidth 1 -fill none -draw "rectangle 0,0 179,219" \\) -geometry +20+90 -composite \\
  \\( public/Ishita_Das_Sanyal.jpg -resize 180x220^ -gravity center -extent 180x220 -stroke "#ef4444" -strokewidth 1 -fill none -draw "rectangle 0,0 179,219" \\) -geometry +215+90 -composite \\
  \\( public/Anirban_Das.jpg -resize 180x220^ -gravity center -extent 180x220 -stroke "#ef4444" -strokewidth 1 -fill none -draw "rectangle 0,0 179,219" \\) -geometry +410+90 -composite \\
  \\( public/Ayush_Majumder.jpg -resize 180x220^ -gravity center -extent 180x220 -stroke "#ef4444" -strokewidth 1 -fill none -draw "rectangle 0,0 179,219" \\) -geometry +605+90 -composite \\
  -fill "#ffffff" -font "Helvetica-Bold" -pointsize 22 -gravity north -annotate +0+25 "DOS CORE EXPEDITIONARY UNIT" \\
  -fill "#ef4444" -font "Courier-Bold" -pointsize 12 -gravity north -annotate +0+55 "EMPIRICAL PARANORMAL RESEARCH TEAM • KOLKATA (2025-05-19)" \\
  -fill "#cbd5e1" -font "Helvetica-Bold" -pointsize 11 -annotate +25+330 "DEBRAJ SANYAL\\nFOUNDER & LEAD" \\
  -fill "#cbd5e1" -font "Helvetica-Bold" -pointsize 11 -annotate +220+330 "ISHITA DAS SANYAL\\nCO-FOUNDER" \\
  -fill "#cbd5e1" -font "Helvetica-Bold" -pointsize 11 -annotate +415+330 "ANIRBAN DAS\\nINVESTIGATOR" \\
  -fill "#cbd5e1" -font "Helvetica-Bold" -pointsize 11 -annotate +610+330 "AYUSH MAJUMDER\\nTECH ANALYST" \\
  \\( -size 760x180 xc:"#0f121a" -stroke "#232b3d" -strokewidth 1 -draw "rectangle 0,0 759,179" \\
     -fill "#ef4444" -font "Courier-Bold" -pointsize 13 -annotate +20+35 "FIELD MISSION BRIEFING: KOLKATA URBAN ANOMALY AUDIT" \\
     -fill "#94a3b8" -font "Helvetica" -pointsize 12 -annotate +20+65 "Synchronized environmental telemetry, multi-directional night-vision recording," \\
     -fill "#94a3b8" -font "Helvetica" -pointsize 12 -annotate +20+90 "and calibrated acoustic spectrum logging during active anomaly surge." \\
     -fill "#38bdf8" -font "Courier" -pointsize 11 -annotate +20+140 "CLASSIFICATION: VERIFIED TECHNICAL EVIDENCE • DOS ARCHIVES" \\) \\
  -geometry +20+390 -composite \\
  -stroke "#334155" -strokewidth 1 -fill none -draw "rectangle 10,10 789,589" \\
  /tmp/gal_team4.png
"""
if run_cmd(cmd_team4):
    sync_file("/tmp/gal_team4.png", "file-1790024137833-962828907.png")

# 6. Gallery 5: A haunted Trip To Benagram
cmd_bena = """
convert public/uploads/horror_background_wide.jpg -resize 800x600^ -gravity center -extent 800x600 \\
  -modulate 80,110,95 \\
  \\( -size 800x600 xc:none -fill "rgba(10,13,20,0.7)" -draw "rectangle 0,420 800,600" \\
     -fill "rgba(239,68,68,0.15)" -draw "rectangle 0,0 800,600" \\) -composite \\
  -fill "#ef4444" -font "Courier-Bold" -pointsize 15 -annotate +30+460 "DOS EXPEDITION DOSSIER // ASANSOL SECTOR" \\
  -fill "#ffffff" -font "Helvetica-Bold" -pointsize 26 -annotate +30+498 "BENAGRAM: THE HAUNTED VILLAGE" \\
  -fill "#cbd5e1" -font "Helvetica" -pointsize 13 -annotate +30+535 "Comprehensive field study of the abandoned Bengal ghost settlement • Team DOS" \\
  -fill "#94a3b8" -font "Courier" -pointsize 11 -annotate +30+565 "LOCATION: ASANSOL / PURULIA BORDER • EXPEDITION DATE: 2025-02-10" \\
  -stroke "#dc2626" -strokewidth 2 -fill none -draw "rectangle 10,10 789,589" \\
  /tmp/gal_bena.jpg
"""
if run_cmd(cmd_bena):
    sync_file("/tmp/gal_bena.jpg", "file-1790024233346-166976861.jpg")

# 7. Gallery 6: Promotion (Movie)
cmd_promo1 = """
convert -size 800x600 xc:"#07090e" \\
  \\( public/uploads/horror_background_wide.jpg -resize 800x600^ -gravity center -extent 800x600 -modulate 70,80,100 \\) -composite \\
  \\( -size 800x600 xc:none \\
     -fill "rgba(7,9,14,0.75)" -draw "rectangle 0,0 800,600" \\) -composite \\
  \\( public/Debraj_Sanyal.jpg -resize 180x240^ -gravity center -extent 180x240 -stroke "#dc2626" -strokewidth 2 -fill none -draw "rectangle 0,0 179,239" \\) -geometry +40+180 -composite \\
  \\( public/Ishita_Das_Sanyal.jpg -resize 180x240^ -gravity center -extent 180x240 -stroke "#dc2626" -strokewidth 2 -fill none -draw "rectangle 0,0 179,239" \\) -geometry +240+180 -composite \\
  -fill "#ef4444" -font "Courier-Bold" -pointsize 14 -annotate +450+190 "CINEMA & MEDIA CONSULTATION" \\
  -fill "#ffffff" -font "Helvetica-Bold" -pointsize 26 -annotate +450+230 "PARANORMAL\\nMOVIE PROMOTION" \\
  -fill "#cbd5e1" -font "Helvetica" -pointsize 13 -annotate +450+310 "Technical consultant partnership with\\nleading Indian supernatural cinema." \\
  -fill "#94a3b8" -font "Helvetica" -pointsize 12 -annotate +450+370 "Team DOS expert panel on authentic\\nhauntings and empirical folklore." \\
  -fill "#ef4444" -font "Courier-Bold" -pointsize 12 -annotate +450+440 "LOCATION: KOLKATA • 2025-10-15" \\
  -fill "#ffffff" -font "Helvetica-Bold" -pointsize 22 -gravity north -annotate +0+35 "DETECTIVES OF SUPERNATURAL" \\
  -stroke "#334155" -strokewidth 1 -fill none -draw "rectangle 10,10 789,589" \\
  /tmp/gal_promo1.jpg
"""
if run_cmd(cmd_promo1):
    sync_file("/tmp/gal_promo1.jpg", "file-1790024399578-99231812.jpg")

# 8. Gallery 7: Promotion (Movie - 2024-10-31 Halloween)
cmd_promo2 = """
convert -size 800x600 xc:"#07090e" \\
  \\( public/uploads/horror_background_wide.jpg -resize 800x600^ -gravity center -extent 800x600 -modulate 60,110,80 \\) -composite \\
  \\( -size 800x600 xc:none \\
     -fill "rgba(10,12,18,0.8)" -draw "rectangle 0,0 800,600" \\) -composite \\
  -fill "#f59e0b" -font "Courier-Bold" -pointsize 14 -gravity north -annotate +0+80 "HALLOWEEN SPECIAL SCREENING & ARCHIVE" \\
  -fill "#ffffff" -font "Helvetica-Bold" -pointsize 32 -gravity north -annotate +0+115 "CINEMATIC PREMIERE" \\
  -fill "#ef4444" -font "Helvetica-Bold" -pointsize 20 -gravity north -annotate +0+165 "DETECTIVES OF SUPERNATURAL" \\
  \\( -size 720x280 xc:"#10141f" -stroke "#26334a" -strokewidth 1 -draw "rectangle 0,0 719,279" \\
     -fill "#f87171" -font "Courier-Bold" -pointsize 13 -annotate +30+40 "THEATRICAL RELEASE CONSULTATION & PUBLIC DEBATE" \\
     -fill "#e2e8f0" -font "Helvetica" -pointsize 13 -annotate +30+80 "Team DOS joined cast and creators for an exclusive post-screening forum," \\
     -fill "#e2e8f0" -font "Helvetica" -pointsize 13 -annotate +30+110 "debunking Hollywood tropes while highlighting verifiable evidence collected" \\
     -fill "#e2e8f0" -font "Helvetica" -pointsize 13 -annotate +30+140 "during over a decade of Indian paranormal field investigations." \\
     -fill "#38bdf8" -font "Courier" -pointsize 12 -annotate +30+200 "PRESS ENGAGEMENT • KOLKATA SECTOR • 2024-10-31" \\
     -fill "#10b981" -font "Courier-Bold" -pointsize 12 -annotate +30+235 "VERIFIED MEDIA ENGAGEMENT RECORD" \\) \\
  -geometry +40+230 -composite \\
  -stroke "#dc2626" -strokewidth 2 -fill none -draw "rectangle 10,10 789,589" \\
  /tmp/gal_promo2.jpg
"""
if run_cmd(cmd_promo2):
    sync_file("/tmp/gal_promo2.jpg", "file-1790024473615-548013419.jpg")

# 9. Gallery 8: Promotion (Team DOS Outreach Event)
cmd_promo3 = """
convert -size 800x600 xc:"#07090e" \\
  \\( public/uploads/horror_background_wide.jpg -resize 800x600^ -gravity center -extent 800x600 -modulate 65,90,95 \\) -composite \\
  \\( -size 800x600 xc:none \\
     -fill "rgba(8,10,16,0.82)" -draw "rectangle 0,0 800,600" \\) -composite \\
  \\( public/Debraj_Sanyal.jpg -resize 160x200^ -gravity center -extent 160x200 -stroke "#38bdf8" -strokewidth 1 -fill none -draw "rectangle 0,0 159,199" \\) -geometry +50+170 -composite \\
  \\( public/Ayush_Majumder.jpg -resize 160x200^ -gravity center -extent 160x200 -stroke "#38bdf8" -strokewidth 1 -fill none -draw "rectangle 0,0 159,199" \\) -geometry +230+170 -composite \\
  -fill "#38bdf8" -font "Courier-Bold" -pointsize 14 -annotate +420+180 "PUBLIC OUTREACH & EDUCATION" \\
  -fill "#ffffff" -font "Helvetica-Bold" -pointsize 26 -annotate +420+220 "DOS PUBLIC CONCLAVE" \\
  -fill "#cbd5e1" -font "Helvetica" -pointsize 13 -annotate +420+290 "Educational demonstration of paranormal\\ntechnology, EMF detectors, and acoustic" \\
  -fill "#cbd5e1" -font "Helvetica" -pointsize 13 -annotate +420+335 "spectrogram calibration to dispel\\nsuperstition through empirical science." \\
  -fill "#ef4444" -font "Courier-Bold" -pointsize 12 -annotate +420+410 "VENUE: KOLKATA • 2025-08-22" \\
  -fill "#ffffff" -font "Helvetica-Bold" -pointsize 22 -gravity north -annotate +0+35 "DETECTIVES OF SUPERNATURAL" \\
  -stroke "#38bdf8" -strokewidth 1 -fill none -draw "rectangle 10,10 789,589" \\
  /tmp/gal_promo3.jpg
"""
if run_cmd(cmd_promo3):
    sync_file("/tmp/gal_promo3.jpg", "file-1790024559485-56923581.jpg")

# 10. EVP Analysis
cmd_evp = """
convert -size 800x600 xc:"#07090e" \\
  \\( -size 740x540 xc:"#0a0d14" -stroke "#1e293b" -strokewidth 1 -draw "rectangle 0,0 739,539" \\
     -fill "#ef4444" -font "Courier-Bold" -pointsize 14 -annotate +30+40 "DOS LABORATORY: ELECTRONIC VOICE PHENOMENON (EVP)" \\
     -fill "#ffffff" -font "Helvetica-Bold" -pointsize 22 -annotate +30+75 "ACOUSTIC SPECTROGRAM & WAVEFORM ANALYSIS" \\
     -fill "#94a3b8" -font "Helvetica" -pointsize 12 -annotate +30+110 "High-resolution spectral analysis isolating anomalous audio frequency in 300Hz-3.4kHz vocal corridor." \\
     -stroke "#ef4444" -strokewidth 2 -fill none -draw "polyline 30,300 90,320 150,260 210,380 270,180 330,420 390,140 450,440 510,210 570,360 630,290 710,300" \\
     -stroke "#38bdf8" -strokewidth 1 -strokemillimeters 1 -fill none -draw "line 30,300 710,300" \\
     -fill "#38bdf8" -font "Courier" -pointsize 11 -annotate +30+280 "0 dB BASELINE" \\
     -fill "#ef4444" -font "Courier-Bold" -pointsize 12 -annotate +390+120 "ANOMALOUS HARMONIC SPIKE (+18.4 dB)" \\
     -fill "#10b981" -font "Courier" -pointsize 11 -annotate +30+480 "SAMPLING: 96kHz / 24-bit PCM • CALIBRATED HYDRO/OMNI CAPSULE" \\
     -fill "#64748b" -font "Courier" -pointsize 11 -annotate +30+510 "DOS RESEARCH DIVISION • METHODOLOGY WHITE PAPER" \\) \\
  -geometry +30+30 -composite \\
  -stroke "#dc2626" -strokewidth 2 -fill none -draw "rectangle 10,10 789,589" \\
  /tmp/evp_analysis.jpg
"""
if run_cmd(cmd_evp):
    sync_file("/tmp/evp_analysis.jpg", "evp_analysis.jpg")

# 11. Thermal Camera
cmd_thermal = """
convert -size 800x600 xc:"#07090e" \\
  \\( -size 740x540 xc:"#080a10" -stroke "#1e293b" -strokewidth 1 -draw "rectangle 0,0 739,539" \\
     -fill "#38bdf8" -font "Courier-Bold" -pointsize 14 -annotate +30+40 "INFRARED THERMOGRAPHY PROTOCOL" \\
     -fill "#ffffff" -font "Helvetica-Bold" -pointsize 22 -annotate +30+75 "CALIBRATED THERMAL GRADIENT DISPERSION" \\
     -fill "#94a3b8" -font "Helvetica" -pointsize 12 -annotate +30+110 "FLIR focal plane array sensor capturing micro-temperature differentials without physical air draft." \\
     \\( -size 680x240 gradient:"#1e1b4b-#4c1d95-#9333ea-#ef4444-#f59e0b-#fef08a" \\) -geometry +30+160 -composite \\
     -stroke "#ffffff" -strokewidth 2 -fill none -draw "circle 370,280 370,330" \\
     -stroke "#ffffff" -strokewidth 1 -fill none -draw "line 320,280 420,280" -draw "line 370,230 370,330" \\
     -fill "#ffffff" -font "Courier-Bold" -pointsize 14 -annotate +390+270 "FOCAL COLD SPOT: 14.2°C" \\
     -fill "#cbd5e1" -font "Courier" -pointsize 11 -annotate +30+430 "AMBIENT ROOM TEMP: 28.7°C • DROP RATE: -14.5°C in 4.2 sec" \\
     -fill "#10b981" -font "Courier" -pointsize 11 -annotate +30+480 "SPECTRAL BAND: 7.5 - 14 um • ACCURACY: ±0.05°C" \\
     -fill "#64748b" -font "Courier" -pointsize 11 -annotate +30+510 "DOS RESEARCH DIVISION • THERMAL RADIOMETRIC AUDIT" \\) \\
  -geometry +30+30 -composite \\
  -stroke "#38bdf8" -strokewidth 2 -fill none -draw "rectangle 10,10 789,589" \\
  /tmp/thermal_camera.jpg
"""
if run_cmd(cmd_thermal):
    sync_file("/tmp/thermal_camera.jpg", "thermal_camera.jpg")

# 12. Investigation Protocol
cmd_protocol = """
convert -size 800x600 xc:"#07090e" \\
  \\( -size 740x540 xc:"#080a10" -stroke "#1e293b" -strokewidth 1 -draw "rectangle 0,0 739,539" \\
     -fill "#ef4444" -font "Courier-Bold" -pointsize 14 -annotate +30+40 "SCIENTIFIC PARANORMAL METHODOLOGY" \\
     -fill "#ffffff" -font "Helvetica-Bold" -pointsize 22 -annotate +30+75 "DOS STANDARD INVESTIGATION PROTOCOL" \\
     -fill "#94a3b8" -font "Helvetica" -pointsize 12 -annotate +30+110 "Multi-phase empirical investigation lifecycle ensuring debiasing, baseline calibration, and chain of custody." \\
     \\( -size 200x120 xc:"#121622" -stroke "#ef4444" -strokewidth 1 -draw "rectangle 0,0 199,119" \\
        -fill "#ef4444" -font "Courier-Bold" -pointsize 12 -annotate +15+30 "PHASE 1" \\
        -fill "#ffffff" -font "Helvetica-Bold" -pointsize 13 -annotate +15+55 "PRE-AUDIT &\\nBASELINES" \\
        -fill "#94a3b8" -font "Helvetica" -pointsize 10 -annotate +15+95 "EMF, RF & Structural" \\) -geometry +30+180 -composite \\
     \\( -size 200x120 xc:"#121622" -stroke "#f59e0b" -strokewidth 1 -draw "rectangle 0,0 199,119" \\
        -fill "#f59e0b" -font "Courier-Bold" -pointsize 12 -annotate +15+30 "PHASE 2" \\
        -fill "#ffffff" -font "Helvetica-Bold" -pointsize 13 -annotate +15+55 "SYNCHRONIZED\\nSURVEILLANCE" \\
        -fill "#94a3b8" -font "Helvetica" -pointsize 10 -annotate +15+95 "Audio, Thermal, IR" \\) -geometry +270+180 -composite \\
     \\( -size 200x120 xc:"#121622" -stroke "#10b981" -strokewidth 1 -draw "rectangle 0,0 199,119" \\
        -fill "#10b981" -font "Courier-Bold" -pointsize 12 -annotate +15+30 "PHASE 3" \\
        -fill "#ffffff" -font "Helvetica-Bold" -pointsize 13 -annotate +15+55 "FORENSIC\\nTRIANGULATION" \\
        -fill "#94a3b8" -font "Helvetica" -pointsize 10 -annotate +15+95 "Debunking & Verify" \\) -geometry +510+180 -composite \\
     -fill "#cbd5e1" -font "Helvetica" -pointsize 12 -annotate +30+360 "1. Exhaust natural environmental, acoustic, structural, and electrical causes first." \\
     -fill "#cbd5e1" -font "Helvetica" -pointsize 12 -annotate +30+395 "2. Simultaneous redundant recording across minimum 2 independent sensors." \\
     -fill "#cbd5e1" -font "Helvetica" -pointsize 12 -annotate +30+430 "3. Strict chain-of-custody for digital media files with SHA-256 integrity hashing." \\
     -fill "#38bdf8" -font "Courier" -pointsize 11 -annotate +30+490 "DOS RESEARCH ARCHIVE • PEER DOCUMENTATION STANDARD" \\) \\
  -geometry +30+30 -composite \\
  -stroke "#334155" -strokewidth 1 -fill none -draw "rectangle 10,10 789,589" \\
  /tmp/investigation_protocol.jpg
"""
if run_cmd(cmd_protocol):
    sync_file("/tmp/investigation_protocol.jpg", "investigation_protocol.jpg")

# 13. Heritage Estate
cmd_estate = """
convert public/uploads/horror_background_wide.jpg -resize 800x600^ -gravity center -extent 800x600 \\
  -modulate 75,90,95 \\
  \\( -size 800x600 xc:none -fill "rgba(7,9,14,0.75)" -draw "rectangle 0,420 800,600" \\) -composite \\
  -fill "#ef4444" -font "Courier-Bold" -pointsize 14 -annotate +30+460 "HISTORIC HERITAGE ESTATE ARCHIVE" \\
  -fill "#ffffff" -font "Helvetica-Bold" -pointsize 26 -annotate +30+498 "COLONIAL MANSION ANOMALY AUDIT" \\
  -fill "#cbd5e1" -font "Helvetica" -pointsize 13 -annotate +30+535 "Investigation into reported auditory footsteps, structural EMF variations & cold spots." \\
  -fill "#94a3b8" -font "Courier" -pointsize 11 -annotate +30+565 "ARCHITECTURAL STUDY • KOLKATA HERITAGE SECTOR • DOS ARCHIVE" \\
  -stroke "#dc2626" -strokewidth 2 -fill none -draw "rectangle 10,10 789,589" \\
  /tmp/heritage_estate.jpg
"""
if run_cmd(cmd_estate):
    sync_file("/tmp/heritage_estate.jpg", "heritage_estate.jpg")

print("All missing assets generated and synchronized successfully!")
