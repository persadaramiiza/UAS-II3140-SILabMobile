# 🚀 Quick Deployment Guide

## Cara Cepat Deploy APK Android

### Step 1: Install EAS CLI
```bash
npm install -g eas-cli
```

### Step 2: Login ke Expo
```bash
eas login
```
- Buat akun di https://expo.dev jika belum punya
- Login dengan email dan password Anda

### Step 3: Build APK (pilih salah satu)

#### A. Build Preview APK (Recommended untuk testing)
```bash
npm run build:preview
```
✅ Cepat dan mudah
✅ Bisa langsung di-install di Android
✅ Gratis di Expo

#### B. Build Production APK
```bash
npm run build:production
```
✅ Untuk distribusi final
✅ Optimized dan production-ready

### Step 4: Download APK
1. Tunggu build selesai (5-15 menit)
2. Expo akan memberikan link download
3. Download APK dari link tersebut
4. Share APK ke user atau install langsung

## Alternative: Build di Komputer Sendiri

Jika ingin build tanpa Expo cloud:

```bash
# Install Android Studio terlebih dahulu
# Lalu jalankan:
npm run build:local
```

APK akan ada di: `android/app/build/outputs/apk/release/`

## 📱 Install APK ke Device

1. Transfer file APK ke Android device
2. Buka file APK
3. Allow "Install from Unknown Sources" jika diminta
4. Install aplikasi

## 🔄 Update Aplikasi (OTA)

Untuk push update tanpa rebuild APK:
```bash
npm run update
```

## ❓ Troubleshooting

### "Command not found: eas"
```bash
npm install -g eas-cli
```

### "Not logged in"
```bash
eas login
```

### "Build failed"
- Check internet connection
- Pastikan app.json valid
- Lihat error logs di Expo dashboard

## 📦 File yang Dihasilkan

- **Preview APK**: ~50-80 MB
- **Production APK**: ~50-80 MB (optimized)

## 🎯 Next Steps

1. Test APK di beberapa device Android
2. Jika OK, distribute ke users
3. (Optional) Submit ke Google Play Store

## 🔗 Useful Links

- Expo Dashboard: https://expo.dev
- EAS Build Docs: https://docs.expo.dev/build/introduction/
- Submit to Play Store: https://docs.expo.dev/submit/android/
