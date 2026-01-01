# API Documentation - SILab Mobile

Dokumentasi lengkap untuk semua API services yang digunakan di SILab Mobile.

## Table of Contents

1. [Supabase Setup](#supabase-setup)
2. [Authentication API](#authentication-api)
3. [Users API](#users-api)
4. [Announcements API](#announcements-api)
5. [Assignments API](#assignments-api)
6. [Quiz API](#quiz-api)
7. [Error Handling](#error-handling)

---

## Supabase Setup

File: `src/services/supabase.js`

```javascript
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
```

---

## Authentication API

Menggunakan Supabase Auth built-in.

### Sign Up

```javascript
const { data, error } = await supabase.auth.signUp({
  email: 'user@example.com',
  password: 'password123',
  options: {
    data: {
      full_name: 'John Doe',
    },
  },
});
```

**Trigger**: Otomatis membuat entry di tabel `users` via database trigger.

### Sign In

```javascript
const { data, error } = await supabase.auth.signInWithPassword({
  email: 'user@example.com',
  password: 'password123',
});
```

**Returns**:
```javascript
{
  session: {
    access_token: "...",
    refresh_token: "...",
    user: { ... }
  }
}
```

### Sign Out

```javascript
const { error } = await supabase.auth.signOut();
```

### Get Current Session

```javascript
const { data: { session } } = await supabase.auth.getSession();
```

### Auth State Change Listener

```javascript
const { data: authListener } = supabase.auth.onAuthStateChange(
  (event, session) => {
    console.log(event, session);
  }
);

// Cleanup
authListener.subscription.unsubscribe();
```

---

## Users API

File: `src/contexts/AuthContext.js`

### Fetch User Profile

```javascript
const fetchUserProfile = async (userId) => {
  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single();
  
  if (error) throw error;
  return data;
};
```

**Returns**:
```javascript
{
  id: "uuid",
  name: "John Doe",
  username: "johndoe",
  email: "john@example.com",
  student_id: "12345",
  department: "Computer Science",
  role: "student",
  created_at: "2024-01-01T00:00:00Z",
  updated_at: "2024-01-01T00:00:00Z"
}
```

### Update User Profile

```javascript
const { data, error } = await supabase
  .from('users')
  .update({ 
    name: 'New Name',
    department: 'New Department'
  })
  .eq('id', userId);
```

---

## Announcements API

File: `src/services/announcementsApi.js`

### Fetch All Announcements

```javascript
export async function fetchAnnouncements() {
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

  if (error) throw error;
  
  return data.map(announcement => ({
    ...announcement,
    createdByName: announcement.users?.name || 'Unknown'
  }));
}
```

**Returns**:
```javascript
[
  {
    id: "uuid",
    title: "Welcome to SILab",
    content: "Full content here...",
    created_by: "user-uuid",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
    createdByName: "John Doe"
  },
  // ...
]
```

### Create Announcement

```javascript
export async function createAnnouncement(payload) {
  const { data, error } = await supabase
    .from('announcements')
    .insert(payload)
    .select()
    .single();

  if (error) throw error;
  return data;
}
```

**Payload**:
```javascript
{
  title: "New Announcement",
  content: "Announcement content...",
  created_by: "user-uuid"
}
```

**RLS**: Only instructors/admins can create.

---

## Assignments API

File: `src/services/assignmentsApi.js`

### Fetch Assignments

```javascript
export async function fetchAssignments(filters = {}) {
  let query = supabase.from('assignments').select('*');

  if (filters.focus) {
    query = query.eq('focus', filters.focus);
  }

  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) throw error;
  return data;
}
```

**Filters**:
```javascript
{
  focus: 'Requirements' // Optional
}
```

**Returns**:
```javascript
[
  {
    id: "uuid",
    title: "Assignment 1",
    description: "Description...",
    focus: "Requirements",
    created_by: "user-uuid",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-01T00:00:00Z",
    due_date: "2024-01-15T23:59:59Z"
  },
  // ...
]
```

### Get Assignment Detail

```javascript
export async function getAssignment(assignmentId) {
  const { data, error } = await supabase
    .from('assignments')
    .select('*')
    .eq('id', assignmentId)
    .single();

  if (error) throw error;
  return data;
}
```

### Get Submissions

```javascript
export async function getSubmissions(assignmentId, userId) {
  const { data, error } = await supabase
    .from('submissions')
    .select(`
      *,
      grades (
        id,
        score,
        feedback,
        created_at
      )
    `)
    .eq('assignment_id', assignmentId)
    .eq('user_id', userId);

  if (error) throw error;
  
  return data.map(submission => ({
    ...submission,
    grade: submission.grades?.[0] || null
  }));
}
```

**Returns**:
```javascript
[
  {
    id: "uuid",
    assignment_id: "assignment-uuid",
    user_id: "user-uuid",
    link: "https://drive.google.com/...",
    notes: "My notes...",
    created_at: "2024-01-01T00:00:00Z",
    updated_at: "2024-01-02T00:00:00Z",
    grade: {
      id: "grade-uuid",
      score: 85,
      feedback: "Great work!",
      created_at: "2024-01-03T00:00:00Z"
    }
  }
]
```

### Create/Update Submission

```javascript
export async function createOrUpdateSubmission(assignmentId, userId, submissionData) {
  const { data, error } = await supabase
    .from('submissions')
    .upsert({
      assignment_id: assignmentId,
      user_id: userId,
      ...submissionData
    }, { onConflict: ['assignment_id', 'user_id'] });

  if (error) throw error;
  return data;
}
```

**Payload**:
```javascript
{
  link: "https://...",
  notes: "Optional notes"
}
```

---

## Quiz API

File: `src/services/quizApi.js`

### List Quiz Topics

```javascript
export async function listQuizTopics({ includeQuestions = false } = {}) {
  let query = supabase
    .from('quiz_topics')
    .select(includeQuestions ? '*,quiz_questions(*)' : '*');
  
  const { data, error } = await query.order('created_at', { ascending: false });

  if (error) throw error;
  
  // Get question count for each topic
  const topicsWithCount = await Promise.all(
    data.map(async (topic) => {
      const { count } = await supabase
        .from('quiz_questions')
        .select('*', { count: 'exact', head: true })
        .eq('topic_id', topic.id);
      
      return {
        ...topic,
        questionCount: count || 0
      };
    })
  );
  
  return topicsWithCount;
}
```

**Returns**:
```javascript
[
  {
    id: "uuid",
    title: "Quiz Requirements",
    description: "Quiz about...",
    created_by: "user-uuid",
    created_at: "2024-01-01T00:00:00Z",
    questionCount: 10
  },
  // ...
]
```

### Get Quiz Topic with Questions

```javascript
export async function getQuizTopic(topicId, { includeQuestions = true } = {}) {
  let query = supabase
    .from('quiz_topics')
    .select(includeQuestions ? '*,quiz_questions(*)' : '*')
    .eq('id', topicId)
    .single();
    
  const { data, error } = await query;
  
  if (error) throw error;
  return data;
}
```

### List Quiz Questions

```javascript
export async function listQuizQuestions(topicId) {
  const { data, error } = await supabase
    .from('quiz_questions')
    .select('*')
    .eq('topic_id', topicId);
    
  if (error) throw error;
  return data;
}
```

**Returns**:
```javascript
[
  {
    id: "uuid",
    topic_id: "topic-uuid",
    question: "What is SDLC?",
    options: ["Software Development Life Cycle", "..."],
    correct: 0,
    created_at: "2024-01-01T00:00:00Z"
  },
  // ...
]
```

### Create Quiz Question

```javascript
export async function createQuizQuestion(topicId, payload) {
  const { data, error } = await supabase
    .from('quiz_questions')
    .insert({ ...payload, topic_id: topicId })
    .select()
    .single();
    
  if (error) throw error;
  return data;
}
```

**Payload**:
```javascript
{
  question: "What is...?",
  options: ["Option A", "Option B", "Option C", "Option D"],
  correct: 0 // Index of correct answer (0-based)
}
```

---

## Error Handling

### Standard Error Format

All API functions throw errors with consistent format:

```javascript
{
  message: "Error message",
  code: "ERROR_CODE",
  details: { ... }
}
```

### Error Handling Pattern

```javascript
try {
  const data = await fetchAnnouncements();
  // Handle success
} catch (error) {
  console.error('Error:', error.message);
  // Handle error
  // Show user-friendly message
}
```

### Common Errors

| Code | Message | Solution |
|------|---------|----------|
| `PGRST116` | No rows found | Check if resource exists |
| `23505` | Unique constraint violation | Check for duplicates |
| `42501` | Insufficient privileges | Check RLS policies |
| `PGRST301` | Invalid authentication | Re-authenticate user |

### Error Handling in Components

```javascript
const [error, setError] = useState(null);
const [loading, setLoading] = useState(true);

const loadData = async () => {
  try {
    setLoading(true);
    setError(null);
    const data = await fetchData();
    setData(data);
  } catch (err) {
    console.error(err);
    setError(err.message || 'An error occurred');
  } finally {
    setLoading(false);
  }
};
```

---

## Best Practices

1. **Always handle errors** - Never assume API calls will succeed
2. **Use loading states** - Show feedback to users during async operations
3. **Implement retries** - For network errors, allow users to retry
4. **Cache data** - When appropriate, cache to reduce API calls
5. **Validate input** - Client-side validation before API calls
6. **Use TypeScript** - (Optional) For better type safety
7. **Log errors** - Use proper error logging for debugging

---

## Testing API Calls

### Using Postman/Insomnia

1. Get access token from Supabase
2. Add header: `Authorization: Bearer <token>`
3. Use Supabase REST API endpoints

### Example cURL

```bash
curl -X GET 'https://your-project.supabase.co/rest/v1/announcements' \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## Rate Limiting

Supabase has default rate limits:
- 100 requests per 10 seconds per IP
- Upgrade plan for higher limits

Handle rate limit errors:
```javascript
if (error.code === '429') {
  // Rate limited
  // Implement backoff strategy
}
```

---

## Resources

- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Supabase Database](https://supabase.com/docs/guides/database)
- [PostgREST API](https://postgrest.org/en/stable/api.html)
