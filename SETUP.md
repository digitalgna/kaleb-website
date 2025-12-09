# YEHA Niagara Falls Tours - Setup Guide

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Database Setup

#### Option A: Using the Setup Script (Recommended)

1. Create a `.env` file in the root directory:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=yeha_tours
JWT_SECRET=your_super_secret_jwt_key
NEXT_PUBLIC_API_URL=http://localhost:5000/api
PORT=5000
NODE_ENV=development
```

2. Run the database setup script:

```bash
cd backend
node sql/setup.js
```

This will:
- Create the database
- Create all tables
- Insert seed data including default admin account

#### Option B: Manual Setup

1. Create MySQL database:
```sql
CREATE DATABASE yeha_tours;
```

2. Run the schema:
```bash
mysql -u root -p yeha_tours < backend/sql/schema.sql
```

3. Run the seed data:
```bash
mysql -u root -p yeha_tours < backend/sql/seed.sql
```

### 3. Default Admin Credentials

After running the seed script, you can login with:

- **Username:** `admin`
- **Password:** `admin123`

⚠️ **IMPORTANT:** Change the admin password immediately after first login!

### 4. Start Development Servers

#### Run Both Frontend and Backend:

```bash
npm run dev:all
```

#### Or Run Separately:

Terminal 1 (Frontend):
```bash
npm run dev
```

Terminal 2 (Backend):
```bash
npm run server
```

### 5. Access the Application

- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api
- **Admin Panel:** http://localhost:3000/admin/login

## Project Structure

```
canada-tour/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── admin/        # Admin dashboard
│   │   ├── tours/        # Tour pages
│   │   └── ...
│   ├── components/       # React components
│   └── lib/              # Utilities & API
├── backend/
│   ├── config/           # Database config
│   ├── controllers/      # Business logic
│   ├── models/           # Sequelize models
│   ├── routes/           # API routes
│   └── sql/              # SQL schemas & seeds
└── public/               # Static assets
```

## Features

### Frontend
- ✅ Premium hero section with video background
- ✅ 3D interactive tour cards
- ✅ Testimonials carousel
- ✅ Gallery with lightbox
- ✅ Contact forms
- ✅ Dark mode support
- ✅ Fully responsive
- ✅ Smooth animations with Framer Motion

### Backend
- ✅ RESTful API
- ✅ JWT authentication
- ✅ MySQL database with Sequelize
- ✅ CRUD operations for all entities
- ✅ Admin dashboard

### Admin Panel
- ✅ Dashboard with statistics
- ✅ Tour management
- ✅ Booking management
- ✅ Testimonial approval
- ✅ Contact message management

## API Endpoints

### Public
- `GET /api/tours` - Get all tours
- `GET /api/tours/:id` - Get tour by ID
- `GET /api/tours/slug/:slug` - Get tour by slug
- `POST /api/bookings` - Create booking
- `GET /api/testimonials` - Get approved testimonials
- `POST /api/testimonials` - Submit testimonial
- `POST /api/contact` - Submit contact form

### Admin (Requires JWT)
- `POST /api/admin/login` - Admin login
- `GET /api/admin/profile` - Get admin profile
- `POST /api/tours` - Create tour
- `PUT /api/tours/:id` - Update tour
- `DELETE /api/tours/:id` - Delete tour
- `GET /api/bookings` - Get all bookings
- `PUT /api/bookings/:id` - Update booking status
- `PUT /api/testimonials/:id` - Update testimonial
- `DELETE /api/testimonials/:id` - Delete testimonial
- `GET /api/contact` - Get all contacts
- `PUT /api/contact/:id` - Update contact
- `DELETE /api/contact/:id` - Delete contact

## Adding Media Files

### Hero Video
Place your Niagara Falls video at:
```
public/videos/niagara-falls.mp4
```

### Tour Images
Place tour images at:
```
public/images/tours/
```

### Gallery Images
Place gallery images at:
```
public/images/gallery/
```

## Troubleshooting

### Database Connection Issues
- Ensure MySQL is running
- Check `.env` file has correct credentials
- Verify database exists: `mysql -u root -p -e "SHOW DATABASES;"`

### Port Already in Use
- Change `PORT` in `.env` for backend
- Change Next.js port: `npm run dev -- -p 3001`

### Admin Login Not Working
- Verify database was seeded correctly
- Check password hash in `backend/sql/seed.sql`
- Generate new hash: `cd backend && node sql/generateAdminHash.js`

## Production Deployment

1. Set `NODE_ENV=production` in `.env`
2. Build Next.js: `npm run build`
3. Use environment variables for all secrets
4. Set up proper database backups
5. Configure HTTPS
6. Set up proper error logging

## Support

For issues or questions, please check the README.md or contact support.

