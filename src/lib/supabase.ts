import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/supabase';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  global: {
    headers: {
      'x-application-name': 'YungsTech'
    }
  },
  db: {
    schema: 'public'
  }
});

// Rate limiting helper
const rateLimiter = new Map<string, number>();

export const checkRateLimit = (key: string, limit: number, windowMs: number = 60000): boolean => {
  const now = Date.now();
  const windowStart = now - windowMs;
  
  // Clean up old entries
  rateLimiter.forEach((timestamp, k) => {
    if (timestamp < windowStart) rateLimiter.delete(k);
  });
  
  // Check current count
  const count = Array.from(rateLimiter.entries())
    .filter(([k, t]) => k.startsWith(key) && t > windowStart)
    .length;
    
  if (count >= limit) return false;
  
  // Add new timestamp
  rateLimiter.set(`${key}_${now}`, now);
  return true;
};

// Analytics helper
export const logAnalytics = async (event: string, data: any) => {
  try {
    const { error } = await supabase
      .from('analytics')
      .insert([{
        event,
        data,
        user_id: supabase.auth.getUser()?.data?.user?.id,
        timestamp: new Date()
      }]);
      
    if (error) throw error;
  } catch (err) {
    console.error('Analytics error:', err);
  }
};