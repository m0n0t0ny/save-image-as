const params = new URLSearchParams(location.search);
const tabId = parseInt(params.get('tabId'));
const tabUrl = params.get('tabUrl') || '';

// La novità del download in blocco è stata vista: toglie badge ed etichette "nuovo"
chrome.runtime.sendMessage({ action: 'bulkSeen' });

// ─── TESTI ─────────────────────────────────────────────────────────────────────

const t = (key, ...subs) => chrome.i18n.getMessage(key, subs.map(String)) || key;

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

document.documentElement.lang = chrome.i18n.getUILanguage();
document.querySelectorAll('[data-i18n]').forEach(el => {
  const msg = chrome.i18n.getMessage(el.dataset.i18n);
  if (msg) el.textContent = msg;
});
document.querySelectorAll('[data-i18n-title]').forEach(el => {
  const msg = chrome.i18n.getMessage(el.dataset.i18nTitle);
  if (msg) el.title = msg;
});

// ─── ELEMENTI E STATO ──────────────────────────────────────────────────────────

const $ = id => document.getElementById(id);
const layerDepthInput = $('layerDepth');
const layerDepthVal = $('layerDepthVal');
const depthHint = $('depthHint');
const minSizeInput = $('minSize');
const dedupImages = $('dedupImages');
const bestPictureFormat = $('bestPictureFormat');
const excludeIcons = $('excludeIcons');
const excludeSvg = $('excludeSvg');
const excludeCss = $('excludeCss');
const scanBtn = $('scanBtn');
const mainEl = $('main');
const selectAllBtn = $('selectAll');
const deselectAllBtn = $('deselectAll');
const formatSelect = $('format');
const modeSelect = $('downloadMode');
const askNote = $('askNote');
const statusEl = $('status');
const downloadBtn = $('downloadBtn');

let rawImages = [];      // tutte le immagini trovate, senza doppioni esatti
let allImages = [];      // dopo l'unione delle immagini simili
let filteredImages = []; // dopo i filtri: sono le immagini mostrate, nell'ordine della griglia
const formatByUrl = new Map(); // formato dichiarato dal server, per URL
let formatEls = new Map();     // URL -> etichetta del formato nella griglia

try {
  const u = new URL(tabUrl);
  $('pageUrl').textContent = u.hostname + u.pathname;
} catch (e) {
  $('pageUrl').textContent = tabUrl;
}

// ─── PROFONDITÀ ────────────────────────────────────────────────────────────────
// Cursore: 0 = tutti i livelli, 1 = solo pagina principale, 2 = pagina + 1 livello di iframe...

function maxDepthFromSlider() {
  const v = parseInt(layerDepthInput.value);
  return v === 0 ? Infinity : v - 1;
}

function updateDepthHint() {
  const v = parseInt(layerDepthInput.value);
  layerDepthVal.textContent = v === 0 ? t('bulkDepthAllShort') : v;
  depthHint.textContent = v === 0 ? t('bulkDepthAll') : v === 1 ? t('bulkDepthMain') : t('bulkDepthIframes', v - 1);
}

layerDepthInput.addEventListener('input', updateDepthHint);
updateDepthHint();

// ─── ANALISI DELLA PAGINA ──────────────────────────────────────────────────────

// Iniettata in ogni frame con executeScript: deve essere autosufficiente
function scanFrameImages() {
  let depth = 0;
  try {
    for (let win = window; win !== win.parent && depth <= 10; win = win.parent) depth++;
  } catch (e) { depth++; }

  const images = [];
  const seen = new Set();
  const add = (url, width, height, source, pictureGroup = null) => {
    try { url = new URL(url, location.href).href; } catch (e) { return; }
    if ((!url.startsWith('http') && !url.startsWith('data:')) || seen.has(url)) return;
    seen.add(url);
    images.push({ url, width: width || 0, height: height || 0, source, depth, pictureGroup });
  };

  const pictures = [...document.querySelectorAll('picture')];
  for (const img of document.images) {
    const url = img.currentSrc || img.src;
    if (!url) continue;
    const pic = img.closest('picture');
    add(url, img.naturalWidth || img.offsetWidth, img.naturalHeight || img.offsetHeight, 'img',
      pic ? `${depth}_${pictures.indexOf(pic)}` : null);
  }
  pictures.forEach((picture, i) => {
    for (const source of picture.querySelectorAll('source[srcset]')) {
      for (const part of source.srcset.split(',')) {
        const u = part.trim().split(/\s+/)[0];
        if (u) add(u, 0, 0, 'picture', `${depth}_${i}`);
      }
    }
  });
  // Sfondi CSS scritti nello stile dell'elemento (i fogli di stile esterni sarebbero troppo lenti)
  for (const el of document.querySelectorAll('[style*="background"]')) {
    const bg = el.style.backgroundImage;
    if (!bg || bg === 'none') continue;
    const rect = el.getBoundingClientRect();
    for (const m of bg.matchAll(/url\(["']?([^"')]+)["']?\)/g)) add(m[1], Math.round(rect.width), Math.round(rect.height), 'css');
  }
  return images;
}

async function scan() {
  if (!tabId) {
    showMessage(t('bulkNoTab'));
    return;
  }
  const maxDepth = maxDepthFromSlider();
  scanBtn.disabled = selectAllBtn.disabled = deselectAllBtn.disabled = downloadBtn.disabled = true;
  scanBtn.textContent = t('bulkScanning');
  statusEl.textContent = '';
  mainEl.innerHTML = `<div class="loading"><div class="spinner"></div><span>${escapeHtml(t('bulkScanningPage'))}</span></div>`;

  try {
    const results = await chrome.scripting.executeScript({ target: { tabId, allFrames: true }, func: scanFrameImages });
    const seen = new Set();
    rawImages = [];
    for (const { result } of results) {
      for (const img of result || []) {
        if (img.depth > maxDepth || seen.has(img.url)) continue;
        seen.add(img.url);
        img.guess = guessFormat(img.url);
        rawImages.push(img);
      }
    }
    applyDedup();
  } catch (e) {
    showMessage(t('bulkScanError', e.message));
  } finally {
    scanBtn.disabled = false;
    scanBtn.textContent = t('bulkScan');
  }
}

scanBtn.addEventListener('click', scan);

// ─── IMMAGINI SIMILI ───────────────────────────────────────────────────────────

const SIZE_PARAMS = ['w', 'h', 'width', 'height', 'size', 's', 'q', 'quality', 'resize', 'fit', 'crop', 'scale',
  'dpr', 'format', 'auto', 'fm', 'fl', 'f', 'ar', 'blur', 'sharp', 'sat', 'con', 'bri', 'trim', 'pad'];
const SOURCE_ORDER = { img: 0, picture: 1, css: 2 };
const PICTURE_FORMAT_ORDER = { JPG: 0, PNG: 1, WEBP: 2, AVIF: 3, GIF: 4 };

// Stessa chiave per le versioni ridimensionate della stessa immagine (CDN, WordPress, Shopify, Next.js, @2x)
function canonicalKey(url) {
  try {
    const u = new URL(url);
    if (u.pathname === '/_next/image' && u.searchParams.has('url')) return canonicalKey(new URL(u.searchParams.get('url'), u).href);
    SIZE_PARAMS.forEach(p => u.searchParams.delete(p));
    const path = u.pathname
      .replace(/-\d+x\d+(\.[a-z0-9]+)$/i, '$1')
      .replace(/_\d+x\d+[^.]*(\.[a-z0-9]+)$/i, '$1')
      .replace(/@\d+x(\.[a-z0-9]+)$/i, '$1')
      .replace(/-(?:scaled|small|medium|large|thumb(?:nail)?)(\.[a-z0-9]+)$/i, '$1');
    return u.hostname + path + u.search;
  } catch (e) {
    return url;
  }
}

function groupBy(items, keyOf) {
  const groups = new Map();
  for (const item of items) {
    const key = keyOf(item);
    const group = groups.get(key);
    if (group) group.push(item); else groups.set(key, [item]);
  }
  return groups;
}

// Tra le immagini simili tiene la più grande (a parità: img, poi picture, poi css)
function keepLargest(images) {
  return [...groupBy(images, img => canonicalKey(img.url)).values()].map(group => group.reduce((best, img) => {
    const diff = img.width * img.height - best.width * best.height;
    return diff > 0 || (diff === 0 && SOURCE_ORDER[img.source] < SOURCE_ORDER[best.source]) ? img : best;
  }));
}

// Per ogni <picture> tiene l'immagine scelta dal browser, altrimenti il formato più compatibile
function keepBestPicture(images) {
  const loose = images.filter(img => !img.pictureGroup);
  const groups = groupBy(images.filter(img => img.pictureGroup), img => img.pictureGroup);
  const rank = img => PICTURE_FORMAT_ORDER[img.guess] ?? 99;
  return [...loose, ...[...groups.values()].map(group =>
    group.find(img => img.source === 'img') || group.reduce((a, b) => (rank(b) < rank(a) ? b : a)))];
}

function applyDedup() {
  let images = bestPictureFormat.checked ? keepBestPicture(rawImages) : rawImages;
  if (dedupImages.checked) images = keepLargest(images);

  // La selezione resta quella fatta dall'utente; alla prima analisi è selezionata la pagina principale
  const prevSelected = new Set(allImages.filter(i => i.selected).map(i => i.url));
  allImages = images.map(img => ({ ...img, selected: prevSelected.size ? prevSelected.has(img.url) : img.depth === 0 }));
  applyFilters();
  detectFormats(allImages);
}

dedupImages.addEventListener('change', () => rawImages.length && applyDedup());
bestPictureFormat.addEventListener('change', () => rawImages.length && applyDedup());

// ─── FORMATO ───────────────────────────────────────────────────────────────────

const KNOWN_FORMATS = new Set(['jpg', 'png', 'gif', 'webp', 'avif', 'svg', 'bmp', 'ico', 'tif', 'heic']);
const FORMAT_ALIASES = { jpeg: 'jpg', jfif: 'jpg', pjpeg: 'jpg', tiff: 'tif', icon: 'ico', 'vnd.microsoft.icon': 'ico' };

function normalizeFormat(f) {
  f = (f || '').toLowerCase().replace(/^x-/, '').replace('+xml', '');
  f = FORMAT_ALIASES[f] || f;
  return KNOWN_FORMATS.has(f) ? f.toUpperCase() : null;
}

// Prima stima dall'URL: data URI, parametri dei CDN (fm, format), estensione del file
function guessFormat(url) {
  if (url.startsWith('data:')) return normalizeFormat((url.match(/^data:image\/([^;,]+)/) || [])[1]);
  try {
    const u = new URL(url);
    if (u.pathname === '/_next/image') return null; // Next.js sceglie il formato in base al browser
    return normalizeFormat(u.searchParams.get('fm') || u.searchParams.get('format'))
      || normalizeFormat((u.pathname.match(/\.([a-z0-9]+)$/i) || [])[1]);
  } catch (e) {
    return null;
  }
}

const formatOf = img => formatByUrl.get(img.url) || img.guess;

// Conferma il formato dal Content-Type del server: legge solo le intestazioni
async function detectFormat(url, guess) {
  const controller = new AbortController();
  let format = null;
  try {
    const resp = await fetch(url, { signal: controller.signal });
    const type = resp.headers.get('content-type') || '';
    controller.abort();
    if (type.startsWith('image/')) format = normalizeFormat(type.slice(6).split(';')[0].trim());
  } catch (e) { /* si tiene la stima dall'URL */ }
  format = format || guess || '?';
  formatByUrl.set(url, format);

  const el = formatEls.get(url);
  if (el) el.textContent = format;
  // Un SVG scoperto solo ora va tolto dalla griglia se il filtro è attivo
  if (format === 'SVG' && guess !== 'SVG' && excludeSvg.checked) scheduleRefilter();
}

let refilterTimer = null;
function scheduleRefilter() {
  clearTimeout(refilterTimer);
  refilterTimer = setTimeout(applyFilters, 150);
}

function detectFormats(images) {
  const queue = images.filter(img => !img.url.startsWith('data:') && !formatByUrl.has(img.url));
  const worker = async () => {
    while (queue.length) {
      const img = queue.shift();
      await detectFormat(img.url, img.guess);
    }
  };
  for (let i = 0; i < 6; i++) worker();
}

// ─── FILTRI ────────────────────────────────────────────────────────────────────

function applyFilters() {
  const minSize = parseInt(minSizeInput.value) || 0;
  filteredImages = allImages.filter(img => {
    if (excludeCss.checked && img.source === 'css') return false;
    if (excludeSvg.checked && formatOf(img) === 'SVG') return false;
    if (img.width > 0 && img.height > 0) {
      if (excludeIcons.checked && img.width <= 64 && img.height <= 64) return false;
      if (minSize > 0 && img.width < minSize && img.height < minSize) return false;
    }
    return true;
  });
  render();
}

[minSizeInput, excludeIcons, excludeSvg, excludeCss].forEach(el => el.addEventListener('change', applyFilters));

// ─── GRIGLIA ───────────────────────────────────────────────────────────────────

function showMessage(text) {
  mainEl.innerHTML = `<div class="empty-state"><p>${escapeHtml(text)}</p></div>`;
}

function renderTile(img, index) {
  const dims = img.width && img.height ? `${img.width}×${img.height}` : '?';
  return `<div class="img-tile${img.selected ? ' selected' : ''}" data-i="${index}">
    <label>
      <input type="checkbox" class="img-checkbox"${img.selected ? ' checked' : ''}>
      <div class="img-thumb-wrap"><img class="img-thumb" src="${escapeHtml(img.url)}" loading="lazy" alt=""></div>
      <div class="img-info">
        <span class="img-dims">${dims}</span>
        <span class="img-src-badge"><span class="img-format">${formatOf(img) || '...'}</span>${img.source === 'css' ? ' · CSS' : ''}</span>
      </div>
    </label>
  </div>`;
}

function render() {
  formatEls = new Map();
  const hasImages = filteredImages.length > 0;
  selectAllBtn.disabled = deselectAllBtn.disabled = !hasImages;

  if (!hasImages) {
    showMessage(allImages.length ? t('bulkNoMatch') : t('bulkNoImages'));
    updateFooter();
    return;
  }

  const byDepth = groupBy(filteredImages.map((img, i) => [img, i]), ([img]) => img.depth);
  mainEl.innerHTML = [...byDepth.keys()].sort((a, b) => a - b).map(depth => {
    const items = byDepth.get(depth);
    return `<section class="layer-group">
      <div class="layer-header">
        <span class="layer-title">${escapeHtml(depth === 0 ? t('bulkMainPage') : t('bulkIframeLevel', depth))}</span>
        <span class="layer-count">${escapeHtml(t('bulkImageCount', items.length))}</span>
        <div class="layer-actions">
          <button class="layer-btn" data-depth="${depth}" data-select="1">${escapeHtml(t('bulkSelectAll'))}</button>
          <button class="layer-btn" data-depth="${depth}" data-select="">${escapeHtml(t('bulkDeselect'))}</button>
        </div>
      </div>
      <div class="image-grid">${items.map(([img, i]) => renderTile(img, i)).join('')}</div>
    </section>`;
  }).join('');

  for (const tile of mainEl.querySelectorAll('.img-tile')) {
    formatEls.set(filteredImages[tile.dataset.i].url, tile.querySelector('.img-format'));
  }
  updateFooter();
}

// Selezione: aggiorna dati e caselle senza ridisegnare la griglia
function setSelected(predicate, value) {
  for (const tile of mainEl.querySelectorAll('.img-tile')) {
    const img = filteredImages[tile.dataset.i];
    if (!predicate(img)) continue;
    img.selected = value;
    tile.classList.toggle('selected', value);
    tile.querySelector('.img-checkbox').checked = value;
  }
  updateFooter();
}

// Un solo gestore per tutta la griglia invece di uno per ogni immagine
mainEl.addEventListener('change', e => {
  if (!e.target.classList.contains('img-checkbox')) return;
  const tile = e.target.closest('.img-tile');
  filteredImages[tile.dataset.i].selected = e.target.checked;
  tile.classList.toggle('selected', e.target.checked);
  updateFooter();
});

mainEl.addEventListener('click', e => {
  const btn = e.target.closest('.layer-btn');
  if (btn) setSelected(img => img.depth === Number(btn.dataset.depth), Boolean(btn.dataset.select));
});

// Anteprime non caricabili (l'evento error non risale: si ascolta in fase di cattura)
mainEl.addEventListener('error', e => {
  if (!e.target.classList?.contains('img-thumb')) return;
  const fallback = document.createElement('div');
  fallback.className = 'img-thumb-error';
  fallback.textContent = t('bulkNoPreview');
  e.target.replaceWith(fallback);
}, true);

selectAllBtn.addEventListener('click', () => setSelected(() => true, true));
deselectAllBtn.addEventListener('click', () => setSelected(() => true, false));

const selectedImages = () => filteredImages.filter(img => img.selected);

function updateFooter() {
  const count = selectedImages().length;
  statusEl.textContent = filteredImages.length ? t('bulkSelectedOf', count, filteredImages.length) : '';
  downloadBtn.disabled = count === 0;
  downloadBtn.textContent = count ? t('bulkDownloadN', count) : t('bulkDownloadSelected');
}

// ─── NOMI DEI FILE ─────────────────────────────────────────────────────────────

// Nome dall'URL, senza estensione; hasExt dice se l'URL ne aveva una
function urlName(url) {
  try {
    const u = new URL(url);
    if (u.pathname === '/_next/image' && u.searchParams.has('url')) return urlName(new URL(u.searchParams.get('url'), u).href);
    let last = u.pathname.split('/').pop();
    try { last = decodeURIComponent(last); } catch (e) { /* lascia il nome codificato */ }
    const stem = last.replace(/\.[a-z0-9]{2,5}$/i, '');
    return { stem: safeName(stem), hasExt: stem !== last };
  } catch (e) {
    return { stem: 'image', hasExt: false };
  }
}

function safeName(name) {
  return name.replace(/[\\/:*?"<>|\u0000-\u001f]/g, '_').replace(/^[\s.]+|[\s.]+$/g, '').slice(0, 120) || 'image';
}

// Estensione: il formato scelto, oppure quello vero dell'immagine se "originale"
function extensionFor(img, format, mimeType) {
  if (format !== 'original') return format;
  const known = formatByUrl.get(img.url);
  const fromType = mimeType?.startsWith('image/') ? normalizeFormat(mimeType.slice(6)) : null;
  return ((known !== '?' && known) || fromType || img.guess || 'jpg').toLowerCase();
}

const fileNameFor = (img, format, mimeType) => `${urlName(img.url).stem}.${extensionFor(img, format, mimeType)}`;

// Nome dell'archivio: sito e data, es. "example.com 2026-10-06"
function archiveName() {
  let host = 'images';
  try { host = new URL(tabUrl).hostname || host; } catch (e) { /* nome generico */ }
  const d = new Date();
  const pad = n => String(n).padStart(2, '0');
  return safeName(`${host} ${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`);
}

// ─── CONVERSIONE ───────────────────────────────────────────────────────────────

const MIME = { png: 'image/png', jpg: 'image/jpeg', webp: 'image/webp' };

async function fetchImage(url) {
  const resp = await fetch(url, { credentials: 'include' });
  if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
  return resp.blob();
}

// createImageBitmap è il più veloce; per gli SVG (che non supporta) si usa un <img>
async function decodeImage(blob) {
  try {
    return await createImageBitmap(blob);
  } catch (e) {
    const url = URL.createObjectURL(blob);
    try {
      const img = new Image();
      img.src = url;
      await img.decode();
      return img;
    } finally {
      URL.revokeObjectURL(url);
    }
  }
}

// Restituisce il file da salvare: l'originale così com'è, oppure convertito
async function imageFile(img, format) {
  const blob = await fetchImage(img.url);
  if (format === 'original') return blob;
  const source = await decodeImage(blob);
  const canvas = new OffscreenCanvas(source.naturalWidth || source.width, source.naturalHeight || source.height);
  const ctx = canvas.getContext('2d');
  if (format === 'jpg') {
    ctx.fillStyle = '#fff'; // il JPG non ha trasparenza
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  ctx.drawImage(source, 0, 0, canvas.width, canvas.height);
  source.close?.();
  return canvas.convertToBlob({ type: MIME[format], quality: 0.92 });
}

// ─── DOWNLOAD ──────────────────────────────────────────────────────────────────

// URL temporanei liberati quando il download è finito
const pendingUrls = new Map();
chrome.downloads.onChanged.addListener(delta => {
  if (!pendingUrls.has(delta.id) || !delta.state || delta.state.current === 'in_progress') return;
  URL.revokeObjectURL(pendingUrls.get(delta.id));
  pendingUrls.delete(delta.id);
});

async function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const id = await chrome.downloads.download({ url, filename, saveAs: false });
  pendingUrls.set(id, url);
}

// Un file per immagine. In formato originale scarica direttamente dall'URL, senza conversioni
async function downloadOne(img, format) {
  if (format !== 'original') {
    await downloadBlob(await imageFile(img, format), fileNameFor(img, format));
    return;
  }
  const opts = { url: img.url, saveAs: false };
  const known = formatByUrl.get(img.url);
  // Senza formato noto né estensione, il nome lo decide Chrome dalle intestazioni del server
  if ((known && known !== '?') || urlName(img.url).hasExt) opts.filename = fileNameFor(img, format);
  await chrome.downloads.download(opts);
}

// Esegue task su una coda con al massimo "limit" operazioni in parallelo
async function runQueue(items, limit, task) {
  const queue = [...items];
  const worker = async () => { while (queue.length) await task(queue.shift()); };
  await Promise.all(Array.from({ length: Math.min(limit, queue.length) }, worker));
}

async function downloadSeparate(images, format) {
  let done = 0, succeeded = 0;
  await runQueue(images, 3, async img => {
    try {
      await downloadOne(img, format);
      succeeded++;
    } catch (e) {
      console.warn('Save Image As:', img.url, e);
    }
    statusEl.textContent = t('bulkDownloadedOf', ++done, images.length);
  });
  return succeeded;
}

async function downloadZip(images, format) {
  const files = [];
  const used = new Set();
  let done = 0;
  await runQueue(images, 3, async img => {
    try {
      const blob = await imageFile(img, format);
      files.push({ name: uniqueName(fileNameFor(img, format, blob.type), used), bytes: new Uint8Array(await blob.arrayBuffer()) });
    } catch (e) {
      console.warn('Save Image As:', img.url, e);
    }
    statusEl.textContent = t('bulkZipProgress', ++done, images.length);
  });
  if (files.length) await downloadBlob(buildZip(files), `${archiveName()}.zip`);
  return files.length;
}

// ─── ZIP ───────────────────────────────────────────────────────────────────────
// Archivio senza compressione (le immagini sono già compresse), senza librerie esterne

const CRC_TABLE = new Uint32Array(256).map((_, n) => {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xEDB88320 ^ (c >>> 1) : c >>> 1;
  return c >>> 0;
});

function crc32(bytes) {
  let crc = 0xFFFFFFFF;
  for (let i = 0; i < bytes.length; i++) crc = CRC_TABLE[(crc ^ bytes[i]) & 0xFF] ^ (crc >>> 8);
  return (crc ^ 0xFFFFFFFF) >>> 0;
}

function buildZip(files) {
  const enc = new TextEncoder();
  const now = new Date();
  const time = (now.getHours() << 11) | (now.getMinutes() << 5) | (now.getSeconds() >> 1);
  const date = ((now.getFullYear() - 1980) << 9) | ((now.getMonth() + 1) << 5) | now.getDate();
  const parts = [];
  const central = [];
  let offset = 0;
  let centralSize = 0;

  for (const file of files) {
    const name = enc.encode(file.name);
    const crc = crc32(file.bytes);
    const size = file.bytes.length;

    const local = new DataView(new ArrayBuffer(30));
    local.setUint32(0, 0x04034b50, true);
    local.setUint16(4, 20, true);
    local.setUint16(6, 0x0800, true); // nomi in UTF-8
    local.setUint16(10, time, true);
    local.setUint16(12, date, true);
    local.setUint32(14, crc, true);
    local.setUint32(18, size, true);
    local.setUint32(22, size, true);
    local.setUint16(26, name.length, true);
    parts.push(local, name, file.bytes);

    const entry = new DataView(new ArrayBuffer(46));
    entry.setUint32(0, 0x02014b50, true);
    entry.setUint16(4, 20, true);
    entry.setUint16(6, 20, true);
    entry.setUint16(8, 0x0800, true);
    entry.setUint16(12, time, true);
    entry.setUint16(14, date, true);
    entry.setUint32(16, crc, true);
    entry.setUint32(20, size, true);
    entry.setUint32(24, size, true);
    entry.setUint16(28, name.length, true);
    entry.setUint32(42, offset, true);
    central.push(entry, name);

    offset += 30 + name.length + size;
    centralSize += 46 + name.length;
  }

  const end = new DataView(new ArrayBuffer(22));
  end.setUint32(0, 0x06054b50, true);
  end.setUint16(8, files.length, true);
  end.setUint16(10, files.length, true);
  end.setUint32(12, centralSize, true);
  end.setUint32(16, offset, true);
  return new Blob([...parts, ...central, end], { type: 'application/zip' });
}

// Nomi univoci nello stesso archivio: "foto.jpg", "foto (2).jpg"...
function uniqueName(name, used) {
  const dot = name.lastIndexOf('.');
  const stem = dot > 0 ? name.slice(0, dot) : name;
  const ext = dot > 0 ? name.slice(dot) : '';
  let unique = name;
  for (let n = 2; used.has(unique); n++) unique = `${stem} (${n})${ext}`;
  used.add(unique);
  return unique;
}

// ─── MODALITÀ E AVVIO ──────────────────────────────────────────────────────────

// Con "Chiedi dove salvare ciascun file" attivo Chrome apre una finestra per ogni download
// e l'estensione non può evitarlo: lo segnaliamo quando si scaricano file separati
const updateAskNote = () => { askNote.hidden = modeSelect.value === 'zip'; };

chrome.storage.local.get('bulkMode').then(({ bulkMode }) => {
  if (bulkMode && modeSelect.querySelector(`option[value="${bulkMode}"]`)) modeSelect.value = bulkMode;
  updateAskNote();
});
modeSelect.addEventListener('change', () => {
  chrome.storage.local.set({ bulkMode: modeSelect.value });
  updateAskNote();
});
$('openDownloadSettings').addEventListener('click', () => chrome.tabs.create({ url: 'chrome://settings/downloads' }));

downloadBtn.addEventListener('click', async () => {
  const images = selectedImages();
  const format = formatSelect.value;
  const zip = modeSelect.value === 'zip';
  downloadBtn.disabled = scanBtn.disabled = true;
  let succeeded = 0;
  try {
    succeeded = zip ? await downloadZip(images, format) : await downloadSeparate(images, format);
    if (succeeded) chrome.runtime.sendMessage({ action: 'bulkDownloaded', count: succeeded });
  } finally {
    scanBtn.disabled = false;
    updateFooter();
    statusEl.textContent = zip ? t('bulkZipDone', succeeded) : t('bulkDone', succeeded);
  }
});

scan();
