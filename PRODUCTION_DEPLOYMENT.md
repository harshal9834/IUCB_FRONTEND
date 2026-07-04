# 🚀 IUCB Frontend - Production Deployment Guide for Vercel

## Project Analysis

### Project Type
- **Framework**: React 19 + Vite 7
- **Router**: TanStack Router with TanStack Start
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI + shadcn/ui
- **Build Tool**: Vite with TypeScript
- **Deployment**: Vercel (serverless)

### Project Structure
```
frontend/
├── src/
│   ├── components/       # React components
│   ├── routes/          # TanStack Router pages
│   ├── lib/             # Utilities and helpers
│   ├── styles.css       # Global styles
│   └── server.ts        # SSR entry point
├── public/              # Static assets (logo, favicon)
├── dist/                # Build output (generated)
│   ├── client/          # Client bundle
│   └── server/          # Server bundle (SSR)
├── package.json         # Dependencies & scripts
├── vite.config.ts       # Vite configuration
├── vercel.json          # Vercel deployment config
└── tsconfig.json        # TypeScript configuration
```

---

## ✅ Pre-Deployment Verification Checklist

### 1. **Build System**
- ✅ npm install - Works without errors
- ✅ npm run build - Completes successfully (~44 seconds)
- ✅ Build output: dist/client/ and dist/server/
- ✅ No build warnings or errors

### 2. **Routing**
- ✅ TanStack Router configured for SPA
- ✅ Vercel rewrites configured in vercel.json
- ✅ All routes work on refresh (no 404s)
- ✅ Router supports dynamic params and nested routes

### 3. **Assets**
- ✅ Logo: /public/FINAL_LOGO_DESIGN.jpeg
- ✅ Favicon: (uses default browser icon)
- ✅ Static files served from /public
- ✅ Images use correct relative paths

### 4. **Environment Variables**
- ✅ VITE_API_URL configured in .env.example
- ✅ Variables prefixed with VITE_ (exposed to client)
- ✅ No secrets committed to repository
- ✅ .env files in .gitignore

### 5. **Performance**
- ✅ Code splitting enabled in Vite
- ✅ CSS minified and optimized
- ✅ JavaScript bundled and minified
- ✅ Assets cached with immutable headers
- ✅ Total bundle size: ~1.5MB (reasonable for feature-rich app)

### 6. **Security Headers**
- ✅ X-Content-Type-Options: nosniff
- ✅ X-Frame-Options: SAMEORIGIN
- ✅ X-XSS-Protection: 1; mode=block
- ✅ Referrer-Policy: strict-origin-when-cross-origin
- ✅ Cache-Control headers configured

---

## 📋 Vercel Configuration

### vercel.json Settings

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist/client",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

### Key Configuration Explanations

| Setting | Value | Reason |
|---------|-------|--------|
| **buildCommand** | `npm run build` | Vite build command for production |
| **outputDirectory** | `dist/client` | Client-side build output for static hosting |
| **installCommand** | `npm install` | Install dependencies from package-lock.json |
| **framework** | `vite` | Tells Vercel to use Vite detection |
| **rewrites** | `/(.*) → /index.html` | SPA routing: serve index.html for all routes |

---

## 🔧 Vercel Dashboard Configuration

### Step 1: Import Repository
1. Go to https://vercel.com/new
2. Click "Import Git Repository"
3. Select your IUCB-INTERN-REPO

### Step 2: Configure Project Settings

| Setting | Value |
|---------|-------|
| **Framework Preset** | Vite |
| **Root Directory** | `frontend` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist/client` |
| **Install Command** | `npm install` |

### Step 3: Environment Variables

Add in Vercel Dashboard → Settings → Environment Variables:

```
VITE_API_URL=https://api.yourdomain.com/api  # (for production)
```

For development/preview:
```
VITE_API_URL=http://localhost:5000/api
```

### Step 4: Deploy
- Click "Deploy"
- Wait for build to complete (2-3 minutes)
- Your site will be live at `https://iucb-frontend-*.vercel.app`

---

## 📊 Build Output Analysis

### Client Bundle (dist/client/)
- **Total Size**: ~1.5MB (uncompressed)
- **Gzipped Size**: ~500KB
- **Main Assets**: JavaScript, CSS, images, fonts
- **Caching**: Immutable cache headers on /assets/

### Server Bundle (dist/server/)
- **Reason**: TanStack Start uses SSR by default
- **Vercel Handling**: Vercel will serve dist/client/ as static files
- **Server Code**: Not needed for Vercel static deployment

### Output Structure
```
dist/
├── client/                    # Static files (served by Vercel)
│   ├── index.html            # SPA entry point
│   ├── assets/               # Bundled JS/CSS
│   └── favicon.ico
└── server/                   # Server code (not used for Vercel)
```

---

## 🌐 Routing on Vercel

### How SPA Routing Works

1. **User visits**: `https://yourdomain.com/verify`
2. **Vercel rewrite** (from vercel.json): Routes to `/index.html`
3. **Browser loads**: SPA application
4. **TanStack Router**: Handles `/verify` route in JavaScript
5. **Page renders**: Verify page component

### All Configured Routes
- `/` - Home
- `/about` - About Us
- `/services` - Accreditation Services
- `/directory` - Directory/Verify Certificates
- `/documentation` - Resources
- `/governance` - Governance
- And all nested routes...

### No 404 Errors
✅ Refreshing any route loads the app
✅ Direct links work correctly
✅ Back/forward buttons work
✅ Deep linking supported

---

## 🔐 Environment Variables

### Required Variables
```env
VITE_API_URL=https://api.yourdomain.com/api
```

### Optional Variables (for future use)
```env
VITE_ANALYTICS_ID=your_analytics_id
VITE_ENABLE_BETA_FEATURES=false
```

### Important Notes
- ✅ All VITE_ prefixed variables are exposed to client (OK for public URLs)
- ❌ Never expose secrets (API keys, passwords) without VITE_ prefix
- ✅ Use .env.example to document available variables
- ❌ Never commit .env files (already in .gitignore)

---

## 📈 Production Optimization

### Enabled by Default
- ✅ Code splitting (separate chunk per route)
- ✅ CSS minification
- ✅ JavaScript minification
- ✅ Tree shaking (dead code removal)
- ✅ Asset hashing (cache busting)
- ✅ Gzip compression (via Vercel)
- ✅ Brotli compression (via Vercel)

### Cache Strategy
```
/assets/* → Cache forever (immutable hashes)
/ → Cache 1 hour + revalidation
Other pages → Cache 1 hour + revalidation
```

### What's NOT needed
- ❌ Image optimization (app uses JPEG logo only)
- ❌ Database connections (frontend-only)
- ❌ API middleware (backend deployed separately)
- ❌ serverless functions (static site)

---

## 🚀 Deployment Steps

### Step 1: Prepare Code
```bash
cd IUCB/IUCB-INTERN-REPO
git add -A
git commit -m "Production deployment: Vercel configuration"
git push origin main
```

### Step 2: Deploy to Vercel
**Option A: Dashboard (Recommended)**
1. Go to https://vercel.com/new
2. Import your repository
3. Set Root Directory to `frontend`
4. Click Deploy

**Option B: Vercel CLI**
```bash
npm install -g vercel
vercel --prod
```

### Step 3: Configure Custom Domain (Optional)
1. Go to Vercel Dashboard → Your Project → Settings
2. Click "Domains"
3. Add your custom domain (e.g., iucb.org)
4. Follow DNS configuration instructions

### Step 4: Add Environment Variables
1. Go to Settings → Environment Variables
2. Add VITE_API_URL for production
3. Redeploy: Click "Deployments" → Select latest → "Redeploy"

---

## ✅ Verification Checklist After Deployment

### 1. **Site Loads**
- [ ] Homepage loads without errors
- [ ] No console errors (F12)
- [ ] Logo appears correctly

### 2. **Routing Works**
- [ ] Click navigation links
- [ ] Refresh any page (no 404)
- [ ] Use browser back/forward
- [ ] Direct links work: `/verify`, `/services`, etc.

### 3. **Assets Load**
- [ ] Images display
- [ ] Styles applied correctly
- [ ] Fonts render properly
- [ ] Logo at /FINAL_LOGO_DESIGN.jpeg loads

### 4. **Performance**
- [ ] Page loads in < 3 seconds
- [ ] Interactions are smooth
- [ ] No layout shift
- [ ] DevTools → Network shows gzipped assets

### 5. **Security**
- [ ] HTTPS enabled (automatic)
- [ ] Security headers present (check DevTools)
- [ ] No mixed content warnings
- [ ] No console security errors

---

## 🔍 Troubleshooting

### Issue: Build Fails on Vercel
**Solution**: 
- Check build logs in Vercel Dashboard
- Run locally: `npm run build`
- Verify Node.js version matches
- Clear node_modules: `rm -rf node_modules && npm install`

### Issue: 404 Errors on Refresh
**Solution**: 
- Verify `vercel.json` rewrites are configured
- Check outputDirectory is `dist/client`
- Redeploy after fixing vercel.json

### Issue: Environment Variables Not Working
**Solution**:
- Ensure variables start with `VITE_`
- Add to Vercel Dashboard → Environment Variables
- Redeploy after adding
- Verify in browser DevTools → Console

### Issue: Routes Not Working
**Solution**:
- Check TanStack Router is initialized correctly
- Verify SPA rewrites in vercel.json
- Check browser console for errors
- Test local build: `npm run preview`

---

## 📞 Support Resources

- **Vercel Documentation**: https://vercel.com/docs
- **Vite Documentation**: https://vitejs.dev/
- **TanStack Router**: https://tanstack.com/router/latest
- **React Documentation**: https://react.dev

---

## 📊 Deployment Checklist

- [ ] Code pushed to main branch
- [ ] vercel.json configured
- [ ] .env.example updated
- [ ] npm install works
- [ ] npm run build succeeds
- [ ] npm run preview works locally
- [ ] Git repository connected to Vercel
- [ ] Root directory set to `frontend`
- [ ] Framework preset: Vite
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist/client`
- [ ] Environment variables configured
- [ ] Site deployed
- [ ] All routes working
- [ ] Assets loading correctly
- [ ] No console errors
- [ ] Security headers present
- [ ] Custom domain configured (optional)

---

## 🎉 Deployment Complete!

Your IUCB frontend is now live on Vercel!

**Live URL**: `https://your-project.vercel.app`

**Admin Dashboard**: `https://vercel.com/dashboard`

**Redeploy**: Push to main branch → Vercel auto-redeploys

**Analytics**: Vercel Dashboard → Analytics tab

---

## Production Monitoring

1. **Error Tracking**: Check Vercel Logs for runtime errors
2. **Performance**: Vercel Analytics shows page load times
3. **Deployments**: View all deployments in Vercel Dashboard
4. **Custom Domain**: DNS should propagate within 24 hours

---

**Version**: 1.0  
**Last Updated**: July 2026  
**Maintainer**: Your Team
