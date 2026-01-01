# SILab Mobile

Aplikasi mobile untuk sistem informasi laboratorium (SILab) menggunakan React Native dan Expo.

## Fitur Utama

- 🔐 **Autentikasi**: Login dan registrasi dengan Supabase Auth (langsung bisa login tanpa konfirmasi email)
- 📢 **Pengumuman**: Lihat dan buat pengumuman kelas
- 📚 **Modul**: Akses materi pembelajaran untuk berbagai topik
- 📝 **Tugas**: Lihat dan kumpulkan tugas
- 🎯 **Quiz**: Kerjakan quiz interaktif
- 👤 **Profil**: Kelola profil pengguna

## Tech Stack

- **React Native** - Framework untuk mobile app
- **Expo** - Development platform
- **Supabase** - Backend as a Service (Auth + Database)
- **React Navigation** - Routing dan navigasi
- **AsyncStorage** - Local storage

## Prerequisites

- Node.js (v16 atau lebih baru)
- npm atau yarn
- Expo CLI
- Akun Supabase

## Setup Lokal

1. **Clone repository**
   ```bash
   cd SILabMobile
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   - Copy file `.env.example` ke `.env`
   - Isi dengan kredensial Supabase Anda:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

4. **Setup database**
   - Buka Supabase SQL Editor
   - Jalankan script SQL dari file `DATABASE_SCHEMA.md`
   - Pastikan semua tabel dan RLS policies sudah dibuat

5. **Run aplikasi**
   ```bash
   npm start
   ```
   
   Atau untuk platform spesifik:
   ```bash
   npm run android  # Untuk Android
   npm run ios      # Untuk iOS
   npm run web      # Untuk web browser
   ```

## Struktur Folder

```
src/
├── components/        # Reusable components
├── contexts/         # React Context (AuthContext)
├── navigation/       # Navigation setup
├── screens/          # Screen components
│   ├── Auth/        # Login & Register
│   ├── Main/        # Home, Modules, Profile
│   ├── Announcements/
│   ├── Assignments/
│   ├── Modules/
│   └── Quiz/
└── services/        # API services
    ├── supabase.js
    ├── announcementsApi.js
    ├── assignmentsApi.js
    └── quizApi.js
```

## Database Schema

Lihat file `DATABASE_SCHEMA.md` untuk detail lengkap struktur database.

Tabel utama:
- `users` - Data profil pengguna
- `announcements` - Pengumuman
- `assignments` - Tugas
- `submissions` - Pengumpulan tugas
- `quiz_topics` - Topik quiz
- `quiz_questions` - Soal quiz

## Role & Permission

Aplikasi mendukung 3 role:
- **student** - Mahasiswa (default)
- **instructor** - Asisten/Dosen
- **admin** - Administrator

Hak akses:
- Student: Bisa melihat semua konten, mengumpulkan tugas, mengerjakan quiz
- Instructor/Admin: Semua hak student + bisa membuat pengumuman, tugas, dan quiz

## Troubleshooting

### Error: Cannot connect to Supabase
- Pastikan kredensial di `.env` sudah benar
- Cek koneksi internet
- Verifikasi RLS policies di Supabase

### Error: User profile not found
- Pastikan trigger `on_auth_user_created` sudah dibuat di Supabase
- Cek apakah user sudah ada di tabel `users`

### Expo not starting
- Hapus folder `.expo` dan `node_modules`
- Jalankan `npm install` kembali
- Clear Expo cache: `expo start -c`

## Pengembangan

### Menambah Fitur Baru

1. Buat service API di folder `src/services/`
2. Buat screen component di folder `src/screens/`
3. Tambahkan route di `src/navigation/AppNavigator.js`
4. Update database schema jika perlu

### Code Style

- Gunakan functional components dengan hooks
- Ikuti naming convention:
  - Components: PascalCase
  - Files: camelCase atau PascalCase
  - Functions: camelCase
- Tambahkan error handling di setiap API call

## Deployment

### Build APK (Android)

```bash
expo build:android
```

### Build IPA (iOS)

```bash
expo build:ios
```

## Kontributor

- Developer: [Your Name]
- Course: II3140 - Sistem Informasi Laboratorium

## Lisensi

This project is for educational purposes.

## Support

Jika ada pertanyaan atau issue, silakan buat issue di repository atau hubungi tim pengembang.
