
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://ynainbculjxxrcbvxfjf.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InluYWluYmN1bGp4eHJjYnZ4ZmpmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA2MzU5NTcsImV4cCI6MjA1NjIxMTk1N30.PY0e803dKLbJP06h5AyQwPPU2qagoAwboZMuQW1QUdE";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
