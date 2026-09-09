# Render Deployment Guide

## Quick Start

1. **Push your code** to GitHub/GitLab
2. **Go to [Render Dashboard](https://dashboard.render.com/)**
3. **Click "New +"** → **"Static Site"**

## Configuration

### Basic Settings
- **Name**: `test-platform` (or your preferred name)
- **Branch**: `main` (or your default branch)
- **Root Directory**: Leave empty
- **Build Command**: `npm install && npm run build`
- **Publish Directory**: `dist`

### Environment Variables
Click **"Advanced"** → **"Add Environment Variable"**:
- **Key**: `VITE_PAYMENT_PLATFORM_URL`
- **Value**: `https://your-payment-platform.vercel.app`

Replace with your actual payment platform URL!

### Auto-Deploy
✅ Enable "Auto-Deploy" so changes push automatically

## Click "Create Static Site"

Render will:
1. Clone your repository
2. Run `npm install && npm run build`
3. Deploy the `dist` folder
4. Give you a URL like: `https://test-platform-zrqk.onrender.com`

## Common Issues

### Issue: Blank page or 404 errors
**Solution**: The `_redirects` file handles SPA routing. Make sure it's committed:
```bash
git add _redirects
git commit -m "Add redirects for SPA routing"
git push
```

### Issue: Redirecting to wrong URL
**Solution**: Update the environment variable in Render:
1. Go to your service → Environment tab
2. Edit `VITE_PAYMENT_PLATFORM_URL`
3. Save (triggers automatic redeploy)

### Issue: Build fails
**Solution**: Check the build logs in Render dashboard
- Make sure `package.json` is committed
- Verify Node version compatibility

## Testing Your Deployment

1. Visit your Render URL: `https://test-platform-zrqk.onrender.com`
2. It should redirect to your payment platform (if no session)
3. Or show the test page (if coming from payment platform with `?email=...&course=...`)

## Updating Your Deployment

Just push to your repository:
```bash
git add .
git commit -m "Update test platform"
git push
```

Render auto-deploys on every push!
