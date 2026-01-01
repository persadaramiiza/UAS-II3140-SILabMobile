# Troubleshooting Guide - SILab Mobile

Panduan untuk mengatasi error-error umum yang mungkin terjadi.

## 🔴 Error: User Profile Not Found (PGRST116)

### Gejala:
```
ERROR Error fetching user profile: {"code": "PGRST116", "details": "The result contains 0 rows"}
```

### Penyebab:
User berhasil register di Supabase Auth, tapi entry tidak dibuat di tabel `users`.

### Solusi Otomatis (Sudah Diimplementasi):
Aplikasi sekarang **otomatis membuat profile** jika tidak ditemukan. Tidak perlu action manual.

### Verifikasi Manual:

1. **Cek Database Trigger**
   ```sql
   -- Cek apakah trigger exists
   SELECT * FROM pg_trigger WHERE tgname = 'on_auth_user_created';
   ```

2. **Jika Trigger Tidak Ada, Buat Sekarang:**
   ```sql
   -- Create function
   CREATE OR REPLACE FUNCTION public.handle_new_user()
   RETURNS TRIGGER AS $$
   BEGIN
     INSERT INTO public.users (id, email, name, role)
     VALUES (
       NEW.id,
       NEW.email,
       COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
       'student'
     );
     RETURN NEW;
   END;
   $$ LANGUAGE plpgsql SECURITY DEFINER;

   -- Create trigger
   CREATE TRIGGER on_auth_user_created
     AFTER INSERT ON auth.users
     FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
   ```

3. **Manual Fix untuk User yang Sudah Ada:**
   ```sql
   -- Cek user di auth.users yang belum ada di users
   SELECT au.id, au.email, au.raw_user_meta_data->>'full_name' as name
   FROM auth.users au
   LEFT JOIN public.users u ON au.id = u.id
   WHERE u.id IS NULL;

   -- Insert manual (ganti values sesuai hasil query di atas)
   INSERT INTO public.users (id, email, name, role)
   VALUES (
     'user-uuid-here',
     'user@email.com',
     'User Name',
     'student'
   );
   ```

---

## 🔴 Error: Navigation Screen Not Found

### Gejala:
```
ERROR The action 'REPLACE' with payload {"name":"Login"} was not handled by any navigator.
Do you have a screen named 'Login'?
```

### Penyebab:
Menggunakan `navigation.replace('Login')` tapi screen name tidak sesuai atau navigator tidak mendukung.

### Solusi (Sudah Diperbaiki):
Menggunakan `navigation.goBack()` setelah register berhasil, yang akan kembali ke Login screen.

### Alternatif Lain:
```javascript
// Option 1: goBack (recommended untuk auth flow)
navigation.goBack();

// Option 2: navigate
navigation.navigate('Login');

// Option 3: reset navigation state
navigation.reset({
  index: 0,
  routes: [{ name: 'Login' }],
});
```

---

## 🔴 Error: Network Request Failed

### Gejala:
```
ERROR Network request failed
```

### Penyebab:
- File `.env` tidak ada atau salah
- Supabase credentials tidak valid
- Tidak ada koneksi internet

### Solusi:

1. **Cek file `.env`:**
   ```bash
   # Pastikan file .env ada di root project
   ls -la .env
   
   # Isi harus seperti ini:
   NEXT_PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGc...
   ```

2. **Restart Development Server:**
   ```bash
   # Stop server (Ctrl+C)
   # Clear cache dan restart
   npm start -- --clear
   ```

3. **Verifikasi Credentials:**
   - Login ke Supabase dashboard
   - Settings > API
   - Copy ulang URL dan Anon Key
   - Paste ke `.env`

---

## 🔴 Error: RLS Policy Violation

### Gejala:
```
ERROR new row violates row-level security policy
```

### Penyebab:
RLS policies di Supabase tidak mengizinkan operasi yang diminta.

### Solusi:

1. **Untuk Tabel Users:**
   ```sql
   -- Allow insert for authenticated users
   CREATE POLICY "Users can insert own profile" ON users
     FOR INSERT WITH CHECK (auth.uid() = id);
   ```

2. **Cek Existing Policies:**
   ```sql
   SELECT * FROM pg_policies WHERE tablename = 'users';
   ```

3. **Disable RLS Sementara (Testing Only!):**
   ```sql
   ALTER TABLE users DISABLE ROW LEVEL SECURITY;
   -- JANGAN LAKUKAN DI PRODUCTION!
   ```

---

## 🔴 Error: Cannot Read Property of Undefined

### Gejala:
```
ERROR Cannot read property 'name' of undefined
ERROR Cannot read property 'email' of null
```

### Penyebab:
Mencoba akses property dari object yang null/undefined.

### Solusi:
Gunakan optional chaining:

```javascript
// ❌ Bad
const name = user.name;
const email = userProfile.email;

// ✅ Good
const name = user?.name;
const email = userProfile?.email || 'N/A';

// ✅ Better with default
const name = user?.name ?? 'Unknown';
```

---

## 🔴 Error: Expo Won't Start

### Gejala:
- Metro bundler error
- App won't load
- Blank screen

### Solusi:

1. **Clear All Caches:**
   ```bash
   # Stop server
   # Delete caches
   rm -rf node_modules
   rm -rf .expo
   rm -rf /tmp/metro-*
   
   # Reinstall
   npm install
   
   # Start clean
   npm start -- --clear
   ```

2. **Watchman Issues (Mac/Linux):**
   ```bash
   watchman watch-del-all
   ```

3. **Reset Package Manager:**
   ```bash
   npm cache clean --force
   npm install
   ```

---

## 🔴 Error: Module Not Found

### Gejala:
```
ERROR Unable to resolve module '@env'
ERROR Cannot find module 'react-native-dotenv'
```

### Solusi:

1. **Install Missing Package:**
   ```bash
   npm install react-native-dotenv
   ```

2. **Check babel.config.js:**
   ```javascript
   module.exports = {
     presets: ['babel-preset-expo'],
     plugins: [
       ['module:react-native-dotenv', {
         moduleName: '@env',
         path: '.env',
       }]
     ]
   };
   ```

3. **Restart with Clear Cache:**
   ```bash
   npm start -- --clear
   ```

---

## 🔴 Error: Database Connection Timeout

### Gejala:
Queries take too long or timeout.

### Solusi:

1. **Check Supabase Status:**
   - Visit https://status.supabase.com/

2. **Check Network:**
   ```bash
   # Test connection
   ping your-project.supabase.co
   ```

3. **Optimize Query:**
   ```javascript
   // Add timeout
   const { data, error } = await supabase
     .from('users')
     .select('*')
     .limit(100) // Limit results
     .timeout(5000); // 5 second timeout
   ```

---

## 🔴 Error: Invalid JWT Token

### Gejala:
```
ERROR Invalid JWT token
ERROR Session expired
```

### Solusi:

1. **Logout dan Login Ulang:**
   ```javascript
   await supabase.auth.signOut();
   // Then login again
   ```

2. **Check Token Expiry:**
   ```javascript
   const { data: { session } } = await supabase.auth.getSession();
   if (session?.expires_at) {
     const expiryDate = new Date(session.expires_at * 1000);
     console.log('Token expires:', expiryDate);
   }
   ```

---

## 🛠️ General Debugging Tips

### 1. Enable Detailed Logging
```javascript
// Add to App.js
if (__DEV__) {
  console.log('🔧 Development Mode');
  // Log all Supabase errors
  supabase.auth.onAuthStateChange((event, session) => {
    console.log('Auth event:', event, session);
  });
}
```

### 2. Check Supabase Dashboard
- Authentication > Users - Lihat user yang terdaftar
- Table Editor > users - Cek data profile
- Logs - Lihat query logs dan errors

### 3. Use React Native Debugger
```bash
# Install
npm install -g react-native-debugger

# Run
open "rndebugger://set-debugger-loc?host=localhost&port=8081"
```

### 4. Check Expo Logs
```bash
# Show all logs
npx expo start

# Show only errors
npx expo start --no-dev --minify
```

---

## 📱 Platform-Specific Issues

### Android

**Error: Unable to load script**
```bash
# Clear Android build
cd android
./gradlew clean
cd ..
npm start -- --clear
```

**Error: Port 8081 already in use**
```bash
# Kill process
npx kill-port 8081
# Or manually
lsof -ti:8081 | xargs kill -9
```

### iOS

**Error: Pod install failed**
```bash
cd ios
pod deintegrate
pod install
cd ..
npm start
```

**Error: Build failed**
```bash
# Clean build
cd ios
xcodebuild clean
cd ..
```

---

## 🆘 Still Having Issues?

### Before Creating an Issue:

1. ✅ Read all relevant documentation
2. ✅ Check this troubleshooting guide
3. ✅ Search closed issues on GitHub
4. ✅ Try the solutions above
5. ✅ Clear all caches and restart

### Creating a Good Issue:

Include:
- **Environment:** OS, Node version, Expo version
- **Steps to reproduce:** Detailed steps
- **Expected behavior:** What should happen
- **Actual behavior:** What actually happens
- **Error messages:** Full error logs
- **Screenshots:** If applicable
- **Code snippets:** Relevant code

### Example Issue Template:

```markdown
**Environment:**
- OS: Windows 11
- Node: v18.0.0
- Expo: ~54.0.29
- React Native: 0.81.5

**Bug Description:**
User profile not loading after login

**Steps to Reproduce:**
1. Register new account
2. Login with credentials
3. Profile screen shows loading indefinitely

**Error Logs:**
```
ERROR Error fetching user profile...
```

**Screenshots:**
[Attach screenshot]

**What I've Tried:**
- Cleared cache
- Reinstalled dependencies
- Checked database trigger
```

---

## 📚 Useful Resources

- [Expo Documentation](https://docs.expo.dev/)
- [Supabase Documentation](https://supabase.com/docs)
- [React Navigation](https://reactnavigation.org/)
- [React Native Debugging](https://reactnative.dev/docs/debugging)

---

**Last Updated:** January 1, 2026

Jika menemukan error baru atau solusi yang belum ada di sini, silakan update dokumen ini!
