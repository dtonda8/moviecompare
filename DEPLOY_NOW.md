# 🚀 Deploy Now - Step by Step

Follow these steps in order to deploy both backend and frontend.

## Part 1: Deploy Backend to Netlify (5 minutes)

### Step 1: Create Netlify Site via Dashboard

1. Go to [app.netlify.com](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect your Git provider (GitHub/GitLab/Bitbucket) and select this repository
4. Configure build settings:
   - **Build command:** (leave empty - we're only deploying functions)
   - **Publish directory:** (leave empty - we're only deploying functions)
5. Click **"Deploy site"**
6. **Wait for deployment to complete** (even if it shows an error, that's OK - functions will work)

### Step 2: Set Environment Variables (CRITICAL!)

1. In Netlify dashboard, click on your site
2. Go to **Site settings** → **Environment variables**
3. Click **"Add a variable"** and add:
   - **Key:** `TMDB_API_KEY`
   - **Value:** (paste your TMDB API key)
   - Click **"Add variable"**
4. Click **"Add a variable"** again and add:
   - **Key:** `OMDB_API_KEY`
   - **Value:** (paste your OMDB API key)
   - Click **"Add variable"**
5. **Important:** After adding variables, you need to trigger a new deployment:
   - Go to **Deploys** tab
   - Click **"Trigger deploy"** → **"Deploy site"**

### Step 3: Get Your Netlify URL

1. In Netlify dashboard, your site URL is at the top (e.g., `https://random-name-123.netlify.app`)
2. **Copy this URL** - you'll need it for the frontend

### Step 4: Test Functions

Visit: `https://your-site.netlify.app/.netlify/functions/movie-search`

You should see JSON data. If you see an error, check:
- Environment variables are set correctly
- You triggered a new deployment after adding variables

---

## Part 2: Deploy Frontend to Firebase (5 minutes)

### Step 1: Set Netlify URL for Production

Create `.env.production` file in project root:

```bash
REACT_APP_NETLIFY_URL=https://your-site.netlify.app
```

Replace `https://your-site.netlify.app` with your actual Netlify URL from Part 1.

### Step 2: Build Frontend

```bash
npm run build
```

This creates the `build` folder.

### Step 3: Deploy to Firebase

**Option A: Via CLI**
```bash
firebase deploy --only hosting
```

**Option B: Via Git (Automatic)**
If you have GitHub Actions set up:
```bash
git add .
git commit -m "Deploy with Netlify API functions"
git push origin main
```

Firebase will auto-deploy via GitHub Actions.

---

## Part 3: Verify Everything Works

1. **Test Netlify Functions:**
   - Visit: `https://your-site.netlify.app/.netlify/functions/movie-search`
   - Should return JSON with movie data

2. **Test Frontend:**
   - Visit your Firebase hosting URL
   - Try searching for a movie
   - Check browser console (F12) for errors
   - Movies should load and display

---

## Troubleshooting

### Functions return 500 error
- Go to Netlify → **Functions** → **Function logs**
- Check if environment variables are set
- Make sure you triggered a new deployment after adding variables

### Frontend shows "Failed to fetch"
- Verify `.env.production` has the correct Netlify URL
- Check browser console for CORS errors
- Make sure Netlify URL is correct (no trailing slash)

### Build fails
- Run `npm install` first
- Check for any syntax errors
- Verify `.env.production` file exists

---

## Quick Reference

**Netlify Site URL:** `https://your-site.netlify.app`  
**Firebase Site URL:** (check Firebase console)

**Environment Variables Needed:**
- Netlify: `TMDB_API_KEY`, `OMDB_API_KEY`
- Frontend Build: `REACT_APP_NETLIFY_URL`

