# Google OAuth Setup Guide for SILab Suite

## Overview
Panduan lengkap untuk mengkonfigurasi Google Sign-In di aplikasi SILab Suite menggunakan Supabase Auth dan React Native Google Sign In.

---

## Prerequisites
- ✅ Google Account
- ✅ Supabase Project sudah dibuat
- ✅ Android Debug Keystore SHA-1 fingerprint
- ✅ Package name aplikasi: `com.silabsuite.mobile`

---

## Part 1: Setup Google Cloud Console

### Step 1: Create Google Cloud Project

1. Buka [Google Cloud Console](https://console.cloud.google.com/)
2. Click **Select a project** → **New Project**
3. Project Details:
   - **Project name**: `SILab Suite`
   - **Organization**: (Pilih atau leave default)
4. Click **Create**

### Step 2: Enable Google+ API

1. Di sidebar, pilih **APIs & Services** → **Library**
2. Search: `Google+ API`
3. Click **Enable**

### Step 3: Configure OAuth Consent Screen

1. Di sidebar, pilih **APIs & Services** → **OAuth consent screen**
2. Choose **External** (untuk testing) → Click **Create**
3. Fill in required fields:
   - **App name**: `SILab Suite`
   - **User support email**: Your email
   - **Developer contact email**: Your email
4. Click **Save and Continue**
5. **Scopes**: Skip (default scopes cukup)
6. **Test users**: Add email untuk testing
7. Click **Save and Continue**

### Step 4: Create OAuth 2.0 Credentials

#### A. Web Client ID (untuk Supabase)

1. Di sidebar, pilih **APIs & Services** → **Credentials**
2. Click **+ Create Credentials** → **OAuth client ID**
3. Application type: **Web application**
4. Name: `SILab Suite Web Client`
5. **Authorized JavaScript origins**: Leave empty
6. **Authorized redirect URIs**: Add Supabase callback URL
   ```
   https://wbxoaekkxofsdzzliqgs.supabase.co/auth/v1/callback
   ```
7. Click **Create**
8. **COPY dan SIMPAN**:
   - Client ID: `xxxxx.apps.googleusercontent.com`
   - Client secret: `xxxxx`

#### B. Android Client ID (untuk React Native)

1. Click **+ Create Credentials** → **OAuth client ID**
2. Application type: **Android**
3. Name: `SILab Suite Android`
4. Package name: 
   ```
   com.silabsuite.mobile
   ```
5. SHA-1 certificate fingerprint (dari debug keystore):
   ```
   15:D7:C4:08:C5:E4:E2:B2:85:18:CE:37:F8:B4:4B:32:14:DA:3C:BA
   ```
6. Click **Create**
7. **COPY dan SIMPAN**:
   - Client ID: `xxxxx.apps.googleusercontent.com`

---

## Part 2: Configure Supabase

### Step 1: Enable Google Provider

1. Buka [Supabase Dashboard](https://supabase.com/dashboard)
2. Pilih project Anda
3. Di sidebar, pilih **Authentication** → **Providers**
4. Find **Google** dan toggle **Enabled**
5. Fill in credentials dari Google Cloud Console:
   - **Client ID (for OAuth)**: Web Client ID dari Step 4A
   - **Client Secret (for OAuth)**: Client Secret dari Step 4A
6. **Authorized Client IDs**: Add Android Client ID dari Step 4B
   ```
   xxxxx.apps.googleusercontent.com
   ```
7. Click **Save**

### Step 2: Configure Redirect URLs

1. Masih di **Authentication** → **URL Configuration**
2. **Site URL**: 
   ```
   exp://localhost:8081
   ```
3. **Redirect URLs**: Add
   ```
   exp://localhost:8081
   com.silabsuite.mobile://
   ```
4. Click **Save**

---

## Part 3: Configure React Native App

### Step 1: Update Environment Variables

Edit file `.env`:

```bash
# Existing Supabase config
NEXT_PUBLIC_SUPABASE_URL=https://wbxoaekkxofsdzzliqgs.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Google OAuth Configuration
# Use the WEB Client ID from Google Cloud Console (Step 4A)
GOOGLE_WEB_CLIENT_ID=xxxxx-xxxxxx.apps.googleusercontent.com
```

⚠️ **IMPORTANT**: Gunakan **Web Client ID**, bukan Android Client ID!

### Step 2: Verify Package Installation

Package sudah terinstall di `package.json`:

```json
{
  "dependencies": {
    "@react-native-google-signin/google-signin": "^16.1.1"
  }
}
```

Jika belum terinstall:
```bash
npm install @react-native-google-signin/google-signin
```

### Step 3: Configure Android (android/app/build.gradle)

File sudah otomatis dikonfigurasi oleh package, tapi pastikan package name match:

```gradle
android {
    defaultConfig {
        applicationId "com.silabsuite.mobile"
    }
}
```

---

## Part 4: Testing

### Step 1: Rebuild App

Setelah setup, rebuild aplikasi:

```bash
# Clear cache
npm start -- --clear

# Build for Android
npm run android
```

### Step 2: Test Google Sign In

1. Buka aplikasi
2. Go to **Login Screen**
3. Tap **Sign in with Google**
4. Pilih Google account
5. Allow permissions
6. Verify auto login berhasil

### Expected Flow:
```
User taps Google button
  ↓
Google Sign In modal muncul
  ↓
User pilih account
  ↓
Google returns ID token
  ↓
App sends token to Supabase
  ↓
Supabase creates/updates user
  ↓
Session created
  ↓
AuthContext detects session
  ↓
Navigate to Dashboard
```

---

## Troubleshooting

### Error: "Developer Error"

**Cause**: SHA-1 fingerprint tidak match atau package name salah

**Solution**:
1. Verify SHA-1 fingerprint:
   ```bash
   cd $env:USERPROFILE\.android
   keytool -list -v -keystore debug.keystore -alias androiddebugkey -storepass android -keypass android
   ```
2. Update di Google Cloud Console → Android credentials
3. Rebuild app

### Error: "SIGN_IN_REQUIRED"

**Cause**: Web Client ID tidak diset atau salah

**Solution**:
1. Pastikan `.env` file berisi `GOOGLE_WEB_CLIENT_ID`
2. Pastikan menggunakan **Web Client ID** dari Step 4A
3. Restart metro bundler:
   ```bash
   npm start -- --reset-cache
   ```

### Error: "PLAY_SERVICES_NOT_AVAILABLE"

**Cause**: Google Play Services tidak terinstall di emulator

**Solution**:
1. Gunakan emulator dengan Google Play Services
2. Atau test di physical device
3. Atau update Play Services di emulator

### Error: "Invalid OAuth client"

**Cause**: Client ID tidak ditambahkan ke Supabase Authorized Client IDs

**Solution**:
1. Go to Supabase → Authentication → Providers → Google
2. Add Android Client ID ke **Authorized Client IDs**
3. Save

### Error: "No ID token received"

**Cause**: Google Sign In tidak return ID token

**Solution**:
1. Pastikan `webClientId` configured:
   ```javascript
   GoogleSignin.configure({
     webClientId: GOOGLE_WEB_CLIENT_ID,
   });
   ```
2. Check `.env` file loaded correctly
3. Rebuild app

---

## Security Best Practices

### 1. Production Release

Untuk production build, buat **Release Keystore** dan dapatkan SHA-1:

```bash
# Generate release keystore
keytool -genkey -v -keystore release.keystore -alias my-key-alias -keyalg RSA -keysize 2048 -validity 10000

# Get SHA-1 from release keystore
keytool -list -v -keystore release.keystore -alias my-key-alias
```

Tambahkan SHA-1 release ke Google Cloud Console sebagai credentials terpisah.

### 2. Protect Secrets

- ❌ **JANGAN** commit `.env` file ke Git
- ✅ Gunakan `.env.example` sebagai template
- ✅ Store secrets di environment variables untuk CI/CD

### 3. Restrict API Keys

Di Google Cloud Console:

1. Go to **Credentials**
2. Click API key yang dibuat
3. **Application restrictions**:
   - Android apps: Add package name + SHA-1
4. **API restrictions**:
   - Restrict key to: Google+ API only
5. Save

---

## Additional Features

### Sign Out

```javascript
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const handleSignOut = async () => {
  try {
    // Sign out from Supabase
    await supabase.auth.signOut();
    
    // Sign out from Google
    await GoogleSignin.signOut();
  } catch (error) {
    console.error('Sign out error:', error);
  }
};
```

### Get Current User

```javascript
const getCurrentUser = async () => {
  try {
    const userInfo = await GoogleSignin.getCurrentUser();
    console.log(userInfo);
  } catch (error) {
    console.error('No user signed in');
  }
};
```

### Check Sign In Status

```javascript
const isSignedIn = await GoogleSignin.isSignedIn();
console.log('Is signed in:', isSignedIn);
```

---

## Testing Checklist

- [ ] Web Client ID configured di `.env`
- [ ] Android Client ID added di Supabase Authorized Client IDs
- [ ] SHA-1 fingerprint match di Google Cloud Console
- [ ] Package name match (`com.silabsuite.mobile`)
- [ ] Redirect URL configured di Supabase
- [ ] Google+ API enabled
- [ ] OAuth consent screen configured
- [ ] Test users added (if External)
- [ ] App rebuilt after configuration
- [ ] Google Sign In button muncul di Login/Register screen
- [ ] Sign In flow berhasil
- [ ] User profile created/updated di Supabase
- [ ] Session persisted setelah app restart

---

## Reference Links

- [Google Cloud Console](https://console.cloud.google.com/)
- [Supabase Dashboard](https://supabase.com/dashboard)
- [React Native Google Sign In Docs](https://github.com/react-native-google-signin/google-signin)
- [Supabase Auth Docs](https://supabase.com/docs/guides/auth/social-login/auth-google)

---

## Support

Jika masih ada masalah:

1. Check console logs untuk error details
2. Verify semua credentials di Google Cloud Console & Supabase match
3. Rebuild app from scratch
4. Test di physical device (emulator kadang bermasalah)

---

**Status**: ✅ Google OAuth configured and ready to use
**Last Updated**: January 5, 2026
