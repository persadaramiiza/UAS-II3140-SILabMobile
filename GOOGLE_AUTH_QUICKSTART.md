# Google Authentication - Quick Start Guide

## ✅ Status Implementasi

Google Authentication sudah diimplementasikan di aplikasi dengan fitur:
- ✅ Google Sign In button di LoginScreen
- ✅ Integrasi dengan Supabase Auth
- ✅ Auto-create user profile untuk Google users
- ✅ Google Sign Out saat logout
- ✅ Error handling lengkap

## 🔑 SHA-1 Fingerprint Anda

**Debug SHA-1:** `15:D7:C4:08:C5:E4:E2:B2:85:18:CE:37:F8:B4:4B:32:14:DA:3C:BA`

**SHA-256:** `71:09:93:3C:AD:95:73:C4:C9:84:69:57:EB:C1:C4:33:C7:3A:6A:B8:C4:C8:26:DC:6E:6F:E1:2E:DB:F4:DF:AC`

## 📋 Langkah Setup (30 menit)

### 1. Google Cloud Console Setup

#### A. Create Project
1. Buka https://console.cloud.google.com/
2. Klik dropdown "Select a project" → **"New Project"**
3. Project name: `SILab Suite Mobile`
4. Click **"Create"**

#### B. Configure OAuth Consent Screen
1. Di sidebar kiri, pilih **"APIs & Services"** → **"OAuth consent screen"**
2. Pilih **"External"** → Klik **"Create"**
3. Isi form:
   - **App name:** `SILab Suite`
   - **User support email:** (pilih email Anda)
   - **App logo:** (opsional, skip)
   - **App domain:** (skip untuk development)
   - **Developer contact information:** (email Anda)
4. Klik **"Save and Continue"**
5. **Scopes:** Klik "Save and Continue" (skip, gunakan default scopes)
6. **Test users:** (opsional) Tambahkan email untuk testing
7. Klik **"Save and Continue"**
8. Review summary → Klik **"Back to Dashboard"**

#### C. Create Android OAuth Client ID
1. Di sidebar, pilih **"APIs & Services"** → **"Credentials"**
2. Klik **"+ CREATE CREDENTIALS"** → **"OAuth client ID"**
3. Isi form:
   - **Application type:** Android
   - **Name:** `SILab Suite Android`
   - **Package name:** `com.silabsuite.mobile`
   - **SHA-1 certificate fingerprint:** `15:D7:C4:08:C5:E4:E2:B2:85:18:CE:37:F8:B4:4B:32:14:DA:3C:BA`
4. Klik **"Create"**
5. **✅ COPY** Android Client ID yang muncul (format: `xxxxx.apps.googleusercontent.com`)

#### D. Create Web OAuth Client ID (untuk Supabase)
1. Klik **"+ CREATE CREDENTIALS"** → **"OAuth client ID"** lagi
2. Isi form:
   - **Application type:** Web application
   - **Name:** `SILab Suite Web Client`
   - **Authorized JavaScript origins:** (kosongkan)
   - **Authorized redirect URIs:** 
     ```
     https://wbxoaekkxofsdzzliqgs.supabase.co/auth/v1/callback
     ```
3. Klik **"Create"**
4. **✅ COPY** kedua nilai:
   - **Client ID** (Web Client ID)
   - **Client Secret**

### 2. Supabase Configuration

1. Buka https://app.supabase.com/
2. Pilih project **SILab Suite** (atau yang Anda gunakan)
3. Di sidebar kiri, pilih **"Authentication"** → **"Providers"**
4. Scroll ke **"Google"** → Toggle **ON** (enable)
5. Isi form:
   - **Client ID (for OAuth):** Web Client ID dari step 1D
   - **Client Secret (for OAuth):** Web Client Secret dari step 1D
   - **Authorized Client IDs (optional):** Android Client ID dari step 1C
6. Klik **"Save"**

### 3. Update Environment Variables

Edit file `.env` di root project Anda:

```dotenv
NEXT_PUBLIC_SUPABASE_URL=https://wbxoaekkxofsdzzliqgs.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Google OAuth - GANTI DENGAN CLIENT ID ANDA
GOOGLE_WEB_CLIENT_ID=PASTE_WEB_CLIENT_ID_HERE.apps.googleusercontent.com
GOOGLE_ANDROID_CLIENT_ID=PASTE_ANDROID_CLIENT_ID_HERE.apps.googleusercontent.com
```

**⚠️ PENTING:** Ganti `PASTE_WEB_CLIENT_ID_HERE` dan `PASTE_ANDROID_CLIENT_ID_HERE` dengan Client ID yang Anda copy dari Google Cloud Console!

### 4. Rebuild & Test

```bash
# Clear cache
npm start -- --clear

# Atau restart Metro bundler
```

Setelah Metro bundler running, tekan **"a"** untuk menjalankan di Android.

### 5. Test Google Sign In

1. Di LoginScreen, klik tombol **"Sign in with Google"**
2. Pilih akun Google Anda
3. Approve permissions
4. ✅ Jika berhasil, Anda akan otomatis login ke aplikasi

## 🔍 Troubleshooting

### Error: "DEVELOPER_ERROR"

**Penyebab:** SHA-1 fingerprint tidak match atau belum dikonfigurasi

**Solusi:**
1. Pastikan SHA-1 di Google Cloud Console sama dengan: `15:D7:C4:08:C5:E4:E2:B2:85:18:CE:37:F8:B4:4B:32:14:DA:3C:BA`
2. Package name harus: `com.silabsuite.mobile`
3. Tunggu 5-10 menit setelah update Google Cloud Console

### Error: "SIGN_IN_REQUIRED" atau "No ID token"

**Penyebab:** Web Client ID salah atau tidak dikonfigurasi

**Solusi:**
1. Pastikan `GOOGLE_WEB_CLIENT_ID` di `.env` sudah benar
2. Web Client ID harus berakhiran `.apps.googleusercontent.com`
3. Pastikan bukan Android Client ID yang dipakai

### Error: "PLAY_SERVICES_NOT_AVAILABLE"

**Penyebab:** Google Play Services tidak tersedia di emulator/device

**Solusi:**
1. Gunakan emulator dengan Google APIs (bukan AOSP)
2. Atau test di device fisik dengan Google Play Services

### Google Sign In tidak muncul dialog

**Solusi:**
```bash
# Clear app data
adb shell pm clear com.silabsuite.mobile

# Restart app
npm start -- --clear
```

### User berhasil login tapi tidak ada profile

**Solusi:** AuthContext otomatis membuat profile. Check logs di Metro bundler:
```javascript
// Cari log seperti ini:
User profile not found, creating...
```

## 📱 Testing Checklist

- [ ] Google Sign In button terlihat di LoginScreen
- [ ] Klik button → muncul dialog pilih akun Google
- [ ] Pilih akun → approve permissions
- [ ] Redirect kembali ke app
- [ ] User berhasil login (muncul dashboard sesuai role)
- [ ] Check profile di menu Profile
- [ ] Logout → Google account juga logout

## 🔐 Production Setup (Untuk Deploy)

Ketika siap deploy, Anda perlu:

1. **Generate Release SHA-1:**
```powershell
# Buat release keystore jika belum ada
keytool -genkey -v -keystore release.keystore -alias release -keyalg RSA -keysize 2048 -validity 10000

# Get SHA-1 dari release keystore
keytool -list -v -keystore release.keystore -alias release
```

2. **Tambahkan Release SHA-1 ke Google Cloud Console:**
   - Edit Android OAuth Client ID
   - Tambahkan SHA-1 release keystore
   - Save

3. **Update Redirect URI di Web Client:**
   - Tambahkan production domain jika ada
   - Update `auth.expo.io` dengan actual URL

## 📚 Referensi

- **Google Cloud Console:** https://console.cloud.google.com/
- **Supabase Dashboard:** https://app.supabase.com/
- **React Native Google SignIn Docs:** https://react-native-google-signin.github.io/docs/
- **Supabase Auth Docs:** https://supabase.com/docs/guides/auth/social-login/auth-google

## ✅ Completion

Setelah semua langkah selesai:
- ✅ Google OAuth Client IDs created (Android + Web)
- ✅ Supabase Google provider configured
- ✅ Environment variables updated
- ✅ App dapat Google Sign In

**Status:** 🔧 **Butuh konfigurasi Google Cloud Console & update `.env`**

Setelah setup selesai, Google Sign In siap digunakan! 🎉
