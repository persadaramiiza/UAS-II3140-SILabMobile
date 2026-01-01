# TODO & Future Features

Daftar fitur dan improvement yang bisa ditambahkan ke SILab Mobile di masa depan.

## 🔥 High Priority

### 1. Push Notifications
**Status:** Not Started  
**Difficulty:** Medium  
**Impact:** High

- [ ] Setup Expo Push Notifications
- [ ] Send notification saat ada announcement baru
- [ ] Send notification saat tugas diberi nilai
- [ ] Send notification reminder deadline tugas
- [ ] Setting untuk enable/disable notifikasi per kategori

**Files to modify:**
- `src/services/notificationService.js` (new)
- `src/contexts/NotificationContext.js` (new)
- Backend: Add notification triggers

---

### 2. File Upload untuk Assignments
**Status:** Not Started  
**Difficulty:** Medium  
**Impact:** High

- [ ] Setup Supabase Storage
- [ ] Upload file assignment (PDF, ZIP)
- [ ] Preview file yang diupload
- [ ] Download file submission
- [ ] Limit file size (max 10MB)

**Files to modify:**
- `src/screens/Assignments/AssignmentDetailScreen.js`
- `src/services/storageService.js` (new)

**Tech:**
- Supabase Storage
- expo-document-picker
- expo-file-system

---

### 3. Quiz Timer
**Status:** Not Started  
**Difficulty:** Easy  
**Impact:** Medium

- [ ] Add duration field di quiz_topics
- [ ] Countdown timer di QuizRoomScreen
- [ ] Auto-submit saat waktu habis
- [ ] Warning 1 menit sebelum waktu habis

**Files to modify:**
- `src/screens/Quiz/QuizRoomScreen.js`
- Database: `ALTER TABLE quiz_topics ADD COLUMN duration INTEGER;`

---

## 🎯 Medium Priority

### 4. Profile Picture Upload
**Status:** Not Started  
**Difficulty:** Easy  
**Impact:** Medium

- [ ] Upload foto profil
- [ ] Crop & resize gambar
- [ ] Preview foto
- [ ] Default avatar generator

**Files to modify:**
- `src/screens/Main/ProfileScreen.js`
- Database: `ALTER TABLE users ADD COLUMN avatar_url TEXT;`

**Tech:**
- expo-image-picker
- expo-image-manipulator

---

### 5. Edit Profile
**Status:** Not Started  
**Difficulty:** Easy  
**Impact:** Medium

- [ ] Screen untuk edit profile
- [ ] Edit name, username, student_id, department
- [ ] Validation
- [ ] Save changes ke database

**Files to create:**
- `src/screens/Profile/EditProfileScreen.js`

**Files to modify:**
- `src/navigation/AppNavigator.js`

---

### 6. Search & Filter
**Status:** Not Started  
**Difficulty:** Medium  
**Impact:** Medium

#### Assignments
- [ ] Search by title
- [ ] Filter by focus
- [ ] Sort by date/title

#### Announcements
- [ ] Search by title/content
- [ ] Filter by date range

#### Quiz
- [ ] Search by title
- [ ] Filter by completion status

**Files to modify:**
- `src/screens/Assignments/AssignmentListScreen.js`
- `src/screens/Main/HomeScreen.js`
- `src/screens/Quiz/QuizListScreen.js`

---

### 7. Quiz History & Statistics
**Status:** Not Started  
**Difficulty:** Medium  
**Impact:** Medium

- [ ] Save quiz attempts ke database
- [ ] View quiz history
- [ ] Show statistics (avg score, attempts)
- [ ] Leaderboard per quiz topic

**Files to create:**
- `src/screens/Quiz/QuizHistoryScreen.js`
- `src/screens/Quiz/QuizStatsScreen.js`

**Database:**
- Use `quiz_attempts` table (already in schema)

---

## 💡 Nice to Have

### 8. Offline Mode
**Status:** Not Started  
**Difficulty:** Hard  
**Impact:** High

- [ ] Cache data dengan AsyncStorage
- [ ] Sync saat online kembali
- [ ] Offline indicator
- [ ] Queue actions untuk sync later

**Tech:**
- @react-native-async-storage/async-storage
- NetInfo

---

### 9. Dark/Light Theme
**Status:** Not Started  
**Difficulty:** Easy  
**Impact:** Low

- [ ] Light theme colors
- [ ] Theme switcher
- [ ] Save preference
- [ ] System theme detection

**Files to create:**
- `src/contexts/ThemeContext.js`

**Files to modify:**
- All screen styles

---

### 10. Discussion Forum
**Status:** Not Started  
**Difficulty:** Hard  
**Impact:** High

- [ ] Create thread/topic
- [ ] Reply to thread
- [ ] Like/upvote
- [ ] Search threads
- [ ] Categories

**Database:**
```sql
CREATE TABLE forum_threads (
  id UUID PRIMARY KEY,
  title TEXT,
  content TEXT,
  category TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP
);

CREATE TABLE forum_replies (
  id UUID PRIMARY KEY,
  thread_id UUID REFERENCES forum_threads(id),
  content TEXT,
  created_by UUID REFERENCES users(id),
  created_at TIMESTAMP
);
```

---

### 11. Calendar View
**Status:** Not Started  
**Difficulty:** Medium  
**Impact:** Medium

- [ ] Calendar view untuk deadlines
- [ ] Mark due dates
- [ ] Filter by month
- [ ] Reminder untuk upcoming deadlines

**Tech:**
- react-native-calendars

---

### 12. Export Grades
**Status:** Not Started  
**Difficulty:** Medium  
**Impact:** Low

- [ ] Export grades to PDF
- [ ] Export to CSV
- [ ] Email export
- [ ] Share functionality

**Tech:**
- react-native-html-to-pdf
- react-native-share

---

### 13. Real-time Updates
**Status:** Not Started  
**Difficulty:** Medium  
**Impact:** High

- [ ] Real-time announcement updates
- [ ] Real-time grade updates
- [ ] WebSocket connection

**Tech:**
- Supabase Realtime subscriptions

---

### 14. Rich Text Editor
**Status:** Not Started  
**Difficulty:** Medium  
**Impact:** Medium

- [ ] Rich text untuk announcements
- [ ] Rich text untuk assignment submission notes
- [ ] Support markdown
- [ ] Image embedding

**Tech:**
- react-native-quill
- Or markdown editor

---

### 15. Analytics Dashboard (Instructor)
**Status:** Not Started  
**Difficulty:** Hard  
**Impact:** Medium

- [ ] Student progress tracking
- [ ] Assignment submission statistics
- [ ] Quiz performance analytics
- [ ] Charts & graphs

**Tech:**
- react-native-chart-kit
- victory-native

---

## 🐛 Bug Fixes & Improvements

### 16. Error Tracking
**Status:** Not Started  
**Difficulty:** Easy  
**Impact:** High

- [ ] Setup Sentry
- [ ] Log errors
- [ ] Crash reporting

**Tech:**
- @sentry/react-native

---

### 17. Performance Optimization
**Status:** Not Started  
**Difficulty:** Medium  
**Impact:** High

- [ ] Lazy loading untuk lists
- [ ] Image optimization
- [ ] Reduce bundle size
- [ ] Code splitting

---

### 18. Accessibility
**Status:** Not Started  
**Difficulty:** Medium  
**Impact:** Medium

- [ ] Screen reader support
- [ ] Keyboard navigation
- [ ] High contrast mode
- [ ] Font size adjustment

---

### 19. Localization
**Status:** Not Started  
**Difficulty:** Medium  
**Impact:** Low

- [ ] English translation
- [ ] Multi-language support
- [ ] Language switcher

**Tech:**
- i18next
- react-i18next

---

### 20. Testing
**Status:** Not Started  
**Difficulty:** High  
**Impact:** High

- [ ] Unit tests
- [ ] Integration tests
- [ ] E2E tests
- [ ] Test coverage > 80%

**Tech:**
- Jest
- React Native Testing Library
- Detox (E2E)

---

## 📝 Documentation Improvements

- [ ] Add JSDoc comments
- [ ] API documentation auto-generation
- [ ] Video tutorials
- [ ] User manual
- [ ] Admin guide

---

## 🔒 Security Enhancements

- [ ] Two-factor authentication
- [ ] Password strength meter
- [ ] Session timeout
- [ ] Rate limiting on client
- [ ] Input sanitization
- [ ] XSS protection

---

## 🎨 UI/UX Improvements

- [ ] Onboarding screens
- [ ] Splash screen animation
- [ ] Skeleton loaders
- [ ] Better animations & transitions
- [ ] Haptic feedback
- [ ] Sound effects (optional)

---

## 📱 Platform-specific Features

### Android
- [ ] Android widgets
- [ ] Quick actions
- [ ] Share sheet

### iOS
- [ ] iOS widgets
- [ ] 3D Touch
- [ ] Siri shortcuts

---

## How to Contribute

Tertarik mengerjakan salah satu fitur di atas?

1. Pick a feature
2. Create issue di GitHub
3. Fork repository
4. Create branch: `feature/feature-name`
5. Implement feature
6. Write tests
7. Update documentation
8. Submit PR

---

## Priority Matrix

| Feature | Priority | Difficulty | Impact |
|---------|----------|------------|--------|
| Push Notifications | 🔥 High | Medium | High |
| File Upload | 🔥 High | Medium | High |
| Quiz Timer | 🔥 High | Easy | Medium |
| Profile Picture | 🎯 Medium | Easy | Medium |
| Edit Profile | 🎯 Medium | Easy | Medium |
| Search & Filter | 🎯 Medium | Medium | Medium |
| Quiz History | 🎯 Medium | Medium | Medium |
| Offline Mode | 💡 Nice | Hard | High |
| Dark Theme | 💡 Nice | Easy | Low |
| Discussion Forum | 💡 Nice | Hard | High |

---

## Estimated Timeline

### Phase 1 (1-2 weeks)
- Push Notifications
- File Upload
- Quiz Timer

### Phase 2 (2-3 weeks)
- Profile Picture
- Edit Profile
- Search & Filter

### Phase 3 (3-4 weeks)
- Quiz History
- Offline Mode
- Dark Theme

### Phase 4 (4+ weeks)
- Discussion Forum
- Calendar View
- Analytics Dashboard

---

## Notes

- Prioritas bisa berubah berdasarkan feedback user
- Estimasi waktu untuk 1 developer full-time
- Test setiap fitur sebelum merge ke main
- Update dokumentasi setelah fitur selesai

---

Last updated: January 1, 2026
