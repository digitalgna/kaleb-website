const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const { sequelize, testConnection } = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Import models to sync
const Tour = require('./models/Tour');
const Itinerary = require('./models/Itinerary');
const Booking = require('./models/Booking');
const Testimonial = require('./models/Testimonial');
const Contact = require('./models/Contact');
const Admin = require('./models/Admin');
const TourAddon = require('./models/TourAddon');
const SiteSetting = require('./models/SiteSetting');
const SiteContent = require('./models/SiteContent');
const ThemeColor = require('./models/ThemeColor');
const MediaLibrary = require('./models/MediaLibrary');
const SiteFeature = require('./models/SiteFeature');
const HeroSetting = require('./models/HeroSetting');
const SectionVisibility = require('./models/SectionVisibility');

// Set up associations
const models = { Tour, Booking, Itinerary, TourAddon, Testimonial, Contact, Admin };
Object.keys(models).forEach(modelName => {
  if (models[modelName].associate) {
    models[modelName].associate(models);
  }
});

// Import routes
const tourRoutes = require('./routes/tourRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const testimonialRoutes = require('./routes/testimonialRoutes');
const contactRoutes = require('./routes/contactRoutes');
const adminRoutes = require('./routes/adminRoutes');
const cmsRoutes = require('./routes/cmsRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/tours', tourRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/cms', cmsRoutes);

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, '..', 'frontend', 'public', 'uploads')));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'YEHA Tours API is running' });
});

// Error handler
app.use(errorHandler);

// Database sync and server start
const startServer = async () => {
  try {
    await testConnection();
    
    // Sync models (set force: false in production)
    await sequelize.sync({ alter: false });
    console.log('✅ Database models synchronized.');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📡 API endpoints available at http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

module.exports = app;

