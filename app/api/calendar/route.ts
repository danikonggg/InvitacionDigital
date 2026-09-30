import { calendarContent } from '@/lib/event';
export function GET(){return new Response(calendarContent(),{headers:{'Content-Type':'text/calendar; charset=utf-8','Content-Disposition':'attachment; filename="nuestros-xv.ics"','Cache-Control':'no-store'}})}
