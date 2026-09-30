import {test} from 'node:test';
import assert from 'node:assert/strict';
import {zonedInstant,calendarContent} from '../lib/event';
import {rsvpSchema} from '../lib/validation';
test('event wall time resolves independently of visitor timezone',()=>{assert.equal(zonedInstant('2026-11-28','19:00','America/Mexico_City').toISOString(),'2026-11-29T01:00:00.000Z');assert.equal(zonedInstant('2026-07-01','19:00','America/New_York').toISOString(),'2026-07-01T23:00:00.000Z')});
test('calendar contains valid UTC event start and CRLF',()=>{assert.match(calendarContent(),/DTSTART:20261129T000000Z\r\n/);assert.match(calendarContent(),/BEGIN:VEVENT/)});
test('RSVP enforces attendance counts and upper bound',()=>{const base={guest_name:'Invitado Prueba',attendance:true,guest_count:1};assert.equal(rsvpSchema.safeParse(base).success,true);for(const count of [0,7,1.5,-1])assert.equal(rsvpSchema.safeParse({...base,guest_count:count}).success,false);assert.equal(rsvpSchema.safeParse({...base,attendance:false,guest_count:0}).success,true);assert.equal(rsvpSchema.safeParse({...base,attendance:false}).success,false)});
test('RSVP sanitizes control/markup characters and rejects honeypot',()=>{const base={guest_name:'  <Ana>\u0000  ',attendance:true,guest_count:1};assert.equal(rsvpSchema.parse(base).guest_name,'Ana');assert.equal(rsvpSchema.safeParse({...base,website:'spam'}).success,false);assert.equal(rsvpSchema.safeParse({...base,message:'a'.repeat(1001)}).success,false)});
