const express = require('express');
const router = express.Router();
const cmsController = require('../controllers/cmsController');
const { authenticateAdmin } = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, '..', '..', 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp|mp4|mov|avi/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Invalid file type. Only images and videos are allowed.'));
  },
});

// Public routes (for frontend to fetch content)
router.get('/settings', cmsController.getSettings);
router.get('/content', cmsController.getContent);
router.get('/colors', cmsController.getColors);
router.get('/features', cmsController.getFeatures);
router.get('/hero', cmsController.getHeroSettings);
router.get('/sections', cmsController.getSectionVisibility);
router.get('/all', cmsController.getAllCMSData);

// Admin routes (require authentication)
router.put('/settings/:key', authenticateAdmin, cmsController.updateSetting);
router.put('/settings', authenticateAdmin, cmsController.updateMultipleSettings);
router.put('/content/:key', authenticateAdmin, cmsController.updateContent);
router.put('/content', authenticateAdmin, cmsController.updateMultipleContent);
router.put('/colors/:name', authenticateAdmin, cmsController.updateColor);
router.put('/colors', authenticateAdmin, cmsController.updateMultipleColors);
router.put('/features/:key', authenticateAdmin, cmsController.updateFeature);
router.put('/hero', authenticateAdmin, cmsController.updateHeroSettings);
router.put('/sections/:key', authenticateAdmin, cmsController.updateSectionVisibility);

// Media routes
router.get('/media', authenticateAdmin, cmsController.getMedia);
router.post('/media/upload', authenticateAdmin, upload.single('file'), cmsController.uploadMedia);
router.delete('/media/:id', authenticateAdmin, cmsController.deleteMedia);

module.exports = router;

