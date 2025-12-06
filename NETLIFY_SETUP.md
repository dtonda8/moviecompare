# Netlify API Setup Guide

This guide explains how to set up Netlify serverless functions to securely handle API calls for your movie comparison app.

## ⚠️ Before You Start

**IMPORTANT:** Before following these instructions, read **[API_KEYS_SETUP.md](./API_KEYS_SETUP.md)** to learn where to store your API keys securely.

You'll need:
- Your TMDB API key
- Your OMDB API key

Store them in:
1. `.env` file (for local development)
2. Netlify Dashboard (for production)

## Security Improvements

✅ **API keys are now stored server-side** - No longer exposed in frontend code
✅ **API calls are proxied through Netlify functions** - Keys never reach the browser
✅ **CORS headers configured** - Secure cross-origin requests

## Setup Instructions

### 1. Deploy Functions to Netlify

1. **Create a Netlify account** (if you don't have one) at [netlify.com](https://netlify.com)

2. **Install Netlify CLI** (for local development):
   ```bash
   npm install -g netlify-cli
   ```

3. **Link your project to Netlify**:
   ```bash
   netlify login
   netlify init
   ```
   - Choose "Create & configure a new site"
   - Follow the prompts

4. **Set Environment Variables in Netlify Dashboard**:
   - Go to your site dashboard on Netlify
   - Navigate to **Site settings** → **Environment variables**
   - Add the following variables:
     - `TMDB_API_KEY` - Your TMDB API key
     - `OMDB_API_KEY` - Your OMDB API key

### 2. Deploy Functions

**Option A: Deploy via Git (Recommended)**
- Connect your Git repository to Netlify
- Netlify will automatically deploy when you push to your main branch
- Make sure `netlify.toml` is in your repository root

**Option B: Deploy via CLI**
```bash
netlify deploy --prod
```

### 3. Configure Frontend Environment Variable

After deploying to Netlify, you'll get a site URL (e.g., `https://your-site.netlify.app`).

**For Firebase Hosting:**
1. In your Firebase project, go to **Hosting** → **Add custom domain** (or use the default Firebase URL)
2. Set the environment variable in your build process:
   - Create a `.env.production` file in your project root:
     ```
     REACT_APP_NETLIFY_URL=https://your-netlify-site.netlify.app
     ```
   - Or set it in your Firebase build settings

**Important:** The frontend (on Firebase) needs to know the Netlify URL to call the functions.

### 4. Local Development

To test locally with Netlify functions:

1. **Create a `.env` file** in the project root:
   ```
   TMDB_API_KEY=your_tmdb_key_here
   OMDB_API_KEY=your_omdb_key_here
   ```

2. **Start Netlify dev server** (in one terminal):
   ```bash
   netlify dev
   ```
   This will start the functions server at `http://localhost:8888`

3. **Start React app** (in another terminal):
   ```bash
   npm start
   ```

The React app is configured to use `http://localhost:8888` for API calls in development mode.

## Architecture

```
┌─────────────────┐         ┌──────────────────┐         ┌─────────────┐
│  Firebase       │         │  Netlify         │         │  TMDB/OMDB  │
│  (Frontend)     │────────▶│  (Functions)    │────────▶│  (APIs)     │
│                 │         │  (API Keys)      │         │             │
└─────────────────┘         └──────────────────┘         └─────────────┘
```

- **Frontend** (Firebase): React app makes calls to Netlify functions
- **Backend** (Netlify): Serverless functions proxy API calls with secure keys
- **APIs** (TMDB/OMDB): External services never see the frontend

## Function Endpoints

- `/.netlify/functions/movie-details?movieID={id}` - Get movie details
- `/.netlify/functions/movie-search?query={query}` - Search movies (or trending if no query)
- `/.netlify/functions/movie-videos?movieID={id}` - Get movie trailers
- `/.netlify/functions/omdb-ratings?imdbID={id}` - Get movie ratings

## Troubleshooting

### CORS Errors
- Make sure your Netlify site URL is correctly set in `REACT_APP_NETLIFY_URL`
- Functions already include CORS headers (`Access-Control-Allow-Origin: *`)

### Functions Not Found
- Verify `netlify.toml` is in the project root
- Check that functions are in `netlify/functions/` directory
- Ensure you've deployed to Netlify

### API Keys Not Working
- Verify environment variables are set in Netlify dashboard
- For local dev, ensure `.env` file exists with keys
- Redeploy after adding/changing environment variables

## Next Steps

1. Deploy functions to Netlify
2. Set environment variables in Netlify dashboard
3. Update `REACT_APP_NETLIFY_URL` in your Firebase build configuration
4. Test the application
5. Deploy frontend to Firebase as usual

