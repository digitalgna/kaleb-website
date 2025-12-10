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
const corsOptions = {
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
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
    console.log('🔌 Attempting to connect to database...');
    console.log(`   Host: ${process.env.DB_HOST || 'localhost'}`);
    console.log(`   Database: ${process.env.DB_NAME || 'yeha_tours'}`);
    console.log(`   User: ${process.env.DB_USER || 'root'}`);
    
    await testConnection();
    
    // Sync models (set force: false in production)
    await sequelize.sync({ alter: false });
    console.log('✅ Database models synchronized.');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`📡 API endpoints available at http://localhost:${PORT}/api`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    console.error('\n📋 Required Environment Variables:');
    console.error('   DB_HOST - MySQL database host');
    console.error('   DB_USER - MySQL database user');
    console.error('   DB_PASSWORD - MySQL database password');
    console.error('   DB_NAME - MySQL database name');
    console.error('\n💡 Make sure you have:');
    console.error('   1. Created a MySQL database on Render (or external service)');
    console.error('   2. Set all database environment variables in Render dashboard');
    console.error('   3. Verified the database is accessible from your Render service');
    process.exit(1);
  }
};

startServer();

module.exports = app;

