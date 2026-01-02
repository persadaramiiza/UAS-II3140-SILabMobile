# Quick Start - SILab Suite Frontend

Panduan cepat untuk menjalankan aplikasi dalam 5 menit! ⚡

## TL;DR

```bash
# 1. Install dependencies
cd frontend
npm install

# 2. Setup environment
cp .env.example .env
# Edit .env dengan Supabase credentials Anda

# 3. Run
npm run dev
```

Buka `http://localhost:5173` 🎉

## First Time Setup

### 1. Supabase Setup (One-time, ~5 menit)

1. Login ke [supabase.com](https://supabase.com) → New Project
2. Copy **Project URL** dan **anon key** dari Settings > API
3. Paste ke `.env`:
   ```env
   VITE_SUPABASE_URL=https://xxxxx.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1...
   ```
4. SQL Editor → New query → Paste SQL dari `../DATABASE_SCHEMA.md` → Run

### 2. Create First User

**Option A - Via Register:**
- Navigate ke `/register`
- Fill form → Register
- Login dengan credentials yang dibuat

**Option B - Manual di Supabase:**
```sql
-- Di Supabase SQL Editor
-- 1. Create auth user (di Authentication > Users > Add user)
-- 2. Then insert to users table:
INSERT INTO users (id, email, full_name, role)
VALUES (
  'user-id-from-auth', 
  'admin@example.com', 
  'Admin User', 
  'admin'
);
```

## Common Commands

```bash
# Development
npm run dev          # Start dev server (port 5173)

# Build
npm run build        # Production build → dist/
npm run preview      # Preview production build

# Maintenance
npm install          # Install dependencies
npm update           # Update packages
npm audit fix        # Fix security issues
```

## Project Structure

```
frontend/src/
├── components/      # UI components (Login, Dashboard, dll)
├── contexts/        # AuthContext
├── hooks/           # Custom hooks (useAssignments, useQuizzes)
├── lib/            # Utils, constants, supabase client
└── App.tsx         # Routes & layout
```

## Key Files

| File | Purpose |
|------|---------|
| `.env` | Environment variables (Supabase URL & key) |
| `src/App.tsx` | Main app, routing setup |
| `src/lib/supabase.ts` | Supabase client config |
| `src/contexts/AuthContext.tsx` | Authentication logic |

## Default Routes

| Route | Role | Description |
|-------|------|-------------|
| `/splash` | Public | Splash screen (9.5s auto-redirect) |
| `/login` | Public | Login page |
| `/register` | Public | Registration |
| `/home` | Student | Student dashboard |
| `/assistant` | Assistant | Assistant dashboard |
| `/admin` | Admin | Admin dashboard |
| `/tasks` | All | Task list |
| `/quiz-list` | All | Available quizzes |
| `/profile` | All | User profile |

## Authentication

```typescript
// Login
const { user } = useAuth();
await signIn(email, password);

// Logout
await signOut();

// Get current user
console.log(user.role); // 'student' | 'assistant' | 'admin'
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Port 5173 already in use | Kill process: `npx kill-port 5173` |
| "Missing env variables" | Check `.env` file exists and has correct values |
| Login fails | Check Supabase project is active, user exists in both `auth.users` and `public.users` |
| Blank page | Check browser console (F12), likely missing env vars |
| Build fails | Clear cache: `rm -rf node_modules .vite && npm install` |

## Quick Tips

- **Hot reload**: Save file → auto refresh
- **TypeScript**: VS Code will show errors in real-time
- **Tailwind**: Use IntelliSense for class autocomplete
- **Icons**: Import from `lucide-react`
- **UI Components**: Check `src/components/ui/` for pre-built components

## Environment Variables

```env
# Required
VITE_SUPABASE_URL=       # From Supabase > Settings > API
VITE_SUPABASE_ANON_KEY=  # From Supabase > Settings > API

# Optional (jika ada)
VITE_APP_ENV=development # development | staging | production
```

## Database Tables

- `users` - User profiles & roles
- `assignments` - Tugas
- `announcements` - Pengumuman
- `quizzes` - Quiz data
- `quiz_questions` - Soal quiz
- `quiz_submissions` - Jawaban quiz
- `assignment_submissions` - Submission tugas

## Useful Links

- **Docs**: `README.md`, `SETUP_GUIDE.md`
- **Deployment**: `DEPLOYMENT_GUIDE.md`
- **Supabase**: [app.supabase.com](https://app.supabase.com)
- **shadcn/ui**: [ui.shadcn.com](https://ui.shadcn.com)
- **Tailwind**: [tailwindcss.com/docs](https://tailwindcss.com/docs)

## Development Workflow

```bash
# 1. Pull latest changes
git pull

# 2. Install any new dependencies
npm install

# 3. Start dev server
npm run dev

# 4. Make changes
# ... code code code ...

# 5. Test
# Check browser, no console errors

# 6. Commit
git add .
git commit -m "Add feature X"
git push
```

## Need More Help?

- 📖 Full guide: `SETUP_GUIDE.md`
- 🚀 Deploy: `DEPLOYMENT_GUIDE.md`
- 🐛 Issues: Check troubleshooting section
- 💬 Questions: Open GitHub issue

---

**Happy coding!** 🚀
