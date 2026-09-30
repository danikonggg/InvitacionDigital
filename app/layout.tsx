import type { Metadata } from 'next';
import { eventConfig as e } from '@/config/eventConfig';
import '@fontsource/cormorant-garamond/latin-400.css';
import '@fontsource/cormorant-garamond/latin-400-italic.css';
import '@fontsource/manrope/latin-400.css';
import '@fontsource/manrope/latin-500.css';
import './globals.css';
export const metadata: Metadata = { metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),title: `${e.celebrant} · ${e.eventType}`,description:`28 de noviembre de 2026. ${e.messages.hero}`,robots:e.private?{index:false,follow:false}:{index:true,follow:true},openGraph:{title:`${e.celebrant} · ${e.eventType}`,description:e.messages.hero,locale:'es_MX',type:'website'},twitter:{card:'summary_large_image'},icons:{icon:'/icon.svg'} };
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="es"><body style={{'--wine':e.colors.wine,'--burgundy':e.colors.burgundy,'--ivory':e.colors.ivory,'--champagne':e.colors.champagne,'--gold':e.colors.gold,'--ink':e.colors.ink} as React.CSSProperties}>{children}</body></html>}
