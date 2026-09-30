import 'server-only';
import { createClient } from '@supabase/supabase-js';
export function database(){const url=process.env.SUPABASE_URL;const key=process.env.SUPABASE_SERVICE_ROLE_KEY;if(!url||!key)throw new Error('SUPABASE_NOT_CONFIGURED');return createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}})}
export function authClient(){const url=process.env.SUPABASE_URL;const key=process.env.SUPABASE_ANON_KEY;if(!url||!key)throw new Error('SUPABASE_NOT_CONFIGURED');return createClient(url,key,{auth:{persistSession:false,autoRefreshToken:false}})}
