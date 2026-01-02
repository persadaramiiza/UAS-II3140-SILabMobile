# Deployment Guide - SILab Suite Frontend

Panduan untuk deploy aplikasi SILab Suite Frontend ke berbagai platform hosting.

## Pre-Deployment Checklist

Sebelum deploy, pastikan:

- ✅ Aplikasi berjalan dengan baik di local (development)
- ✅ Semua environment variables sudah di-set dengan benar
- ✅ Build production berhasil (`npm run build`)
- ✅ Database schema sudah di-setup di Supabase production
- ✅ `.env` tidak ter-commit ke git (sudah ada di `.gitignore`)

## Option 1: Deploy ke Vercel (Recommended)

Vercel adalah platform deployment yang paling cocok untuk aplikasi React/Vite.

### Mengapa Vercel?
- ✅ Gratis untuk personal projects
- ✅ Auto deployment dari git
- ✅ SSL certificate gratis
- ✅ Global CDN
- ✅ Easy environment variables setup

### Steps:

1. **Push code ke GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Sign up/Login ke Vercel**
   - Kunjungi [vercel.com](https://vercel.com)
   - Sign up dengan akun GitHub

3. **Import Project**
   - Click "Add New..." > "Project"
   - Select repository yang berisi code Anda
   - Vercel akan auto-detect Vite

4. **Configure Project**
   - Framework Preset: Vite
   - Root Directory: `frontend` (jika project ada di subfolder)
   - Build Command: `npm run build`
   - Output Directory: `dist`

5. **Add Environment Variables**
   
   Di bagian "Environment Variables", tambahkan:
   ```
   VITE_SUPABASE_URL = https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

6. **Deploy**
   - Click "Deploy"
   - Tunggu beberapa menit
   - Aplikasi akan live di `https://your-project.vercel.app`

### Vercel Auto Deployment

Setelah setup awal, setiap git push akan trigger auto deployment:

```bash
git add .
git commit -m "Update feature X"
git push
# Vercel akan auto build & deploy
```

### Custom Domain di Vercel

1. Di Vercel Dashboard > Project Settings > Domains
2. Add domain Anda (misal: `silab.yourdomain.com`)
3. Follow instructions untuk update DNS records
4. Vercel akan auto provision SSL certificate

---

## Option 2: Deploy ke Netlify

Alternatif lain yang juga bagus untuk static sites.

### Steps:

1. **Push code ke GitHub** (sama seperti Vercel)

2. **Sign up/Login ke Netlify**
   - Kunjungi [netlify.com](https://netlify.com)
   - Sign up dengan GitHub

3. **Import Project**
   - Click "Add new site" > "Import an existing project"
   - Choose GitHub dan select repository

4. **Configure Build Settings**
   ```
   Base directory: frontend
   Build command: npm run build
   Publish directory: frontend/dist
   ```

5. **Environment Variables**
   
   Site settings > Environment variables:
   ```
   VITE_SUPABASE_URL
   VITE_SUPABASE_ANON_KEY
   ```

6. **Deploy**
   - Click "Deploy site"
   - Site akan live di `https://random-name.netlify.app`

7. **Custom Domain** (Optional)
   - Site settings > Domain management
   - Add custom domain

---

## Option 3: Deploy ke Firebase Hosting

Google Firebase hosting juga support static sites.

### Steps:

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Login ke Firebase**
   ```bash
   firebase login
   ```

3. **Initialize Firebase**
   ```bash
   cd frontend
   firebase init hosting
   ```

   Pilih options:
   - Use existing project atau create new
   - Public directory: `dist`
   - Single-page app: Yes
   - GitHub integration: Yes (optional)

4. **Build aplikasi**
   ```bash
   npm run build
   ```

5. **Deploy**
   ```bash
   firebase deploy
   ```

6. **Environment Variables**
   
   Firebase tidak support build-time env vars secara native. Ada 2 cara:

   **Cara 1**: Buat `.env.production`:
   ```bash
   # frontend/.env.production
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=your-key
   ```

   **Cara 2**: Use Firebase Functions untuk config

---

## Option 4: Manual Build & Deploy

Untuk hosting tradisional (shared hosting, VPS, dll).

### Steps:

1. **Build Production**
   ```bash
   cd frontend
   npm run build
   ```

2. **Output**
   
   Folder `dist/` akan berisi:
   ```
   dist/
   ├── index.html
   ├── assets/
   │   ├── index-[hash].js
   │   ├── index-[hash].css
   │   └── ...
   └── ...
   ```

3. **Upload ke Server**
   
   Via FTP/SFTP, upload semua isi folder `dist/` ke:
   - `public_html/` (shared hosting)
   - `/var/www/html/` (VPS)
   - Atau document root server Anda

4. **Configure Server**

   **Apache** (`.htaccess`):
   ```apache
   <IfModule mod_rewrite.c>
     RewriteEngine On
     RewriteBase /
     RewriteRule ^index\.html$ - [L]
     RewriteCond %{REQUEST_FILENAME} !-f
     RewriteCond %{REQUEST_FILENAME} !-d
     RewriteRule . /index.html [L]
   </IfModule>
   ```

   **Nginx** (`nginx.conf`):
   ```nginx
   server {
     listen 80;
     server_name your-domain.com;
     root /var/www/html;
     index index.html;

     location / {
       try_files $uri $uri/ /index.html;
     }
   }
   ```

5. **Environment Variables**

   Karena build sudah jadi static files, environment variables harus di-set sebelum build:

   ```bash
   # Create .env.production
   echo "VITE_SUPABASE_URL=https://xxxxx.supabase.co" > .env.production
   echo "VITE_SUPABASE_ANON_KEY=your-key" >> .env.production

   # Build with production env
   npm run build
   ```

---

## Option 5: Deploy ke GitHub Pages

Gratis hosting dari GitHub.

### Steps:

1. **Install gh-pages**
   ```bash
   npm install --save-dev gh-pages
   ```

2. **Update vite.config.ts**
   ```typescript
   export default defineConfig({
     base: '/repository-name/', // Sesuaikan dengan nama repo
     plugins: [react()],
   })
   ```

3. **Add deploy script ke package.json**
   ```json
   {
     "scripts": {
       "deploy": "npm run build && gh-pages -d dist"
     }
   }
   ```

4. **Deploy**
   ```bash
   npm run deploy
   ```

5. **Configure GitHub Pages**
   - Repository Settings > Pages
   - Source: `gh-pages` branch
   - Site akan live di `https://username.github.io/repository-name/`

⚠️ **Note**: GitHub Pages tidak support environment variables dengan aman. Pertimbangkan platform lain untuk production.

---

## Post-Deployment Checklist

Setelah deploy, verifikasi:

- ✅ Site bisa diakses via URL
- ✅ SSL/HTTPS aktif
- ✅ Login & register berfungsi
- ✅ Routing berfungsi (refresh page tidak error 404)
- ✅ API calls ke Supabase berhasil
- ✅ Images & assets ter-load dengan benar
- ✅ Console browser tidak ada error
- ✅ Mobile responsive berfungsi

## Monitoring & Maintenance

### Performance Monitoring

Gunakan tools seperti:
- Google Lighthouse (built-in Chrome DevTools)
- WebPageTest.org
- GTmetrix

### Error Tracking

Pertimbangkan integrate dengan:
- Sentry (error tracking)
- LogRocket (session replay)
- Google Analytics (usage analytics)

### Regular Updates

```bash
# Update dependencies
npm update

# Check for security vulnerabilities
npm audit

# Fix if needed
npm audit fix
```

## Rollback Strategy

Jika deployment bermasalah:

### Vercel/Netlify
- Dashboard > Deployments
- Pilih deployment sebelumnya
- Click "Rollback to this deployment"

### Manual
- Simpan backup folder `dist/` sebelum deploy
- Jika ada masalah, upload backup kembali

## Environment-Specific Configs

Untuk multiple environments (dev, staging, production):

```bash
# .env.development
VITE_SUPABASE_URL=https://dev-project.supabase.co

# .env.staging  
VITE_SUPABASE_URL=https://staging-project.supabase.co

# .env.production
VITE_SUPABASE_URL=https://prod-project.supabase.co
```

Build command:
```bash
# Development
npm run dev

# Production
npm run build  # Auto use .env.production
```

## Troubleshooting

### 404 on page refresh

**Problem**: React Router routes return 404 when refreshed

**Solution**: Configure server untuk redirect semua routes ke `index.html` (lihat Apache/Nginx config di atas)

### Environment variables not working

**Problem**: `import.meta.env.VITE_*` undefined

**Solution**: 
- Vercel/Netlify: Set di dashboard
- Manual build: Create `.env.production` sebelum build
- Pastikan prefix `VITE_` ada di semua env vars

### Build errors

**Problem**: Build fails di production tapi OK di local

**Solution**:
```bash
# Test production build locally
npm run build
npm run preview

# Check for TypeScript errors
npm run type-check  # Jika ada script ini

# Clear cache
rm -rf node_modules dist .vite
npm install
npm run build
```

## Best Practices

1. **Always test production build locally** sebelum deploy
2. **Use environment-specific configs** untuk different stages
3. **Enable HTTPS** untuk production (gratis di Vercel/Netlify)
4. **Set proper CORS** di Supabase untuk production domain
5. **Monitor errors** dengan error tracking service
6. **Regular backups** dari database Supabase
7. **Keep dependencies updated** untuk security patches

## Cost Estimates

| Platform | Free Tier | Paid Plans |
|----------|-----------|------------|
| Vercel | Unlimited personal projects | $20/month pro |
| Netlify | 100GB bandwidth/month | $19/month pro |
| Firebase | 10GB storage, 360MB/day transfer | Pay as you go |
| GitHub Pages | Unlimited for public repos | N/A |

## Support

Jika ada masalah saat deployment:
- Check platform documentation
- Review deployment logs
- Test locally dengan production build
- Contact support tim

---

Selamat! Aplikasi Anda sekarang sudah live! 🎉
