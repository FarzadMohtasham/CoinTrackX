import {z} from 'zod'

const envSchema = z.object({
    IS_PRODUCTION: z.boolean().default(false).readonly(),
    SUPABASE_PROJECT_URL: z.string().default('https://zwrleecsvygsftotatty.supabase.co').readonly(),
    SUPABASE_API_KEY: z.string().default('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp3cmxlZWNzdnlnc2Z0b3RhdHR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTMyNjgzMzgsImV4cCI6MjAyODg0NDMzOH0.wBXhT_krBgiAWZqCN5XVDcidWJmXLNcRs6GnjfJEPx8').readonly(),
    User_Auth_Local_Storage: z.string().default('sb-zwrleecsvygsftotatty-auth-token').readonly(),
})

const env = envSchema.parse({})

export default env