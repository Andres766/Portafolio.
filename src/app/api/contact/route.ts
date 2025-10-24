import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(req: NextRequest) {
  try {
    const { name, message } = await req.json()

    if (!name || !message) {
      return NextResponse.json({ error: 'Faltan campos requeridos' }, { status: 400 })
    }

    const apiKey = process.env.RESEND_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: 'Falta RESEND_API_KEY en variables de entorno' }, { status: 500 })
    }

    const resend = new Resend(apiKey)

    const text = `Nuevo mensaje desde el portafolio\n\nNombre: ${name}\n\nMensaje:\n${message}`

    await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: 'andsebas1128@hotmail.com',
      subject: 'Nuevo mensaje del portafolio',
      text,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Error enviando correo:', err)
    return NextResponse.json({ error: 'No se pudo enviar el correo' }, { status: 500 })
  }
}