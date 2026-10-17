// Traduce i testi del popup nella lingua del browser (fallback: inglese, già presente nell'HTML)
document.documentElement.lang = chrome.i18n.getUILanguage();
document.querySelectorAll('[data-i18n]').forEach(el => {
  const key = el.dataset.i18n;
  const msg = key === 'popupStep2'
    ? chrome.i18n.getMessage(key, chrome.i18n.getMessage('contextMenuTitle'))
    : chrome.i18n.getMessage(key);
  if (msg) el.textContent = msg;
});

// Link al sito nella lingua del browser (il sito esiste in en, it, es)
const SITE_URL = 'https://save-image-as.vercel.app';
const siteLang = chrome.i18n.getUILanguage().slice(0, 2);
const sitePrefix = ['it', 'es'].includes(siteLang) ? `/${siteLang}` : '';
document.querySelectorAll('[data-site-path]').forEach(a => {
  a.href = SITE_URL + sitePrefix + a.dataset.sitePath;
});

// Novità download in blocco: etichetta "Nuovo" alla prima apertura dopo l'aggiornamento
chrome.storage.local.get('bulkIsNew').then(({ bulkIsNew = false }) => {
  if (!bulkIsNew) return;
  const pill = document.getElementById('bulkNewPill');
  pill.textContent = chrome.i18n.getMessage('newLabel');
  pill.hidden = false;
  chrome.runtime.sendMessage({ action: 'bulkSeen' });
});

document.getElementById('bulkBtn').addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    if (tabs[0]) {
      const p = new URLSearchParams({ tabId: tabs[0].id, tabUrl: tabs[0].url || '' });
      chrome.tabs.create({ url: chrome.runtime.getURL('bulk.html') + '?' + p.toString() });
    }
  });
});

// Richiesta di recensione (logica in review.js). Aprire il popup toglie il pallino sull'icona.
getReviewStatus().then(({ due }) => {
  if (!due) return;
  chrome.runtime.sendMessage({ action: 'reviewSeen' });
  showReviewPrompt({
    banner: document.getElementById('reviewBanner'),
    text: document.getElementById('reviewText'),
    rate: document.getElementById('reviewRate'),
    later: document.getElementById('reviewLater'),
    never: document.getElementById('reviewNever')
  });
});
