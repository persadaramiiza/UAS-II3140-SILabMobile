# Setup Guide - SILab Mobile

Panduan lengkap untuk mengatur aplikasi SILab Mobile dari awal.

## Prerequisites

Pastikan Anda sudah menginstall:
- Node.js v16 atau lebih baru
- npm atau yarn
- Git
- Expo CLI: `npm install -g expo-cli`
- Android Studio (untuk emulator Android) atau Xcode (untuk iOS)

## Step 1: Clone Repository

```bash
git clone <repository-url>
cd SILabMobile
```

## Step 2: Install Dependencies

```bash
npm install
```

Atau jika menggunakan yarn:
```bash
yarn install
```

## Step 3: Setup Supabase Project

### 3.1 Buat Project Baru di Supabase

1. Buka https://supabase.com
2. Sign in atau buat akun baru
3. Klik "New Project"
4. Isi detail project:
   - Name: SILab Mobile
   - Database Password: (simpan password ini)
   - Region: Southeast Asia (Singapore)
5. Klik "Create new project"

### 3.2 Disable Email Confirmation (PENTING!)

**Agar user bisa langsung login setelah register tanpa konfirmasi email:**

1. Di dashboard Supabase, buka **Authentication** > **Providers**
2. Klik **Email** provider
3. Scroll ke bawah ke section **Email Settings**
4. **Matikan** (toggle OFF) opsi "**Confirm email**"
5. Klik **Save**

Sekarang user bisa langsung login setelah register tanpa perlu konfirmasi email!

### 3.3 Dapatkan API Credentials

1. Di dashboard Supabase, buka **Settings** > **API**
2. Copy nilai berikut:
   - Project URL (URL)
   - anon public key (API Key)

### 3.4 Setup Database

1. Buka **SQL Editor** di dashboard Supabase
2. Copy seluruh isi file `DATABASE_SCHEMA.md`
3. Paste ke SQL Editor dan jalankan satu per satu:
   - Jalankan CREATE TABLE statements dulu
   - Kemudian jalankan ALTER TABLE untuk RLS policies
   - Jalankan functions dan triggers
   - Terakhir, jalankan CREATE INDEX statements

Urutan eksekusi:
```sql
-- 1. Create all tables first
CREATE TABLE users (...);
CREATE TABLE announcements (...);
-- dst...

-- 2. Enable RLS and create policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view all profiles" ON users...
-- dst...

-- 3. Create functions and triggers
CREATE OR REPLACE FUNCTION public.handle_new_user()...
CREATE TRIGGER on_auth_user_created...
-- dst...

-- 4. Create indexes
CREATE INDEX idx_announcements_created_at...
-- dst...
```

### 3.4 Verify Database Setup

Cek di **Table Editor** bahwa semua tabel sudah terbuat:
- users
- announcements
- assignments
- submissions
- grades
- quiz_topics
- quiz_questions
- quiz_attempts

## Step 4: Setup Environment Variables

1. Copy file `.env.example` menjadi `.env`:
   ```bash
   cp .env.example .env
   ```

2. Edit file `.env` dan isi dengan credentials dari Step 3.2:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```

## Step 5: Test Database Connection

1. Start development server:
   ```bash
   npm start
   ```

2. Scan QR code dengan Expo Go app di smartphone Anda

3. Coba register user baru:
   - Buka aplikasi
   - Klik "Register"
   - Isi form dan submit

4. Cek di Supabase **Table Editor** > **users**:
   - Seharusnya ada entry baru dengan data user yang baru saja didaftarkan
   - Role default harus "student"

## Step 6: Create Test Data (Optional)

Untuk testing, Anda bisa membuat data dummy:

### Create Admin User
```sql
-- 1. Register user biasa lewat app terlebih dahulu
-- 2. Kemudian update role di SQL Editor:

UPDATE users 
SET role = 'admin' 
WHERE email = 'admin@test.com';
```

### Create Sample Announcements
```sql
INSERT INTO announcements (title, content, created_by)
VALUES 
  ('Welcome to SILab', 'Selamat datang di sistem informasi laboratorium!', '<admin-user-id>'),
  ('Pengumuman Tugas 1', 'Tugas 1 sudah tersedia, deadline minggu depan.', '<admin-user-id>');
```

### Create Sample Assignments
```sql
INSERT INTO assignments (title, description, focus, created_by)
VALUES 
  ('Tugas Requirements Engineering', 'Buat dokumen SKPL untuk sistem yang dipilih', 'Requirements', '<admin-user-id>'),
  ('Tugas ERD', 'Buat Entity Relationship Diagram', 'Conceptual Modeling', '<admin-user-id>');
```

### Create Sample Quiz
```sql
-- Create quiz topic
INSERT INTO quiz_topics (title, description, created_by)
VALUES ('Quiz Requirements Engineering', 'Quiz tentang dasar requirements engineering', '<admin-user-id>')
RETURNING id;

-- Create quiz questions (ganti <topic-id> dengan id dari query di atas)
INSERT INTO quiz_questions (topic_id, question, options, correct)
VALUES 
  ('<topic-id>', 'Apa kepanjangan dari SKPL?', 
   '["Spesifikasi Kebutuhan Perangkat Lunak", "Sistem Komputer Perangkat Lunak", "Software Komponen Perangkat Lunak", "Standar Kualitas Perangkat Lunak"]'::jsonb, 
   0),
  ('<topic-id>', 'Teknik elisitasi yang melibatkan observasi langsung adalah?', 
   '["Interview", "Questionnaire", "Observation", "Document Analysis"]'::jsonb, 
   2);
```

## Step 7: Run on Different Platforms

### Android
```bash
npm run android
```
Membutuhkan Android Studio dan emulator yang sudah running.

### iOS (Mac only)
```bash
npm run ios
```
Membutuhkan Xcode.

### Web
```bash
npm run web
```
Akan membuka di browser.

### Physical Device
1. Install "Expo Go" dari Play Store / App Store
2. Jalankan `npm start`
3. Scan QR code yang muncul

## Troubleshooting

### Error: Cannot find module '@env'
```bash
# Clear cache dan restart
rm -rf node_modules
npm install
npm start -- --clear
```

### Error: Network request failed
- Pastikan file `.env` sudah dibuat dan terisi dengan benar
- Restart development server
- Cek koneksi internet

### RLS Policy Error
Jika mendapat error "new row violates row-level security policy":
- Cek kembali RLS policies di Supabase
- Pastikan trigger `on_auth_user_created` sudah dibuat
- Verify policies dengan query:
  ```sql
  SELECT * FROM pg_policies WHERE tablename = 'users';
  ```

### Build Failed
```bash
# Clear all caches
expo start -c

# Reset metro bundler
watchman watch-del-all
rm -rf /tmp/metro-*

# Reinstall dependencies
rm -rf node_modules
npm install
```

## Next Steps

Setelah setup selesai:
1. Baca `README.md` untuk fitur-fitur aplikasi
2. Lihat `DATABASE_SCHEMA.md` untuk struktur database
3. Eksplorasi folder `src/` untuk memahami struktur kode
4. Mulai development!

## Support

Jika mengalami masalah:
1. Cek dokumentasi Expo: https://docs.expo.dev/
2. Cek dokumentasi Supabase: https://supabase.com/docs
3. Buat issue di repository
