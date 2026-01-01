# SILab Mobile - Database Schema Documentation

This document describes the required database schema for the SILab Mobile application using Supabase.

## Database Tables

### 1. users
Stores user profile information (extends Supabase auth.users)

```sql
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  username VARCHAR(100) UNIQUE,
  email VARCHAR(255) UNIQUE NOT NULL,
  student_id VARCHAR(50),
  department VARCHAR(100),
  phone VARCHAR(50),
  bio TEXT,
  picture TEXT, -- URL to profile picture
  google_id TEXT UNIQUE, -- Google OAuth ID
  role VARCHAR(50) DEFAULT 'student', -- 'student', 'assistant', 'admin'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view all profiles" ON users
  FOR SELECT USING (true);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);
```

### 2. announcements
Stores course announcements

```sql
CREATE TABLE announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view announcements" ON announcements
  FOR SELECT USING (true);

CREATE POLICY "Instructors can create announcements" ON announcements
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('instructor', 'admin')
    )
  );

CREATE POLICY "Instructors can update own announcements" ON announcements
  FOR UPDATE USING (
    created_by = auth.uid() AND
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('instructor', 'admin')
    )
  );

CREATE POLICY "Instructors can delete own announcements" ON announcements
  FOR DELETE USING (
    created_by = auth.uid() AND
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('instructor', 'admin')
    )
  );
```

### 3. assignments
Stores course assignments

```sql
CREATE TABLE assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  focus VARCHAR(100), -- 'Requirements', 'Enterprise Architecture', etc.
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  due_date TIMESTAMP WITH TIME ZONE
);

-- Add RLS policies
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view assignments" ON assignments
  FOR SELECT USING (true);

CREATE POLICY "Instructors can create assignments" ON assignments
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('instructor', 'admin')
    )
  );

CREATE POLICY "Instructors can update assignments" ON assignments
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('instructor', 'admin')
    )
  );
```

### 4. submissions
Stores student assignment submissions

```sql
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

-- Add RLS policies
ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own submissions" ON submissions
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Instructors can view all submissions" ON submissions
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('instructor', 'admin')
    )
  );

CREATE POLICY "Users can create own submissions" ON submissions
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update own submissions" ON submissions
  FOR UPDATE USING (user_id = auth.uid());
```

### 5. grades (optional - for grading submissions)
Stores grades for submissions

```sql
CREATE TABLE grades (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  submission_id UUID REFERENCES submissions(id) ON DELETE CASCADE UNIQUE,
  score INTEGER CHECK (score >= 0 AND score <= 100),
  feedback TEXT,
  graded_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE grades ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own grades" ON grades
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM submissions 
      WHERE submissions.id = grades.submission_id 
      AND submissions.user_id = auth.uid()
    )
  );

CREATE POLICY "Instructors can view all grades" ON grades
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('instructor', 'admin')
    )
  );

CREATE POLICY "Instructors can create grades" ON grades
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('instructor', 'admin')
    )
  );

CREATE POLICY "Instructors can update grades" ON grades
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('instructor', 'admin')
    )
  );
```

### 6. quiz_topics
Stores quiz topics/categories

```sql
CREATE TABLE quiz_topics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  description TEXT,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE quiz_topics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view quiz topics" ON quiz_topics
  FOR SELECT USING (true);

CREATE POLICY "Instructors can create quiz topics" ON quiz_topics
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('instructor', 'admin')
    )
  );

CREATE POLICY "Instructors can update quiz topics" ON quiz_topics
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('instructor', 'admin')
    )
  );
```

### 7. quiz_questions
Stores quiz questions

```sql
CREATE TABLE quiz_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  topic_id UUID REFERENCES quiz_topics(id) ON DELETE CASCADE,
  type VARCHAR(20) NOT NULL DEFAULT 'multiple', -- 'multiple' or 'text'
  question TEXT NOT NULL,
  options JSONB, -- Array of answer options (for multiple choice)
  correct JSONB NOT NULL, -- For multiple: single index, for text: array of accepted answers
  order_index INTEGER NOT NULL DEFAULT 0, -- Question order within topic
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add index for ordering
CREATE INDEX quiz_questions_topic_order_idx ON quiz_questions(topic_id, order_index);

-- Add RLS policies
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view quiz questions" ON quiz_questions
  FOR SELECT USING (true);

CREATE POLICY "Instructors can create quiz questions" ON quiz_questions
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('instructor', 'admin')
    )
  );

CREATE POLICY "Instructors can update quiz questions" ON quiz_questions
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('instructor', 'admin')
    )
  );
```

### 8. quiz_attempts (optional - to track quiz attempts)
Stores student quiz attempts and scores

```sql
CREATE TABLE quiz_attempts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  topic_id UUID REFERENCES quiz_topics(id) ON DELETE CASCADE,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  score INTEGER CHECK (score >= 0 AND score <= 100),
  answers JSONB, -- Stores all answers
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add RLS policies
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own attempts" ON quiz_attempts
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Instructors can view all attempts" ON quiz_attempts
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE users.id = auth.uid() 
      AND users.role IN ('instructor', 'admin')
    )
  );

CREATE POLICY "Users can create own attempts" ON quiz_attempts
  FOR INSERT WITH CHECK (user_id = auth.uid());
```

### 9. submission_files
Stores uploaded files for assignment submissions

```sql
CREATE TABLE submission_files (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  submission_id UUID REFERENCES submissions(id) ON DELETE CASCADE,
  storage_path TEXT NOT NULL, -- Path in Supabase Storage
  original_name TEXT NOT NULL, -- Original filename
  content_type TEXT, -- MIME type
  size_bytes BIGINT, -- File size in bytes
  uploaded_by UUID REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add index for faster lookups
CREATE INDEX submission_files_submission_id_idx ON submission_files(submission_id);

-- Add RLS policies
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
    uploaded_by = auth.uid() AND
    EXISTS (
      SELECT 1 FROM submissions 
      WHERE submissions.id = submission_files.submission_id 
      AND submissions.user_id = auth.uid()
    )
  );
```

## Database Functions

### Function to create user profile on signup

```sql
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

-- Trigger the function every time a user is created
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### Function to update updated_at timestamp

```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to all tables with updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_announcements_updated_at BEFORE UPDATE ON announcements
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_assignments_updated_at BEFORE UPDATE ON assignments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_submissions_updated_at BEFORE UPDATE ON submissions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_grades_updated_at BEFORE UPDATE ON grades
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quiz_topics_updated_at BEFORE UPDATE ON quiz_topics
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quiz_questions_updated_at BEFORE UPDATE ON quiz_questions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_submission_files_updated_at BEFORE UPDATE ON submission_files
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

## Storage Buckets

### submission-files
Create this bucket in Supabase Storage for assignment file uploads:

1. Go to **Storage** in Supabase Dashboard
2. Create new bucket named `submission-files`
3. Set as **Private** (not public)
4. Add storage policies:

```sql
-- Allow authenticated users to upload files
CREATE POLICY "Users can upload submission files"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'submission-files' AND
  auth.uid()::text = (storage.foldername(name))[1]
);

-- Allow users to view their own files and instructors to view all
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

-- Allow users to delete their own files
CREATE POLICY "Users can delete own files"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'submission-files' AND
  auth.uid()::text = (storage.foldername(name))[1]
);
```

Files will be organized by user ID: `submission-files/{userId}/{filename}`

## Indexes

```sql
-- Improve query performance
CREATE INDEX idx_announcements_created_at ON announcements(created_at DESC);
CREATE INDEX idx_assignments_focus ON assignments(focus);
CREATE INDEX idx_submissions_assignment_user ON submissions(assignment_id, user_id);
CREATE INDEX idx_quiz_questions_topic ON quiz_questions(topic_id);
CREATE INDEX idx_quiz_questions_topic_order ON quiz_questions(topic_id, order_index);
CREATE INDEX idx_quiz_attempts_user ON quiz_attempts(user_id);
CREATE INDEX idx_submission_files_submission ON submission_files(submission_id);
CREATE INDEX idx_users_google_id ON users(google_id);
```

## Setup Instructions

1. **Disable Email Confirmation (PENTING!)**
   - Go to **Authentication** > **Providers** > **Email**
   - Toggle OFF "Confirm email"
   - Click Save
   - Ini memungkinkan user langsung login setelah register tanpa konfirmasi email

2. **Enable Google OAuth (Optional)**
   - Go to **Authentication** > **Providers** > **Google**
   - Enable Google provider
   - Add your Google Client ID and Secret
   - Add authorized redirect URI from Supabase

3. **Run SQL Scripts**
   - Go to your Supabase project SQL Editor
   - Run all the CREATE TABLE statements above
   - Create the functions and triggers
   - Create the indexes

4. **Setup Storage Bucket**
   - Go to **Storage** in Supabase Dashboard
   - Create bucket named `submission-files` (Private)
   - Apply the storage policies mentioned above

5. **Test the Setup**
   - Create a user via the authentication flow
   - Verify the user profile is auto-created
   - Test file upload functionality

## Notes

- All tables use UUID as primary key for better scalability
- Row Level Security (RLS) is enabled on all tables for security
- The `users` table is automatically populated when a new user signs up
- Timestamps are stored with timezone for consistency
- Foreign keys have appropriate ON DELETE actions
- **New Features Added**:
  - `users` table extended with: `phone`, `bio`, `picture`, `google_id` for OAuth
  - `quiz_questions` now supports both `multiple` choice and `text` type questions
  - `quiz_questions` has `order_index` for proper question ordering
  - `submission_files` table for file upload support
  - Storage bucket `submission-files` for secure file storage
  - Google OAuth support via Supabase Auth
