# Grammar Checker Backend API

Backend API for the Grammar Checker mobile application built with Node.js and Express.

## Features

- 🔐 JWT-based Authentication (Login/Logout)
- ✍️ Grammar and Spelling Check using OpenAI API
- 🛡️ Protected routes with JWT middleware
- 🚀 Ready for deployment

## Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Update the `.env` file with your values:

```env
PORT=3000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
OPENAI_API_KEY=sk-proj--uumlOyeqMz2EdMaI0PPCtyJAA
```

### 3. Run the Server

**Development mode (with auto-reload):**
```bash
npm run dev
```

**Production mode:**
```bash
npm start
```

The server will start on `http://localhost:3000` (or the PORT specified in `.env`).

## API Endpoints

### Health Check
- **GET** `/api/health` - Check if API is running
  - Response: `{ "status": "OK", "message": "Server is running" }`

### Authentication

#### Login
- **POST** `/api/auth/login`
  - Body:
    ```json
    {
      "username": "admin",
      "password": "admin123"
    }
    ```
  - Response:
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

#### Logout
- **POST** `/api/auth/logout`
  - Headers: `Authorization: Bearer <token>`
  - Response: `{ "message": "Logged out successfully" }`

### Grammar Check

#### Check Grammar and Spelling
- **POST** `/api/grammar/check`
  - Headers: `Authorization: Bearer <token>`
  - Body:
    ```json
    {
      "text": "This is a test sentense for gramer checking."
    }
    ```
  - Response:
    ```json
    {
      "correctedText": "This is a test sentence for grammar checking.",
      "errors": [
        {
          "original": "sentense",
          "corrected": "sentence",
          "startIndex": 15,
          "endIndex": 23,
          "type": "spelling"
        },
        {
          "original": "gramer",
          "corrected": "grammar",
          "startIndex": 28,
          "endIndex": 34,
          "type": "spelling"
        }
      ],
      "originalText": "This is a test sentense for gramer checking."
    }
    ```

## Default Users

- Username: `admin`, Password: `admin123`
- Username: `user`, Password: `user123`

## Deployment

### Option 1: Railway (Recommended - Free Tier Available)

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your GitHub account and select this repository

3. **Set Environment Variables**
   - In Railway dashboard, go to your project → Variables tab
   - Add the following variables:
     ```
     PORT=3000
     JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
     OPENAI_API_KEY=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
     ```
   - Railway will auto-detect Node.js and deploy

4. **Get Your API URL**
   - Once deployed, Railway provides a public URL like: `https://your-app.railway.app`
   - Use this URL in your Flutter app

### Option 2: Render (Free Tier Available)

1. **Create Render Account**
   - Go to [render.com](https://render.com)
   - Sign up with GitHub

2. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Settings:
     - **Name**: grammar-checker-api
     - **Environment**: Node
     - **Build Command**: `npm install`
     - **Start Command**: `npm start`
     - **Plan**: Free

3. **Set Environment Variables**
   - Go to Environment tab
   - Add:
     ```
     PORT=3000
     JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
     OPENAI_API_KEY=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
     ```

4. **Deploy**
   - Click "Create Web Service"
   - Render will build and deploy automatically
   - Get your URL: `https://grammar-checker-api.onrender.com`

### Option 3: Fly.io (Free Tier Available)

1. **Install Fly CLI**
   ```bash
   curl -L https://fly.io/install.sh | sh
   ```

2. **Login to Fly.io**
   ```bash
   fly auth login
   ```

3. **Create App**
   ```bash
   fly launch
   ```
   - Follow prompts
   - Don't deploy yet (we'll add env vars first)

4. **Set Secrets**
   ```bash
   fly secrets set JWT_SECRET="your-super-secret-jwt-key"
   fly secrets set OPENAI_API_KEY="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"
   fly secrets set PORT="3000"
   ```

5. **Deploy**
   ```bash
   fly deploy
   ```

### Option 4: Vercel (Serverless)

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Create `vercel.json`**
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

3. **Deploy**
   ```bash
   vercel
   ```
   - Set environment variables in Vercel dashboard

## Testing the API

### Using cURL

**Health Check:**
```bash
curl http://localhost:3000/api/health
```

**Login:**
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

**Check Grammar (replace TOKEN with actual token):**
```bash
curl -X POST http://localhost:3000/api/grammar/check \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"text":"This is a test sentense for gramer checking."}'
```

### Using Postman

1. Import the endpoints
2. For protected routes, add `Authorization` header: `Bearer <token>`
3. Test the grammar check endpoint with sample text

## Project Structure

```
.
├── server.js          # Main server file with all routes
├── package.json       # Dependencies and scripts
├── .env.example       # Environment variables template
├── .gitignore         # Git ignore file
└── README.md          # This file
```

## Notes

- This is a demo application with in-memory user storage. For production, use a database (MongoDB, PostgreSQL, etc.).
- JWT tokens expire in 7 days. Adjust in `server.js` if needed.
- The OpenAI API key is included for testing. Replace with your own key for production.
- CORS is enabled for all origins. Restrict in production.

## Support

For issues or questions, please open an issue on GitHub.

## License

ISC
