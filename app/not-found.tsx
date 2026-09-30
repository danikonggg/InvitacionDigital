import { eventConfig as e } from '@/config/eventConfig';
export default function NotFound(){return <main className="admin-page"><p className="eyebrow">{e.eventName}</p><h1>Invitación no disponible.</h1><p>Este enlace no está activo. Solicita a los anfitriones el enlace de tu invitación.</p><a href="/" className="text-link">Ir al inicio</a></main>}
