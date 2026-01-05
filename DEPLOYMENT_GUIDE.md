# Deployment Guide - SILab Suite Mobile

## Prerequisites
1. Install EAS CLI globally:
```bash
npm install -g eas-cli
```

2. Login to Expo account:
```bash
eas login
```

## Build APK untuk Android

### 1. Build Preview APK (untuk testing)
```bash
eas build --platform android --profile preview
```
- APK akan di-build di cloud Expo
- Setelah selesai, download APK dari link yang diberikan
- Install APK di device Android untuk testing

### 2. Build Production APK
```bash
eas build --platform android --profile production
```
- Untuk distribusi final
- APK siap untuk di-share atau upload ke Play Store

### 3. Build lokal (tanpa Expo cloud)
```bash
npx expo run:android --variant release
```
- Build di komputer Anda
- APK ada di: `android/app/build/outputs/apk/release/`

## Build untuk iOS (memerlukan Mac)
```bash
eas build --platform ios --profile production
```

## Publish Update (OTA - Over The Air)
Untuk update aplikasi tanpa rebuild:
```bash
eas update --branch production --message "Update deskripsi"
```

## Environment Variables
Jika ada variabel environment (seperti Supabase keys), buat file `.env`:
```
EXPO_PUBLIC_SUPABASE_URL=your_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_key
```

Kemudian di eas.json tambahkan:
```json
"build": {
  "production": {
    "env": {
      "EXPO_PUBLIC_SUPABASE_URL": "$SUPABASE_URL",
      "EXPO_PUBLIC_SUPABASE_ANON_KEY": "$SUPABASE_ANON_KEY"
    }
  }
}
```

## Distribusi APK
1. **Direct Install**: Share file APK langsung ke users
2. **Google Drive/Dropbox**: Upload APK dan share link
3. **Firebase App Distribution**: Untuk beta testing
4. **Google Play Store**: Untuk distribusi publik

## Troubleshooting

### Build gagal?
1. Pastikan semua dependencies terinstall
2. Check app.json configuration
3. Lihat build logs di Expo dashboard

### APK terlalu besar?
1. Enable Hermes (sudah aktif di config)
2. Gunakan ProGuard untuk minify
3. Remove unused dependencies

## Tips
- Test APK di device fisik sebelum distribusi
- Increment version di app.json setiap build
- Simpan signing keys dengan aman
- Gunakan preview build untuk testing internal
- Production build untuk release resmi
