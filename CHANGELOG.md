# Changelog

All notable changes to SILab Mobile will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2026-01-01

### Added
- Initial release of SILab Mobile
- User authentication (Login & Register) with Supabase
- User profile management
- View announcements
- Create announcements (Instructor/Admin only)
- View course modules
- Browse module content
- View assignments list
- Submit assignments with link and notes
- View assignment grades and feedback
- Browse quiz topics
- Take interactive quizzes
- Quiz scoring system
- Bottom tab navigation
- Pull-to-refresh functionality
- Error handling and loading states
- Empty state components
- Database schema documentation
- Setup and deployment guides
- Contributing guidelines

### Features by Role

#### Student
- View all announcements
- Access all course modules
- View and submit assignments
- Take quizzes and view scores
- View personal profile
- Update profile information

#### Instructor/Admin
- All student features
- Create new announcements
- View all student submissions
- Grade assignments (via database)
- Create quiz topics and questions (via database)

### Technical Stack
- React Native with Expo
- Supabase for backend (Auth + Database)
- React Navigation for routing
- AsyncStorage for local data
- Expo Vector Icons

### Database Schema
- users - User profiles and roles
- announcements - Course announcements
- assignments - Assignment information
- submissions - Student assignment submissions
- grades - Assignment grading
- quiz_topics - Quiz categories
- quiz_questions - Quiz questions with multiple choice
- quiz_attempts - Quiz attempt history

### Documentation
- README.md - Project overview and features
- SETUP_GUIDE.md - Complete setup instructions
- DEPLOYMENT_GUIDE.md - Deployment to app stores
- DATABASE_SCHEMA.md - Database structure and SQL
- CONTRIBUTING.md - Contribution guidelines
- .env.example - Environment variables template

## [Unreleased]

### Planned Features
- Push notifications for new announcements
- File upload for assignments
- Quiz timer functionality
- Leaderboard for quiz scores
- Chat/Discussion forum
- Calendar view for deadlines
- Dark/Light theme toggle
- Profile picture upload
- Assignment due date reminders
- Offline mode support
- Search functionality
- Filter and sort options
- Export grades to PDF
- Analytics dashboard for instructors

### Known Issues
- None reported

---

## Version History

### How to Read This Changelog

- **Added**: New features
- **Changed**: Changes to existing functionality
- **Deprecated**: Soon-to-be removed features
- **Removed**: Removed features
- **Fixed**: Bug fixes
- **Security**: Security fixes

### Versioning Scheme

- Major version (x.0.0): Breaking changes
- Minor version (0.x.0): New features, backwards compatible
- Patch version (0.0.x): Bug fixes, backwards compatible
