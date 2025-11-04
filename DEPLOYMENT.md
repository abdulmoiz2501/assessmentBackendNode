# Deployment Guide - Grammar Checker Backend API

This guide will walk you through deploying the Grammar Checker Backend API to various free hosting platforms.

## Prerequisites

1. A GitHub account
2. The backend code pushed to a GitHub repository
3. Node.js installed locally (for testing)

## Option 1: Railway (Recommended - Free Tier Available) 🚂

Railway offers a generous free tier with automatic deployments from GitHub.

### Step 1: Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Click "Start a New Project"
3. Sign up with your GitHub account

### Step 2: Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Authorize Railway to access your GitHub repositories
4. Select your repository containing this backend code
5. Railway will automatically detect it's a Node.js project

### Step 3: Configure Environment Variables
1. In your Railway project dashboard, click on your service
2. Go to the "Variables" tab
3. Click "New Variable" and add these one by one:

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

### Step 4: Configure Build Settings (if needed)
1. Go to "Settings" tab
2. Verify:
   - **Build Command**: `npm install` (auto-detected)
   - **Start Command**: `npm start` (auto-detected)
   - **Root Directory**: `/` (default)

### Step 5: Deploy
1. Railway will automatically start deploying when you push to your GitHub repo
2. Wait for the build to complete (usually 1-2 minutes)
3. Once deployed, Railway will provide a public URL like:
   - `https://your-app-name.up.railway.app`
   - Or you can set a custom domain in Settings → Networking

### Step 6: Test Your Deployment
```bash
curl https://your-app-name.up.railway.app/api/health
```

You should see:
```json
{"status":"OK","message":"Server is running"}
```

### Step 7: Update Your Flutter App
Update your Flutter app's API base URL to:
```dart
const String baseUrl = 'https://your-app-name.up.railway.app';
```

---

## Option 2: Render (Free Tier Available) 🎨

Render offers a free tier with automatic SSL certificates.

### Step 1: Create Render Account
1. Go to [render.com](https://render.com)
2. Sign up with your GitHub account

### Step 2: Create New Web Service
1. Click "New +" button in the dashboard
2. Select "Web Service"
3. Click "Connect account" if you haven't connected GitHub yet
4. Select your repository

### Step 3: Configure Service
Fill in the form:
- **Name**: `grammar-checker-api` (or any name you prefer)
- **Environment**: `Node`
- **Region**: Choose closest to you (e.g., `Oregon (US West)`)
- **Branch**: `main` (or your default branch)
- **Root Directory**: Leave empty (defaults to root)
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Instance Type**: `Free`

### Step 4: Add Environment Variables
Scroll down to "Environment Variables" section and add:

1. `PORT` = `3000`
2. `JWT_SECRET` = `your-super-secret-jwt-key-change-this-in-production-12345`
3. `OPENAI_API_KEY` = `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`

### Step 5: Create Web Service
1. Click "Create Web Service"
2. Render will start building your service
3. Wait 3-5 minutes for the first deployment

### Step 6: Get Your URL
Once deployed, your service will be available at:
- `https://grammar-checker-api.onrender.com` (or your chosen name)
- Render automatically provides SSL certificates

### Step 7: Test
```bash
curl https://grammar-checker-api.onrender.com/api/health
```

**Note:** Free tier services on Render spin down after 15 minutes of inactivity. The first request after spin-down may take 30-60 seconds to respond.

---

## Option 3: Fly.io (Free Tier Available) ✈️

Fly.io offers global edge deployment.

### Step 1: Install Fly CLI
```bash
# macOS
brew install flyctl

# Or using install script
curl -L https://fly.io/install.sh | sh
```

### Step 2: Login
```bash
fly auth login
```
This will open a browser for authentication.

### Step 3: Create App
From your project directory:
```bash
fly launch
```

Follow the prompts:
- App name: (auto-generated or enter custom)
- Region: Choose closest region
- Postgres/Redis: No (we're not using databases)
- Deploy now: No (we'll add secrets first)

### Step 4: Set Secrets
```bash
fly secrets set JWT_SECRET="your-super-secret-jwt-key-change-this-in-production-12345"
fly secrets set OPENAI_API_KEY="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"
fly secrets set PORT="3000"
```

### Step 5: Deploy
```bash
fly deploy
```

### Step 6: Get Your URL
After deployment:
```bash
fly info
```
Your app will be available at: `https://your-app-name.fly.dev`

---

## Option 4: Vercel (Serverless)

Vercel is great for serverless deployments.

### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

### Step 2: Create vercel.json
Create a file named `vercel.json` in your project root:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "server.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "server.js"
    }
  ]
}
```

### Step 3: Deploy
```bash
vercel
```

Follow the prompts:
- Set up and deploy? Yes
- Which scope? Your account
- Link to existing project? No
- Project name: grammar-checker-api
- Directory: ./
- Override settings? No

### Step 4: Set Environment Variables
1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Select your project
3. Go to Settings → Environment Variables
4. Add:
   - `JWT_SECRET` = `your-super-secret-jwt-key-change-this-in-production-12345`
   - `OPENAI_API_KEY` = `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`

### Step 5: Redeploy
```bash
vercel --prod
```

Your app will be at: `https://grammar-checker-api.vercel.app`

---

## Testing After Deployment

### 1. Health Check
```bash
curl https://your-deployment-url/api/health
```

Expected response:
```json
{"status":"OK","message":"Server is running"}
```

### 2. Test Login
```bash
curl -X POST https://your-deployment-url/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

Expected response:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "1",
    "username": "admin",
    "email": "admin@example.com"
  }
}
```

### 3. Test Grammar Check
```bash
# Replace YOUR_TOKEN with the token from login
curl -X POST https://your-deployment-url/api/grammar/check \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{"text":"This is a test sentense for gramer checking."}'
```

---

## Troubleshooting

### Issue: Deployment fails
- Check build logs in your hosting platform
- Ensure all dependencies are in `package.json`
- Verify Node.js version (should be 18+)

### Issue: Environment variables not working
- Double-check variable names (case-sensitive)
- Ensure variables are set in the hosting platform (not just locally)
- Redeploy after adding variables

### Issue: CORS errors in Flutter app
- Ensure CORS middleware is enabled (already in code)
- Check if your hosting platform has additional CORS settings

### Issue: OpenAI API errors
- Verify API key is correct
- Check OpenAI account for usage limits
- Ensure API key has sufficient credits

### Issue: Service times out (Render free tier)
- First request after 15 min inactivity takes 30-60 seconds
- Consider upgrading or using Railway/Fly.io for better performance

---

## Recommended: Railway

For this project, **Railway is recommended** because:
- ✅ Easy setup with GitHub integration
- ✅ Free tier with no sleep/spin-down
- ✅ Automatic SSL certificates
- ✅ Good performance
- ✅ Easy environment variable management
- ✅ Automatic deployments on git push

---

## Next Steps

1. ✅ Deploy backend to one of the platforms above
2. ✅ Test all endpoints using curl or Postman
3. ✅ Update your Flutter app with the deployment URL
4. ✅ Test the full integration
5. ✅ Build and deploy your Flutter app

Good luck with your deployment! 🚀
