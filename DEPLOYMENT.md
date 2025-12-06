# Deployment Guide

This guide walks you through deploying both the backend (Netlify) and frontend (Firebase).

## Prerequisites

- ✅ Netlify account (create at [netlify.com](https://netlify.com))
- ✅ Firebase project already configured (`moviecompare-a570f`)
- ✅ API keys ready (see `API_KEYS_SETUP.md`)

## Step 1: Deploy Backend to Netlify

### 1.1 Install Netlify CLI (if not already installed)
```bash
npm install -g netlify-cli
```

### 1.2 Login to Netlify
```bash
netlify login
```
This will open your browser to authenticate.

### 1.3 Initialize Netlify Site
```bash
netlify init
```
- Choose "Create & configure a new site"
- Enter a site name (or press Enter for auto-generated name)
- Choose your team (if you have one)
- Choose "No build command" (we're only deploying functions)
- Choose "No directory to deploy" (we're only deploying functions)

### 1.4 Set Environment Variables in Netlify Dashboard

**Important:** Do this BEFORE deploying!

1. Go to [app.netlify.com](https://app.netlify.com)
2. Select your site
3. Go to **Site settings** → **Environment variables**
4. Click **Add a variable**
5. Add:
   - **Key:** `TMDB_API_KEY` → **Value:** (your TMDB API key)
   - **Key:** `OMDB_API_KEY` → **Value:** (your OMDB API key)
6. Click **Save**

### 1.5 Deploy Functions
```bash
netlify deploy --prod
```

This will deploy your functions. Note the site URL (e.g., `https://your-site-name.netlify.app`)

### 1.6 Test Functions
Visit: `https://your-site-name.netlify.app/.netlify/functions/movie-search`

You should see JSON data (or an error if keys aren't set correctly).

## Step 2: Configure Frontend with Netlify URL

### 2.1 Create Production Environment File
Create `.env.production` in your project root:
```bash
REACT_APP_NETLIFY_URL=https://your-site-name.netlify.app
```
Replace `your-site-name.netlify.app` with your actual Netlify site URL.

### 2.2 Alternative: Set in Build Process
If you prefer, you can set this in your build command:
```bash
REACT_APP_NETLIFY_URL=https://your-site-name.netlify.app npm run build
```

## Step 3: Build Frontend

```bash
npm run build
```

This creates the `build` folder with your production-ready React app.

## Step 4: Deploy Frontend to Firebase

### Option A: Deploy via CLI
```bash
firebase deploy --only hosting
```

### Option B: Deploy via Git (Automatic)
If you have GitHub Actions set up, just push to main:
```bash
git add .
git commit -m "Deploy with Netlify API functions"
git push origin main
```

Firebase will automatically deploy via GitHub Actions.

## Step 5: Verify Deployment

1. **Test Netlify Functions:**
   - Visit: `https://your-site.netlify.app/.netlify/functions/movie-search`
   - Should return JSON data

2. **Test Frontend:**
   - Visit your Firebase hosting URL
   - Try searching for movies
   - Check browser console for any errors

## Troubleshooting

### Functions Return 500 Error
- Check Netlify function logs: **Functions** → **Function logs**
- Verify environment variables are set correctly
- Redeploy after adding/changing environment variables

### Frontend Can't Connect to Functions
- Verify `REACT_APP_NETLIFY_URL` is set correctly
- Check browser console for CORS errors
- Ensure Netlify site URL is correct

### Build Fails
- Make sure all dependencies are installed: `npm install`
- Check for TypeScript/ESLint errors
- Verify `.env.production` file exists with correct URL

## Quick Deployment Commands

```bash
# 1. Deploy Netlify functions
netlify deploy --prod

# 2. Build frontend (after setting REACT_APP_NETLIFY_URL)
npm run build

# 3. Deploy to Firebase
firebase deploy --only hosting
```

## Architecture After Deployment

```
┌─────────────────────┐
│  Firebase Hosting   │  (Frontend)
│  https://...app     │
└──────────┬──────────┘
           │
           │ API Calls
           ▼
┌─────────────────────┐
│  Netlify Functions  │  (Backend)
│  https://...app     │
└──────────┬──────────┘
           │
           │ Proxied Requests
           ▼
┌─────────────────────┐
│  TMDB/OMDB APIs     │
└─────────────────────┘
```

