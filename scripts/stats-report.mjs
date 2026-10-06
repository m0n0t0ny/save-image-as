// Report mensile dai CSV esportati dalla Dashboard del Chrome Web Store.
// Uso: node scripts/stats-report.mjs <cartella-con-i-csv>
import fs from 'fs';
import path from 'path';

const dir = process.argv[2];
if (!dir || !fs.existsSync(dir)) {
  console.error('Uso: node scripts/stats-report.mjs <cartella-con-i-csv>');
  process.exit(1);
}

const files = fs.readdirSync(dir).filter(f => f.endsWith('.csv'));

// Legge un CSV della dashboard: riga 1 titolo, riga 2 intestazioni, poi una riga per giorno.
// Le righe con tutti zero sono buchi nei dati della dashboard e vengono scartate.
function load(prefix) {
  const file = files.find(f => f.startsWith(prefix + '_'));
  if (!file) return null;
  const lines = fs.readFileSync(path.join(dir, file), 'utf8').trim().split(/\r?\n/);
  const headers = lines[1].split(',').slice(1);
  const rows = lines.slice(2).map(line => {
    const [date, ...vals] = line.split(',');
    return { date, values: vals.map(Number) };
  }).filter(r => r.values.some(v => v !== 0));
  return { headers, rows };
}

const col = (t, i = 0) => t ? t.rows.map(r => r.values[i]) : [];
const sum = a => a.reduce((x, y) => x + y, 0);
const avg = a => a.length ? sum(a) / a.length : 0;
const pct = (a, b) => b ? (100 * a / b).toFixed(1) + '%' : 'n/d';
const fmt = n => Math.round(n).toLocaleString('it-IT');

const out = [];
const line = (k, v) => out.push(`${k.padEnd(38)} ${v}`);

const weekly = load('Utenti settimanali nel tempo');
if (weekly) {
  const w = col(weekly);
  line('Utenti settimanali (inizio > fine)', `${fmt(w[0])} > ${fmt(w.at(-1))} (${pct(w.at(-1) - w[0], w[0])})`);
  line('Utenti settimanali (massimo)', fmt(Math.max(...w)));
}

const daily = load("Utenti giornalieri per versione dell'elemento");
if (daily) {
  const totals = daily.rows.map(r => sum(r.values));
  line('Versioni attive', daily.headers.join(', '));
  if (weekly) line('Utenti giornalieri / settimanali', pct(totals.at(-1), col(weekly).at(-1)));
  const weekday = [], weekend = [];
  daily.rows.forEach((r, i) => {
    const [d, m, y] = r.date.split('/').map(Number);
    const day = new Date(2000 + y, m - 1, d).getDay();
    (day === 0 || day === 6 ? weekend : weekday).push(totals[i]);
  });
  line('Utenti giornalieri feriali / weekend', `${fmt(avg(weekday))} / ${fmt(avg(weekend))}`);
}

const installs = load('Installazioni');
const uninstalls = load('Disinstallazioni');
if (installs) line('Installazioni (totale, media/giorno)', `${fmt(sum(col(installs)))}, ${avg(col(installs)).toFixed(1)}`);
if (uninstalls) line('Disinstallazioni', fmt(sum(col(uninstalls))));
if (installs && uninstalls) line('Disinstallazioni / installazioni', pct(sum(col(uninstalls)), sum(col(installs))));

const impressions = load('Impressioni sul Chrome Web Store');
const views = load('Visualizzazioni di pagina');
if (impressions) line('Impressioni', fmt(sum(col(impressions))));
if (views) line('Visualizzazioni pagina', fmt(sum(col(views))));
if (impressions && views) line('CTR impressioni > visualizzazioni', pct(sum(col(views)), sum(col(impressions))));

const active = load('Attivate - disattivate');
if (active) {
  const on = col(active, 0), off = col(active, 1);
  line('Disattivati / attivati (inizio > fine)', `${pct(off[0], on[0])} > ${pct(off.at(-1), on.at(-1))}`);
}

// Classifiche per lingua e regione: ultimo giorno disponibile e variazione dal primo
for (const [prefix, label] of [['Utenti settimanali per lingua', 'lingua'], ['Utenti settimanali per regione', 'regione']]) {
  const t = load(prefix);
  if (!t) continue;
  const first = t.rows[0].values, last = t.rows.at(-1).values;
  const top = t.headers
    .map((h, i) => ({ h, last: last[i], delta: last[i] - first[i] }))
    .sort((a, b) => b.last - a.last)
    .slice(0, 8);
  out.push('', `Top ${label} (utenti settimanali, variazione nel periodo):`);
  top.forEach(x => out.push(`  ${x.h.padEnd(26)} ${fmt(x.last).padStart(6)}  ${x.delta >= 0 ? '+' : ''}${x.delta}`));
}

const period = weekly ? `${weekly.rows[0].date} - ${weekly.rows.at(-1).date}` : dir;
console.log(`Report Chrome Web Store, periodo ${period}\n`);
console.log(out.join('\n'));
