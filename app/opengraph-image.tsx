import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { eventConfig as e } from '@/config/eventConfig';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Evelin y Estrella juntas · Nuestros XV años · 28 de noviembre de 2026';
const photo = await readFile(join(process.cwd(), 'public', e.cover.src), 'base64');

export default function Image() {
  return new ImageResponse(
    <div style={{ display: 'flex', width: '100%', height: '100%', background: '#35151D', color: '#F4EFE6', padding: 20 }}>
      <img src={`data:image/jpeg;base64,${photo}`} alt="Evelin y Estrella" width={456} height={590} style={{ objectFit: 'cover' }} />
      <div style={{ display: 'flex', flex: 1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid #A98755', marginLeft: 20, padding: 24 }}>
        <div style={{ fontSize: 20, letterSpacing: 5, color: '#C6AA78', marginBottom: 24 }}>NUESTROS XV AÑOS</div>
        <div style={{ fontSize: 78, fontFamily: 'serif' }}>Evelin</div>
        <div style={{ fontSize: 36, color: '#C6AA78', fontFamily: 'serif' }}>&amp;</div>
        <div style={{ fontSize: 78, fontFamily: 'serif' }}>Estrella</div>
        <div style={{ width: 70, height: 1, background: '#C6AA78', marginTop: 28, marginBottom: 28 }} />
        <div style={{ fontSize: 24, letterSpacing: 2 }}>28 NOVIEMBRE 2026</div>
        <div style={{ fontSize: 21, color: '#C6AA78', marginTop: 22 }}>Una noche para recordar</div>
      </div>
    </div>, size
  );
}
