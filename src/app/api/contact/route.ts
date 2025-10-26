import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import fs from 'node:fs'
import path from 'node:path'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const name = (body?.name || '').trim()
    const email = (body?.email || '').trim()
    const message = (body?.message || '').trim()

    if (!name || !message || !email) {
      return Response.json({ error: 'Nombre, email y mensaje son requeridos.' }, { status: 400 })
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY
    const CONTACT_EMAIL = process.env.CONTACT_EMAIL || 'andsebas1128@hotmail.com'
    const RESEND_FROM = process.env.RESEND_FROM || 'Portfolio <onboarding@resend.dev>'

    // Dev logging setup
    const logsDir = path.join(process.cwd(), '.tmp')
    const logFile = path.join(logsDir, 'contact-dev-log.jsonl')
    const log = async (entry: any) => {
      try {
        await fs.promises.mkdir(logsDir, { recursive: true })
        await fs.promises.appendFile(logFile, JSON.stringify({ ts: new Date().toISOString(), ...entry }) + '\n', 'utf8')
      } catch {}
    }

    // Dev fallback: allow local testing without sending real emails
    if (!RESEND_API_KEY) {
      if (process.env.NODE_ENV !== 'production') {
        await log({ name, email, message, status: 200, mode: 'dev-mock' })
        return Response.json({ ok: true, message: 'Dev mode: mensaje recibido (mock).', id: 'dev-mock' }, { status: 200 })
      }
      await log({ name, email, message, status: 500, error: 'Falta RESEND_API_KEY' })
      return Response.json({ error: 'Falta RESEND_API_KEY en variables de entorno' }, { status: 500 })
    }

    const resend = new Resend(RESEND_API_KEY)

    const result = await resend.emails.send({
      from: RESEND_FROM,
      to: CONTACT_EMAIL,
      subject: `Nuevo mensaje de ${name}`,
      text: message,
      replyTo: email,
    })

    if (result?.error) {
      await log({ name, email, message, status: 500, error: result.error?.message })
      return Response.json({ error: result.error?.message || 'No se pudo enviar el email.' }, { status: 500 })
    }

    await log({ name, email, message, status: 200, id: result?.data?.id || 'sent' })
    return Response.json({ ok: true, id: result?.data?.id || 'sent' }, { status: 200 })
  } catch (err: any) {
    const message = err?.message || 'Error interno del servidor.'
    return Response.json({ error: message }, { status: 500 })
  }
}