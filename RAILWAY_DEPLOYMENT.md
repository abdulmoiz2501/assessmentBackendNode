# Railway Deployment Guide

## ✅ Code Pushed to GitHub!
Your code is now at: https://github.com/abdulmoiz2501/assessmentBackendNode

## 🚂 Deploy to Railway (FREE)

### Step 1: Create Railway Account
1. Go to **https://railway.app**
2. Click **"Start a New Project"** or **"Login"**
3. Choose **"Login with GitHub"**
4. Authorize Railway to access your repositories

### Step 2: Create New Project
1. Click **"New Project"** (green button)
2. Select **"Deploy from GitHub repo"**
3. Find and select **"abdulmoiz2501/assessmentBackendNode"**
4. Railway will automatically detect it's a Node.js project ✅

### Step 3: Add Environment Variables ⚙️
**IMPORTANT:** You MUST add these 3 variables for the app to work!

1. In your Railway project dashboard, click on your service (the one that appeared)
2. Go to the **"Variables"** tab
3. Click **"New Variable"** and add these **one by one**:

   **Variable 1:**
   ```
   Name: PORT
   Value: 3000
   ```
   Click "Add"

   **Variable 2:**
   ```
   Name: JWT_SECRET
   Value: your-super-secret-jwt-key-change-this-in-production-12345
   ```
   Click "Add"

   **Variable 3:**
   ```
   Name: OPENAI_API_KEY
   Value: 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
   ```
   Click "Add"

### Step 4: Wait for Deployment ⏳
- Railway will automatically start building (watch the "Deployments" tab)
- First build takes 1-2 minutes
- You'll see build progress in real-time
- Status will show "Deployed" when ready ✅

### Step 5: Get Your Public URL 🌐
1. Click on your service
2. Go to **"Settings"** → **"Networking"**
3. Your URL will be shown (example: `https://assessment-backend-node-production.up.railway.app`)
4. **Copy this URL** - you'll need it for your Flutter app!

OR

- The URL is also visible in the service overview card
- Click the URL to open it in a new tab

### Step 6: Test Your Deployment ✅

Replace `YOUR_RAILWAY_URL` with your actual Railway URL:

**Health Check:**
```bash
curl https://YOUR_RAILWAY_URL/api/health
```
Expected response: `{"status":"OK","message":"Server is running"}`

**Login Test:**
```bash
curl -X POST https://YOUR_RAILWAY_URL/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```
Expected: JSON with token and user info

**Grammar Check Test:**
```bash
# First get token from login, then:
curl -X POST https://YOUR_RAILWAY_URL/api/grammar/check \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"text":"This is a test sentense for gramer checking."}'
```

### Step 7: Update Your Flutter App 📱

Update your Flutter app's API base URL:

```dart
// In your Flutter app's API configuration file
const String baseUrl = 'https://YOUR_RAILWAY_URL';
```

**Example:**
```dart
const String baseUrl = 'https://assessment-backend-node-production.up.railway.app';
```

---

## 📸 Visual Guide (What You'll See)

### Railway Dashboard Overview:
```
[New Project Button]
  ↓
[Select GitHub Repo]
  ↓
[Select: assessmentBackendNode]
  ↓
[Service Appears]
  ↓
[Click Service] → [Variables Tab] → [Add 3 Variables]
  ↓
[Settings] → [Networking] → [Copy URL]
```

---

## ✅ Deployment Checklist

- [ ] Created Railway account
- [ ] Connected GitHub account
- [ ] Created new project
- [ ] Selected `assessmentBackendNode` repository
- [ ] Added `PORT=3000` variable
- [ ] Added `JWT_SECRET` variable
- [ ] Added `OPENAI_API_KEY` variable
- [ ] Waited for deployment to complete
- [ ] Copied Railway URL
- [ ] Tested health endpoint
- [ ] Tested login endpoint
- [ ] Updated Flutter app with Railway URL

---

## 🆘 Troubleshooting

### Deployment Fails?
- Check the "Deployments" tab for error logs
- Make sure all 3 environment variables are set
- Verify your GitHub repo is public or Railway has access

### API Returns 500 Error?
- Check Railway logs: Click service → "Deployments" → Click latest deployment → "View Logs"
- Verify `OPENAI_API_KEY` is correct
- Check that all environment variables are set

### Can't Find the URL?
- Go to: Service → Settings → Networking
- Or check the service overview card (URL shown at the top)

### Service Shows "Crashed"?
- Check logs for errors
- Verify `PORT` variable is set to `3000`
- Make sure all dependencies are in `package.json` (they are ✅)

---

## 🎉 Success!

Once deployed, your API will be available at:
```
https://YOUR-RAILWAY-URL.up.railway.app
```

**API Endpoints:**
- `GET /api/health` - Health check
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `POST /api/grammar/check` - Grammar check

**Default Users:**
- Username: `admin`, Password: `admin123`
- Username: `user`, Password: `user123`

---

## 📝 Next Steps

1. ✅ Deploy on Railway (follow steps above)
2. ✅ Test all endpoints
3. ✅ Update Flutter app with Railway URL
4. ✅ Test Flutter app integration
5. ✅ Build and deploy Flutter app

**You're all set!** 🚀
