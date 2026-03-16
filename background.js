// Crea i menu contestuali quando l'estensione viene installata
chrome.runtime.onInstalled.addListener(() => {
  // Menu principale
  chrome.contextMenus.create({
    id: 'saveImageAs',
    title: chrome.i18n.getMessage('contextMenuTitle'),
    contexts: ['image']
  });

  // Sottomenu per ogni formato
  chrome.contextMenus.create({
    id: 'saveAsPNG',
    parentId: 'saveImageAs',
    title: 'PNG',
    contexts: ['image']
  });

  chrome.contextMenus.create({
    id: 'saveAsJPG',
    parentId: 'saveImageAs',
    title: 'JPG',
    contexts: ['image']
  });

  chrome.contextMenus.create({
    id: 'saveAsWEBP',
    parentId: 'saveImageAs',
    title: 'WEBP',
    contexts: ['image']
  });

  chrome.contextMenus.create({
    id: 'saveAsPDF',
    parentId: 'saveImageAs',
    title: 'PDF',
    contexts: ['image']
  });
});

// Gestisce il click sui menu
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId.startsWith('saveAs')) {
    const format = info.menuItemId.replace('saveAs', '').toLowerCase();
    convertAndDownloadImage(info.srcUrl, format, tab.id);
  }
});

// Funzione per convertire e scaricare l'immagine
async function convertAndDownloadImage(imageUrl, format, tabId) {
  try {
    // Scarica l'immagine come blob
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    // Crea un oggetto URL temporaneo
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64data = reader.result;

      // Invia il messaggio al content script per convertire l'immagine
      chrome.tabs.sendMessage(tabId, {
        action: 'convertImage',
        imageData: base64data,
        format: format,
        originalUrl: imageUrl
      }, (response) => {
        if (chrome.runtime.lastError) {
          // Se il content script non è disponibile, iniettalo
          const filesToInject = format === 'pdf'
            ? ['jspdf.min.js', 'converter.js']
            : ['converter.js'];

          chrome.scripting.executeScript({
            target: { tabId: tabId },
            files: filesToInject
          }, () => {
            // Riprova a inviare il messaggio
            chrome.tabs.sendMessage(tabId, {
              action: 'convertImage',
              imageData: base64data,
              format: format,
              originalUrl: imageUrl
            });
          });
        }
      });
    };
    reader.readAsDataURL(blob);

  } catch (error) {
    console.error('Errore durante il download dell\'immagine:', error);
  }
}

// Listener per i messaggi dal content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'downloadImage') {
    // Estrae il nome del file dall'URL originale
    let filename = 'image';
    try {
      const urlPath = new URL(request.originalUrl).pathname;
      const originalFilename = urlPath.split('/').pop().split('?')[0];
      if (originalFilename) {
        filename = originalFilename.split('.')[0];
      }
    } catch (e) {
      filename = 'image';
    }

    // Scarica l'immagine convertita
    chrome.downloads.download({
      url: request.dataUrl,
      filename: `${filename}.${request.format}`,
      saveAs: true
    });
  }
});
