import {createClient} from '@supabase/supabase-js'

export const supabaseClient = createClient(import.meta.env.VITE_SUPABASE_PROJECT_URL, import.meta.env.VITE_SUPABASE_API_KEY)