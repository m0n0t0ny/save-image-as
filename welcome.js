// Pagina di benvenuto: aperta una sola volta dopo la prima installazione (vedi background.js)
const msg = (key, ...subs) => chrome.i18n.getMessage(key, subs);

document.documentElement.lang = chrome.i18n.getUILanguage();
document.title = msg('extensionName') || document.title;
document.querySelectorAll('[data-i18n]').forEach(el => {
  const text = msg(el.dataset.i18n);
  if (text) el.textContent = text;
});

// Testi che contengono il nome esatto delle voci del menu
const saveLabel = msg('contextMenuTitle');
if (saveLabel) {
  document.getElementById('menuSave').textContent = saveLabel;
  document.getElementById('step2').textContent = msg('popupStep2', saveLabel);
}
const bulkLabel = msg('contextMenuBulk');
if (bulkLabel) document.getElementById('bulkText').textContent = msg('welcomeBulkText', bulkLabel);
