import express from 'express';
import path from 'path';
import fs from 'fs';
import { createServer as createViteServer } from 'vite';
import multer from 'multer';
import { storage } from './src/server/storage';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', organization: 'Detectives of Supernatural (DOS)', founded: 2010 });
});

// Ensure upload directory exists
const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve public uploads statically with MIME type support
app.use('/uploads', express.static(uploadsDir, {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.jfif') || filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) {
      // If file contains SVG XML markup, serve as SVG, otherwise image/jpeg
      try {
        const sample = fs.readFileSync(filePath, { encoding: 'utf8', flag: 'r' }).slice(0, 100);
        if (sample.includes('<svg')) {
          res.setHeader('Content-Type', 'image/svg+xml');
          return;
        }
      } catch (e) {
        // fallback
      }
      res.setHeader('Content-Type', 'image/jpeg');
    }
  }
}));

// Serve static assets from public folder (css, js, images)
app.use(express.static(path.join(process.cwd(), 'public')));

// Multer Storage Configuration
const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({
  storage: multerStorage,
  limits: { fileSize: 150 * 1024 * 1024 } // 150MB max for video files and evidence
});

// Simple Secure Token / Session auth for Admin
const ADMIN_EMAIL = 'admin@dos.in';
const ADMIN_PASS = 'RiseAboveFear2026!'; // Documented default credentials

function requireAuth(req: express.Request, res: express.Response, next: express.NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Authentication required' });
  }
  const token = authHeader.split(' ')[1];
  if (token !== 'dos-investigator-session-valid-token') {
    return res.status(403).json({ error: 'Forbidden: Invalid session token' });
  }
  next();
}

// ----------------------------------------------------
// AUTH API
// ----------------------------------------------------
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  if (
    (email === ADMIN_EMAIL || email === 'admin') && 
    (password === ADMIN_PASS || password === 'admin123')
  ) {
    return res.json({
      success: true,
      token: 'dos-investigator-session-valid-token',
      user: {
        id: 'usr-admin-1',
        email: ADMIN_EMAIL,
        username: 'DOS Lead Investigator',
        role: 'superadmin'
      }
    });
  }
  return res.status(401).json({ error: 'Invalid credentials. Please verify your investigator clearance.' });
});

app.get('/api/auth/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.includes('dos-investigator-session-valid-token')) {
    return res.json({
      user: {
        id: 'usr-admin-1',
        email: ADMIN_EMAIL,
        username: 'DOS Lead Investigator',
        role: 'superadmin'
      }
    });
  }
  return res.status(401).json({ error: 'Not authenticated' });
});

// ----------------------------------------------------
// UPLOAD API
// ----------------------------------------------------
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const fileUrl = `/uploads/${req.file.filename}`;
  res.json({
    url: fileUrl,
    filename: req.file.filename,
    originalName: req.file.originalname,
    size: req.file.size,
    mimeType: req.file.mimetype
  });
});

app.post('/api/upload/multiple', upload.array('files', 10), (req, res) => {
  const files = req.files as Express.Multer.File[];
  if (!files || files.length === 0) {
    return res.status(400).json({ error: 'No files uploaded' });
  }
  const results = files.map(file => ({
    url: `/uploads/${file.filename}`,
    filename: file.filename,
    originalName: file.originalname,
    size: file.size
  }));
  res.json({ files: results });
});

app.get('/api/uploads', (req, res) => {
  try {
    const files = fs.readdirSync(uploadsDir)
      .filter(f => !f.startsWith('.'))
      .map(f => {
        const fullPath = path.join(uploadsDir, f);
        const stats = fs.statSync(fullPath);
        return {
          filename: f,
          url: `/uploads/${f}`,
          size: stats.size,
          mtime: stats.mtime
        };
      })
      .sort((a, b) => b.mtime.getTime() - a.mtime.getTime());
    res.json({ files });
  } catch (err) {
    res.json({ files: [] });
  }
});

// ----------------------------------------------------
// SITE SETTINGS API
// ----------------------------------------------------
app.get('/api/settings', (req, res) => {
  res.json(storage.getSettings());
});

app.put('/api/settings', requireAuth, (req, res) => {
  const updated = storage.updateSettings(req.body);
  res.json(updated);
});

// ----------------------------------------------------
// TEAM MEMBERS API
// ----------------------------------------------------
app.get('/api/team', (req, res) => {
  res.json(storage.getTeam());
});

app.post('/api/team', requireAuth, (req, res) => {
  const item = storage.createTeamMember(req.body);
  res.status(201).json(item);
});

app.put('/api/team/:id', requireAuth, (req, res) => {
  const item = storage.updateTeamMember(req.params.id, req.body);
  if (!item) return res.status(404).json({ error: 'Team member not found' });
  res.json(item);
});

// Direct member photo upload without requiring admin session
app.post('/api/team/upload-member-photo', upload.single('photo'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file received' });
    }
    const memberName = req.body.memberName || '';
    const memberId = req.body.memberId || '';
    
    // Determine standardized filenames
    const cleanName = memberName.trim().replace(/\s+/g, '_');
    const spaceName = memberName.trim();
    const ext = path.extname(req.file.originalname) || '.jfif';
    const primaryName = cleanName ? `${cleanName}${ext}` : req.file.filename;
    
    const sourcePath = path.join(uploadsDir, req.file.filename);
    
    if (cleanName) {
      // Create underscore and space copies in uploadsDir
      fs.copyFileSync(sourcePath, path.join(uploadsDir, `${cleanName}.jfif`));
      fs.copyFileSync(sourcePath, path.join(uploadsDir, `${cleanName}.jpg`));
      fs.copyFileSync(sourcePath, path.join(uploadsDir, `${spaceName}.jfif`));
      fs.copyFileSync(sourcePath, path.join(uploadsDir, `${spaceName}.jpg`));
      
      // Also write directly to public/
      const pubDir = path.join(process.cwd(), 'public');
      fs.copyFileSync(sourcePath, path.join(pubDir, `${cleanName}.jfif`));
      fs.copyFileSync(sourcePath, path.join(pubDir, `${cleanName}.jpg`));
      fs.copyFileSync(sourcePath, path.join(pubDir, `${spaceName}.jfif`));
      fs.copyFileSync(sourcePath, path.join(pubDir, `${spaceName}.jpg`));

      // Also copy to dist if available
      const distUploads = path.join(process.cwd(), 'dist', 'uploads');
      if (fs.existsSync(distUploads)) {
        fs.copyFileSync(sourcePath, path.join(distUploads, `${cleanName}.jfif`));
        fs.copyFileSync(sourcePath, path.join(distUploads, `${cleanName}.jpg`));
        fs.copyFileSync(sourcePath, path.join(distUploads, `${spaceName}.jfif`));
        fs.copyFileSync(sourcePath, path.join(distUploads, `${spaceName}.jpg`));
      }
    }

    const photoUrl = `/uploads/${primaryName}?t=${Date.now()}`;
    
    // Update team member in storage
    let targetId = memberId;
    if (!targetId && memberName) {
      const allTeam = storage.getTeam();
      const match = allTeam.find(m => m.name.toLowerCase() === memberName.toLowerCase());
      if (match) {
        targetId = match.id;
      }
    }

    let updatedMember = null;
    if (targetId) {
      updatedMember = storage.updateTeamMember(targetId, { photoUrl });
    }

    res.json({
      success: true,
      photoUrl,
      member: updatedMember,
      message: `Updated portrait for ${memberName || 'member'}`
    });
  } catch (err) {
    console.error('Failed to upload member photo:', err);
    res.status(500).json({ error: 'Failed to process team member photo upload' });
  }
});

app.delete('/api/team/:id', requireAuth, (req, res) => {
  const success = storage.deleteTeamMember(req.params.id);
  if (!success) return res.status(404).json({ error: 'Team member not found' });
  res.json({ success: true });
});

// ----------------------------------------------------
// INVESTIGATIONS API
// ----------------------------------------------------
app.get('/api/investigations', (req, res) => {
  res.json(storage.getInvestigations());
});

app.post('/api/investigations', requireAuth, (req, res) => {
  const item = storage.createInvestigation(req.body);
  res.status(201).json(item);
});

app.put('/api/investigations/:id', requireAuth, (req, res) => {
  const item = storage.updateInvestigation(req.params.id, req.body);
  if (!item) return res.status(404).json({ error: 'Investigation not found' });
  res.json(item);
});

app.delete('/api/investigations/:id', requireAuth, (req, res) => {
  const success = storage.deleteInvestigation(req.params.id);
  if (!success) return res.status(404).json({ error: 'Investigation not found' });
  res.json({ success: true });
});

// ----------------------------------------------------
// DOS VAULT CASES API
// ----------------------------------------------------
app.get('/api/vault', (req, res) => {
  res.json(storage.getVaultCases());
});

app.get('/api/vault/:id', (req, res) => {
  const item = storage.getVaultCase(req.params.id);
  if (!item) return res.status(404).json({ error: 'Case file not found' });
  res.json(item);
});

app.post('/api/vault', requireAuth, (req, res) => {
  const item = storage.createVaultCase(req.body);
  res.status(201).json(item);
});

app.put('/api/vault/:id', requireAuth, (req, res) => {
  const item = storage.updateVaultCase(req.params.id, req.body);
  if (!item) return res.status(404).json({ error: 'Case file not found' });
  res.json(item);
});

app.delete('/api/vault/:id', requireAuth, (req, res) => {
  const success = storage.deleteVaultCase(req.params.id);
  if (!success) return res.status(404).json({ error: 'Case file not found' });
  res.json({ success: true });
});

// ----------------------------------------------------
// EQUIPMENT API
// ----------------------------------------------------
app.get('/api/equipment', (req, res) => {
  res.json(storage.getEquipment());
});

app.post('/api/equipment', requireAuth, (req, res) => {
  const item = storage.createEquipment(req.body);
  res.status(201).json(item);
});

app.put('/api/equipment/:id', requireAuth, (req, res) => {
  const item = storage.updateEquipment(req.params.id, req.body);
  if (!item) return res.status(404).json({ error: 'Equipment not found' });
  res.json(item);
});

app.delete('/api/equipment/:id', requireAuth, (req, res) => {
  const success = storage.deleteEquipment(req.params.id);
  if (!success) return res.status(404).json({ error: 'Equipment not found' });
  res.json({ success: true });
});

// ----------------------------------------------------
// MEDIA COVERAGE API
// ----------------------------------------------------
app.get('/api/media', (req, res) => {
  res.json(storage.getMedia());
});

app.post('/api/media', requireAuth, (req, res) => {
  const item = storage.createMedia(req.body);
  res.status(201).json(item);
});

// Dedicated Media Video Upload with file and metadata
app.post('/api/media/upload-video', requireAuth, upload.fields([
  { name: 'videoFile', maxCount: 1 },
  { name: 'thumbnailFile', maxCount: 1 }
]), (req, res) => {
  try {
    const files = req.files as { [fieldname: string]: Express.Multer.File[] };
    const body = req.body;
    
    let videoUrl = body.videoUrl || '';
    if (files && files['videoFile'] && files['videoFile'][0]) {
      videoUrl = `/uploads/${files['videoFile'][0].filename}`;
    }

    let thumbnail = body.thumbnail || '/horror_background_wide.jpg';
    if (files && files['thumbnailFile'] && files['thumbnailFile'][0]) {
      thumbnail = `/uploads/${files['thumbnailFile'][0].filename}`;
    }

    const newMedia = storage.createMedia({
      title: body.title || 'Untitled Video Broadcast',
      publication: body.publication || 'DOS Media Archives',
      date: body.date || new Date().toISOString().split('T')[0],
      category: body.category || 'Documentaries',
      description: body.description || '',
      videoUrl: videoUrl,
      externalUrl: body.externalUrl || '',
      thumbnail: thumbnail,
      isPublished: true
    });

    res.status(201).json({
      success: true,
      media: newMedia,
      message: 'Media coverage video published successfully!'
    });
  } catch (err) {
    console.error('Failed to process video upload:', err);
    res.status(500).json({ error: 'Failed to process media coverage video upload' });
  }
});

app.put('/api/media/:id', requireAuth, (req, res) => {
  const item = storage.updateMedia(req.params.id, req.body);
  if (!item) return res.status(404).json({ error: 'Media not found' });
  res.json(item);
});

app.delete('/api/media/:id', requireAuth, (req, res) => {
  const success = storage.deleteMedia(req.params.id);
  if (!success) return res.status(404).json({ error: 'Media not found' });
  res.json({ success: true });
});

// ----------------------------------------------------
// GALLERY API
// ----------------------------------------------------
app.get('/api/gallery', (req, res) => {
  res.json(storage.getGallery());
});

app.post('/api/gallery', requireAuth, (req, res) => {
  const item = storage.createGalleryImage(req.body);
  res.status(201).json(item);
});

app.put('/api/gallery/:id', requireAuth, (req, res) => {
  const item = storage.updateGalleryImage(req.params.id, req.body);
  if (!item) return res.status(404).json({ error: 'Image not found' });
  res.json(item);
});

app.delete('/api/gallery/:id', requireAuth, (req, res) => {
  const success = storage.deleteGalleryImage(req.params.id);
  if (!success) return res.status(404).json({ error: 'Image not found' });
  res.json({ success: true });
});

// ----------------------------------------------------
// REPORT ACTIVITY API (Public report intake)
// ----------------------------------------------------
app.get('/api/reports', requireAuth, (req, res) => {
  res.json(storage.getReports());
});

app.post('/api/reports', (req, res) => {
  try {
    const report = storage.createReport(req.body);
    res.status(201).json({
      success: true,
      caseId: report.caseId,
      message: 'Your report has been received. Our investigation team will review the information provided.',
      report
    });
  } catch (error) {
    res.status(400).json({ error: 'Failed to process activity report submission.' });
  }
});

app.put('/api/reports/:id', requireAuth, (req, res) => {
  const item = storage.updateReport(req.params.id, req.body);
  if (!item) return res.status(404).json({ error: 'Report not found' });
  res.json(item);
});

app.delete('/api/reports/:id', requireAuth, (req, res) => {
  const success = storage.deleteReport(req.params.id);
  if (!success) return res.status(404).json({ error: 'Report not found' });
  res.json({ success: true });
});

// ----------------------------------------------------
// CONTACT MESSAGES API
// ----------------------------------------------------
app.get('/api/contact', requireAuth, (req, res) => {
  res.json(storage.getMessages());
});

app.post('/api/contact', (req, res) => {
  const item = storage.createMessage(req.body);
  res.status(201).json({ success: true, message: 'Message transmitted to DOS communications desk.', item });
});

app.put('/api/contact/:id', requireAuth, (req, res) => {
  const item = storage.updateMessage(req.params.id, req.body);
  if (!item) return res.status(404).json({ error: 'Message not found' });
  res.json(item);
});

// ----------------------------------------------------
// DASHBOARD STATS API
// ----------------------------------------------------
app.get('/api/stats', requireAuth, (req, res) => {
  res.json(storage.getStats());
});

// Explicit JSON 404 for any unhandled /api route so it never returns HTML index.html
app.all('/api/*', (req, res) => {
  res.status(404).json({ error: `API route not found: ${req.method} ${req.originalUrl}` });
});

// ----------------------------------------------------
// VITE INTEGRATION & SERVER STARTUP
// ----------------------------------------------------
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[DOS Headquarters Server] Running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
