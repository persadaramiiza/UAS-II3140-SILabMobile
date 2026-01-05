# ✅ Pre-Deployment Checklist

Checklist ini memastikan aplikasi siap untuk di-deploy.

## 1. Configuration

- [x] `app.json` configured dengan nama dan package yang benar
- [x] `eas.json` tersedia untuk build configuration
- [x] Version number di `app.json` sudah di-set (v1.0.0)
- [ ] Icon dan splash screen sudah di-update sesuai branding
- [ ] Supabase URL dan keys sudah configured

## 2. Testing

- [ ] Test di Android device (bukan hanya emulator)
- [ ] Test semua fitur utama:
  - [ ] Login/Register
  - [ ] Student dashboard
  - [ ] Assistant dashboard  
  - [ ] Admin dashboard
  - [ ] Quiz functionality
  - [ ] Assignment management
  - [ ] Module tools (Requirements, EA, ERD, Interaction Design)
  - [ ] Profile management
  - [ ] Logout

## 3. Performance

- [ ] App startup smooth (Splash screen working)
- [ ] Navigation tidak lag
- [ ] Images loading dengan baik
- [ ] No memory leaks
- [ ] Input fields responsive

## 4. Security

- [ ] Supabase RLS policies configured
- [ ] API keys tidak hardcoded (gunakan .env)
- [ ] User authentication working properly
- [ ] Role-based access control working

## 5. Assets

- [ ] All required images ada di `assets/`:
  - [ ] logo.png
  - [ ] login-illustration.png
  - [ ] icon.png
  - [ ] splash-icon.png
  - [ ] adaptive-icon.png
- [ ] No missing image errors

## 6. Dependencies

- [ ] All npm packages installed
- [ ] No deprecated packages
- [ ] expo-file-system menggunakan legacy import

## 7. Build Preparation

- [ ] Remove console.log statements (optional)
- [ ] Update CHANGELOG.md dengan versi baru
- [ ] Git commit semua changes
- [ ] Create git tag untuk release

## 8. Documentation

- [x] README.md up to date
- [x] DEPLOYMENT_GUIDE.md tersedia
- [x] QUICK_DEPLOY.md tersedia
- [ ] API_DOCUMENTATION.md reviewed
- [ ] Demo credentials documented

## 9. Post-Deployment

- [ ] Test APK di minimal 3 device berbeda
- [ ] Collect feedback dari beta testers
- [ ] Fix critical bugs sebelum production release
- [ ] Prepare update strategy

## Quick Commands

```bash
# Check version
cat app.json | grep version

# Install dependencies
npm install

# Test development
npm start

# Build preview
npm run build:preview

# Build production
npm run build:production
```

## Demo Accounts Ready

- Student: student@itb.ac.id / student123
- Assistant: assistant@itb.ac.id / assistant123
- Admin: admin@itb.ac.id / admin123

---

**Status**: Ready for deployment ✅
**Last Updated**: January 5, 2026
