import {createClient} from '@supabase/supabase-js'

// export const supabaseClient = createClient(import.meta.env.VITE_SUPABASE_PROJECT_URL, import.meta.env.VITE_SUPABASE_API_KEY)

export const supabaseClient = createClient('https://zwrleecsvygsftotatty.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3cmxlZWNzdnlnc2Z0b3RhdHR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMyNjgzMzgsImV4cCI6MjAyODg0NDMzOH0.wBXhT_krBgiAWZqCN5XVDcidWJmXLNcRs6GnjfJEPx8')