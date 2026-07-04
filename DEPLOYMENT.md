# IUCB Frontend - Vercel Deployment Guide

## Prerequisites
- A Vercel account (sign up at https://vercel.com)
- Git repository pushed to GitHub, GitLab, or Bitbucket
- Node.js installed locally (for testing)

## Deployment Steps

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Push your code to Git**
   ```bash
   cd IUCB/IUCB-INTERN-REPO
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Go to Vercel Dashboard**
   - Visit https://vercel.com/dashboard
   - Click "Add New Project"

3. **Import Repository**
   - Select "Import Git Repository"
   - Choose your repository (IUCB-INTERN-REPO)
   - Click "Import"

4. **Configure Project**
   - **Framework Preset**: Select "Vite"
   - **Root Directory**: Click "Edit" and set to `frontend`
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `dist` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

5. **Environment Variables** (if needed)
   - Click "Environment Variables"
   - Add any variables from your `.env.example`:
     ```
     VITE_API_URL=your_api_url_here
     ```

6. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - Your site will be live at `https://your-project.vercel.app`

---

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Navigate to Frontend Directory**
   ```bash
   cd IUCB/IUCB-INTERN-REPO/frontend
   ```

4. **Deploy**
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Set up and deploy? `Y`
   - Which scope? Choose your account
   - Link to existing project? `N`
   - What's your project's name? `iucb-frontend`
   - In which directory is your code located? `./`
   - Want to override settings? `N`

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

---

## Post-Deployment Configuration

### Custom Domain (Optional)
1. Go to your project in Vercel Dashboard
2. Click "Settings" → "Domains"
3. Add your custom domain (e.g., `www.iucb.org`)
4. Follow DNS configuration instructions

### Environment Variables
1. Go to "Settings" → "Environment Variables"
2. Add variables for Production, Preview, and Development
3. Redeploy to apply changes

### Automatic Deployments
- Every push to `main` branch = Production deployment
- Every push to other branches = Preview deployment
- Pull requests = Preview deployment with unique URL

---

## Build Troubleshooting

### Common Issues

**1. Build fails with "Module not found"**
```bash
# Run locally first to test
cd frontend
npm install
npm run build
```

**2. Environment variables not working**
- Ensure variables start with `VITE_` prefix
- Add them in Vercel Dashboard → Settings → Environment Variables
- Redeploy after adding

**3. Routing issues (404 on refresh)**
- The `vercel.json` file handles this with rewrites
- Ensure it's in the frontend directory

**4. Build timeout**
- Optimize dependencies
- Remove unused packages
- Contact Vercel support for build time increase

---

## Project Structure for Vercel

```
IUCB-INTERN-REPO/
├── frontend/              ← Deploy this directory
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vercel.json       ← Configuration file
│   ├── vite.config.ts
│   └── .env.example
└── backend/              ← Deploy separately (optional)
```

---

## Testing Before Deployment

```bash
# Test build locally
cd frontend
npm run build
npm run preview

# Open http://localhost:4173 to test production build
```

---

## Useful Commands

```bash
# View deployment logs
vercel logs

# List all deployments
vercel ls

# Remove a deployment
vercel rm [deployment-url]

# Pull environment variables
vercel env pull
```

---

## Performance Optimization

1. **Enable Compression** (automatic in Vercel)
2. **Image Optimization**
   - Use WebP format
   - Compress images before upload
3. **Code Splitting** (already configured in Vite)
4. **Enable Analytics** in Vercel Dashboard

---

## Security

1. **Environment Variables**
   - Never commit `.env` files
   - Use Vercel's encrypted environment variables

2. **CORS Settings**
   - Configure in backend if needed
   - Allow Vercel domain

---

## Support

- Vercel Documentation: https://vercel.com/docs
- Vite Documentation: https://vitejs.dev/guide/
- TanStack Router: https://tanstack.com/router

---

## Quick Deploy Checklist

- [ ] Code pushed to Git
- [ ] `vercel.json` created
- [ ] Environment variables set
- [ ] Build tested locally
- [ ] Domain configured (optional)
- [ ] Deployed to Vercel
- [ ] Custom domain configured (optional)
- [ ] SSL certificate active (automatic)

Your site will be live at: `https://[your-project].vercel.app`
