# Quick Start Guide - Grammar Checker Backend API

## ✅ Local Setup Complete!

We've successfully:
1. ✅ Installed Node.js v25.1.0 and npm 11.6.2
2. ✅ Installed all dependencies
3. ✅ Created .env file with API keys
4. ✅ Tested all endpoints (Health, Login, Grammar Check)

## 🚀 Next Steps: Deploy to Railway (FREE)

### Step 1: Push Code to GitHub

If you haven't already, create a GitHub repository and push your code:

```bash
# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: Grammar Checker Backend API"

# Create a new repository on GitHub, then:
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git branch -M main
git push -u origin main
```

### Step 2: Deploy to Railway

1. **Go to Railway**
   - Visit: https://railway.app
   - Click "Start a New Project"
   - Sign up with GitHub (free)

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Authorize Railway to access your GitHub
   - Select your repository

3. **Add Environment Variables**
   - In Railway dashboard, click on your service
   - Go to "Variables" tab
   - Click "New Variable" and add these **one by one**:

   **Variable 1:**
   - Name: `PORT`
   - Value: `3000`
   - Click "Add"

   **Variable 2:**
   - Name: `JWT_SECRET`
   - Value: `your-super-secret-jwt-key-change-this-in-production-12345`
   - Click "Add"

   **Variable 3:**
   - Name: `OPENAI_API_KEY`
   - Value: `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`
   - Click "Add"

4. **Railway Auto-Deploys**
   - Railway automatically detects Node.js
   - It will start building (takes 1-2 minutes)
   - Watch the "Deployments" tab for progress

5. **Get Your URL**
   - Once deployed, Railway provides a public URL
   - Click on your service → "Settings" → "Networking"
   - Your URL will be like: `https://your-app-name.up.railway.app`
   - Copy this URL!

### Step 3: Test Your Deployment

Replace `YOUR_RAILWAY_URL` with your actual Railway URL:

```bash
# Health check
curl https://YOUR_RAILWAY_URL/api/health

# Login test
curl -X POST https://YOUR_RAILWAY_URL/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# Grammar check (use token from login)
curl -X POST https://YOUR_RAILWAY_URL/api/grammar/check \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"text":"This is a test sentense for gramer checking."}'
```

### Step 4: Update Your Flutter App

Update your Flutter app's API base URL:

```dart
// In your Flutter app's API configuration file
const String baseUrl = 'https://YOUR_RAILWAY_URL';
```

## 📝 API Endpoints

Once deployed, your API will have these endpoints:

### Base URL
```
https://YOUR_RAILWAY_URL
```

### Endpoints

1. **Health Check**
   - `GET /api/health`
   - No authentication required

2. **Login**
   - `POST /api/auth/login`
   - Body: `{"username": "admin", "password": "admin123"}`
   - Returns: JWT token and user info

3. **Logout**
   - `POST /api/auth/logout`
   - Headers: `Authorization: Bearer <token>`

4. **Grammar Check**
   - `POST /api/grammar/check`
   - Headers: `Authorization: Bearer <token>`
   - Body: `{"text": "your text here"}`

## 🔐 Default Users

- Username: `admin`, Password: `admin123`
- Username: `user`, Password: `user123`

## 🧪 Local Testing Commands

```bash
# Start server
npm start

# Or with auto-reload (development)
npm run dev

# Test health
curl http://localhost:3000/api/health

# Test login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

## 📚 Additional Resources

- Full deployment guide: See `DEPLOYMENT.md`
- API documentation: See `README.md`
- Railway dashboard: https://railway.app/dashboard

## ✅ Checklist

- [x] Node.js installed
- [x] Dependencies installed
- [x] .env file created
- [x] Local testing successful
- [ ] Code pushed to GitHub
- [ ] Railway account created
- [ ] Environment variables set in Railway
- [ ] Deployment successful
- [ ] API tested on Railway URL
- [ ] Flutter app updated with Railway URL

## 🆘 Troubleshooting

**Deployment fails?**
- Check Railway build logs
- Ensure all files are committed to GitHub
- Verify environment variables are set correctly

**API not responding?**
- Check Railway deployment status
- Verify the service is running (green status)
- Check environment variables are correct

**CORS errors in Flutter?**
- CORS is already enabled in the code
- Verify your Railway URL is correct in Flutter app

**Need help?**
- Check Railway logs: Dashboard → Your Service → Deployments → View Logs
- See `DEPLOYMENT.md` for detailed troubleshooting

---

🎉 **Your backend is ready!** Once deployed to Railway, share the URL with your Flutter app and you're good to go!
