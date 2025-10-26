import fs from 'node:fs'
import path from 'node:path'

export async function GET() {
  try {
    const logsDir = path.join(process.cwd(), '.tmp')
    const logFile = path.join(logsDir, 'contact-dev-log.jsonl')
    const exists = await fs.promises
      .access(logFile, fs.constants.F_OK)
      .then(() => true)
      .catch(() => false)
    if (!exists) return Response.json({ logs: [] }, { status: 200 })

    const data = await fs.promises.readFile(logFile, 'utf8')
    const lines = data.split('\n').filter(Boolean)
    const logs = lines.map((l) => JSON.parse(l))
    return Response.json({ logs }, { status: 200 })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'No se pudieron leer los logs.'
    return Response.json({ error: message }, { status: 500 })
  }
}

export async function DELETE() {
  try {
    const logsDir = path.join(process.cwd(), '.tmp')
    const logFile = path.join(logsDir, 'contact-dev-log.jsonl')
    await fs.promises.rm(logFile, { force: true })
    return Response.json({ ok: true }, { status: 200 })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'No se pudieron limpiar los logs.'
    return Response.json({ error: message }, { status: 500 })
  }
}