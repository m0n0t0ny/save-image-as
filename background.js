importScripts('review.js');

// Pagina di feedback mostrata dopo la disinstallazione
const UNINSTALL_URL = 'https://save-image-as.vercel.app/uninstall';

// Novità download in blocco: segnalata solo a chi aggiorna da una versione precedente
const BULK_SINCE = '1.2.0';

const MIME = { png: 'image/png', jpg: 'image/jpeg', webp: 'image/webp' };
const QUALITY = 0.92;

function setUninstallUrl() {
  const params = new URLSearchParams({ v: chrome.runtime.getManifest().version, lang: chrome.i18n.getUILanguage() });
  chrome.runtime.setUninstallURL(`${UNINSTALL_URL}?${params}`);
}

function isOlderVersion(a, b) {
  const pa = a.split('.').map(Number), pb = b.split('.').map(Number);
  for (let i = 0; i < Math.max(pa.length, pb.length); i++) {
    if ((pa[i] || 0) !== (pb[i] || 0)) return (pa[i] || 0) < (pb[i] || 0);
  }
  return false;
}

function bulkMenuTitle(isNew) {
  const title = chrome.i18n.getMessage('contextMenuBulk');
  return isNew ? `${title} (${chrome.i18n.getMessage('newLabel')})` : title;
}

// Badge sull'icona: "NEW" per la novità del download in blocco, altrimenti un pallino
// quando c'è la richiesta di recensione e il popup non è ancora stato aperto
async function updateBadge() {
  const { bulkIsNew = false, reviewBadgeSeenAt = 0 } = await chrome.storage.local.get(['bulkIsNew', 'reviewBadgeSeenAt']);
  let text = '';
  if (bulkIsNew) text = 'NEW';
  else {
    const { due, reviewNextAt } = await getReviewStatus();
    if (due && reviewBadgeSeenAt !== reviewNextAt) text = '1';
  }
  chrome.action.setBadgeBackgroundColor({ color: '#6366f1' });
  chrome.action.setBadgeText({ text });
}

async function markReviewSeen() {
  const { reviewNextAt } = await getReviewStatus();
  await chrome.storage.local.set({ reviewBadgeSeenAt: reviewNextAt });
  updateBadge();
}

function setBulkMenuTitle(isNew) {
  for (const id of ['openBulkFromImage', 'openBulkFromPage']) {
    chrome.contextMenus.update(id, { title: bulkMenuTitle(isNew) }, () => void chrome.runtime.lastError);
  }
}

// Chiamata quando l'utente apre il popup o il download in blocco: la novità è stata vista
async function markBulkSeen() {
  const { bulkIsNew = false } = await chrome.storage.local.get('bulkIsNew');
  if (!bulkIsNew) return;
  await chrome.storage.local.set({ bulkIsNew: false });
  updateBadge();
  setBulkMenuTitle(false);
}

// Conta i salvataggi riusciti (usato dal popup per la richiesta di recensione)
async function incrementSaveCount(amount = 1) {
  const { saveCount = 0 } = await chrome.storage.local.get('saveCount');
  await chrome.storage.local.set({ saveCount: saveCount + amount });
  await updateBadge();
}

// Benvenuto alla prima installazione. Il flag in storage.sync segue l'account Google, così
// un nuovo computer sincronizzato non riapre la pagina; l'attesa dà tempo alla sincronizzazione
// di portare il flag prima del controllo.
const WELCOME_DELAY_MS = 5000;

async function showWelcomeOnce() {
  await new Promise(resolve => setTimeout(resolve, WELCOME_DELAY_MS));
  try {
    const { welcomeShown = false } = await chrome.storage.sync.get('welcomeShown');
    if (welcomeShown) return;
    await chrome.storage.sync.set({ welcomeShown: true });
  } catch (e) { /* sync non disponibile: la pagina si mostra comunque una volta */ }
  chrome.tabs.create({ url: chrome.runtime.getURL('welcome.html') });
}

chrome.runtime.onStartup.addListener(() => {
  setUninstallUrl();
  updateBadge();
});

chrome.runtime.onInstalled.addListener(async ({ reason, previousVersion }) => {
  setUninstallUrl();

  // Il menu viene creato per primo, così esiste anche se lo storage non risponde
  await chrome.contextMenus.removeAll();
  const image = ['image'];
  chrome.contextMenus.create({ id: 'saveImageAs', title: chrome.i18n.getMessage('contextMenuTitle'), contexts: image });
  for (const f of ['PNG', 'JPG', 'WEBP', 'PDF']) {
    chrome.contextMenus.create({ id: `saveAs${f}`, parentId: 'saveImageAs', title: f, contexts: image });
  }
  // Download in blocco: in fondo al sottomenu delle immagini e da solo sul resto della pagina
  chrome.contextMenus.create({ id: 'bulkSeparator', parentId: 'saveImageAs', type: 'separator', contexts: image });
  chrome.contextMenus.create({ id: 'openBulkFromImage', parentId: 'saveImageAs', title: bulkMenuTitle(false), contexts: image });
  chrome.contextMenus.create({ id: 'openBulkFromPage', title: bulkMenuTitle(false), contexts: ['page'] });

  if (reason === 'install') showWelcomeOnce();
  // Chi aggiorna conosce già l'estensione: niente benvenuto nemmeno sugli altri suoi computer
  if (reason === 'update') chrome.storage.sync.set({ welcomeShown: true }).catch(() => {});
  if (reason === 'update' && previousVersion && isOlderVersion(previousVersion, BULK_SINCE)) {
    await chrome.storage.local.set({ bulkIsNew: true });
  }
  const { bulkIsNew = false } = await chrome.storage.local.get('bulkIsNew');
  if (bulkIsNew) setBulkMenuTitle(true);
  updateBadge();
});

function openBulkDownload(tab) {
  const params = new URLSearchParams({ tabId: tab.id, tabUrl: tab.url || '' });
  chrome.tabs.create({ url: `${chrome.runtime.getURL('bulk.html')}?${params}`, index: tab.index + 1, openerTabId: tab.id });
}

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'openBulkFromImage' || info.menuItemId === 'openBulkFromPage') {
    openBulkDownload(tab);
  } else if (info.menuItemId.startsWith('saveAs')) {
    saveImage(info.srcUrl, info.menuItemId.slice(6).toLowerCase(), tab.id);
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'bulkSeen') markBulkSeen();
  else if (request.action === 'reviewSeen') markReviewSeen();
  else if (request.action === 'bulkDownloaded' && request.count > 0) {
    // Risponde dopo aver aggiornato il conteggio, così la pagina può decidere se chiedere la recensione
    incrementSaveCount(request.count).then(() => sendResponse(true));
    return true;
  }
});

// ─── CONVERSIONE ───────────────────────────────────────────────────────────────
// Tutto nel service worker con createImageBitmap e OffscreenCanvas. La pagina viene usata
// solo come ripiego per ciò che qui non si può decodificare (SVG, URL blob: della pagina).

async function saveImage(url, format, tabId) {
  try {
    let blob = null;
    try {
      const resp = await fetch(url, { credentials: 'include' });
      if (resp.ok) blob = await resp.blob();
    } catch (e) { /* URL non raggiungibile da qui: si prova nella pagina */ }

    let bitmap = null;
    if (blob) {
      try { bitmap = await createImageBitmap(blob); } catch (e) { /* formato non decodificabile qui */ }
    }
    if (!bitmap) {
      const source = blob ? await blobToDataUrl(blob) : url;
      const png = await rasterizeInPage(tabId, source);
      if (!png) throw new Error('Immagine non leggibile');
      bitmap = await createImageBitmap(await (await fetch(png)).blob());
    }

    const out = format === 'pdf' ? await toPdf(bitmap) : await encode(bitmap, format);
    const id = await chrome.downloads.download({
      url: await blobToDataUrl(out),
      filename: `${fileStem(url)}.${format}`,
      saveAs: true
    });
    if (id !== undefined) incrementSaveCount();
  } catch (error) {
    console.error('Save Image As:', error);
  }
}

function drawOnCanvas(bitmap, whiteBackground) {
  const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
  const ctx = canvas.getContext('2d');
  if (whiteBackground) {
    // JPG e PDF non hanno trasparenza: sfondo bianco
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }
  ctx.drawImage(bitmap, 0, 0);
  return canvas;
}

function encode(bitmap, format) {
  return drawOnCanvas(bitmap, format === 'jpg').convertToBlob({ type: MIME[format], quality: QUALITY });
}

async function toPdf(bitmap) {
  const jpeg = await drawOnCanvas(bitmap, true).convertToBlob({ type: MIME.jpg, quality: QUALITY });
  // Pagina con le proporzioni dell'immagine, entro un A4 (in punti PDF)
  const ratio = bitmap.width / bitmap.height;
  const [w, h] = ratio > 595.28 / 841.89 ? [595.28, 595.28 / ratio] : [841.89 * ratio, 841.89];
  return buildPdf(new Uint8Array(await jpeg.arrayBuffer()), bitmap.width, bitmap.height, w, h);
}

// PDF di una pagina con l'immagine JPEG a tutta pagina (senza librerie esterne)
function buildPdf(jpegBytes, imgWidth, imgHeight, pageWidth, pageHeight) {
  const enc = new TextEncoder();
  const parts = [];
  const offsets = [];
  let length = 0;
  const push = chunk => {
    const bytes = typeof chunk === 'string' ? enc.encode(chunk) : chunk;
    parts.push(bytes);
    length += bytes.length;
  };
  const obj = (n, body) => { offsets[n] = length; push(`${n} 0 obj\n${body}\nendobj\n`); };

  const w = pageWidth.toFixed(2);
  const h = pageHeight.toFixed(2);
  const content = `q ${w} 0 0 ${h} 0 0 cm /Im0 Do Q`;

  push('%PDF-1.4\n%\xE2\xE3\xCF\xD3\n');
  obj(1, '<< /Type /Catalog /Pages 2 0 R >>');
  obj(2, '<< /Type /Pages /Kids [3 0 R] /Count 1 >>');
  obj(3, `<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${w} ${h}] /Resources << /XObject << /Im0 4 0 R >> >> /Contents 5 0 R >>`);
  offsets[4] = length;
  push(`4 0 obj\n<< /Type /XObject /Subtype /Image /Width ${imgWidth} /Height ${imgHeight} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length ${jpegBytes.length} >>\nstream\n`);
  push(jpegBytes);
  push('\nendstream\nendobj\n');
  obj(5, `<< /Length ${content.length} >>\nstream\n${content}\nendstream`);

  const xrefStart = length;
  let xref = 'xref\n0 6\n0000000000 65535 f \n';
  for (let n = 1; n <= 5; n++) xref += `${String(offsets[n]).padStart(10, '0')} 00000 n \n`;
  push(`${xref}trailer\n<< /Size 6 /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`);

  return new Blob(parts, { type: 'application/pdf' });
}

// Ripiego: la pagina disegna l'immagine e restituisce un PNG (null se il browser lo impedisce)
async function rasterizeInPage(tabId, src) {
  try {
    const [{ result }] = await chrome.scripting.executeScript({
      target: { tabId },
      args: [src],
      func: async src => {
        try {
          const img = new Image();
          img.src = src;
          await img.decode();
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth || 1024;
          canvas.height = img.naturalHeight || 1024;
          canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
          return canvas.toDataURL('image/png');
        } catch (e) {
          return null;
        }
      }
    });
    return result;
  } catch (e) {
    return null;
  }
}

// I service worker non hanno URL.createObjectURL: il download parte da un data URL
async function blobToDataUrl(blob) {
  const bytes = new Uint8Array(await blob.arrayBuffer());
  let binary = '';
  for (let i = 0; i < bytes.length; i += 0x8000) binary += String.fromCharCode(...bytes.subarray(i, i + 0x8000));
  return `data:${blob.type || 'application/octet-stream'};base64,${btoa(binary)}`;
}

// Nome del file senza estensione, preso dall'URL
function fileStem(url) {
  try {
    const last = decodeURIComponent(new URL(url).pathname.split('/').pop() || '');
    const stem = last.replace(/\.[a-z0-9]{2,5}$/i, '').replace(/[\\/:*?"<>|\u0000-\u001f]/g, '_').trim();
    return stem.slice(0, 120) || 'image';
  } catch (e) {
    return 'image';
  }
}
