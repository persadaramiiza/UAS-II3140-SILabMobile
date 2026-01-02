-- Fix existing users with null username
-- Run this SQL in Supabase SQL Editor

-- Step 1: Generate username for users with null username
-- Simple approach: use email prefix + random 4 digits
UPDATE users 
SET username = CONCAT(
  SUBSTRING(email FROM 1 FOR POSITION('@' IN email) - 1),
  FLOOR(RANDOM() * 10000)::text
)
WHERE username IS NULL;

-- Alternative: If you want sequential numbers, use this instead:
-- DO $$
-- DECLARE
--   r RECORD;
--   counter INTEGER := 1000;
-- BEGIN
--   FOR r IN SELECT id, email FROM users WHERE username IS NULL ORDER BY created_at
--   LOOP
--     UPDATE users 
--     SET username = CONCAT(
--       SUBSTRING(r.email FROM 1 FOR POSITION('@' IN r.email) - 1),
--       counter::text
--     )
--     WHERE id = r.id;
--     counter := counter + 1;
--   END LOOP;
-- END $$;

-- Step 2: Verify fix
SELECT id, email, username, name, role FROM users ORDER BY created_at;
