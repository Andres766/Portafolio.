import fs from 'node:fs'
import path from 'node:path'

export async function GET() {
  try {
    const logsPath = path.join(process.cwd(), '.tmp', 'contact-dev-log.jsonl')
    const exists = await fs.promises
      .access(logsPath, fs.constants.F_OK)
      .then(() => true)
      .catch(() => false)

    if (!exists) {
      return Response.json({ logs: [] }, { status: 200 })
    }

    const content = await fs.promises.readFile(logsPath, 'utf8')
    const lines = content.split(/\r?\n/).filter(Boolean)
    const logs = lines.map((l) => {
      try { return JSON.parse(l) } catch { return { raw: l } }
    })
    return Response.json({ logs }, { status: 200 })
  } catch (err: any) {
    return Response.json({ error: err?.message || 'No se pudieron leer los logs.' }, { status: 500 })
  }
}

export async function DELETE() {
  try {
    const logsPath = path.join(process.cwd(), '.tmp', 'contact-dev-log.jsonl')
    await fs.promises.rm(logsPath, { force: true })
    return Response.json({ ok: true }, { status: 200 })
  } catch (err: any) {
    return Response.json({ error: err?.message || 'No se pudieron limpiar los logs.' }, { status: 500 })
  }
}