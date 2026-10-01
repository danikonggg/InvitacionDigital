import type { Metadata } from 'next';
import { eventConfig as e } from '@/config/eventConfig';
import '@fontsource/cormorant-garamond/latin-400.css';
import '@fontsource/cormorant-garamond/latin-400-italic.css';
import '@fontsource/manrope/latin-400.css';
import '@fontsource/manrope/latin-500.css';
import './globals.css';
const title = `${e.celebrant} · Nuestros XV años`;
const description = 'Acompáñanos a celebrar nuestros XV años el 28 de noviembre de 2026 en Buenavista, Jalisco. Consulta los detalles y confirma tu asistencia.';
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://invitacion-digital-sable.vercel.app'),
  title, description,
  robots: e.private ? { index: false, follow: false } : { index: true, follow: true },
  openGraph: { title, description, locale: 'es_MX', type: 'website', siteName: 'XV años de Evelin y Estrella' },
  twitter: { card: 'summary_large_image', title, description, images: [{ url: '/opengraph-image', alt: 'Evelin y Estrella · 28 de noviembre de 2026' }] },
  icons: { icon: '/icon.svg' },
};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="es"><body style={{'--wine':e.colors.wine,'--burgundy':e.colors.burgundy,'--ivory':e.colors.ivory,'--champagne':e.colors.champagne,'--gold':e.colors.gold,'--ink':e.colors.ink} as React.CSSProperties}>{children}</body></html>}
