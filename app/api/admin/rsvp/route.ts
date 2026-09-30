import { isAdmin } from '@/lib/security';
import { database } from '@/lib/supabase';
export const dynamic='force-dynamic';
export async function GET(){if(!await isAdmin())return Response.json({error:'Inicia sesión para continuar.'},{status:401});try{let rows:unknown[]=[];for(let from=0;;from+=1000){const {data,error}=await database().from('rsvp').select('id,guest_name,attendance,guest_count,message,dietary_restrictions,created_at').order('created_at',{ascending:false}).range(from,from+999);if(error)throw error;rows=rows.concat(data||[]);if(!data||data.length<1000)break}return Response.json({rows},{headers:{'Cache-Control':'private, no-store'}})}catch{return Response.json({error:'No fue posible consultar las confirmaciones.'},{status:503})}}
