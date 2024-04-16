import {createClient} from '@supabase/supabase-js'
import {env} from "../../utils/env.ts";

const supabase = createClient(env.SUPABASE_PROJECT_URL, env.SUPABASE_API_KEY)

export default supabase

