import type { NextConfig } from 'next';
const config: NextConfig = { allowedDevOrigins: ['192.168.1.57'], images: { formats: ['image/avif', 'image/webp'] }, poweredByHeader: false, async headers() { return [{ source: '/:path*', headers: [{key:'X-Content-Type-Options',value:'nosniff'},{key:'Referrer-Policy',value:'strict-origin-when-cross-origin'},{key:'X-Frame-Options',value:'DENY'}] }]; } };
export default config;
