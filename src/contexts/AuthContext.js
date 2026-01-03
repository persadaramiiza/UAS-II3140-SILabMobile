import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../services/supabase';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async (userId, retries = 2) => {
    try {
      // Add timeout to prevent hanging
      const profilePromise = supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single();
      
      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Profile fetch timeout')), 15000)
      );
      
      const { data, error } = await Promise.race([profilePromise, timeoutPromise]);
      
      if (error) {
        // If user profile doesn't exist, create it
        if (error.code === 'PGRST116') {
          console.log('User profile not found, creating...');
          const { data: { user } } = await supabase.auth.getUser();
          
          // Generate username from email
          const emailUsername = user?.email?.split('@')[0] || 'user';
          const timestamp = Date.now().toString().slice(-4);
          const username = `${emailUsername}${timestamp}`;
          
          const newProfile = {
            id: userId,
            email: user?.email,
            username: username,
            name: user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User',
            role: user?.user_metadata?.role || 'student'
          };
          
          const { data: createdProfile, error: createError } = await supabase
            .from('users')
            .insert(newProfile)
            .select()
            .single();
          
          if (createError) {
            console.error('Error creating user profile:', createError);
            setUserProfile(null);
          } else {
            setUserProfile(createdProfile);
          }
        } else {
          throw error;
        }
      } else {
        // Profile exists, but check if username is null
        if (data && !data.username) {
          console.log('Updating profile with missing username...');
          const { data: { user } } = await supabase.auth.getUser();
          const emailUsername = user?.email?.split('@')[0] || 'user';
          const timestamp = Date.now().toString().slice(-4);
          const username = `${emailUsername}${timestamp}`;
          
          const { data: updatedProfile, error: updateError } = await supabase
            .from('users')
            .update({ username })
            .eq('id', userId)
            .select()
            .single();
          
          if (updateError) {
            console.error('Error updating username:', updateError);
            setUserProfile(data);
          } else {
            setUserProfile(updatedProfile);
          }
        } else {
          setUserProfile(data);
        }
      }
    } catch (error) {
      if (retries > 0) {
        console.log(`Retrying profile fetch... (${retries} attempts left)`);
        await new Promise(resolve => setTimeout(resolve, 1000));
        return fetchUserProfile(userId, retries - 1);
      }
      console.error('Error fetching user profile:', error);
      setUserProfile(null);
    }
  };

  useEffect(() => {
    const fetchSession = async () => {
      try {
        // Reduce timeout for faster initial load
        const sessionPromise = supabase.auth.getSession();
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Session fetch timeout')), 3000) // Reduced to 3s
        );
        
        const { data: { session } } = await Promise.race([sessionPromise, timeoutPromise]);
        setSession(session);
        setUser(session?.user ?? null);
        
        // Set loading to false immediately to show UI
        setLoading(false);
        
        // Fetch profile in background (non-blocking)
        if (session?.user) {
          fetchUserProfile(session.user.id).catch(err => {
            console.error('Background profile fetch failed:', err);
          });
        }
      } catch (error) {
        console.error('Error fetching session:', error);
        setLoading(false); // Always stop loading even on error
      }
    };

    fetchSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth event:', event);
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        // On SIGNED_IN event, ensure profile exists
        if (event === 'SIGNED_IN') {
          await fetchUserProfile(session.user.id);
        } else {
          fetchUserProfile(session.user.id).catch(err => {
            console.error('Background profile fetch failed:', err);
          });
        }
      } else {
        setUserProfile(null);
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    setUserProfile(null);
  };

  const refreshUserProfile = async () => {
    if (user) {
      await fetchUserProfile(user.id);
    }
  };

  return (
    <AuthContext.Provider value={{ session, user, userProfile, loading, logout, refreshUserProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);