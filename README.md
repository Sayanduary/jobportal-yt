# JobPortal - Job Search & Recruitment Platform

A full-stack MERN job portal application with separate interfaces for students/job seekers and recruiters. Features include job posting, searching, applications, dark mode, and more.

## Features

### For Students/Job Seekers
- Browse and search jobs by company, role, location
- Apply for jobs with resume upload
- View application status
- Update profile with photo and skills
- Save jobs for later
- Dark mode support

### For Recruiters
- Post and manage job listings
- View and manage applicants
- Company profile management with logo upload
- Edit job descriptions
- Track applications

### General
- LinkedIn-inspired modern UI
- Dark mode with theme persistence
- Responsive design
- Secure authentication with JWT
- Image uploads via Cloudinary
- Real-time search and filtering

## Tech Stack

### Frontend
- React 18
- Redux Toolkit (State Management)
- React Router (Navigation)
- TailwindCSS (Styling)
- Radix UI (Components)
- Framer Motion (Animations)
- Axios (HTTP Client)
- Vite (Build Tool)

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- Bcrypt (Password Hashing)
- Multer (File Uploads)
- Cloudinary (Cloud Storage)
- Cookie Parser
- CORS

## Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Cloudinary account

### Backend Setup

1. Navigate to backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file:
```env
MONGO_URI=your_mongodb_connection_string
SECRET_KEY=your_jwt_secret_key
CLOUD_NAME=your_cloudinary_cloud_name
API_KEY=your_cloudinary_api_key
API_SECRET=your_cloudinary_api_secret
FRONTEND_URL=http://localhost:5173
PORT=3001
```

4. Start the server:
```bash
npm run dev
```

Backend will run on http://localhost:3001

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file (optional for local development):
```env
VITE_API_BASE_URL=http://localhost:3001
```

4. Start the development server:
```bash
npm run dev
```

Frontend will run on http://localhost:5173

## Project Structure

```
jobportal-yt/
├── backend/
│   ├── controllers/       # Request handlers
│   ├── middlewares/       # Auth & file upload middleware
│   ├── models/           # MongoDB schemas
│   ├── routes/           # API routes
│   ├── utils/            # Utility functions
│   └── index.js          # Entry point
│
└── frontend/
    ├── src/
    │   ├── components/   # React components
    │   ├── hooks/        # Custom hooks
    │   ├── redux/        # State management
    │   ├── utils/        # Constants & utilities
    │   └── main.jsx      # Entry point
    └── public/           # Static assets
```

## API Endpoints

### User Routes
- POST `/api/v1/user/register` - Register new user
- POST `/api/v1/user/login` - Login user
- POST `/api/v1/user/logout` - Logout user
- PUT `/api/v1/user/profile/update` - Update profile
- GET `/api/v1/user/profile` - Get profile

### Job Routes
- POST `/api/v1/job/post` - Post new job (recruiter)
- GET `/api/v1/job/get` - Get all jobs
- GET `/api/v1/job/get/:id` - Get job by ID
- PUT `/api/v1/job/update/:id` - Update job (recruiter)
- GET `/api/v1/job/getadminjobs` - Get recruiter's jobs

### Company Routes
- POST `/api/v1/company/register` - Register company
- GET `/api/v1/company/get` - Get all companies
- GET `/api/v1/company/get/:id` - Get company by ID
- PUT `/api/v1/company/update/:id` - Update company

### Application Routes
- POST `/api/v1/application/apply/:id` - Apply for job
- GET `/api/v1/application/get` - Get user applications
- GET `/api/v1/application/:id/applicants` - Get job applicants
- PUT `/api/v1/application/status/:id/update` - Update application status

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy

**Backend**: Render/Railway
**Frontend**: Vercel/Netlify
**Database**: MongoDB Atlas

## Environment Variables

### Backend Required
- `MONGO_URI` - MongoDB connection string
- `SECRET_KEY` - JWT secret key
- `CLOUD_NAME` - Cloudinary cloud name
- `API_KEY` - Cloudinary API key
- `API_SECRET` - Cloudinary API secret
- `FRONTEND_URL` - Frontend URL for CORS
- `PORT` - Server port (default: 3001)

### Frontend Optional
- `VITE_API_BASE_URL` - Backend API URL (default: http://localhost:3001)

## Features In Detail

### Dark Mode
- System preference detection
- Manual toggle in navbar
- Persists across sessions
- Consistent styling across all components

### Job Search
- Search by company name, job title, description
- Filter by location, industry, salary
- Real-time filtering
- Responsive grid layout

### File Uploads
- Profile photos
- Resumes (PDF)
- Company logos
- Cloudinary integration for cloud storage

### Authentication
- JWT-based authentication
- HTTP-only cookies
- Protected routes
- Role-based access (Student/Recruiter)

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is open source and available under the MIT License.

## Author

Sayan Duary

## Acknowledgments

- LinkedIn for UI inspiration
- Radix UI for accessible components
- Cloudinary for image hosting

## Support

For issues and questions, please open an issue on GitHub.
