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

// Richiesta di recensione: compare solo dopo un certo numero di salvataggi riusciti
const REVIEW_URL = 'https://chromewebstore.google.com/detail/ogbmmojbdhijgnijijmmcobjlamkciko/reviews';
const REVIEW_FIRST_THRESHOLD = 15;  // salvataggi prima della prima richiesta
const REVIEW_SNOOZE_STEP = 50;      // salvataggi aggiuntivi dopo "Più tardi"

async function setupReviewBanner() {
  const { saveCount = 0, reviewState = 'pending', reviewNextAt = REVIEW_FIRST_THRESHOLD } =
    await chrome.storage.local.get(['saveCount', 'reviewState', 'reviewNextAt']);

  if (reviewState !== 'pending' || saveCount < reviewNextAt) return;

  const banner = document.getElementById('reviewBanner');
  document.getElementById('reviewText').textContent = chrome.i18n.getMessage('reviewPromptText');

  const rate = document.getElementById('reviewRate');
  const later = document.getElementById('reviewLater');
  const never = document.getElementById('reviewNever');
  rate.textContent = chrome.i18n.getMessage('reviewPromptRate');
  later.textContent = chrome.i18n.getMessage('reviewPromptLater');
  never.textContent = chrome.i18n.getMessage('reviewPromptNever');

  rate.addEventListener('click', async () => {
    await chrome.storage.local.set({ reviewState: 'done' });
    chrome.tabs.create({ url: REVIEW_URL });
    banner.hidden = true;
  });
  later.addEventListener('click', async () => {
    await chrome.storage.local.set({ reviewNextAt: saveCount + REVIEW_SNOOZE_STEP });
    banner.hidden = true;
  });
  never.addEventListener('click', async () => {
    await chrome.storage.local.set({ reviewState: 'never' });
    banner.hidden = true;
  });

  banner.hidden = false;
}

setupReviewBanner();
