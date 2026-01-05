# Google Authentication - UPDATED Implementation

## ⚠️ Important Change

Aplikasi ini menggunakan **Expo** (managed workflow), jadi kita menggunakan **Supabase OAuth** untuk Google Sign In, bukan native Google SDK.

## ✅ Implementasi Saat Ini

### Method: Supabase OAuth dengan Web Browser
- ✅ Kompatibel dengan Expo
- ✅ Tidak perlu native modules
- ✅ Tidak perlu SHA-1 fingerprint untuk development
- ✅ Sign In akan membuka browser, user pilih akun Google, lalu redirect kembali ke app

### Packages yang Digunakan:
```json
{
  "expo-auth-session": "latest",
  "expo-web-browser": "latest",  
  "expo-crypto": "latest"
}
```

## 📋 Setup Yang Lebih Simpel

### 1. Google Cloud Console (5 menit)

**A. Create Project**
1. Go to https://console.cloud.google.com/
2. New Project → Name: `SILab Suite` → Create

**B. Enable API**
1. APIs & Services → Library
2. Search: `Google+ API` → Enable

**C. OAuth Consent Screen**
1. APIs & Services → OAuth consent screen
2. External → App name: `SILab Suite` → Your email → Save

**D. Create Web Client ID** (hanya perlu ini!)
1. Credentials → Create Credentials → OAuth client ID
2. Type: **Web application**
3. Name: `SILab Suite Web`
4. **Authorized redirect URIs** (tambahkan semuanya):
   ```
   https://wbxoaekkxofsdzzliqgs.supabase.co/auth/v1/callback
   exp://localhost:19000
   exp://127.0.0.1:19000
   ```
5. Create → **SAVE Client ID & Secret**

### 2. Supabase Configuration (2 menit)

1. Go to https://supabase.com/dashboard
2. Select project
3. **Authentication** → **Providers** → **Google**
4. Toggle **Enabled**
5. Paste:
   - **Client ID**: Web Client ID dari step 1D
   - **Client Secret**: Web Client Secret dari step 1D
6. **Save**

### 3. Update .env (Optional)

File `.env` sudah tidak perlu GOOGLE_WEB_CLIENT_ID lagi karena OAuth handled by Supabase.

Tapi kalau mau tetap ada untuk dokumentasi:
```bash
# Tidak digunakan di kode, hanya untuk reference
GOOGLE_WEB_CLIENT_ID=your-web-client-id.apps.googleusercontent.com
```

### 4. Test!

```bash
# Metro bundler sudah running di port 8082
# Buka terminal baru
npm run android
```

## 🎯 Cara Kerja

1. User tap "Sign in with Google"
2. App call `supabase.auth.signInWithOAuth({ provider: 'google' })`
3. Browser terbuka dengan Google Sign In page
4. User pilih akun Google dan approve
5. Browser redirect kembali ke app dengan auth token
6. Supabase create session
7. AuthContext detect session → Navigate to dashboard

## ✅ Testing Checklist

- [ ] Google+ API enabled
- [ ] OAuth consent screen configured
- [ ] Web Client ID created
- [ ] Redirect URIs includes Supabase callback
- [ ] Supabase Google provider enabled
- [ ] Client ID & Secret added to Supabase
- [ ] Metro bundler running
- [ ] Test Google Sign In button

## 🐛 Troubleshooting

### "Invariant Violation: TurboModuleRegistry.getEnforcing(...): 'RNGoogleSignin'"
✅ **FIXED** - Removed native Google SDK, using Supabase OAuth instead

### "OAuth Error: redirect_uri_mismatch"
→ Add redirect URI to Google Cloud Console:
  - `https://wbxoaekkxofsdzzliqgs.supabase.co/auth/v1/callback`

### Browser tidak redirect kembali ke app
→ Ini normal untuk development. Session tetap tersimpan.
→ Restart app, session akan auto-load dari Supabase.

### "Invalid OAuth client"
→ Check Client ID & Secret di Supabase match dengan Google Cloud Console

## 📝 Key Differences dari Native SDK

| Feature | Native SDK | Supabase OAuth (Current) |
|---------|-----------|-------------------------|
| Requires native modules | ✅ Yes | ❌ No |
| SHA-1 fingerprint | ✅ Required | ❌ Not needed |
| Works with Expo Go | ❌ No | ✅ Yes |
| Sign In Flow | Native popup | Browser redirect |
| Android/iOS setup | Complex | Simple |
| Deep linking | Manual | Handled by Supabase |

## 🚀 Advantages

✅ **Expo Compatible** - Works with Expo Go  
✅ **Simpler Setup** - No SHA-1, no native config  
✅ **Cross-platform** - Same code for Android & iOS  
✅ **Maintained by Supabase** - OAuth handled server-side  
✅ **Secure** - Tokens handled by Supabase  

## ⚡ Quick Start

```bash
# 1. Setup Google Cloud Console (5 min)
#    - Create Web Client ID
#    - Add Supabase callback URL to redirect URIs

# 2. Setup Supabase (2 min)  
#    - Enable Google provider
#    - Add Client ID & Secret

# 3. Test (1 min)
npm run android
# Tap "Sign in with Google" → Browser opens → Sign in → Done!
```

## 📚 Documentation

- **Supabase Auth Google**: https://supabase.com/docs/guides/auth/social-login/auth-google
- **Expo Auth Session**: https://docs.expo.dev/versions/latest/sdk/auth-session/

---

**Status**: ✅ Google OAuth implemented and ready to test!  
**Method**: Supabase OAuth (Web Browser Flow)  
**Compatible**: Expo, Android, iOS
