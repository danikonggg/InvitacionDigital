import { notFound } from 'next/navigation';
// Reserved for DB-backed, hashed, expiring guest invitation tokens.
// No token is accepted until the real verification and allocation model is configured.
export default function GuestInvitation(){notFound()}
