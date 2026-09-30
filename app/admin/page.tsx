import Admin from '@/components/Admin';
import { isAdmin } from '@/lib/security';
export const dynamic='force-dynamic';
export default async function Page(){return <Admin authenticated={await isAdmin()}/>}
