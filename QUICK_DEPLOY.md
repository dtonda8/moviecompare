# Quick Deployment Steps

Since Netlify CLI requires interactive setup, here's the fastest way to deploy:

## Step 1: Create Netlify Site (via Dashboard)

1. Go to [app.netlify.com](https://app.netlify.com)
2. Click **"Add new site"** → **"Import an existing project"**
3. Connect your Git repository (GitHub/GitLab/Bitbucket)
4. Configure build settings:
   - **Build command:** Leave empty (we're only deploying functions)
   - **Publish directory:** Leave empty (we're only deploying functions)
5. Click **"Deploy site"**

**OR** if you prefer CLI (after manual site creation):
1. Create site in dashboard first
2. Then run: `netlify link` to connect local directory

## Step 2: Set Environment Variables

**CRITICAL:** Do this before deploying!

1. In Netlify dashboard, go to your site
2. **Site settings** → **Environment variables**
3. Add:
   - `TMDB_API_KEY` = (your key)
   - `OMDB_API_KEY` = (your key)
4. Click **Save**

## Step 3: Deploy Functions

After linking your site, run:
```bash
netlify deploy --prod
```

Or if you connected via Git, just push:
```bash
git add .
git commit -m "Add Netlify functions"
git push origin main
```

Netlify will auto-deploy on push.

## Step 4: Get Your Netlify URL

After deployment, note your site URL (e.g., `https://your-site-123.netlify.app`)

## Step 5: Configure Frontend

Create `.env.production`:
```bash
REACT_APP_NETLIFY_URL=https://your-site-123.netlify.app
```

## Step 6: Build & Deploy Frontend

```bash
npm run build
firebase deploy --only hosting
```

## Alternative: Manual Site Creation via CLI

If you want to create the site via CLI, you'll need to answer the prompts manually:

```bash
netlify init
# Choose: "Create & configure a new project"
# Enter site name (or press Enter for auto)
# Choose team
# Build command: (press Enter for none)
# Directory: (press Enter for none)
```

Then continue with steps 2-6 above.

