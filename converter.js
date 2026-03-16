// Content script per convertire le immagini
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'convertImage') {
    convertImageFormat(request.imageData, request.format, request.originalUrl);
  }
});

function convertImageFormat(imageData, format, originalUrl) {
  // Crea un elemento immagine
  const img = new Image();

  img.onload = () => {
    // Crea un canvas con le dimensioni dell'immagine
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;

    const ctx = canvas.getContext('2d');

    // Disegna l'immagine sul canvas
    ctx.drawImage(img, 0, 0);

    // Determina il tipo MIME e la qualità in base al formato
    let mimeType;
    let quality = 0.92; // Qualità predefinita

    switch(format) {
      case 'png':
        mimeType = 'image/png';
        break;
      case 'jpg':
      case 'jpeg':
        mimeType = 'image/jpeg';
        // Per JPG, riempi lo sfondo trasparente con bianco
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;

        // Crea un nuovo canvas per JPG con sfondo bianco
        const jpgCanvas = document.createElement('canvas');
        jpgCanvas.width = canvas.width;
        jpgCanvas.height = canvas.height;
        const jpgCtx = jpgCanvas.getContext('2d');

        // Riempi con bianco
        jpgCtx.fillStyle = '#FFFFFF';
        jpgCtx.fillRect(0, 0, jpgCanvas.width, jpgCanvas.height);

        // Disegna l'immagine sopra
        jpgCtx.drawImage(canvas, 0, 0);

        // Usa il canvas JPG
        canvas.width = jpgCanvas.width;
        canvas.height = jpgCanvas.height;
        ctx.drawImage(jpgCanvas, 0, 0);
        break;
      case 'webp':
        mimeType = 'image/webp';
        break;
      case 'pdf':
        // Gestione PDF
        convertToPDF(canvas, originalUrl);
        return; // Esce dalla funzione perché il PDF viene gestito separatamente
      default:
        mimeType = 'image/png';
    }

    // Converti il canvas in data URL
    const dataUrl = canvas.toDataURL(mimeType, quality);

    // Invia il data URL al background script per il download
    chrome.runtime.sendMessage({
      action: 'downloadImage',
      dataUrl: dataUrl,
      format: format,
      originalUrl: originalUrl
    });
  };

  img.onerror = () => {
    console.error('Errore nel caricamento dell\'immagine');
  };

  // Carica l'immagine
  img.src = imageData;
}

function convertToPDF(canvas, originalUrl) {
  try {
    // Verifica che jsPDF sia disponibile
    if (typeof window.jspdf === 'undefined') {
      console.error('jsPDF non è caricato');
      return;
    }

    const { jsPDF } = window.jspdf;

    // Ottieni le dimensioni dell'immagine
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;

    // Calcola le dimensioni del PDF (in mm)
    // Usa A4 come riferimento ma adatta in base all'aspect ratio
    const maxWidth = 210; // A4 width in mm
    const maxHeight = 297; // A4 height in mm

    let pdfWidth, pdfHeight;
    const aspectRatio = imgWidth / imgHeight;

    if (aspectRatio > maxWidth / maxHeight) {
      // Immagine più larga - usa larghezza massima
      pdfWidth = maxWidth;
      pdfHeight = maxWidth / aspectRatio;
    } else {
      // Immagine più alta - usa altezza massima
      pdfHeight = maxHeight;
      pdfWidth = maxHeight * aspectRatio;
    }

    // Crea il PDF con le dimensioni calcolate
    const pdf = new jsPDF({
      orientation: pdfWidth > pdfHeight ? 'landscape' : 'portrait',
      unit: 'mm',
      format: [pdfWidth, pdfHeight]
    });

    // Converti il canvas in data URL
    const imgData = canvas.toDataURL('image/jpeg', 0.92);

    // Aggiungi l'immagine al PDF
    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);

    // Converti il PDF in blob e poi in data URL
    const pdfBlob = pdf.output('blob');
    const reader = new FileReader();
    reader.onloadend = () => {
      // Invia il data URL al background script per il download
      chrome.runtime.sendMessage({
        action: 'downloadImage',
        dataUrl: reader.result,
        format: 'pdf',
        originalUrl: originalUrl
      });
    };
    reader.readAsDataURL(pdfBlob);

  } catch (error) {
    console.error('Errore nella conversione PDF:', error);
  }
}
