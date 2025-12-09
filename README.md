# YEHA Niagara Falls Tours

Premium Niagara Falls Tours Website - Full Stack Application

## 📁 Project Structure

```
canada-tour/
├── frontend/          # Next.js frontend application
│   ├── src/          # Source code
│   ├── public/       # Static assets
│   └── package.json  # Frontend dependencies
├── backend/          # Express.js backend API
│   ├── config/       # Configuration files
│   ├── controllers/  # Route controllers
│   ├── models/       # Database models
│   ├── routes/       # API routes
│   ├── middleware/   # Express middleware
│   ├── sql/          # Database scripts
│   └── package.json  # Backend dependencies
└── package.json     # Root package.json with convenience scripts
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- MySQL 8+
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd canada-tour
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```
   Or install separately:
   ```bash
   # Install root dependencies
   npm install
   
   # Install frontend dependencies
   cd frontend && npm install
   
   # Install backend dependencies
   cd ../backend && npm install
   ```

3. **Setup environment variables**
   
   Create `backend/.env`:
   ```env
   DB_HOST=localhost
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=yeha_tours
   PORT=5000
   JWT_SECRET=your-secret-key
   CORS_ORIGIN=http://localhost:3000
   ```
   
   Create `frontend/.env.local`:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000/api
   ```

4. **Setup database**
   ```bash
   cd backend/sql
   node setup.js
   node setupCMS.js
   ```

5. **Run development servers**
   ```bash
   # From root directory - runs both frontend and backend
   npm run dev:all
   
   # Or run separately:
   npm run dev:frontend  # Frontend on http://localhost:3000
   npm run dev:backend   # Backend on http://localhost:5000
   ```

## 📚 Available Scripts

### Root Level
- `npm run install:all` - Install dependencies for all projects
- `npm run dev:all` - Run both frontend and backend in development
- `npm run dev:frontend` - Run only frontend
- `npm run dev:backend` - Run only backend
- `npm run build:frontend` - Build frontend for production
- `npm run start:frontend` - Start frontend in production mode
- `npm run start:backend` - Start backend in production mode

### Frontend (from `frontend/` directory)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

### Backend (from `backend/` directory)
- `npm start` - Start production server
- `npm run dev` - Start with nodemon (if installed)

## 🏗️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **React Hook Form** - Form handling
- **Zod** - Schema validation

### Backend
- **Express.js** - Web framework
- **Sequelize** - ORM
- **MySQL** - Database
- **JWT** - Authentication
- **Multer** - File uploads
- **Nodemailer** - Email sending

## 📖 Documentation

- [Setup Guide](./SETUP.md) - Detailed setup instructions
- [Deployment Guide](./DEPLOYMENT.md) - Production deployment
- [CMS Guide](./CMS_GUIDE.md) - Content management system
- [Troubleshooting](./TROUBLESHOOTING.md) - Common issues and solutions

## 🔧 Development

### Frontend Development
```bash
cd frontend
npm run dev
```
Frontend runs on http://localhost:3000

### Backend Development
```bash
cd backend
npm start
```
Backend API runs on http://localhost:5000

### Database
- Default database: `yeha_tours`
- Connection settings in `backend/.env`
- SQL scripts in `backend/sql/`

## 📦 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy Options:
- **Frontend**: Vercel (recommended for Next.js)
- **Backend**: Railway, Render, or DigitalOcean
- **Database**: PlanetScale, AWS RDS, or managed MySQL

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## 📄 License

[Your License Here]

## 👤 Author

YEHA Tours

---

For more information, see the [documentation](./SETUP.md).
