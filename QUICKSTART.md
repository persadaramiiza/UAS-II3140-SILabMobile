# Quick Start - SILab Mobile

Panduan cepat untuk menjalankan aplikasi SILab Mobile dalam 5 menit!

## Prerequisites

✅ Node.js v16+ installed
✅ npm atau yarn
✅ Akun Supabase (gratis)
✅ Smartphone dengan Expo Go app (opsional)

## Step 1: Install Dependencies (1 menit)

```bash
npm install
```

## Step 2: Setup Supabase (2 menit)

### 2.1 Buat Project Baru
1. Buka https://supabase.com
2. Klik "New Project"
3. Isi nama: **SILab Mobile**
4. Tunggu project selesai dibuat

### 2.2 Disable Email Confirmation
**PENTING:** Agar bisa langsung login setelah register!

1. Buka **Authentication** > **Providers**
2. Klik **Email**
3. Scroll ke **Email Settings**
4. **Matikan** "Confirm email"
5. Klik **Save**

### 2.3 Copy Credentials
1. Di dashboard, buka **Settings** > **API**
2. Copy:
   - `URL`
   - `anon public` key

### 2.4 Setup .env
```bash
# Copy file example
cp .env.example .env

# Edit .env dan paste credentials
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Step 3: Setup Database (2 menit)

### 3.1 Open SQL Editor
Di Supabase dashboard, buka **SQL Editor**

### 3.2 Run Schema
Copy dan paste script berikut satu per satu:

#### A. Create Tables
```sql
-- Table: users
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  username VARCHAR(100) UNIQUE,
  email VARCHAR(255) UNIQUE NOT NULL,
  student_id VARCHAR(50),
  department VARCHAR(100),
  role VARCHAR(50) DEFAULT 'student',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: announcements
CREATE TABLE announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: assignments
CREATE TABLE assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  focus VARCHAR(100),
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  due_date TIMESTAMP WITH TIME ZONE
);

-- Table: submissions
CREATE TABLE submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  assignment_id UUID REFERENCES assignments(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  link TEXT,
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(assignment_id, user_id)
);

-- Table: grades
CREATE TABLE grades (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  submission_id UUID REFERENCES submissions(id) ON DELETE CASCADE UNIQUE,
  score INTEGER CHECK (score >= 0 AND score <= 100),
  feedback TEXT,
  graded_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: quiz_topics
CREATE TABLE quiz_topics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Table: quiz_questions
CREATE TABLE quiz_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  topic_id UUID REFERENCES quiz_topics(id) ON DELETE CASCADE,
  question TEXT NOT NULL,
  options JSONB NOT NULL,
  correct INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

Klik **Run** untuk setiap tabel.

#### B. Enable RLS
```sql
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_topics ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
```

#### C. Create Policies
```sql
-- Users policies
CREATE POLICY "Users can view all profiles" ON users FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" ON users FOR UPDATE USING (auth.uid() = id);

-- Announcements policies
CREATE POLICY "Anyone can view announcements" ON announcements FOR SELECT USING (true);

-- Assignments policies
CREATE POLICY "Anyone can view assignments" ON assignments FOR SELECT USING (true);

-- Submissions policies
CREATE POLICY "Users can view own submissions" ON submissions FOR SELECT USING (user_id = auth.uid());
CREATE POLICY "Users can create own submissions" ON submissions FOR INSERT WITH CHECK (user_id = auth.uid());
CREATE POLICY "Users can update own submissions" ON submissions FOR UPDATE USING (user_id = auth.uid());

-- Quiz policies
CREATE POLICY "Anyone can view quiz topics" ON quiz_topics FOR SELECT USING (true);
CREATE POLICY "Anyone can view quiz questions" ON quiz_questions FOR SELECT USING (true);
```

#### D. Create Trigger
```sql
-- Auto-create user profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    'student'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

## Step 4: Run App (30 detik)

```bash
npm start
```

Ini akan membuka Expo Dev Tools. Pilih salah satu:

### Option A: Physical Device
1. Install "Expo Go" dari Play Store/App Store
2. Scan QR code yang muncul
3. App akan terbuka di smartphone

### Option B: Emulator
```bash
npm run android  # untuk Android emulator
npm run ios      # untuk iOS simulator (Mac only)
```

### Option C: Web Browser
```bash
npm run web
```

## Step 5: Test App (1 menit)

### 5.1 Register
1. Buka app
2. Klik "Register"
3. Isi form:
   - Name: Test User
   - Email: test@example.com
   - Password: password123
4. Submit

### 5.2 Verify Database
1. Buka Supabase **Table Editor**
2. Buka tabel **users**
3. Seharusnya ada user baru dengan role "student"

### 5.3 Test Features
- ✅ Browse modules
- ✅ View assignments (akan kosong)
- ✅ View quiz topics (akan kosong)
- ✅ View profile

## Step 6: Add Test Data (Opsional)

### Create Admin User
Di SQL Editor:
```sql
-- Update user menjadi admin
UPDATE users 
SET role = 'admin' 
WHERE email = 'test@example.com';
```

Logout dan login kembali. Sekarang Anda bisa create announcements!

### Create Sample Announcement
Di app, sebagai admin:
1. Go to Home tab
2. Klik tombol + (FAB)
3. Isi title dan content
4. Submit

### Create Sample Assignment
Di SQL Editor:
```sql
-- Ambil user ID terlebih dahulu
SELECT id FROM users WHERE email = 'test@example.com';

-- Buat assignment (ganti <user-id> dengan ID dari query di atas)
INSERT INTO assignments (title, description, focus, created_by)
VALUES 
  ('Tugas Requirements Engineering', 
   'Buat dokumen SKPL untuk sistem yang dipilih', 
   'Requirements', 
   '<user-id>');
```

### Create Sample Quiz
```sql
-- Buat quiz topic
INSERT INTO quiz_topics (title, description, created_by)
VALUES ('Quiz Requirements', 'Quiz tentang requirements engineering', '<user-id>')
RETURNING id;

-- Buat quiz questions (ganti <topic-id>)
INSERT INTO quiz_questions (topic_id, question, options, correct)
VALUES 
  ('<topic-id>', 
   'Apa kepanjangan dari SKPL?', 
   '["Spesifikasi Kebutuhan Perangkat Lunak", "Sistem Komputer", "Software Komponen", "Standar Kualitas"]'::jsonb, 
   0);
```

## 🎉 Done!

Aplikasi SILab Mobile sudah berjalan!

## Common Issues

### Error: Cannot connect to Supabase
- Cek file `.env` sudah benar
- Restart development server: `npm start`

### Error: User not created in users table
- Cek trigger `on_auth_user_created` sudah dibuat
- Cek di **SQL Editor** > **Database** > **Triggers**

### App not loading
- Clear Expo cache: `npm start -- --clear`
- Reinstall: `rm -rf node_modules && npm install`

## Next Steps

1. ✅ Baca **README.md** untuk overview
2. ✅ Baca **SETUP_GUIDE.md** untuk detail
3. ✅ Baca **DATABASE_SCHEMA.md** untuk schema lengkap
4. ✅ Mulai development!

## Need Help?

- 📖 Baca dokumentasi di folder project
- 🔍 Check **SUMMARY.md** untuk fitur lengkap
- 💬 Check **CONTRIBUTING.md** untuk development guide

---

**Total waktu: ~5 menit** ⏱️

Selamat coding! 🚀
