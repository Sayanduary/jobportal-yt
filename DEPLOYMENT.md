# JobPortal Deployment Guide

## Prerequisites
- MongoDB Atlas account (free tier available)
- Cloudinary account (for image uploads)
- Vercel account (for frontend)
- Render/Railway account (for backend)

## Step 1: Database Setup (MongoDB Atlas)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Create a database user with username and password
4. Add your IP to Network Access (or use 0.0.0.0/0 for all IPs)
5. Get your connection string (replace <password> with your actual password)

## Step 2: Backend Deployment (Render/Railway)

### Using Render:

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: jobportal-backend
   - **Root Directory**: backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

5. Add Environment Variables:
   ```
   MONGO_URI=your_mongodb_atlas_connection_string
   SECRET_KEY=your_jwt_secret_key_here
   CLOUD_NAME=your_cloudinary_cloud_name
   API_KEY=your_cloudinary_api_key
   API_SECRET=your_cloudinary_api_secret
   FRONTEND_URL=https://your-frontend-domain.vercel.app
   PORT=3001
   ```

6. Click "Create Web Service"
7. Note your backend URL (e.g., https://jobportal-backend.onrender.com)

### Using Railway:

1. Go to [Railway](https://railway.app/)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Add your backend folder as a service
5. Add the same environment variables as above
6. Deploy!

## Step 3: Frontend Deployment (Vercel)

1. Update `frontend/src/utils/constant.js` with your backend URL:
   ```javascript
   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";
   export const USER_API_END_POINT = `${API_BASE_URL}/api/v1/user`;
   export const JOB_API_END_POINT = `${API_BASE_URL}/api/v1/job`;
   export const APPLICATION_API_END_POINT = `${API_BASE_URL}/api/v1/application`;
   export const COMPANY_API_END_POINT = `${API_BASE_URL}/api/v1/company`;
   ```

2. Go to [Vercel Dashboard](https://vercel.com/dashboard)
3. Click "Add New" → "Project"
4. Import your GitHub repository
5. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: frontend
   - **Build Command**: `npm run build`
   - **Output Directory**: dist

6. Add Environment Variable:
   ```
   VITE_API_BASE_URL=https://your-backend-url.onrender.com
   ```

7. Click "Deploy"
8. Copy your frontend URL

## Step 4: Update Backend CORS

1. Go back to your backend deployment (Render/Railway)
2. Update the `FRONTEND_URL` environment variable with your Vercel URL
3. Redeploy the backend

## Step 5: Test Your Application

1. Visit your frontend URL
2. Test:
   - User registration and login
   - Job posting (as recruiter)
   - Job searching and applying (as student)
   - Profile updates
   - Dark mode toggle

## Environment Variables Summary

### Backend (.env):
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/jobportal
SECRET_KEY=your_super_secret_jwt_key_here
CLOUD_NAME=your_cloudinary_name
API_KEY=your_cloudinary_key
API_SECRET=your_cloudinary_secret
FRONTEND_URL=https://your-app.vercel.app
PORT=3001
```

### Frontend (Vercel):
```env
VITE_API_BASE_URL=https://your-backend.onrender.com
```

## Troubleshooting

### CORS Errors:
- Ensure `FRONTEND_URL` in backend matches your Vercel URL exactly
- Check that credentials: true is set in CORS config

### Database Connection Issues:
- Verify MongoDB Atlas network access settings
- Check connection string format
- Ensure database user has read/write permissions

### Image Upload Issues:
- Verify Cloudinary credentials are correct
- Check API key has upload permissions

### Backend Not Starting:
- Check logs in Render/Railway dashboard
- Verify all environment variables are set
- Ensure PORT is set correctly

## Alternative Deployment Options

### Backend Alternatives:
- **Heroku** (requires credit card)
- **AWS EC2** (more complex but flexible)
- **DigitalOcean** (app platform)

### Frontend Alternatives:
- **Netlify** (similar to Vercel)
- **GitHub Pages** (static only)
- **Cloudflare Pages**

## Post-Deployment Checklist

- [ ] Backend is running and accessible
- [ ] Frontend is deployed and loads
- [ ] Database connection works
- [ ] User registration works
- [ ] User login works
- [ ] Job posting works (recruiter)
- [ ] Job browsing works
- [ ] Job application works (student)
- [ ] Image uploads work (profile, resume, company logo)
- [ ] Dark mode works
- [ ] All API endpoints respond correctly

## Support

If you encounter issues:
1. Check deployment platform logs
2. Verify environment variables
3. Test API endpoints directly using Postman/Thunder Client
4. Check browser console for frontend errors

Good luck with your deployment! 🚀
