# API Keys Storage Guide

This guide explains where to store your API keys securely before setting up Netlify.

## Current Situation

Your API keys were previously hardcoded in the frontend files (marked as `'redacted'`). They need to be moved to secure storage.

## Step 1: Find Your Existing API Keys

If you still have access to your original API keys, you can find them in one of these places:

### Option A: Check Git History
If you committed the keys before they were redacted:
```bash
git log --all --full-history -- "src/components/elements/**/*.js"
```
Look for commits before the keys were redacted.

### Option B: Check Your API Provider Accounts
If you don't have the keys anymore, get new ones:

**TMDB API Key:**
1. Go to [TMDB](https://www.themoviedb.org/)
2. Sign in to your account
3. Go to **Settings** → **API**
4. Request an API key (or use existing one)
5. Copy the API key (v3 auth key)

**OMDB API Key:**
1. Go to [OMDB API](http://www.omdbapi.com/apikey.aspx)
2. Sign up or log in
3. Choose the free tier (1,000 requests/day)
4. Verify your email
5. Copy your API key

## Step 2: Store Keys Locally (For Development)

Create a `.env` file in your project root directory:

```bash
# Create the file
touch .env
```

Add your keys to the `.env` file:
```env
TMDB_API_KEY=your_actual_tmdb_api_key_here
OMDB_API_KEY=your_actual_omdb_api_key_here
```

**Important:** 
- The `.env` file is already in `.gitignore`, so it won't be committed to Git
- Never commit this file or share it publicly
- Replace `your_actual_tmdb_api_key_here` with your real keys

## Step 3: Store Keys in Netlify (For Production)

After you deploy to Netlify, store the keys as environment variables:

1. **Go to Netlify Dashboard**
   - Visit [app.netlify.com](https://app.netlify.com)
   - Select your site (or create one)

2. **Navigate to Environment Variables**
   - Go to **Site settings** → **Environment variables**
   - Click **Add a variable**

3. **Add Each Key**
   - **Key:** `TMDB_API_KEY`
     **Value:** (paste your TMDB API key)
   - Click **Add variable**
   
   - **Key:** `OMDB_API_KEY`
     **Value:** (paste your OMDB API key)
   - Click **Add variable**

4. **Verify**
   - You should see both variables listed
   - They will be available to all your Netlify functions

## Storage Locations Summary

| Location | Purpose | When to Use |
|----------|---------|-------------|
| `.env` file (local) | Local development | When running `netlify dev` on your machine |
| Netlify Dashboard | Production deployment | When functions are deployed to Netlify |
| **Never** in code files | ❌ Security risk | Don't hardcode keys in `.js` files |

## Security Best Practices

✅ **DO:**
- Store keys in `.env` file for local development
- Store keys in Netlify environment variables for production
- Keep `.env` in `.gitignore` (already done)
- Use different keys for development and production if possible

❌ **DON'T:**
- Commit `.env` file to Git
- Hardcode keys in source code
- Share keys in screenshots or messages
- Commit keys to public repositories

## Quick Setup Checklist

- [ ] Get/find your TMDB API key
- [ ] Get/find your OMDB API key
- [ ] Create `.env` file with both keys (for local dev)
- [ ] Deploy to Netlify
- [ ] Add both keys to Netlify environment variables (for production)

## Testing Your Setup

After setting up:

1. **Local Testing:**
   ```bash
   # Make sure .env file exists with keys
   netlify dev
   ```
   Functions should work without errors.

2. **Production Testing:**
   - Deploy to Netlify
   - Check function logs in Netlify dashboard
   - Test API calls from your frontend

## Need New API Keys?

If you need to generate new keys:

- **TMDB:** https://www.themoviedb.org/settings/api
- **OMDB:** http://www.omdbapi.com/apikey.aspx

