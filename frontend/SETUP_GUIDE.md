# Setup Guide - SILab Suite Frontend

Panduan lengkap untuk setup dan menjalankan aplikasi SILab Suite Frontend.

## Prerequisites

Sebelum memulai, pastikan Anda sudah menginstall:

- **Node.js** versi 18.0 atau lebih baru
- **npm** versi 9.0 atau lebih baru (biasanya sudah include dengan Node.js)
- **Git** untuk version control
- **Akun Supabase** (gratis) - [Sign up di sini](https://supabase.com)

## Step 1: Clone Repository

```bash
git clone <repository-url>
cd UAS-II3140-SILabMobile/frontend
```

## Step 2: Install Dependencies

```bash
npm install
```

Ini akan menginstall semua package yang diperlukan termasuk:
- React & React DOM
- TypeScript
- Vite
- Tailwind CSS
- Radix UI components
- Supabase client
- React Router
- Dan lainnya...

## Step 3: Setup Supabase

### 3.1 Buat Project Baru di Supabase

1. Login ke [Supabase Dashboard](https://app.supabase.com)
2. Klik "New Project"
3. Isi detail project:
   - Name: SILab Suite (atau nama lain)
   - Database Password: Buat password yang kuat
   - Region: Pilih yang terdekat (Southeast Asia - Singapore)
4. Klik "Create new project"
5. Tunggu beberapa menit sampai project selesai dibuat

### 3.2 Dapatkan API Keys

1. Di Supabase Dashboard, buka project Anda
2. Klik "Settings" (icon gear) di sidebar
3. Pilih "API"
4. Copy dua nilai ini:
   - **Project URL** (contoh: `https://xxxxx.supabase.co`)
   - **anon public** key (di bagian Project API keys)

### 3.3 Setup Database Schema

1. Di Supabase Dashboard, klik "SQL Editor"
2. Klik "New query"
3. Copy paste SQL schema dari file `DATABASE_SCHEMA.md` (di root project)
4. Klik "Run" untuk execute query
5. Verifikasi bahwa tables sudah terbuat di menu "Table Editor"

## Step 4: Setup Environment Variables

1. Di folder `frontend/`, copy file `.env.example` menjadi `.env`:

```bash
cp .env.example .env
```

2. Buka file `.env` dan isi dengan credentials Supabase Anda:

```env
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

⚠️ **Penting**: Jangan commit file `.env` ke git! File ini sudah ada di `.gitignore`.

## Step 5: Run Development Server

```bash
npm run dev
```

Aplikasi akan berjalan di `http://localhost:5173`

Buka browser dan akses URL tersebut. Anda akan melihat:
1. Splash screen (9.5 detik)
2. Auto redirect ke login screen

## Step 6: Buat User Pertama

### Cara 1: Melalui Register Screen

1. Di halaman login, klik "Register" atau navigate ke `/register`
2. Isi form registrasi:
   - Full Name
   - NIM (8 digit)
   - Email
   - Password
   - Phone (optional)
   - Class Name (optional)
3. Klik "Register"
4. Setelah berhasil, Anda akan di redirect ke login
5. Login dengan email dan password yang baru dibuat

### Cara 2: Langsung di Supabase (untuk Admin)

1. Di Supabase Dashboard, buka "Authentication" > "Users"
2. Klik "Add user" > "Create new user"
3. Isi email dan password
4. Klik "Create user"
5. Copy User ID yang baru dibuat
6. Buka "Table Editor" > "users"
7. Klik "Insert" > "Insert row"
8. Isi data:
   ```
   id: <paste User ID dari step 5>
   email: <email yang sama>
   full_name: Admin User
   role: admin
   ```
9. Klik "Save"
10. Sekarang Anda bisa login sebagai admin

## Step 7: Verifikasi Setup

Setelah login, verifikasi bahwa:

✅ Anda bisa melihat dashboard sesuai role
✅ Navigation berfungsi (klik menu di bottom nav)
✅ Tidak ada error di browser console
✅ Profile page menampilkan data user yang benar

## Troubleshooting

### Error: "Missing Supabase environment variables"

**Solusi**: Pastikan file `.env` sudah dibuat dan berisi `VITE_SUPABASE_URL` dan `VITE_SUPABASE_ANON_KEY` yang benar.

### Error: "Failed to fetch" atau network error

**Solusi**: 
1. Cek koneksi internet
2. Verifikasi Supabase URL benar
3. Pastikan Supabase project masih aktif

### Login gagal terus

**Solusi**:
1. Cek di Supabase Dashboard > Authentication > Users apakah user sudah terbuat
2. Cek di Table Editor > users apakah ada row dengan id yang sama
3. Pastikan password yang diinput benar (minimal 6 karakter)

### Page blank/putih

**Solusi**:
1. Buka browser console (F12) untuk lihat error
2. Pastikan semua dependencies sudah terinstall (`npm install`)
3. Clear browser cache dan reload (Ctrl+Shift+R)

### Build error

**Solusi**:
```bash
# Hapus node_modules dan install ulang
rm -rf node_modules
npm install

# Clear Vite cache
rm -rf .vite
npm run dev
```

## Next Steps

Setelah setup berhasil, Anda bisa:

1. **Customize design**: Edit components di `src/components/`
2. **Add features**: Buat components atau hooks baru
3. **Configure Tailwind**: Edit `tailwind.config.js`
4. **Deploy**: Lihat `DEPLOYMENT_GUIDE.md` untuk panduan deployment

## Development Tips

### Hot Reload

Vite sudah include hot module replacement (HMR). Setiap kali Anda save file, browser akan auto reload tanpa perlu refresh manual.

### TypeScript

Pastikan menggunakan TypeScript untuk type safety. VS Code akan memberikan autocomplete dan error checking.

### Components

Gunakan shadcn/ui components yang sudah tersedia di `src/components/ui/`. Sudah styled dan accessible.

### Folder Structure

```
src/
├── components/     # UI components
├── contexts/       # React contexts (AuthContext, etc)
├── hooks/          # Custom hooks
├── lib/            # Utilities & configs
└── styles/         # Global styles
```

## Resources

- [React Documentation](https://react.dev)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Supabase Docs](https://supabase.com/docs)
- [Vite Guide](https://vite.dev/guide/)

## Support

Jika masih ada masalah, silakan:
1. Cek dokumentasi di folder docs
2. Buka issue di GitHub
3. Contact team developer

---

Happy coding! 🚀
