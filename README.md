# Portafolio — Andres Cordoba

Proyecto construido con Next.js (App Router), Tailwind v4 y React Icons. Incluye un formulario de contacto funcional con envío de correo mediante Resend y modo desarrollo con logs.

## Requisitos
- Node.js 18+
- Cuenta en Resend (opcional para enviar correos reales)

## Instalación
```bash
npm install
```

## Desarrollo
```bash
npm run dev
```
Abre `http://localhost:3000`.

## Variables de entorno
Copia `.env.example` a `.env.local` y completa:
- `RESEND_API_KEY`: API Key de Resend. Si está vacío en desarrollo, el backend entra en modo mock (no envía correos, solo loggea).
- `CONTACT_EMAIL`: Correo que recibirá los mensajes del formulario.
- `RESEND_FROM`: Remitente del correo. Para pruebas sin dominio verificado puedes usar `Portfolio <onboarding@resend.dev>`.

## Formulario de contacto
Ubicado en la sección "Contacto" de `src/app/page.tsx`. Todos los campos son obligatorios: `nombre`, `email`, `mensaje`.

### Endpoint
- `POST /api/contact`
  - Body JSON: `{ name: string, email: string, message: string }`
  - Respuestas:
    - `200`: `{ ok: true, id: string }` (enviado o mock en dev)
    - `400`: `{ error: '...' }` (faltan campos)
    - `500`: `{ error: '...' }` (error de servidor o falta `RESEND_API_KEY` en producción)

### Envío de correo
- En modo real: requiere `RESEND_API_KEY`, envía a `CONTACT_EMAIL` con `replyTo` = `email` del formulario.
- En modo dev sin clave: guarda el envío en `.tmp/contact-dev-log.jsonl` y responde OK sin enviar el correo.

## Logs de desarrollo
Archivo: `/.tmp/contact-dev-log.jsonl` (ya ignorado en `.gitignore`).

Endpoints:
- `GET /api/contact/logs`: devuelve los logs parseados.
- `DELETE /api/contact/logs`: borra el archivo de logs.

## Pruebas rápidas
1. Desarrollando sin `RESEND_API_KEY`:
   - Completa el formulario y envía.
   - Revisa `GET /api/contact/logs` para ver la entrada del mock.
2. Envío real:
   - Configura `.env.local` con `RESEND_API_KEY`, `CONTACT_EMAIL`, `RESEND_FROM`.
   - Reinicia `npm run dev`.
   - Envía desde el formulario y verifica en tu bandeja de `CONTACT_EMAIL`.

## Estructura relevante
- `src/app/page.tsx`: UI principal y formulario.
- `src/app/api/contact/route.ts`: API de contacto (Resend + modo dev).
- `src/app/api/contact/logs/route.ts`: lectura y limpieza de logs de desarrollo.
- `src/app/layout.tsx`: fuentes y metadatos.
- `src/app/globals.css`: estilos globales (Tailwind v4 + efectos).

## Despliegue
Configura las mismas variables de entorno (`RESEND_API_KEY`, `CONTACT_EMAIL`, `RESEND_FROM`) en tu plataforma de despliegue (por ejemplo Vercel) y usa `next build`/`next start`.

## Notas
- El proyecto usa Turbopack (`next dev --turbopack`).
- Si el puerto 3000 está ocupado, puedes lanzar el dev server en otro puerto: `npm run dev -- -p 3001`.
