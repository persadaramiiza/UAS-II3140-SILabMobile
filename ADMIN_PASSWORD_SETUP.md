# Setup Admin Change Password Function

Untuk mengaktifkan fitur admin dapat mengubah password user secara langsung, ikuti langkah berikut:

## 1. Buat Database Function di Supabase

1. Buka Supabase Dashboard: https://supabase.com/dashboard
2. Pilih project Anda
3. Pergi ke **SQL Editor**
4. Klik **New Query**
5. Paste SQL berikut:

```sql
-- STEP 1: Drop semua versi function yang ada (bersihkan dulu)
DROP FUNCTION IF EXISTS admin_change_user_password(UUID, TEXT);
DROP FUNCTION IF EXISTS admin_change_user_password(TEXT, TEXT);

-- STEP 2: Enable pgcrypto extension
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- STEP 3: Buat function baru (parameter TEXT sesuai schema users.id)
CREATE OR REPLACE FUNCTION admin_change_user_password(
  user_id TEXT,
  new_password TEXT
)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSON;
  caller_role TEXT;
  target_auth_id UUID;
BEGIN
  -- Get caller's role from public.users table
  SELECT role INTO caller_role
  FROM public.users 
  WHERE id = auth.uid()::TEXT;
  
  -- Verify caller is admin
  IF caller_role IS NULL OR caller_role != 'admin' THEN
    RAISE EXCEPTION 'Only admins can change user passwords';
  END IF;

  -- Convert TEXT user_id to UUID for auth.users table
  BEGIN
    target_auth_id := user_id::UUID;
  EXCEPTION
    WHEN invalid_text_representation THEN
      RAISE EXCEPTION 'Invalid user ID format';
  END;

  -- Update password in auth.users
  UPDATE auth.users
  SET 
    encrypted_password = crypt(new_password, gen_salt('bf')),
    updated_at = NOW()
  WHERE id = target_auth_id;

  -- Check if update was successful
  IF NOT FOUND THEN
    RAISE EXCEPTION 'User not found in auth system';
  END IF;

  result := json_build_object(
    'success', true,
    'message', 'Password updated successfully'
  );

  RETURN result;
END;
$$;

-- STEP 4: Grant permission
GRANT EXECUTE ON FUNCTION admin_change_user_password(TEXT, TEXT) TO authenticated;
```

6. Klik **Run** untuk mengeksekusi query
7. Jika berhasil, Anda akan melihat pesan "Success"

## 2. Verifikasi Function

Test function dengan query berikut (ganti dengan user_id yang valid):

```sql
-- Test (ganti dengan UUID user yang sebenarnya)
SELECT admin_change_user_password(
  'USER_UUID_HERE'::UUID,
  'newpassword123'
);
```

## 3. App Sudah Siap!

Kode mobile app sudah diupdate untuk menggunakan function ini. Admin sekarang bisa langsung ganti password user tanpa kirim email.

## Security Notes

✅ **Aman** - Function menggunakan `SECURITY DEFINER` tapi ada validasi:
- Hanya user dengan role `admin` yang bisa eksekusi
- Password di-encrypt dengan bcrypt
- Tidak ada service role key di mobile app

✅ **Audit Trail** - Bisa ditambahkan logging jika diperlukan

## Troubleshooting

**Error: "Only admins can change user passwords"**
- Pastikan user yang login memiliki role `admin` di table `profiles`

**Error: "User not found"**
- Pastikan UUID user yang dimasukkan valid dan ada di database

**Error: "function crypt does not exist"**
- Jalankan: `CREATE EXTENSION IF NOT EXISTS pgcrypto;`
