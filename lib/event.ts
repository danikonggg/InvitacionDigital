import { eventConfig as e } from '@/config/eventConfig';
// Resolve the configured wall time in its IANA zone instead of relying on the visitor's zone.
export function zonedInstant(date: string, time: string, timeZone: string): Date {
 const desired = new Date(`${date}T${time}:00Z`); let timestamp = desired.getTime();
 const formatter = new Intl.DateTimeFormat('en-CA', { timeZone, year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23' });
 for(let i=0;i<3;i++){ const parts=Object.fromEntries(formatter.formatToParts(new Date(timestamp)).map(p=>[p.type,p.value])); const represented=Date.UTC(+parts.year,+parts.month-1,+parts.day,+parts.hour,+parts.minute,+parts.second); timestamp += desired.getTime()-represented; }
 return new Date(timestamp);
}
export const eventStart = () => zonedInstant(e.date,e.ceremony.time,e.timeZone);
export const dateLabel = (options: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat('es-MX', { ...options,timeZone:e.timeZone }).format(eventStart());
export const calendarStamp = (d:Date) => d.toISOString().replace(/[-:]/g,'').replace(/\.\d{3}/,'');
export function calendarContent(){ const escape=(s:string)=>s.replace(/\\/g,'\\\\').replace(/\n/g,'\\n').replace(/,/g,'\\,').replace(/;/g,'\\;'); return ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Nuestros XV//ES','CALSCALE:GREGORIAN','BEGIN:VEVENT',`UID:${e.date}-celebracion@invitacion.local`,`DTSTAMP:${calendarStamp(new Date())}`,`DTSTART:${calendarStamp(eventStart())}`,`SUMMARY:${escape(`${e.celebrant} — ${e.eventName}`)}`,`LOCATION:${escape(e.ceremony.name)}`,`DESCRIPTION:${escape(`Ceremonia ${e.ceremony.label}: ${e.ceremony.name}. Recepción ${e.reception.label}: ${e.reception.name}.`)}`,'END:VEVENT','END:VCALENDAR',''].join('\r\n'); }
