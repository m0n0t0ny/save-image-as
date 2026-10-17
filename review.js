// Richiesta di recensione condivisa da popup, download in blocco e service worker.
// Compare solo dopo un certo numero di salvataggi riusciti. La risposta definitiva
// ("Recensisci" o "No grazie") è salvata anche in storage.sync, così chi ha già risposto
// non se la ritrova su un altro computer con lo stesso account.

const REVIEW_URL = 'https://chromewebstore.google.com/detail/ogbmmojbdhijgnijijmmcobjlamkciko/reviews';
const REVIEW_FIRST_THRESHOLD = 15;  // salvataggi prima della prima richiesta
const REVIEW_SNOOZE_STEP = 50;      // salvataggi aggiuntivi dopo "Più tardi"

async function getReviewStatus() {
  const local = await chrome.storage.local.get(['saveCount', 'reviewState', 'reviewNextAt']);
  let synced = {};
  try { synced = await chrome.storage.sync.get('reviewState'); } catch (e) { /* sync non disponibile */ }
  const saveCount = local.saveCount || 0;
  const reviewState = synced.reviewState || local.reviewState || 'pending';
  const reviewNextAt = local.reviewNextAt || REVIEW_FIRST_THRESHOLD;
  return { saveCount, reviewNextAt, due: reviewState === 'pending' && saveCount >= reviewNextAt };
}

async function answerReview(state) {
  await chrome.storage.local.set({ reviewState: state });
  try { await chrome.storage.sync.set({ reviewState: state }); } catch (e) { /* resta salvato in locale */ }
}

async function snoozeReview() {
  const { saveCount = 0 } = await chrome.storage.local.get('saveCount');
  await chrome.storage.local.set({ reviewNextAt: saveCount + REVIEW_SNOOZE_STEP });
}

// Riempie e collega il banner; onClose viene chiamata dopo una qualsiasi risposta
function showReviewPrompt({ banner, text, rate, later, never }, onClose = () => {}) {
  text.textContent = chrome.i18n.getMessage('reviewPromptText');
  rate.textContent = chrome.i18n.getMessage('reviewPromptRate');
  later.textContent = chrome.i18n.getMessage('reviewPromptLater');
  never.textContent = chrome.i18n.getMessage('reviewPromptNever');

  const close = () => { banner.hidden = true; onClose(); };
  rate.addEventListener('click', async () => {
    await answerReview('done');
    chrome.tabs.create({ url: REVIEW_URL });
    close();
  });
  later.addEventListener('click', async () => { await snoozeReview(); close(); });
  never.addEventListener('click', async () => { await answerReview('never'); close(); });

  banner.hidden = false;
}
