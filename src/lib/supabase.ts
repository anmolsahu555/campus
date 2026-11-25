import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey && supabaseUrl !== 'YOUR_SUPABASE_URL');

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Supabase SQL Schema setup reference for Campus Connect:
 * 
 * CREATE TABLE events (
 *   id TEXT PRIMARY KEY,
 *   title TEXT NOT NULL,
 *   category TEXT NOT NULL,
 *   date TEXT NOT NULL,
 *   timing TEXT NOT NULL,
 *   last_date TEXT NOT NULL,
 *   venue TEXT NOT NULL,
 *   capacity INTEGER NOT NULL,
 *   registered_count INTEGER DEFAULT 0,
 *   description TEXT,
 *   banner_image TEXT,
 *   organizer_name TEXT,
 *   status TEXT DEFAULT 'Active',
 *   tags TEXT[]
 * );
 * 
 * CREATE TABLE registrations (
 *   id TEXT PRIMARY KEY,
 *   event_id TEXT REFERENCES events(id) ON DELETE CASCADE,
 *   event_title TEXT NOT NULL,
 *   event_date TEXT NOT NULL,
 *   venue TEXT,
 *   student_name TEXT NOT NULL,
 *   roll_no TEXT NOT NULL,
 *   department TEXT NOT NULL,
 *   email TEXT NOT NULL,
 *   phone TEXT,
 *   registration_date TEXT NOT NULL,
 *   qr_code TEXT NOT NULL
 * );
 */
