# Google Authentication Setup Guide

## Prerequisites

Aplikasi sudah memiliki dependency yang diperlukan:
- `@react-native-google-signin/google-signin` v16.1.1 ✅

## Setup Steps

### 1. Google Cloud Console Setup

#### A. Buat Project di Google Cloud Console
1. Buka https://console.cloud.google.com/
2. Klik "Select a project" → "New Project"
3. Nama project: `SILab Suite Mobile`
4. Klik "Create"

#### B. Enable Google Sign-In API
1. Di sidebar, pilih "APIs & Services" → "Library"
2. Cari "Google Sign-In API"
3. Klik dan pilih "Enable"

#### C. Configure OAuth Consent Screen
1. Pilih "APIs & Services" → "OAuth consent screen"
2. User Type: **External** → "Create"
3. Isi informasi:
   - App name: `SILab Suite`
   - User support email: (email Anda)
   - Developer contact: (email Anda)
4. Klik "Save and Continue"
5. Scopes: Skip (klik "Save and Continue")
6. Test users: Tambahkan email test users
7. Klik "Back to Dashboard"

#### D. Create OAuth 2.0 Client IDs

**Untuk Android:**
1. Pilih "APIs & Services" → "Credentials"
2. Klik "+ CREATE CREDENTIALS" → "OAuth client ID"
3. Application type: **Android**
4. Name: `SILab Suite Android`
5. Package name: `com.silabsuite.mobile` (dari app.json)
6. SHA-1 certificate fingerprint:
   ```bash
   # Development (Debug) SHA-1
   # Windows (PowerShell):
   cd $env:USERPROFILE\.android
   keytool -list -v -keystore debug.keystore -alias androiddebugkey -storepass android -keypass android
   
   # Your SHA-1 fingerprint:
   # 15:D7:C4:08:C5:E4:E2:B2:85:18:CE:37:F8:B4:4B:32:14:DA:3C:BA
   ```
7. Klik "Create"
8. **SAVE Android Client ID** (akan digunakan di kode)

**Untuk Web (Expo):**
1. Klik "+ CREATE CREDENTIALS" → "OAuth client ID" lagi
2. Application type: **Web application**
3. Name: `SILab Suite Web Client`
4. Authorized redirect URIs:
   - `https://wbxoaekkxofsdzzliqgs.supabase.co/auth/v1/callback`
   - `https://auth.expo.io/@your-expo-username/UAS-II3140-SILabMobile`
5. Klik "Create"
6. **SAVE Web Client ID** (akan digunakan di Supabase)

### 2. Supabase Configuration

1. Buka Supabase Dashboard: https://app.supabase.com/
2. Pilih project Anda
3. Sidebar: "Authentication" → "Providers"
4. Scroll ke **Google**
5. Toggle "Enable Sign in with Google"
6. Isi:
   - **Client ID (for OAuth)**: Web Client ID dari step 1D
   - **Client Secret**: Web Client Secret dari Google Console
7. Klik "Save"

### 3. Update Environment Variables

Tambahkan ke file `.env`:

```dotenv
# Existing
NEXT_PUBLIC_SUPABASE_URL=https://wbxoaekkxofsdzzliqgs.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Google Sign In (tambahkan ini)
GOOGLE_WEB_CLIENT_ID=your-web-client-id.apps.googleusercontent.com
GOOGLE_ANDROID_CLIENT_ID=your-android-client-id.apps.googleusercontent.com
```

### 4. Update app.json

Konfigurasi sudah ditambahkan otomatis (lihat file app.json).

### 5. Rebuild Aplikasi

Setelah konfigurasi selesai:

```bash
# Clear cache
npx expo start --clear

# Atau untuk build baru
eas build --platform android --profile preview
```

## Testing Google Sign In

### Development Mode (Expo Go)
1. Jalankan `npx expo start`
2. Scan QR code di Expo Go
3. Klik "Sign in with Google"
4. Pilih akun Google
5. Otomatis redirect ke aplikasi setelah sukses

### Production Build (APK)
1. Build APK: `npm run build:preview`
2. Install APK di device
3. Test Google Sign In
4. Pastikan SHA-1 certificate sudah benar

## Troubleshooting

### Error: "Developer Error" saat Google Sign In
**Solusi:**
- Pastikan SHA-1 fingerprint benar
- Untuk debug build, gunakan debug keystore SHA-1
- Untuk release build, buat release keystore baru:
  ```bash
  keytool -genkey -v -keystore release.keystore -alias release -keyalg RSA -keysize 2048 -validity 10000
  keytool -list -v -keystore release.keystore -alias release
  ```
- Tambahkan SHA-1 release ke Google Console

### Error: "Sign in failed"
**Solusi:**
- Check apakah Google Sign-In API sudah enabled
- Pastikan Web Client ID di Supabase benar
- Check Console Logs untuk error detail

### Error: "DEVELOPER_ERROR" di Android
**Solusi:**
- Package name di Google Console harus match dengan app.json: `com.silabsuite.mobile`
- SHA-1 fingerprint harus dari keystore yang digunakan untuk sign APK

### Google Sign In tidak muncul
**Solusi:**
- Pastikan GoogleSignin.configure() dipanggil sebelum render
- Check apakah GOOGLE_WEB_CLIENT_ID di .env sudah benar
- Restart Metro bundler: `npx expo start --clear`

## How It Works

1. **User clicks "Sign in with Google"**
2. **GoogleSignin.signIn()** membuka Google account picker
3. **User memilih akun** dan authorize
4. **Google returns idToken**
5. **supabase.auth.signInWithIdToken()** authenticate dengan Supabase
6. **Supabase creates/updates user** di auth.users table
7. **AuthContext creates user profile** di public.users table jika belum ada
8. **User redirected** ke dashboard sesuai role

## User Profile Creation Flow

Saat Google Sign In pertama kali:
1. Supabase membuat user di `auth.users`
2. AuthContext mendeteksi user baru (SIGNED_IN event)
3. Cek apakah profile exists di `users` table
4. Jika tidak ada, create profile dengan data:
   - `id`: dari auth.users.id
   - `email`: dari Google account
   - `name`: dari Google display name
   - `role`: default "student" (bisa diubah admin nanti)
   - `username`: generated dari email
   - `photo_url`: dari Google profile picture

## Security Notes

- ✅ Web Client ID digunakan untuk Supabase OAuth flow
- ✅ Android Client ID digunakan untuk native Google Sign In
- ✅ idToken divalidasi di Supabase backend
- ✅ User data disimpan aman di Supabase
- ✅ No credentials stored di client side
- ⚠️ **JANGAN commit .env file** ke git
- ⚠️ **JANGAN share Client Secret** di public

## Expo EAS Build Configuration

Untuk production build, tambahkan secrets di EAS:

```bash
# Set environment variables untuk EAS Build
eas secret:create --scope project --name GOOGLE_WEB_CLIENT_ID --value "your-web-client-id"
eas secret:create --scope project --name GOOGLE_ANDROID_CLIENT_ID --value "your-android-client-id"
```

Kemudian update `eas.json`:

```json
{
  "build": {
    "preview": {
      "android": {
        "buildType": "apk",
        "env": {
          "GOOGLE_WEB_CLIENT_ID": "@GOOGLE_WEB_CLIENT_ID",
          "GOOGLE_ANDROID_CLIENT_ID": "@GOOGLE_ANDROID_CLIENT_ID"
        }
      }
    }
  }
}
```

## References

- Google Sign-In for Android: https://developers.google.com/identity/sign-in/android/start-integrating
- Supabase Google OAuth: https://supabase.com/docs/guides/auth/social-login/auth-google
- @react-native-google-signin/google-signin: https://github.com/react-native-google-signin/google-signin
- Expo OAuth: https://docs.expo.dev/guides/authentication/

## Support

Jika ada masalah, check:
1. Console logs di Metro bundler
2. Supabase Dashboard → Logs → Auth logs
3. Google Cloud Console → Credentials → Usage metrics
