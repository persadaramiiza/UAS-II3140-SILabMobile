# SILab Suite - Frontend Web Application

Aplikasi web untuk Sistem Informasi Laboratorium (SILab) yang dibangun menggunakan React, TypeScript, dan Tailwind CSS. Design ini dibuat melalui Figma dan dikonversi menjadi kode React.

## 🎨 Tech Stack

- **React 18** - UI Library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Re-usable UI components
- **Radix UI** - Accessible component primitives
- **React Router** - Client-side routing
- **Supabase** - Backend as a Service (Auth & Database)
- **Lucide React** - Icon library

## 📋 Fitur

### Untuk Mahasiswa (Student)
- 📚 Dashboard dengan overview tugas dan quiz
- 📝 Lihat dan kumpulkan tugas
- 🎯 Mengerjakan quiz interaktif
- 📢 Melihat pengumuman
- 🛠️ Akses tools: Requirements Viewer, Diagram Viewer, ERD Viewer, Enterprise Architecture
- 👤 Manajemen profil

### Untuk Asisten (Assistant)
- 📊 Dashboard asisten
- ✍️ Buat dan kelola tugas
- 🎓 Buat dan kelola quiz
- 📣 Buat dan kelola pengumuman
- 📈 Monitor quiz aktif
- 📊 Lihat laporan hasil quiz
- ✅ Nilai submission tugas

### Untuk Admin
- 👥 Manajemen user
- ⚙️ System settings
- 📋 Activity logs
- Semua fitur assistant

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm atau yarn
- Akun Supabase

### Installation

1. **Clone repository**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Setup environment variables**
   
   Buat file `.env` di folder `frontend/`:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

4. **Setup database**
   
   Jalankan SQL schema di Supabase SQL Editor (lihat `DATABASE_SCHEMA.md` di root project)

5. **Run development server**
   ```bash
   npm run dev
   ```

   Aplikasi akan berjalan di `http://localhost:5173`

6. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Struktur Project

```
frontend/
├── src/
│   ├── components/          # React components
│   │   ├── ui/             # shadcn/ui components
│   │   ├── figma/          # Figma-generated components
│   │   ├── LoginScreen.tsx
│   │   ├── StudentHomeDashboard.tsx
│   │   ├── AssistantHome.tsx
│   │   ├── AdminHome.tsx
│   │   └── ...
│   ├── contexts/           # React contexts
│   │   └── AuthContext.tsx
│   ├── lib/               # Utilities & configs
│   │   └── supabase.ts    # Supabase client
│   ├── imports/           # Figma imports
│   ├── styles/            # Global styles
│   ├── App.tsx            # Main app with routing
│   └── main.tsx           # Entry point
├── .env                   # Environment variables (create this)
├── .env.example           # Example env file
├── package.json
├── vite.config.ts
├── tailwind.config.js
└── tsconfig.json
```

## 🔐 Authentication Flow

1. User membuka aplikasi → Redirect ke Splash Screen
2. Setelah 9.5 detik → Auto redirect ke Login Screen
3. Login dengan email & password
4. Setelah login berhasil → Redirect ke dashboard sesuai role:
   - Student → `/home` (StudentHomeDashboard)
   - Assistant → `/assistant` (AssistantHome)  
   - Admin → `/admin` (AdminHome)

## 🛣️ Routing Structure

```
Public Routes:
  /splash             - Splash screen
  /login              - Login page
  /register           - Registration page

Protected Routes (All authenticated users):
  /home               - Student dashboard
  /tasks              - Task list
  /tasks/:taskId      - Task detail
  /quiz-list          - Available quizzes
  /quiz-taking/:id    - Take quiz
  /quiz-result/:id    - Quiz result
  /tools              - Tools home
  /profile            - User profile
  /edit-profile       - Edit profile

Assistant Routes:
  /assistant          - Assistant dashboard
  /assignments        - Assignment management
  /assignments/create - Create assignment
  /announcements      - Announcement management
  /quizzes            - Quiz management
  /quizzes/create     - Create quiz

Admin Routes:
  /admin              - Admin dashboard
  /users              - User management
  /settings           - System settings
  /activity-logs      - Activity logs
```

## 🎨 Design System

- **Colors**: Blue theme (primary: #3B82F6)
- **Typography**: System fonts dengan fallback
- **Spacing**: Tailwind default spacing scale
- **Components**: shadcn/ui components dengan customization
- **Max Width**: 402px (mobile-first, iPhone 16 Pro optimized)

## 📱 Responsive Design

Aplikasi dioptimalkan untuk:
- Mobile devices (360px - 428px)
- Primary target: iPhone 16 Pro (402px)
- Bisa diakses di desktop dengan max-width constraint

## 🔧 Development

### Available Scripts

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Code Style

- TypeScript strict mode enabled
- ESLint untuk code quality
- Prettier untuk code formatting
- Functional components dengan hooks
- Named exports untuk components

## 🚢 Deployment

### Vercel (Recommended)

1. Push ke GitHub
2. Import project di Vercel
3. Set environment variables
4. Deploy!

### Netlify

1. Push ke GitHub
2. Import project di Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`
5. Set environment variables

### Manual Build

```bash
npm run build
# Upload folder 'dist' ke hosting static pilihan Anda
```

## 📚 Database Schema

Lihat file `DATABASE_SCHEMA.md` di root project untuk:
- Table structure
- Relationships
- Row Level Security policies
- Sample data

## 🤝 Contributing

Lihat `CONTRIBUTING.md` untuk guidelines.

## 📄 License

MIT License - lihat file LICENSE untuk detail.

## 🙏 Credits

- Design: Figma
- UI Components: shadcn/ui
- Icons: Lucide React
- Backend: Supabase
- Framework: React + Vite

## 📞 Support

Jika ada pertanyaan atau masalah, silakan buka issue di GitHub repository.

---

**Dibuat dengan ❤️ untuk UAS II3140 - SILab Mobile**
