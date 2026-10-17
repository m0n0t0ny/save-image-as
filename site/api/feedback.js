// Riceve il motivo scelto nella pagina di disinstallazione e lo conta su Upstash Redis.
// Non salva IP, user agent o altri dati: solo motivo, versione, lingua e l'eventuale nota scritta dall'utente.

const REASONS = 6;
const MAX_NOTE = 500;
const MAX_NOTES_KEPT = 500;

function redisConfig() {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url, token } : null;
}

async function pipeline(cfg, commands) {
  const res = await fetch(`${cfg.url}/pipeline`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${cfg.token}`, 'Content-Type': 'application/json' },
    body: JSON.stringify(commands)
  });
  if (!res.ok) throw new Error(`Redis ${res.status}`);
}

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false });
  }

  const cfg = redisConfig();
  if (!cfg) return res.status(503).json({ ok: false });

  const body = typeof req.body === 'string' ? safeParse(req.body) : req.body || {};
  const reason = Number(body.reason);
  if (!Number.isInteger(reason) || reason < 0 || reason >= REASONS) return res.status(400).json({ ok: false });

  const version = String(body.v || 'unknown').replace(/[^0-9.]/g, '').slice(0, 16) || 'unknown';
  const lang = String(body.lang || '').toLowerCase().replace(/[^a-z]/g, '').slice(0, 2) || 'xx';
  const note = typeof body.note === 'string' ? body.note.trim().slice(0, MAX_NOTE) : '';

  // Il primo invio conta il motivo; il secondo, facoltativo, aggiunge solo la nota
  const commands = note
    ? [
        ['LPUSH', 'feedback:notes', JSON.stringify({ day: new Date().toISOString().slice(0, 10), reason, version, lang, note })],
        ['LTRIM', 'feedback:notes', 0, MAX_NOTES_KEPT - 1]
      ]
    : [
        ['HINCRBY', 'feedback:reasons', String(reason), 1],
        ['HINCRBY', `feedback:reasons:v${version}`, String(reason), 1],
        ['HINCRBY', `feedback:reasons:${lang}`, String(reason), 1]
      ];

  try {
    await pipeline(cfg, commands);
    return res.status(200).json({ ok: true });
  } catch {
    return res.status(502).json({ ok: false });
  }
};

function safeParse(text) {
  try { return JSON.parse(text); } catch { return {}; }
}
