import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Ce client a les droits "Super Admin" (ignore la RLS)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);