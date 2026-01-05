# SILab Suite API Reference

## Overview

SILab Suite menggunakan **Supabase** sebagai Backend-as-a-Service (BaaS). API yang digunakan adalah **Supabase REST API** dan **Supabase Client SDK** untuk JavaScript/TypeScript.

### Base URLs
- **Production**: `https://[your-project].supabase.co`
- **REST API**: `https://[your-project].supabase.co/rest/v1`
- **Storage**: `https://[your-project].supabase.co/storage/v1`
- **Auth**: `https://[your-project].supabase.co/auth/v1`

### Authentication
Semua endpoint API menggunakan **JWT Bearer Token** dari Supabase Auth.

```javascript
// Header required untuk API calls
Authorization: Bearer <access_token>
apikey: <supabase_anon_key>
```

---

## Table of Contents

1. [Authentication API](#authentication-api)
2. [Announcements API](#announcements-api)
3. [Assignments API](#assignments-api)
4. [Quizzes API](#quizzes-api)
5. [Users API](#users-api)
6. [File Upload API](#file-upload-api)
7. [Error Handling](#error-handling)
8. [Rate Limits](#rate-limits)

---

## Authentication API

### Sign Up
Registrasi user baru dengan email dan password.

**Client SDK:**
```javascript
import { supabase } from './services/supabase';

const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'securepassword',
  options: {
    data: {
      name: 'John Doe',
      role: 'student',
      student_id: '13520001',
      major: 'Teknik Informatika'
    }
  }
});
```

**Response:**
```json
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "user_metadata": {
      "name": "John Doe",
      "role": "student",
      "student_id": "13520001"
    }
  },
  "session": {
    "access_token": "jwt_token",
    "refresh_token": "refresh_token"
  }
}
```

### Sign In
Login user dengan email dan password.

**Client SDK:**
```javascript
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'securepassword'
});
```

### Google Sign In
OAuth authentication dengan Google.

**Client SDK:**
```javascript
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Configure Google Sign In
GoogleSignin.configure({
  webClientId: 'your-web-client-id',
});

// Sign in
const { idToken } = await GoogleSignin.signIn();

const { data, error } = await supabase.auth.signInWithIdToken({
  provider: 'google',
  token: idToken,
});
```

### Sign Out
Logout user dan hapus session.

**Client SDK:**
```javascript
const { error } = await supabase.auth.signOut();
```

### Get Current Session
Mendapatkan session yang aktif.

**Client SDK:**
```javascript
const { data: { session }, error } = await supabase.auth.getSession();
```

---

## Announcements API

### List Announcements
Mendapatkan semua pengumuman, diurutkan berdasarkan tanggal terbaru.

**Client SDK:**
```javascript
import { fetchAnnouncements } from './services/announcementsApi';

const announcements = await fetchAnnouncements();
```

**Implementation:**
```javascript
const { data, error } = await supabase
  .from('announcements')
  .select(`
    *,
    users:created_by (
      id,
      name
    )
  `)
  .order('created_at', { ascending: false });
```

**Response:**
```json
[
  {
    "id": "uuid",
    "title": "Pengumuman Ujian Tengah Semester",
    "content": "UTS akan dilaksanakan pada...",
    "created_by": "uuid",
    "views": 120,
    "created_at": "2026-01-05T10:00:00Z",
    "updated_at": "2026-01-05T10:00:00Z",
    "users": {
      "id": "uuid",
      "name": "Dr. Assistant"
    }
  }
]
```

### Get Single Announcement
Mendapatkan detail pengumuman berdasarkan ID.

**Client SDK:**
```javascript
import { getAnnouncement } from './services/announcementsApi';

const announcement = await getAnnouncement(announcementId);
```

**Implementation:**
```javascript
const { data, error } = await supabase
  .from('announcements')
  .select('*')
  .eq('id', announcementId)
  .single();
```

### Create Announcement
Membuat pengumuman baru (Assistant/Admin only).

**Client SDK:**
```javascript
import { createAnnouncement } from './services/announcementsApi';

const newAnnouncement = await createAnnouncement({
  title: 'Judul Pengumuman',
  content: 'Isi pengumuman...',
  created_by: userId
});
```

**Payload:**
```json
{
  "title": "string",
  "content": "string",
  "created_by": "uuid"
}
```

### Update Announcement
Update pengumuman yang sudah ada.

**Client SDK:**
```javascript
import { updateAnnouncement } from './services/announcementsApi';

const updated = await updateAnnouncement(announcementId, {
  title: 'Updated Title',
  content: 'Updated content'
});
```

### Delete Announcement
Hapus pengumuman.

**Client SDK:**
```javascript
import { deleteAnnouncement } from './services/announcementsApi';

await deleteAnnouncement(announcementId);
```

### Increment Views
Tambah jumlah views pengumuman.

**Client SDK:**
```javascript
import { incrementViews } from './services/announcementsApi';

await incrementViews(announcementId);
```

---

## Assignments API

### List Assignments
Mendapatkan daftar assignments, bisa difilter berdasarkan kategori.

**Client SDK:**
```javascript
import { fetchAssignments } from './services/assignmentsApi';

// All assignments
const assignments = await fetchAssignments();

// Filter by focus
const erdAssignments = await fetchAssignments({ focus: 'erd' });
```

**Focus Categories:**
- `requirements` - Requirements Engineering
- `erd` - Entity Relationship Diagram
- `interaction` - Interaction Design
- `architecture` - Enterprise Architecture
- `quiz` - Quiz

**Response:**
```json
[
  {
    "id": "uuid",
    "title": "ERD Design - E-Commerce",
    "description": "Buat ERD untuk sistem e-commerce...",
    "focus": "erd",
    "deadline": "2026-01-15T23:59:59Z",
    "max_score": 100,
    "created_at": "2026-01-01T00:00:00Z"
  }
]
```

### Get Assignment
Mendapatkan detail assignment berdasarkan ID.

**Client SDK:**
```javascript
import { getAssignment } from './services/assignmentsApi';

const assignment = await getAssignment(assignmentId);
```

### Create Assignment
Membuat assignment baru (Assistant/Admin only).

**Client SDK:**
```javascript
import { createAssignment } from './services/assignmentsApi';

const newAssignment = await createAssignment({
  title: 'Assignment Title',
  description: 'Description...',
  focus: 'erd',
  deadline: '2026-01-15T23:59:59Z',
  max_score: 100
});
```

### Update Assignment
Update assignment yang sudah ada.

**Client SDK:**
```javascript
import { updateAssignment } from './services/assignmentsApi';

const updated = await updateAssignment(assignmentId, {
  title: 'Updated Title',
  deadline: '2026-01-20T23:59:59Z'
});
```

### Delete Assignment
Hapus assignment.

**Client SDK:**
```javascript
import { deleteAssignment } from './services/assignmentsApi';

await deleteAssignment(assignmentId);
```

### Get Submissions
Mendapatkan submission untuk assignment tertentu.

**Client SDK:**
```javascript
import { getSubmissions } from './services/assignmentsApi';

const submissions = await getSubmissions(assignmentId, userId);
```

**Response:**
```json
[
  {
    "id": "uuid",
    "assignment_id": "uuid",
    "student_id": "uuid",
    "content": "Submission content...",
    "file_url": "https://storage.url/file.pdf",
    "grade": {
      "score": 85,
      "feedback": "Good work!"
    },
    "submitted_at": "2026-01-10T15:30:00Z",
    "graded_at": "2026-01-11T09:00:00Z"
  }
]
```

### Create/Update Submission
Submit atau update submission untuk assignment.

**Client SDK:**
```javascript
import { createOrUpdateSubmission } from './services/assignmentsApi';

const submission = await createOrUpdateSubmission(assignmentId, userId, {
  content: 'My submission text',
  file_url: 'https://storage.url/myfile.pdf'
});
```

### Grade Submission
Memberikan nilai untuk submission (Assistant/Admin only).

**Client SDK:**
```javascript
import { gradeSubmission } from './services/assignmentsApi';

const graded = await gradeSubmission(submissionId, {
  score: 85,
  feedback: 'Excellent work! Minor improvements needed in...'
});
```

**Implementation:**
```javascript
const { data, error } = await supabase
  .from('submissions')
  .update({
    grade: { score, feedback },
    graded_at: new Date().toISOString()
  })
  .eq('id', submissionId)
  .select()
  .single();
```

### Get All Submissions for Grading
Mendapatkan semua submission untuk grading (Assistant/Admin).

**Client SDK:**
```javascript
import { getAllSubmissions } from './services/assignmentsApi';

const allSubmissions = await getAllSubmissions(assignmentId);
```

---

## Quizzes API

### List Quiz Topics
Mendapatkan semua quiz topics dengan informasi question count dan status completion.

**Client SDK:**
```javascript
import { listQuizTopics } from './services/quizApi';

const quizTopics = await listQuizTopics({ 
  includeQuestions: false, 
  userId: currentUserId 
});
```

**Response:**
```json
[
  {
    "id": "uuid",
    "title": "Pengantar Sistem Informasi",
    "description": "{\"start_time\":\"2026-01-10T10:00:00Z\",\"end_time\":\"2026-01-10T12:00:00Z\",\"duration\":60,\"course\":\"IS3140\"}",
    "created_at": "2026-01-05T00:00:00Z",
    "questionCount": 20,
    "isSubmitted": false,
    "score": null,
    "start_time": "2026-01-10T10:00:00Z",
    "end_time": "2026-01-10T12:00:00Z",
    "duration": 60,
    "course": "IS3140"
  }
]
```

### Get Quiz Topic with Questions
Mendapatkan detail quiz topic beserta semua questions.

**Client SDK:**
```javascript
import { getQuizTopic } from './services/quizApi';

const quizTopic = await getQuizTopic(topicId, { includeQuestions: true });
```

**Response:**
```json
{
  "id": "uuid",
  "title": "Pengantar Sistem Informasi",
  "description": "...",
  "created_at": "2026-01-05T00:00:00Z",
  "quiz_questions": [
    {
      "id": "uuid",
      "topic_id": "uuid",
      "question": "Apa definisi sistem informasi?",
      "options": [
        "A. Sistem komputer",
        "B. Sistem yang mengolah data menjadi informasi",
        "C. Database",
        "D. Network"
      ],
      "correct_answer": 1,
      "created_at": "2026-01-05T00:00:00Z"
    }
  ]
}
```

### Create Quiz Topic
Membuat quiz topic baru (Assistant/Admin only).

**Client SDK:**
```javascript
import { createQuizTopic } from './services/quizApi';

const metadata = {
  start_time: '2026-01-10T10:00:00Z',
  end_time: '2026-01-10T12:00:00Z',
  duration: 60,
  course: 'IS3140'
};

const newQuiz = await createQuizTopic({
  title: 'Quiz Title',
  description: JSON.stringify(metadata)
});
```

**Note:** Quiz topic otomatis disinkronisasi ke tabel `assignments` dengan `focus: 'quiz'`.

### Update Quiz Topic
Update quiz topic.

**Client SDK:**
```javascript
import { updateQuizTopic } from './services/quizApi';

const updated = await updateQuizTopic(topicId, {
  title: 'Updated Quiz Title',
  description: JSON.stringify(updatedMetadata)
});
```

### Delete Quiz Topic
Hapus quiz topic beserta semua questions.

**Client SDK:**
```javascript
import { deleteQuizTopic } from './services/quizApi';

await deleteQuizTopic(topicId);
```

### List Quiz Questions
Mendapatkan semua questions untuk quiz topic.

**Client SDK:**
```javascript
import { listQuizQuestions } from './services/quizApi';

const questions = await listQuizQuestions(topicId);
```

### Create Quiz Question
Menambahkan question ke quiz topic (Assistant/Admin only).

**Client SDK:**
```javascript
import { createQuizQuestion } from './services/quizApi';

const newQuestion = await createQuizQuestion(topicId, {
  question: 'Apa itu ERD?',
  options: [
    'A. Entity Relationship Diagram',
    'B. Error Report Document',
    'C. Enterprise Resource Data',
    'D. External Reference Data'
  ],
  correct_answer: 0
});
```

**Payload:**
```json
{
  "question": "string",
  "options": ["string", "string", "string", "string"],
  "correct_answer": 0
}
```

**Note:** `correct_answer` adalah index dari array `options` (0-based).

### Update Quiz Question
Update question yang sudah ada.

**Client SDK:**
```javascript
import { updateQuizQuestion } from './services/quizApi';

const updated = await updateQuizQuestion(questionId, {
  question: 'Updated question text',
  options: ['A. Option 1', 'B. Option 2', 'C. Option 3', 'D. Option 4'],
  correct_answer: 2
});
```

### Delete Quiz Question
Hapus question dari quiz.

**Client SDK:**
```javascript
import { deleteQuizQuestion } from './services/quizApi';

await deleteQuizQuestion(questionId);
```

### Get Quiz Participation Stats
Mendapatkan statistik partisipasi quiz (Admin/Assistant).

**Client SDK:**
```javascript
import { getQuizParticipationStats } from './services/quizApi';

const stats = await getQuizParticipationStats(topicId);
```

**Response:**
```json
{
  "totalStudents": 45,
  "totalSubmissions": 38,
  "participationRate": 84.4,
  "averageScore": 78.5,
  "highestScore": 95,
  "lowestScore": 45
}
```

---

## Users API

### Get Current User Profile
Mendapatkan profil user yang sedang login.

**Client SDK:**
```javascript
import { supabase } from './services/supabase';

const { data: { user } } = await supabase.auth.getUser();

const { data: profile, error } = await supabase
  .from('users')
  .select('*')
  .eq('id', user.id)
  .single();
```

**Response:**
```json
{
  "id": "uuid",
  "email": "student@example.com",
  "name": "John Doe",
  "role": "student",
  "student_id": "13520001",
  "major": "Teknik Informatika",
  "photo_url": "https://storage.url/photo.jpg",
  "created_at": "2026-01-01T00:00:00Z",
  "updated_at": "2026-01-05T00:00:00Z"
}
```

### Update User Profile
Update profil user.

**Client SDK:**
```javascript
const { data, error } = await supabase
  .from('users')
  .update({
    name: 'Updated Name',
    major: 'Sistem Informasi',
    photo_url: 'https://storage.url/new-photo.jpg'
  })
  .eq('id', userId)
  .select()
  .single();
```

### List All Users
Mendapatkan semua users (Admin only).

**Client SDK:**
```javascript
const { data: users, error } = await supabase
  .from('users')
  .select('*')
  .order('created_at', { ascending: false });
```

### Filter Users by Role
Filter users berdasarkan role.

**Client SDK:**
```javascript
const { data: students, error } = await supabase
  .from('users')
  .select('*')
  .eq('role', 'student');
```

**Roles:**
- `student` - Mahasiswa
- `assistant` - Asisten Dosen
- `admin` - Administrator

### Update User Role
Update role user (Admin only).

**Client SDK:**
```javascript
const { data, error } = await supabase
  .from('users')
  .update({ role: 'assistant' })
  .eq('id', userId)
  .select()
  .single();
```

---

## File Upload API

### Upload Submission File
Upload file ke Supabase Storage.

**Client SDK:**
```javascript
import { uploadSubmissionFile, pickFile } from './services/fileUploadApi';

// 1. Pick file from device
const file = await pickFile();

if (file) {
  // 2. Upload to storage
  const uploadedFile = await uploadSubmissionFile(file);
  
  console.log(uploadedFile);
  // {
  //   url: 'https://storage.url/file.pdf',
  //   name: 'document.pdf',
  //   size: 1024000,
  //   path: 'submissions/1234567890_document.pdf',
  //   contentType: 'application/pdf'
  // }
}
```

**Implementation Details:**
```javascript
// 1. Read file as base64
const base64 = await FileSystem.readAsStringAsync(file.uri, {
  encoding: 'base64',
});

// 2. Convert to ArrayBuffer
const arrayBuffer = Uint8Array.from(decodeBase64(base64), c => c.charCodeAt(0));

// 3. Upload to storage
const { data, error } = await supabase.storage
  .from('submission-files')
  .upload(filePath, arrayBuffer, {
    contentType: file.mimeType,
    upsert: false,
  });

// 4. Get public URL
const { data: { publicUrl } } = supabase.storage
  .from('submission-files')
  .getPublicUrl(filePath);
```

### Save File Record to Database
Simpan metadata file ke database setelah upload.

**Client SDK:**
```javascript
import { saveFileRecord } from './services/fileUploadApi';

const fileRecord = await saveFileRecord(submissionId, {
  url: uploadedFile.url,
  name: uploadedFile.name,
  size: uploadedFile.size,
  path: uploadedFile.path,
  content_type: uploadedFile.contentType
});
```

**Implementation:**
```javascript
const { data, error } = await supabase
  .from('submission_files')
  .insert({
    submission_id: submissionId,
    url: fileMetadata.url,
    name: fileMetadata.name,
    size: fileMetadata.size,
    path: fileMetadata.path,
    content_type: fileMetadata.content_type
  })
  .select()
  .single();
```

### Get Submission Files
Mendapatkan semua file yang terkait dengan submission.

**Client SDK:**
```javascript
import { getSubmissionFiles } from './services/fileUploadApi';

const files = await getSubmissionFiles(submissionId);
```

**Response:**
```json
[
  {
    "id": "uuid",
    "submission_id": "uuid",
    "url": "https://storage.url/file.pdf",
    "name": "document.pdf",
    "size": 1024000,
    "content_type": "application/pdf",
    "path": "submissions/1234567890_document.pdf",
    "created_at": "2026-01-05T10:00:00Z"
  }
]
```

### Delete File
Hapus file dari storage dan database.

**Client SDK:**
```javascript
import { deleteFile } from './services/fileUploadApi';

await deleteFile(fileId, filePath);
```

**Implementation:**
```javascript
// 1. Delete from database
await supabase
  .from('submission_files')
  .delete()
  .eq('id', fileId);

// 2. Delete from storage
await supabase.storage
  .from('submission-files')
  .remove([filePath]);
```

### Supported File Types
```javascript
// Document files
.pdf, .doc, .docx, .ppt, .pptx, .xls, .xlsx

// Image files
.jpg, .jpeg, .png, .gif, .svg

// Archive files
.zip, .rar, .7z

// Code files
.js, .ts, .jsx, .tsx, .py, .java, .cpp, .c, .html, .css
```

### File Size Limits
- **Maximum file size**: 50 MB per file
- **Storage quota**: Check Supabase project limits

---

## Error Handling

### Error Response Format
Semua error dari Supabase API mengikuti format standar:

```json
{
  "message": "Error message",
  "code": "error_code",
  "details": "Additional details",
  "hint": "Suggestion to fix"
}
```

### Common Error Codes

**Authentication Errors:**
```javascript
// 401 Unauthorized
{
  "message": "Invalid JWT",
  "code": "PGRST301"
}

// 403 Forbidden
{
  "message": "Insufficient permissions",
  "code": "42501"
}
```

**Validation Errors:**
```javascript
// 400 Bad Request
{
  "message": "Validation failed",
  "code": "23514",
  "details": "Field 'email' is required"
}

// 409 Conflict
{
  "message": "Duplicate key value",
  "code": "23505",
  "details": "Key (email) already exists"
}
```

**Not Found Errors:**
```javascript
// 404 Not Found
{
  "message": "Resource not found",
  "code": "PGRST116"
}
```

### Error Handling Best Practice

```javascript
import { supabase } from './services/supabase';

try {
  const { data, error } = await supabase
    .from('announcements')
    .select('*');
  
  if (error) {
    // Handle Supabase error
    console.error('Supabase error:', error);
    
    // Check specific error codes
    if (error.code === 'PGRST301') {
      // Redirect to login
      navigation.navigate('Login');
    } else if (error.code === '42501') {
      // Show permission denied message
      Alert.alert('Permission Denied', 'You do not have access to this resource');
    } else {
      // Generic error
      Alert.alert('Error', error.message);
    }
    
    return;
  }
  
  // Success - use data
  console.log('Data:', data);
  
} catch (err) {
  // Handle unexpected errors (network, etc)
  console.error('Unexpected error:', err);
  Alert.alert('Error', 'Something went wrong. Please try again.');
}
```

---

## Rate Limits

### Supabase Free Tier Limits
- **API requests**: 500 requests per second
- **Database connections**: 60 concurrent
- **Storage**: 1 GB
- **Bandwidth**: 2 GB per month
- **Authentication**: 50,000 monthly active users

### Best Practices
1. **Implement caching** untuk mengurangi API calls
2. **Use pagination** untuk data besar
3. **Batch operations** untuk multiple inserts/updates
4. **Debounce search queries** untuk menghindari excessive calls

### Pagination Example

```javascript
// Load data in pages
const PAGE_SIZE = 20;
let page = 0;

const { data, error } = await supabase
  .from('assignments')
  .select('*')
  .order('created_at', { ascending: false })
  .range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);
```

### Caching Example

```javascript
import AsyncStorage from '@react-native-async-storage/async-storage';

// Cache announcements
const CACHE_KEY = 'announcements_cache';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

async function getCachedAnnouncements() {
  const cached = await AsyncStorage.getItem(CACHE_KEY);
  
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_DURATION) {
      return data;
    }
  }
  
  // Fetch fresh data
  const announcements = await fetchAnnouncements();
  
  // Save to cache
  await AsyncStorage.setItem(CACHE_KEY, JSON.stringify({
    data: announcements,
    timestamp: Date.now()
  }));
  
  return announcements;
}
```

---

## Database Schema Reference

### Main Tables

**users**
```sql
- id: uuid (PK)
- email: text (unique)
- name: text
- role: text (student|assistant|admin)
- student_id: text
- major: text
- photo_url: text
- created_at: timestamp
- updated_at: timestamp
```

**announcements**
```sql
- id: uuid (PK)
- title: text
- content: text
- created_by: uuid (FK -> users.id)
- views: integer
- created_at: timestamp
- updated_at: timestamp
```

**assignments**
```sql
- id: uuid (PK)
- title: text
- description: text
- focus: text (requirements|erd|interaction|architecture|quiz)
- deadline: timestamp
- max_score: integer
- created_at: timestamp
- updated_at: timestamp
```

**submissions**
```sql
- id: uuid (PK)
- assignment_id: uuid (FK -> assignments.id)
- student_id: uuid (FK -> users.id)
- content: text
- file_url: text
- grade: jsonb {score: number, feedback: text}
- submitted_at: timestamp
- graded_at: timestamp
- created_at: timestamp
- updated_at: timestamp
```

**quiz_topics**
```sql
- id: uuid (PK)
- title: text
- description: text (JSON metadata)
- created_at: timestamp
- updated_at: timestamp
```

**quiz_questions**
```sql
- id: uuid (PK)
- topic_id: uuid (FK -> quiz_topics.id)
- question: text
- options: jsonb (array of strings)
- correct_answer: integer
- created_at: timestamp
```

**submission_files**
```sql
- id: uuid (PK)
- submission_id: uuid (FK -> submissions.id)
- url: text
- name: text
- size: integer
- content_type: text
- path: text
- created_at: timestamp
```

---

## Additional Resources

### Supabase Documentation
- **Official Docs**: https://supabase.com/docs
- **JavaScript Client**: https://supabase.com/docs/reference/javascript
- **REST API**: https://supabase.com/docs/guides/api
- **Auth**: https://supabase.com/docs/guides/auth
- **Storage**: https://supabase.com/docs/guides/storage

### OpenAPI Specification
File `openapi.yaml` berisi spesifikasi API lengkap dalam format OpenAPI 3.0 yang bisa digunakan dengan tools seperti:
- **Swagger UI**: https://swagger.io/tools/swagger-ui/
- **Postman**: Import OpenAPI file untuk testing
- **Insomnia**: API client dengan OpenAPI support

### Testing API
1. **Install Postman atau Insomnia**
2. **Import `openapi.yaml`**
3. **Set environment variables**:
   - `baseUrl`: Your Supabase project URL
   - `apikey`: Your Supabase anon key
   - `accessToken`: JWT from authentication

### Support
Untuk pertanyaan atau issue terkait API, silakan hubungi tim development atau buat issue di repository project.
