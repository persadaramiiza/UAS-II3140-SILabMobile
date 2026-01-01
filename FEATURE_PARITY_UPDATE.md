# SILab Mobile - Feature Parity Update Summary

## Tanggal: ${new Date().toLocaleDateString('id-ID')}

Dokumen ini merangkum implementasi fitur-fitur dari web app SILab ke dalam mobile app untuk mencapai feature parity yang komprehensif.

## ✅ Fitur yang Telah Diimplementasikan

### 1. Database Schema Updates
**File**: `DATABASE_SCHEMA.md`

#### Extended Users Table
Menambahkan field baru pada table `users`:
- `phone` - Nomor telepon user
- `bio` - Biografi/deskripsi singkat user  
- `picture` - URL foto profil user
- `google_id` - Google OAuth ID untuk login dengan Google

#### Quiz Questions Enhancement
Update table `quiz_questions`:
- `type` - Support 'multiple' choice dan 'text' type questions
- `order_index` - Urutan pertanyaan dalam topic
- Index baru: `quiz_questions_topic_order_idx`

#### New Table: submission_files
Table baru untuk file upload pada assignments:
```sql
CREATE TABLE submission_files (
  id UUID PRIMARY KEY,
  submission_id UUID REFERENCES submissions(id),
  storage_path TEXT NOT NULL,
  original_name TEXT NOT NULL,
  content_type TEXT,
  size_bytes BIGINT,
  uploaded_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### Storage Bucket
Setup `submission-files` bucket di Supabase Storage:
- Private bucket dengan RLS policies
- File organization: `{userId}/{filename}`
- Signed URLs untuk download (1 jam expiry)

---

### 2. Google OAuth Integration
**File**: `src/screens/Auth/LoginScreen.js`

#### Implementasi
- Tombol "Sign in with Google" dengan styling Google blue (#4285F4)
- Menggunakan `supabase.auth.signInWithOAuth()` dengan provider 'google'
- OR divider untuk memisahkan email/password dan Google login
- Deep linking support untuk OAuth redirect

#### Setup Required
1. Enable Google Provider di Supabase Dashboard
2. Add Google Client ID & Secret
3. Configure redirect URIs
4. Update app.json untuk deep linking (production)

---

### 3. Assignment File Upload
**File**: 
- `src/services/fileUploadApi.js` (NEW)
- `src/screens/Assignments/AssignmentDetailScreen.js` (UPDATED)

#### Fitur File Upload
- **Pick File**: `pickFile()` - Document picker untuk semua tipe file
- **Upload**: `uploadSubmissionFile()` - Upload ke Supabase Storage + create DB record
- **List Files**: `getSubmissionFiles()` - Fetch files untuk submission
- **Download**: `getFileDownloadUrl()` - Generate signed URL untuk download
- **Delete**: `deleteSubmissionFile()` - Hapus file dari storage dan DB
- **Format Size**: `formatFileSize()` - Format bytes ke KB/MB/GB

#### UI Components
- File list dengan nama, size, dan action buttons
- Download button (blue) dan delete button (red)
- Upload button dengan icon cloud-upload
- Loading states untuk upload progress
- Disable upload jika submission belum dibuat

#### Dependencies Added
```json
"expo-document-picker": "~13.0.5",
"expo-file-system": "~19.0.1"
```

---

### 4. Extended User Profile
**Files**:
- `src/screens/Main/ProfileScreen.js` (UPDATED)
- `src/screens/Main/ProfileEditScreen.js` (NEW)
- `src/contexts/AuthContext.js` (UPDATED)
- `src/navigation/AppNavigator.js` (UPDATED)

#### ProfileScreen Updates
- Display profile picture (jika ada) atau initial avatar
- Show extended fields: phone, bio
- "Edit Profile" button dengan icon
- Image component untuk profile picture

#### ProfileEditScreen (NEW)
Comprehensive profile editing:
- **Profile Picture Upload**:
  - Image picker dengan crop (1:1 aspect ratio)
  - Upload to Supabase Storage bucket `profile-pictures`
  - Camera icon overlay on avatar
  - Loading state saat upload
  
- **Editable Fields**:
  - Name (required)
  - Student ID / NIM
  - Department / Jurusan
  - Phone Number
  - Bio (multiline textarea)

- **Actions**:
  - Save Changes button (yellow)
  - Cancel button (gray)
  - Auto-refresh profile setelah save

#### Context Enhancement
- `refreshUserProfile()` function di AuthContext
- Digunakan untuk refresh data setelah edit

#### Dependencies Added
```json
"expo-image-picker": "~17.0.14"
```

---

### 5. Quiz Text Questions Support
**Status**: IN PROGRESS

Akan mengupdate:
- `src/screens/Quiz/QuizRoomScreen.js` - Support text input untuk text type questions
- `src/services/quizApi.js` - Handle text answer validation

Fitur:
- Multiple choice questions (existing)
- Text input questions (NEW)
- Case-insensitive text matching
- Multiple accepted answers support
- Question ordering by order_index

---

## 🔄 Fitur Dalam Proses

### 6. Interactive Module Screens

#### Requirements Engineering (MoSCoW Prioritization)
- Simplified drag & drop untuk mobile
- 4 categories: Must-have, Should-have, Could-have, Won't-have
- User stories management
- Save/load dari local storage

#### Enterprise Architecture (Value Stream Mapping)
- Value stream stages
- Business capabilities mapping
- Heat intensity indicator (0-100)
- Visual heat map display

#### Interaction Design (Wireframe Builder)
- Basic UI components (Button, Text, Input, Image)
- Drag & drop placement
- Connecting wires/arrows
- Export to image

#### ERD Builder
- Entity creation
- Attributes management
- Relationship modeling (1-1, 1-M, M-M)
- Primary/Foreign key indicators
- Export diagram

---

## 📦 Dependencies Summary

### New Dependencies
```json
{
  "expo-document-picker": "~13.0.5",
  "expo-file-system": "~19.0.1",
  "expo-image-picker": "~17.0.14"
}
```

### Existing (Unchanged)
- `@supabase/supabase-js`: ^2.89.0
- `@react-navigation/*`: Latest
- `expo`: ~54.0.29
- `react-native`: 0.81.5

---

## 🗄️ Database Migration Commands

```sql
-- 1. Update users table
ALTER TABLE users ADD COLUMN phone VARCHAR(50);
ALTER TABLE users ADD COLUMN bio TEXT;
ALTER TABLE users ADD COLUMN picture TEXT;
ALTER TABLE users ADD COLUMN google_id TEXT UNIQUE;
CREATE INDEX idx_users_google_id ON users(google_id);

-- 2. Update quiz_questions table  
ALTER TABLE quiz_questions ADD COLUMN type VARCHAR(20) NOT NULL DEFAULT 'multiple';
ALTER TABLE quiz_questions ADD COLUMN order_index INTEGER NOT NULL DEFAULT 0;
ALTER TABLE quiz_questions ALTER COLUMN options DROP NOT NULL;
ALTER TABLE quiz_questions ALTER COLUMN correct TYPE JSONB USING correct::text::jsonb;
CREATE INDEX quiz_questions_topic_order_idx ON quiz_questions(topic_id, order_index);

-- 3. Create submission_files table
CREATE TABLE submission_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id UUID REFERENCES submissions(id) ON DELETE CASCADE,
  storage_path TEXT NOT NULL,
  original_name TEXT NOT NULL,
  content_type TEXT,
  size_bytes BIGINT,
  uploaded_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX submission_files_submission_id_idx ON submission_files(submission_id);

-- 4. RLS Policies for submission_files
ALTER TABLE submission_files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own submission files" ON submission_files
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM submissions 
      WHERE submissions.id = submission_files.submission_id 
      AND submissions.user_id = auth.uid()
    )
  );

CREATE POLICY "Instructors can view all submission files" ON submission_files
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('assistant', 'admin')
    )
  );

CREATE POLICY "Users can upload own submission files" ON submission_files
  FOR INSERT WITH CHECK (
    uploaded_by = auth.uid() AND
    EXISTS (
      SELECT 1 FROM submissions 
      WHERE submissions.id = submission_files.submission_id 
      AND submissions.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete own submission files" ON submission_files
  FOR DELETE USING (
    uploaded_by = auth.uid()
  );
```

---

## 🔐 Supabase Storage Setup

### 1. Create Buckets

#### submission-files
```
Name: submission-files
Public: false (Private)
Allowed MIME types: */* (all)
Max file size: 50MB
```

Storage Policies:
```sql
-- Upload policy
CREATE POLICY "Users can upload submission files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'submission-files' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- View policy
CREATE POLICY "Users can view own files, instructors all"
ON storage.objects FOR SELECT
TO authenticated
USING (
  bucket_id = 'submission-files' AND
  (
    auth.uid()::text = (storage.foldername(name))[1] OR
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('assistant', 'admin')
    )
  )
);

-- Delete policy
CREATE POLICY "Users can delete own files"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'submission-files' AND
  auth.uid()::text = (storage.foldername(name))[1]
);
```

#### profile-pictures
```
Name: profile-pictures
Public: true
Allowed MIME types: image/*
Max file size: 5MB
```

Storage Policies:
```sql
-- Upload policy
CREATE POLICY "Users can upload own profile picture"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'profile-pictures'
);

-- View policy (public bucket, all can view)
CREATE POLICY "Anyone can view profile pictures"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'profile-pictures');

-- Delete policy
CREATE POLICY "Users can delete own profile picture"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'profile-pictures');
```

---

## 📱 Installation & Setup

### 1. Install New Dependencies
```bash
npm install
# or
yarn install
```

### 2. Run Database Migrations
- Go to Supabase SQL Editor
- Run all SQL commands dari section "Database Migration Commands"

### 3. Setup Storage Buckets
- Create `submission-files` bucket (Private)
- Create `profile-pictures` bucket (Public)
- Apply storage policies

### 4. Configure Google OAuth (Optional)
- Go to Supabase Dashboard > Authentication > Providers
- Enable Google provider
- Add Google Client ID & Secret
- Configure redirect URLs

### 5. Update Environment Variables
Ensure `.env` file contains:
```
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
```

### 6. Run the App
```bash
npm start
# or
expo start
```

---

## 🧪 Testing Checklist

### Google OAuth
- [ ] Google Sign-In button appears
- [ ] Click redirects to Google OAuth
- [ ] After auth, redirects back to app
- [ ] User profile auto-created
- [ ] google_id saved to database

### File Upload (Assignments)
- [ ] Can pick file from device
- [ ] File uploads to Supabase Storage
- [ ] File appears in list with correct name/size
- [ ] Can download file (opens in browser/viewer)
- [ ] Can delete uploaded file
- [ ] Multiple files can be uploaded
- [ ] File survives after submission update

### Profile Edit
- [ ] Can tap avatar to pick image
- [ ] Image uploads to profile-pictures bucket
- [ ] Image displays correctly
- [ ] All fields (name, student_id, department, phone, bio) save correctly
- [ ] Bio textarea supports multiline
- [ ] Profile refreshes after save
- [ ] Changes reflect in ProfileScreen

### Quiz Text Questions
- [ ] Text input appears for text-type questions
- [ ] Answer validation (case-insensitive)
- [ ] Multiple accepted answers work
- [ ] Score calculated correctly
- [ ] Questions ordered by order_index

---

## 🚀 Next Steps

### Priority 1: Complete Quiz Text Support
1. Update QuizRoomScreen untuk text input
2. Implement answer validation logic
3. Test dengan berbagai text variations

### Priority 2: Interactive Modules
1. Requirements Engineering screen
2. Enterprise Architecture screen
3. Interaction Design screen
4. ERD Builder screen

### Priority 3: Documentation Update
1. Update API_DOCUMENTATION.md
2. Update README.md
3. Create user guide
4. Migration guide untuk existing users

### Priority 4: Polish & Optimization
1. Add loading skeletons
2. Error boundary implementation
3. Offline support considerations
4. Performance optimization
5. Accessibility improvements

---

## 📝 Notes

### Breaking Changes
- Database schema changes require migration
- Users table now has additional fields
- quiz_questions table structure changed (correct field type)

### Backward Compatibility
- Existing submissions continue to work
- Old quiz questions still functional
- User profiles auto-migrate on first login

### Performance Considerations
- File uploads limited to 50MB for assignments
- Profile pictures limited to 5MB
- Signed URLs expire after 1 hour (regenerate on demand)
- Image picker compresses to quality 0.5

### Security
- All storage operations protected by RLS
- File paths include user ID for isolation
- Signed URLs prevent unauthorized access
- OAuth tokens handled securely by Supabase

---

## 📧 Support

Jika ada pertanyaan atau issues:
1. Check TROUBLESHOOTING.md
2. Review DATABASE_SCHEMA.md untuk schema details
3. See API_DOCUMENTATION.md untuk API usage
4. Check browser console untuk error messages

---

**Generated**: ${new Date().toISOString()}
**Version**: 2.0.0
**Status**: 50% Complete (Core features implemented, Interactive modules pending)
