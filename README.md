# Nuestros XV años

Invitación editorial mobile-first. Next.js App Router, React, TypeScript, Tailwind CSS, Motion, GSAP y Supabase.

## Desarrollo

```sh
npm install
cp .env.example .env.local
npm run dev
```

Abrir http://localhost:3000. Verificación: `npm test`, `npm run typecheck`, `npm run build`.

## Configuración del evento

Editar `config/eventConfig.ts`: nombre, iniciales, tipo de evento, zona horaria, lugares, enlaces, colores, textos, itinerario, dress code, imágenes, música y límite de personas.

La zona `America/Mexico_City` corresponde a Buenavista, Jalisco, México, ciudad confirmada por los anfitriones. La cuenta regresiva convierte la fecha local del evento a un instante UTC mediante la zona IANA. El calendario no inventa hora de fin.

Los archivos reales se colocan en `public/` y se referencian con `/archivo.webp` o `/cancion.mp3`. Las fotografías se optimizan mediante Next/Image a WebP/AVIF. No usar fotografías de otras personas como protagonistas. Música y mapas están desactivados sin URL. Cada lugar admite `mapsUrl` para el botón y `mapEmbedUrl` para el iframe oficial de Google Maps (Compartir → Insertar un mapa → copiar el src). Sin iframe, se muestra un espacio pendiente, nunca un mapa inventado. Dress code oculto hasta definirlo. Las imágenes remotas necesitan un `remotePatterns` explícito en `next.config.ts`.

## Supabase y RSVP

1. Crear un proyecto Supabase y ejecutar `supabase/schema.sql` en SQL Editor.
2. Configurar `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `SUPABASE_ANON_KEY` exclusivamente en el servidor (`.env.local` en desarrollo).
3. Crear el usuario anfitrión en Supabase Auth; incluir su UUID en `ADMIN_USER_IDS`. No hay registro público de administradores.
4. Configurar `NEXT_PUBLIC_SITE_URL` con el origen HTTPS real, sin ruta.
5. Abrir `/admin` e iniciar sesión con ese usuario.

`SUPABASE_SERVICE_ROLE_KEY` nunca lleva prefijo NEXT_PUBLIC. La tabla tiene RLS sin políticas públicas y permisos revocados a anon/authenticated. Solo el servidor accede a los registros. El endpoint de administración verifica el token con Supabase Auth y una lista de UUID permitidos en cada solicitud. La cookie es HttpOnly, Secure en producción, SameSite=Strict y vence junto con el token. Al vencer, se requiere iniciar sesión nuevamente.

El formulario valida datos en cliente y servidor, impone límites de tamaño, rechaza su honeypot y solicitudes de otro origen. El índice único normaliza mayúsculas y espacios del nombre para evitar duplicados básicos y carreras. Dos invitados con igual nombre deben contactar al anfitrión. Esto no verifica identidad ni impide abuso automatizado distribuido: antes de difusión pública, añadir rate limiting/WAF o Turnstile según el entorno. La invitación es privada por intención, con noindex/nofollow, pero esos metadatos NO constituyen control de acceso.

El máximo de personas debe mantenerse alineado entre eventConfig y el check de guest_count del esquema SQL. El número incluye al invitado principal; una negativa guarda cero. El panel pagina la consulta de base de datos y calcula los totales del conjunto completo. Exporta CSV con neutralización de prefijos de fórmulas.

Sin Supabase configurado, el RSVP devuelve un error claro: nunca muestra un éxito ficticio ni guarda respuestas en localStorage.

## Privacidad y tokens

`/i/[token]` está reservado y devuelve 404. Para activarlo, agregar una tabla de invitaciones con hash criptográfico de token aleatorio, vencimiento, cupo y vínculo a RSVP; verificar en servidor y no filtrar datos en URLs, metadatos ni registros. No se aceptan tokens arbitrarios como credenciales.

Los anfitriones deben definir conservación y eliminación de mensajes y restricciones alimentarias. No hay analíticas ni trackers integrados.

## Despliegue

Aplicación Next.js con servidor: necesita un proveedor compatible con Node.js (por ejemplo Vercel o Node con `npm run build && npm start`) o un adaptador Cloudflare compatible. No exportar como sitio estático: perdería RSVP, autenticación y calendario. Inyectar las variables de entorno antes de probar la integración.

Open Graph se genera en `/opengraph-image` como PNG; cambia con la configuración del nombre e iniciales. Confirmar el dominio HTTPS y los datos definitivos antes de compartir por WhatsApp. El acceso privado del proveedor de hosting puede impedir que WhatsApp lea el preview; se necesita permitir públicamente la metadata/imagen o publicar la invitación con una estrategia real de acceso por token.

## QA pendiente de datos externos

Para validar de extremo a extremo: probar un RSVP afirmativo y uno negativo contra el proyecto real; confirmar deduplicación; verificar que anon no lee la tabla y un Auth user no autorizado recibe 401; revisar totales/CSV con anfitrión autorizado. Probar canción real en Safari iPhone, fotos reales, Maps y preview de WhatsApp en el dominio definitivo. No se puede certificar rendimiento de fotos o música ausentes.
