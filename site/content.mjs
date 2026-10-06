// Testi del sito, una voce per lingua. Le chiavi devono essere uguali in tutte le lingue.
export const LANGS = ['en', 'it', 'es'];
export const LANG_NAMES = { en: 'English', it: 'Italiano', es: 'Español' };
export const UPDATED = { en: 'October 6, 2026', it: '6 ottobre 2026', es: '6 de octubre de 2026' };

export const T = {
  en: {
    nav: { features: 'Features', bulk: 'Bulk download', faq: 'FAQ', support: 'Support', install: 'Add to Chrome' },
    meta: {
      title: 'Save Image As: save images as JPG, PNG, WEBP or PDF | Chrome extension',
      description: 'Free Chrome extension: right-click any image and save it as JPG, PNG, WEBP or PDF, or bulk download every image on a page. 100% local, no tracking.'
    },
    hero: {
      eyebrow: 'Free Chrome extension',
      news: 'New: download all the images on a page at once',
      title: 'Save any image as <em>JPG, PNG, WEBP</em> or <em>PDF</em>',
      lead: 'Right-click an image, pick a format, done. Or download every image on a page in one go. Everything happens in your browser.',
      cta: 'Add to Chrome, it\'s free',
      proof: 'Used by 7,000+ people every week',
      alt: 'Right-click menu of Chrome with "Save image as..." and the PNG, JPG, WEBP and PDF options'
    },
    how: {
      title: 'Three clicks, no detours',
      steps: [
        ['Right-click', 'On any image, on any website.'],
        ['Pick a format', 'Open "Save image as..." and choose PNG, JPG, WEBP or PDF.'],
        ['Save', 'The converted image lands in your downloads.']
      ]
    },
    features: {
      title: 'Everything you need, nothing you don\'t',
      items: [
        ['WEBP to JPG and PNG', 'Stop getting WEBP files you can\'t open. Convert them while you save.'],
        ['Image to PDF', 'Turn any image into a PDF page sized to fit, ready to print or share.'],
        ['Transparency handled', 'Transparent backgrounds become white when you save as JPG.'],
        ['High quality', 'Conversions at 92% quality, at the original resolution.'],
        ['Works everywhere', 'Any website, any image you can right-click.'],
        ['In your language', 'Interface in English, Italian, Spanish, Portuguese, French and German.']
      ]
    },
    bulk: {
      title: 'Bulk download, without the junk',
      lead: 'Right-click anywhere on a page and choose "Open Bulk Download...", or open it from the extension icon. Press "Scan page" and get every image on the page, iframes included.',
      points: [
        'Keeps only the largest version of the same image',
        'Skips icons, SVGs and CSS backgrounds if you want',
        'Minimum size filter to leave out thumbnails',
        'Download as original or convert everything to PNG, JPG or WEBP'
      ],
      more: 'How bulk download works',
      alt: 'Bulk Download page of Save Image As with filters and a grid of images found on the page'
    },
    bulkPage: {
      meta: {
        title: 'Download all images from a web page | Free bulk image downloader for Chrome',
        description: 'Free bulk image downloader for Chrome: scan any page, iframes included, skip duplicates and thumbnails, and save every image as original, PNG, JPG or WEBP.'
      },
      eyebrow: 'Bulk image downloader',
      h1: 'Download all images from a web page in one click',
      lead: 'Save Image As includes a free bulk image downloader for Chrome. It scans the page you are on, iframes included, removes duplicates and tiny icons, and saves every image you select, in its original format or converted to PNG, JPG or WEBP. Everything runs locally in your browser.',
      stepsTitle: 'How to download all images from a page',
      steps: [
        ['Open Bulk Download', 'Right-click anywhere on the page and choose "Open Bulk Download...", or click the extension icon and press "Open Bulk Download".'],
        ['Scan the page', 'Press "Scan page". Choose how many iframe levels to include and set the filters, such as the minimum size.'],
        ['Pick the images', 'Images on the main page are already selected. Untick the ones you do not need, or select a whole layer at once.'],
        ['Download', 'Choose original format, PNG, JPG or WEBP and press Download. The files go to your downloads folder.']
      ],
      featuresTitle: 'Smarter than saving images one by one',
      features: [
        ['Smart deduplication', 'Recognises the same image served in different sizes, such as image-300x200.jpg and image.jpg, @2x files and resized copies made by WordPress, Shopify or Next.js, and keeps only the largest.'],
        ['Best format per picture', 'When a site offers the same picture as AVIF, WEBP and JPG, it keeps the version your browser actually chose to display.'],
        ['Iframes included', 'Scans up to 5 levels of embedded frames and groups images by layer, so you always know where an image comes from.'],
        ['Filters against the junk', 'Excludes icons up to 64 px, SVG files, CSS backgrounds and anything below a minimum size.'],
        ['Convert while downloading', 'Turns a whole gallery of WEBP images into JPG or PNG in one pass.'],
        ['Private by design', 'No account, no upload, no tracking. The scan starts only when you press the button.']
      ],
      usesTitle: 'What people use it for',
      uses: [
        'Saving the product photos of an online store for a catalogue or a comparison',
        'Collecting images for a presentation, a school project or a mood board',
        'Backing up the pictures of your own website or blog',
        'Downloading every image of an article or gallery without opening them one by one'
      ],
      faqTitle: 'Bulk download: frequently asked questions',
      faq: [
        ['Is the bulk image downloader free?', 'Yes. It is part of Save Image As, a free Chrome extension with no ads, no account and no paid version.'],
        ['Can it download images inside iframes?', 'Yes. By default it scans every level, the main page and all its iframes. With "Layers to scan" you can limit it to the main page only or to the main page plus up to 5 iframe levels. Images from iframes are shown but not pre-selected.'],
        ['Does it download duplicates and thumbnails?', 'Not by default: it keeps the largest version of similar images and skips icons up to 64 px. You can turn both filters off.'],
        ['Can it convert the images while downloading them?', 'Yes. Choose PNG, JPG or WEBP before downloading, or keep the original format.'],
        ['Why are some images missing?', 'The scan finds images in img and picture elements and in inline CSS backgrounds. Images drawn on a canvas, set in external style sheets or loaded only while scrolling may not appear: scroll the page to the end and scan again.'],
        ['Where are the files saved?', 'In your default Chrome downloads folder, without a "Save as" window for each file.']
      ],
      single: 'Need just one image? Right-click it and choose "Save image as..." to save it as JPG, PNG, WEBP or PDF.',
      singleLink: 'See all features',
      cta: 'Add to Chrome, it\'s free'
    },
    privacy: {
      title: 'Your images never leave your computer',
      lead: 'No accounts, no servers, no analytics, no tracking. The conversion runs inside your browser and the extension stores nothing about you.',
      link: 'Read the privacy policy'
    },
    faq: {
      title: 'Frequently asked questions',
      items: [
        ['Is it free?', 'Yes, completely free, with no ads and no premium version.'],
        ['Can I download all the images on a page at once?', 'Yes. Right-click the page and choose "Open Bulk Download...", press "Scan page" and download every image, as original or converted to PNG, JPG or WEBP. Duplicates and icons are skipped automatically.'],
        ['Does it work with WEBP images?', 'Yes. You can save a WEBP image as JPG or PNG, and any JPG or PNG as WEBP.'],
        ['Why can\'t I save an image on some sites?', 'Some sites block access to their images or show them in ways the browser can\'t read (for example inside a canvas or a protected video). In those cases no extension can convert them.'],
        ['Where do the files go?', 'Single images open the usual "Save as" window. Bulk downloads go to your default downloads folder.'],
        ['Does it work in Edge, Brave or Opera?', 'It is built for Chrome, but Chromium-based browsers that accept Chrome Web Store extensions usually work too.'],
        ['Does it collect my data?', 'No. Read the privacy policy for the details.']
      ]
    },
    support: {
      title: 'Need help or have an idea?',
      lead: 'Write to us: we read every message and answer in English, Italian and Spanish.',
      cta: 'Send an email'
    },
    footer: {
      privacy: 'Privacy policy',
      terms: 'Terms of use',
      support: 'Support',
      note: 'Save Image As is an independent project and is not affiliated with Google.'
    },
    notFound: { title: 'Page not found', lead: 'The page you are looking for does not exist.', back: 'Back to the home page' },
    uninstall: {
      title: 'Sorry to see you go',
      lead: 'What went wrong? One click opens a pre-filled email: it really helps improve the extension.',
      reasons: ['It did not work on a website', 'The saved image had low quality', 'I need a format that is missing', 'Bulk download did not find my images', 'I only needed it once', 'I found a better alternative'],
      reinstall: 'Changed your mind? Reinstall it'
    }
  },

  it: {
    nav: { features: 'Funzioni', bulk: 'Download in blocco', faq: 'FAQ', support: 'Assistenza', install: 'Aggiungi a Chrome' },
    meta: {
      title: 'Salva immagine come JPG, PNG, WEBP o PDF | Estensione Chrome',
      description: 'Estensione Chrome gratuita: clic destro su un\'immagine e salvala come JPG, PNG, WEBP o PDF, oppure scarica tutte le immagini di una pagina. Tutto in locale.'
    },
    hero: {
      eyebrow: 'Estensione Chrome gratuita',
      news: 'Novità: scarica in un colpo tutte le immagini di una pagina',
      title: 'Salva qualsiasi immagine come <em>JPG, PNG, WEBP</em> o <em>PDF</em>',
      lead: 'Clic destro sull\'immagine, scegli il formato, fatto. Oppure scarica tutte le immagini di una pagina in un colpo solo. Tutto avviene nel tuo browser.',
      cta: 'Aggiungi a Chrome, è gratis',
      proof: 'Usata da oltre 7.000 persone ogni settimana',
      alt: 'Menu del clic destro di Chrome con "Salva immagine come..." e le opzioni PNG, JPG, WEBP e PDF'
    },
    how: {
      title: 'Tre clic, nessuna deviazione',
      steps: [
        ['Clic destro', 'Su qualsiasi immagine, su qualsiasi sito.'],
        ['Scegli il formato', 'Apri "Salva immagine come..." e scegli PNG, JPG, WEBP o PDF.'],
        ['Salva', 'L\'immagine convertita finisce nei tuoi download.']
      ]
    },
    features: {
      title: 'Tutto quello che serve, niente di più',
      items: [
        ['Da WEBP a JPG e PNG', 'Basta file WEBP che non riesci ad aprire: convertili mentre li salvi.'],
        ['Da immagine a PDF', 'Trasforma un\'immagine in una pagina PDF delle giuste proporzioni, pronta da stampare o inviare.'],
        ['Trasparenza gestita', 'Gli sfondi trasparenti diventano bianchi quando salvi in JPG.'],
        ['Alta qualità', 'Conversioni al 92% di qualità, alla risoluzione originale.'],
        ['Funziona ovunque', 'Su qualsiasi sito, con qualsiasi immagine su cui puoi fare clic destro.'],
        ['Nella tua lingua', 'Interfaccia in italiano, inglese, spagnolo, portoghese, francese e tedesco.']
      ]
    },
    bulk: {
      title: 'Download in blocco, senza spazzatura',
      lead: 'Fai clic destro in un punto qualsiasi della pagina e scegli "Apri download in blocco...", oppure aprilo dall\'icona dell\'estensione. Premi "Analizza pagina" e trovi tutte le immagini della pagina, iframe compresi.',
      points: [
        'Tiene solo la versione più grande della stessa immagine',
        'Se vuoi, esclude icone, SVG e sfondi CSS',
        'Filtro per dimensione minima, per lasciare fuori le miniature',
        'Scarica nel formato originale o converti tutto in PNG, JPG o WEBP'
      ],
      more: 'Come funziona il download in blocco',
      alt: 'Pagina Download in blocco di Salva immagine come, con i filtri e la griglia delle immagini trovate nella pagina'
    },
    bulkPage: {
      meta: {
        title: 'Scaricare tutte le immagini di una pagina web | Download in blocco per Chrome',
        description: 'Estensione Chrome gratuita per scaricare tutte le immagini di una pagina, iframe compresi: salta doppioni e miniature e salva in originale, PNG, JPG o WEBP.'
      },
      eyebrow: 'Download in blocco delle immagini',
      h1: 'Scarica tutte le immagini di una pagina web con un clic',
      lead: 'Salva immagine come include un download in blocco gratuito per Chrome. Analizza la pagina che stai guardando, iframe compresi, toglie doppioni e piccole icone e salva tutte le immagini che scegli, nel formato originale o convertite in PNG, JPG o WEBP. Tutto avviene in locale nel browser.',
      stepsTitle: 'Come scaricare tutte le immagini di una pagina',
      steps: [
        ['Apri il download in blocco', 'Fai clic destro in un punto qualsiasi della pagina e scegli "Apri download in blocco...", oppure clicca l\'icona dell\'estensione e premi "Apri download in blocco".'],
        ['Analizza la pagina', 'Premi "Analizza pagina". Scegli quanti livelli di iframe includere e imposta i filtri, come la dimensione minima.'],
        ['Scegli le immagini', 'Le immagini della pagina principale sono già selezionate. Togli la spunta a quelle che non ti servono, oppure seleziona un intero livello in un colpo.'],
        ['Scarica', 'Scegli formato originale, PNG, JPG o WEBP e premi Scarica. I file finiscono nella cartella dei download.']
      ],
      featuresTitle: 'Meglio che salvare le immagini una per una',
      features: [
        ['Doppioni riconosciuti', 'Riconosce la stessa immagine pubblicata in più dimensioni, come immagine-300x200.jpg e immagine.jpg, i file @2x e le copie ridimensionate da WordPress, Shopify o Next.js, e tiene solo la più grande.'],
        ['Il formato migliore per ogni immagine', 'Quando un sito offre la stessa immagine in AVIF, WEBP e JPG, tiene la versione che il browser ha davvero scelto di mostrare.'],
        ['Iframe compresi', 'Analizza fino a 5 livelli di frame incorporati e raggruppa le immagini per livello, così sai sempre da dove arriva un\'immagine.'],
        ['Filtri contro la spazzatura', 'Esclude le icone fino a 64 px, i file SVG, gli sfondi CSS e tutto ciò che è sotto una dimensione minima.'],
        ['Converte mentre scarica', 'Trasforma un\'intera galleria di immagini WEBP in JPG o PNG in un solo passaggio.'],
        ['Privato per costruzione', 'Niente account, niente caricamenti, niente tracciamento. L\'analisi parte solo quando premi il pulsante.']
      ],
      usesTitle: 'Per cosa si usa',
      uses: [
        'Salvare le foto dei prodotti di un negozio online per un catalogo o un confronto',
        'Raccogliere immagini per una presentazione, una ricerca scolastica o una moodboard',
        'Fare il backup delle immagini del proprio sito o blog',
        'Scaricare tutte le immagini di un articolo o di una galleria senza aprirle una per una'
      ],
      faqTitle: 'Download in blocco: domande frequenti',
      faq: [
        ['Il download in blocco è gratuito?', 'Sì. Fa parte di Salva immagine come, un\'estensione Chrome gratuita senza pubblicità, senza account e senza versione a pagamento.'],
        ['Scarica anche le immagini dentro gli iframe?', 'Sì. Di base analizza tutti i livelli, cioè la pagina principale e tutti i suoi iframe. Con "Livelli da analizzare" puoi limitarti alla sola pagina principale oppure alla pagina principale più fino a 5 livelli di iframe. Le immagini degli iframe vengono mostrate ma non sono preselezionate.'],
        ['Scarica anche doppioni e miniature?', 'Di base no: tiene la versione più grande delle immagini simili e salta le icone fino a 64 px. Puoi disattivare entrambi i filtri.'],
        ['Può convertire le immagini mentre le scarica?', 'Sì. Scegli PNG, JPG o WEBP prima di scaricare, oppure tieni il formato originale.'],
        ['Perché mancano alcune immagini?', 'L\'analisi trova le immagini negli elementi img e picture e negli sfondi CSS scritti nella pagina. Le immagini disegnate in un canvas, definite in fogli di stile esterni o caricate solo durante lo scorrimento possono non comparire: scorri la pagina fino in fondo e analizza di nuovo.'],
        ['Dove vengono salvati i file?', 'Nella cartella dei download predefinita di Chrome, senza una finestra "Salva con nome" per ogni file.']
      ],
      single: 'Ti serve una sola immagine? Fai clic destro e scegli "Salva immagine come..." per salvarla in JPG, PNG, WEBP o PDF.',
      singleLink: 'Vedi tutte le funzioni',
      cta: 'Aggiungi a Chrome, è gratis'
    },
    privacy: {
      title: 'Le tue immagini non lasciano mai il tuo computer',
      lead: 'Niente account, niente server, niente statistiche, niente tracciamento. La conversione avviene dentro il browser e l\'estensione non conserva nulla su di te.',
      link: 'Leggi l\'informativa sulla privacy'
    },
    faq: {
      title: 'Domande frequenti',
      items: [
        ['È gratuita?', 'Sì, completamente gratuita, senza pubblicità e senza versione a pagamento.'],
        ['Posso scaricare tutte le immagini di una pagina in una volta?', 'Sì. Fai clic destro sulla pagina e scegli "Apri download in blocco...", premi "Analizza pagina" e scarica tutte le immagini, nel formato originale o convertite in PNG, JPG o WEBP. Doppioni e icone vengono scartati in automatico.'],
        ['Funziona con le immagini WEBP?', 'Sì. Puoi salvare un\'immagine WEBP come JPG o PNG, e qualsiasi JPG o PNG come WEBP.'],
        ['Perché su alcuni siti non riesco a salvare un\'immagine?', 'Alcuni siti bloccano l\'accesso alle immagini o le mostrano in modi che il browser non può leggere (per esempio dentro un canvas o un video protetto). In quei casi nessuna estensione può convertirle.'],
        ['Dove finiscono i file?', 'Per le singole immagini si apre la solita finestra "Salva con nome". I download in blocco vanno nella cartella dei download predefinita.'],
        ['Funziona su Edge, Brave o Opera?', 'È pensata per Chrome, ma di solito funziona anche sui browser basati su Chromium che accettano le estensioni del Chrome Web Store.'],
        ['Raccoglie i miei dati?', 'No. Trovi tutti i dettagli nell\'informativa sulla privacy.']
      ]
    },
    support: {
      title: 'Ti serve aiuto o hai un\'idea?',
      lead: 'Scrivici: leggiamo ogni messaggio e rispondiamo in italiano, inglese e spagnolo.',
      cta: 'Invia un\'email'
    },
    footer: {
      privacy: 'Privacy',
      terms: 'Termini d\'uso',
      support: 'Assistenza',
      note: 'Salva immagine come è un progetto indipendente e non è affiliato a Google.'
    },
    notFound: { title: 'Pagina non trovata', lead: 'La pagina che cerchi non esiste.', back: 'Torna alla home' },
    uninstall: {
      title: 'Ci dispiace vederti andare via',
      lead: 'Cosa non ha funzionato? Un clic apre un\'email già compilata: ci aiuta davvero a migliorare l\'estensione.',
      reasons: ['Non funzionava su un sito', 'L\'immagine salvata aveva una qualità bassa', 'Mi serve un formato che manca', 'Il download in blocco non trovava le immagini', 'Mi serviva solo una volta', 'Ho trovato un\'alternativa migliore'],
      reinstall: 'Ci hai ripensato? Reinstallala'
    }
  },

  es: {
    nav: { features: 'Funciones', bulk: 'Descarga masiva', faq: 'Preguntas', support: 'Soporte', install: 'Agregar a Chrome' },
    meta: {
      title: 'Guardar imagen como JPG, PNG, WEBP o PDF | Extensión de Chrome',
      description: 'Extensión gratuita para Chrome: haz clic derecho en una imagen y guárdala como JPG, PNG, WEBP o PDF, o descarga todas las imágenes de una página. 100% local.'
    },
    hero: {
      eyebrow: 'Extensión gratuita para Chrome',
      news: 'Nuevo: descarga todas las imágenes de una página a la vez',
      title: 'Guarda cualquier imagen como <em>JPG, PNG, WEBP</em> o <em>PDF</em>',
      lead: 'Clic derecho en la imagen, eliges el formato y listo. O descarga todas las imágenes de una página de una sola vez. Todo ocurre en tu navegador.',
      cta: 'Agregar a Chrome, es gratis',
      proof: 'La usan más de 7.000 personas cada semana',
      alt: 'Menú del clic derecho de Chrome con "Guardar imagen como..." y las opciones PNG, JPG, WEBP y PDF'
    },
    how: {
      title: 'Tres clics, sin vueltas',
      steps: [
        ['Clic derecho', 'Sobre cualquier imagen, en cualquier sitio web.'],
        ['Elige el formato', 'Abre "Guardar imagen como..." y elige PNG, JPG, WEBP o PDF.'],
        ['Guarda', 'La imagen convertida queda en tus descargas.']
      ]
    },
    features: {
      title: 'Todo lo que necesitas, nada que sobre',
      items: [
        ['De WEBP a JPG y PNG', 'Se acabaron los archivos WEBP que no puedes abrir: conviértelos al guardarlos.'],
        ['De imagen a PDF', 'Convierte una imagen en una página PDF a su medida, lista para imprimir o enviar.'],
        ['Transparencia resuelta', 'Los fondos transparentes se vuelven blancos al guardar en JPG.'],
        ['Alta calidad', 'Conversiones al 92% de calidad, con la resolución original.'],
        ['Funciona en todas partes', 'En cualquier sitio web, con cualquier imagen en la que puedas hacer clic derecho.'],
        ['En tu idioma', 'Interfaz en español, inglés, italiano, portugués, francés y alemán.']
      ]
    },
    bulk: {
      title: 'Descarga masiva, sin basura',
      lead: 'Haz clic derecho en cualquier parte de la página y elige "Abrir descarga masiva...", o ábrela desde el icono de la extensión. Pulsa "Analizar página" y obtienes todas las imágenes de la página, incluidos los iframes.',
      points: [
        'Conserva solo la versión más grande de la misma imagen',
        'Si quieres, excluye iconos, SVG y fondos CSS',
        'Filtro de tamaño mínimo para dejar fuera las miniaturas',
        'Descarga en el formato original o convierte todo a PNG, JPG o WEBP'
      ],
      more: 'Cómo funciona la descarga masiva',
      alt: 'Página de descarga masiva de Guardar imagen como, con los filtros y la cuadrícula de imágenes encontradas en la página'
    },
    bulkPage: {
      meta: {
        title: 'Descargar todas las imágenes de una página web | Descarga masiva para Chrome',
        description: 'Extensión gratuita para Chrome que descarga todas las imágenes de una página, incluidos los iframes: omite duplicados y miniaturas y guarda en original, PNG, JPG o WEBP.'
      },
      eyebrow: 'Descarga masiva de imágenes',
      h1: 'Descarga todas las imágenes de una página web con un clic',
      lead: 'Guardar imagen como incluye una descarga masiva de imágenes gratuita para Chrome. Analiza la página que estás viendo, incluidos los iframes, elimina duplicados e iconos pequeños y guarda todas las imágenes que elijas, en su formato original o convertidas a PNG, JPG o WEBP. Todo se procesa localmente en tu navegador.',
      stepsTitle: 'Cómo descargar todas las imágenes de una página',
      steps: [
        ['Abre la descarga masiva', 'Haz clic derecho en cualquier parte de la página y elige "Abrir descarga masiva...", o haz clic en el icono de la extensión y pulsa "Abrir descarga masiva".'],
        ['Analiza la página', 'Pulsa "Analizar página". Elige cuántos niveles de iframes incluir y ajusta los filtros, como el tamaño mínimo.'],
        ['Elige las imágenes', 'Las imágenes de la página principal ya vienen seleccionadas. Desmarca las que no necesitas o selecciona un nivel completo de una vez.'],
        ['Descarga', 'Elige formato original, PNG, JPG o WEBP y pulsa Descargar. Los archivos quedan en tu carpeta de descargas.']
      ],
      featuresTitle: 'Mejor que guardar las imágenes una por una',
      features: [
        ['Detecta duplicados', 'Reconoce la misma imagen publicada en varios tamaños, como imagen-300x200.jpg e imagen.jpg, los archivos @2x y las copias redimensionadas por WordPress, Shopify o Next.js, y conserva solo la más grande.'],
        ['El mejor formato de cada imagen', 'Cuando un sitio ofrece la misma imagen en AVIF, WEBP y JPG, conserva la versión que tu navegador eligió mostrar.'],
        ['Incluye iframes', 'Analiza hasta 5 niveles de marcos incrustados y agrupa las imágenes por nivel, para que siempre sepas de dónde viene cada una.'],
        ['Filtros contra la basura', 'Excluye iconos de hasta 64 px, archivos SVG, fondos CSS y todo lo que esté por debajo de un tamaño mínimo.'],
        ['Convierte mientras descarga', 'Convierte una galería entera de imágenes WEBP a JPG o PNG en un solo paso.'],
        ['Privada por diseño', 'Sin cuenta, sin subidas, sin rastreo. El análisis empieza solo cuando pulsas el botón.']
      ],
      usesTitle: 'Para qué se usa',
      uses: [
        'Guardar las fotos de productos de una tienda en línea para un catálogo o una comparación',
        'Reunir imágenes para una presentación, un trabajo escolar o un tablero de inspiración',
        'Respaldar las imágenes de tu propio sitio web o blog',
        'Descargar todas las imágenes de un artículo o una galería sin abrirlas una por una'
      ],
      faqTitle: 'Descarga masiva: preguntas frecuentes',
      faq: [
        ['¿La descarga masiva es gratis?', 'Sí. Forma parte de Guardar imagen como, una extensión de Chrome gratuita, sin anuncios, sin cuenta y sin versión de pago.'],
        ['¿Descarga también las imágenes dentro de iframes?', 'Sí. De forma predeterminada analiza todos los niveles, es decir, la página principal y todos sus iframes. Con "Niveles a analizar" puedes limitarlo a la página principal o a la página principal más hasta 5 niveles de iframes. Las imágenes de iframes se muestran, pero no vienen seleccionadas.'],
        ['¿Descarga duplicados y miniaturas?', 'De forma predeterminada no: conserva la versión más grande de las imágenes similares y omite los iconos de hasta 64 px. Puedes desactivar ambos filtros.'],
        ['¿Puede convertir las imágenes al descargarlas?', 'Sí. Elige PNG, JPG o WEBP antes de descargar, o conserva el formato original.'],
        ['¿Por qué faltan algunas imágenes?', 'El análisis encuentra las imágenes de los elementos img y picture y los fondos CSS escritos en la página. Las imágenes dibujadas en un canvas, definidas en hojas de estilo externas o que se cargan solo al desplazarse pueden no aparecer: desplázate hasta el final de la página y vuelve a analizarla.'],
        ['¿Dónde se guardan los archivos?', 'En tu carpeta de descargas predeterminada de Chrome, sin una ventana de "Guardar como" para cada archivo.']
      ],
      single: '¿Solo necesitas una imagen? Haz clic derecho y elige "Guardar imagen como..." para guardarla en JPG, PNG, WEBP o PDF.',
      singleLink: 'Ver todas las funciones',
      cta: 'Agregar a Chrome, es gratis'
    },
    privacy: {
      title: 'Tus imágenes nunca salen de tu computadora',
      lead: 'Sin cuentas, sin servidores, sin estadísticas, sin rastreo. La conversión ocurre dentro del navegador y la extensión no guarda nada sobre ti.',
      link: 'Leer la política de privacidad'
    },
    faq: {
      title: 'Preguntas frecuentes',
      items: [
        ['¿Es gratis?', 'Sí, totalmente gratis, sin anuncios y sin versión de pago.'],
        ['¿Puedo descargar todas las imágenes de una página a la vez?', 'Sí. Haz clic derecho en la página y elige "Abrir descarga masiva...", pulsa "Analizar página" y descarga todas las imágenes, en su formato original o convertidas a PNG, JPG o WEBP. Los duplicados y los iconos se descartan automáticamente.'],
        ['¿Funciona con imágenes WEBP?', 'Sí. Puedes guardar una imagen WEBP como JPG o PNG, y cualquier JPG o PNG como WEBP.'],
        ['¿Por qué en algunos sitios no puedo guardar una imagen?', 'Algunos sitios bloquean el acceso a sus imágenes o las muestran de formas que el navegador no puede leer (por ejemplo dentro de un canvas o un video protegido). En esos casos ninguna extensión puede convertirlas.'],
        ['¿Dónde quedan los archivos?', 'Para imágenes sueltas se abre la ventana habitual de "Guardar como". Las descargas masivas van a tu carpeta de descargas predeterminada.'],
        ['¿Funciona en Edge, Brave u Opera?', 'Está pensada para Chrome, pero suele funcionar en navegadores basados en Chromium que aceptan extensiones de Chrome Web Store.'],
        ['¿Recopila mis datos?', 'No. Encontrarás todos los detalles en la política de privacidad.']
      ]
    },
    support: {
      title: '¿Necesitas ayuda o tienes una idea?',
      lead: 'Escríbenos: leemos cada mensaje y respondemos en español, inglés e italiano.',
      cta: 'Enviar un correo'
    },
    footer: {
      privacy: 'Privacidad',
      terms: 'Términos de uso',
      support: 'Soporte',
      note: 'Guardar imagen como es un proyecto independiente y no está afiliado a Google.'
    },
    notFound: { title: 'Página no encontrada', lead: 'La página que buscas no existe.', back: 'Volver al inicio' },
    uninstall: {
      title: 'Lamentamos que te vayas',
      lead: '¿Qué salió mal? Un clic abre un correo ya redactado: nos ayuda mucho a mejorar la extensión.',
      reasons: ['No funcionó en un sitio web', 'La imagen guardada tenía baja calidad', 'Necesito un formato que no está', 'La descarga masiva no encontró mis imágenes', 'Solo la necesitaba una vez', 'Encontré una alternativa mejor'],
      reinstall: '¿Cambiaste de idea? Vuelve a instalarla'
    }
  }
};

// Testi legali in HTML. Ogni lingua ha privacy e terms.
export const LEGAL = {
  en: {
    privacy: {
      title: 'Privacy policy',
      body: `
<p>This policy describes how the Chrome extension <strong>Save Image As</strong> ("the extension") and this website handle data. Short version: the extension does not collect personal data and does not send anything to us.</p>

<h2>Data the extension collects</h2>
<p>None. The extension does not collect, sell or share personal data, does not track your browsing, does not use cookies and does not include analytics or advertising.</p>

<h2>How images are processed</h2>
<p>When you choose a format, the extension reads the image you selected, converts it inside your browser and passes it to Chrome's download manager. The image is never uploaded to a server. When you use bulk download, the extension reads the list of images on the current page only after you press "Scan page", and only to show them to you.</p>

<h2>Data stored on your device</h2>
<p>The extension stores only these settings in Chrome's local storage:</p>
<ul>
  <li>how many images you have saved and your answer to the rating request ("rate", "later" or "no thanks"), so a rating is requested at most once;</li>
  <li>whether you have already seen the new bulk download feature, so the "new" label is shown only until you open it;</li>
  <li>the download mode you chose in bulk download (ZIP archive or separate files).</li>
</ul>
<p>None of these values identify you. They never leave your device and are deleted when you remove the extension.</p>

<h2>Permissions</h2>
<ul>
  <li><strong>contextMenus</strong>: shows the "Save image as..." menu when you right-click an image.</li>
  <li><strong>downloads</strong>: saves the converted images to your computer.</li>
  <li><strong>scripting</strong> and access to websites: reads the image you chose, or the images on the page you asked to scan, so they can be converted.</li>
  <li><strong>storage</strong>: keeps the local settings described above.</li>
</ul>

<h2>Uninstall page</h2>
<p>When you remove the extension, Chrome opens a feedback page on this website. Its address contains only the extension version and your browser language, so the page can be shown in your language. Sending feedback is optional and happens only if you choose to send an email.</p>

<h2>This website</h2>
<p>The website uses no cookies, no analytics and no third-party trackers. It is hosted by Vercel Inc., which, like any hosting provider, processes technical data such as IP addresses in server logs to deliver the pages and protect the service. If you write to us by email, we use your address and message only to reply.</p>

<h2>Third-party libraries</h2>
<p>The extension does not include third-party libraries and does not connect to any external service. PDF files are created by the extension's own code, inside your browser.</p>

<h2>Children</h2>
<p>The extension does not knowingly collect information from anyone, including children.</p>

<h2>Your rights</h2>
<p>Since the extension does not collect personal data, there is nothing for us to access, correct or delete. For emails you sent us, you can ask us to delete them at any time.</p>

<h2>Changes</h2>
<p>If this policy changes, we will update the date at the top of this page.</p>

<h2>Contact</h2>
<p>Antonio Bertuccio, <a href="mailto:anto.bertu@gmail.com">anto.bertu@gmail.com</a></p>`
    },
    terms: {
      title: 'Terms of use',
      body: `
<p>By installing or using the Chrome extension <strong>Save Image As</strong> ("the extension") you accept these terms.</p>

<h2>The service</h2>
<p>The extension is free. It converts and saves images that your browser can already display, and lets you download several images from a page at once.</p>

<h2>Your responsibility</h2>
<p>Images on the web are often protected by copyright or other rights. You are responsible for making sure you have the right to download, convert and use the images you save. The extension is a tool and does not grant any right over the content you download.</p>

<h2>Acceptable use</h2>
<p>Do not use the extension to violate the law, the rights of others or the terms of the websites you visit, and do not try to interfere with how it works.</p>

<h2>No warranty</h2>
<p>The extension is provided "as is", without warranties of any kind. It may not work on every website or with every image, and it may change or be discontinued at any time.</p>

<h2>Limitation of liability</h2>
<p>To the extent permitted by law, the author is not liable for damages arising from the use or the impossibility of using the extension, including data loss.</p>

<h2>Intellectual property</h2>
<p>The name, logo and code of the extension belong to the author. Save Image As is an independent project and is not affiliated with or endorsed by Google. Chrome is a trademark of Google LLC.</p>

<h2>Changes</h2>
<p>These terms may be updated. The date at the top of this page shows the latest version. If you keep using the extension after a change, you accept the new terms.</p>

<h2>Applicable law</h2>
<p>These terms are governed by Italian law, without prejudice to the mandatory protections granted to consumers by the law of their country of residence.</p>

<h2>Contact</h2>
<p>Antonio Bertuccio, <a href="mailto:anto.bertu@gmail.com">anto.bertu@gmail.com</a></p>`
    }
  },

  it: {
    privacy: {
      title: 'Informativa sulla privacy',
      body: `
<p>Questa informativa spiega come l'estensione Chrome <strong>Salva immagine come</strong> ("l'estensione") e questo sito trattano i dati. In breve: l'estensione non raccoglie dati personali e non ci invia nulla.</p>

<h2>Dati raccolti dall'estensione</h2>
<p>Nessuno. L'estensione non raccoglie, vende o condivide dati personali, non traccia la navigazione, non usa cookie e non contiene strumenti di statistica o pubblicità.</p>

<h2>Come vengono elaborate le immagini</h2>
<p>Quando scegli un formato, l'estensione legge l'immagine selezionata, la converte dentro il browser e la passa al gestore dei download di Chrome. L'immagine non viene mai caricata su un server. Con il download in blocco, l'estensione legge l'elenco delle immagini della pagina solo dopo che premi "Analizza pagina", e solo per mostrartele.</p>

<h2>Dati salvati sul tuo dispositivo</h2>
<p>L'estensione salva nella memoria locale di Chrome solo queste impostazioni:</p>
<ul>
  <li>quante immagini hai salvato e la tua risposta alla richiesta di valutazione ("valuta", "più tardi" o "no, grazie"), per chiedere una valutazione al massimo una volta;</li>
  <li>se hai già visto la novità del download in blocco, per mostrare l'etichetta "nuovo" solo finché non lo apri;</li>
  <li>la modalità di download scelta nel download in blocco (archivio ZIP o file separati).</li>
</ul>
<p>Nessuno di questi valori ti identifica. Non lasciano mai il tuo dispositivo e vengono cancellati quando rimuovi l'estensione.</p>

<h2>Permessi</h2>
<ul>
  <li><strong>contextMenus</strong>: mostra il menu "Salva immagine come..." quando fai clic destro su un'immagine.</li>
  <li><strong>downloads</strong>: salva le immagini convertite sul tuo computer.</li>
  <li><strong>scripting</strong> e accesso ai siti: legge l'immagine che hai scelto, o le immagini della pagina che hai chiesto di analizzare, per poterle convertire.</li>
  <li><strong>storage</strong>: conserva le impostazioni locali descritte sopra.</li>
</ul>

<h2>Pagina di disinstallazione</h2>
<p>Quando rimuovi l'estensione, Chrome apre una pagina di feedback su questo sito. L'indirizzo contiene solo la versione dell'estensione e la lingua del browser, per mostrare la pagina nella tua lingua. Inviare un feedback è facoltativo e avviene solo se scegli di mandare un'email.</p>

<h2>Questo sito</h2>
<p>Il sito non usa cookie, strumenti di statistica o tracciamento di terze parti. È ospitato da Vercel Inc. che, come ogni fornitore di hosting, tratta dati tecnici come gli indirizzi IP nei log del server per erogare le pagine e proteggere il servizio. Se ci scrivi un'email, usiamo il tuo indirizzo e il messaggio solo per risponderti.</p>

<h2>Librerie di terze parti</h2>
<p>L'estensione non include librerie di terze parti e non si collega ad alcun servizio esterno. I file PDF vengono creati dal codice dell'estensione stessa, dentro il browser.</p>

<h2>Minori</h2>
<p>L'estensione non raccoglie consapevolmente informazioni da nessuno, minori compresi.</p>

<h2>I tuoi diritti</h2>
<p>Poiché l'estensione non raccoglie dati personali, non abbiamo dati da consultare, correggere o cancellare. Per le email che ci hai inviato puoi chiederne la cancellazione in qualsiasi momento.</p>

<h2>Modifiche</h2>
<p>Se questa informativa cambia, aggiorneremo la data in cima alla pagina.</p>

<h2>Contatti</h2>
<p>Antonio Bertuccio, <a href="mailto:anto.bertu@gmail.com">anto.bertu@gmail.com</a></p>`
    },
    terms: {
      title: 'Termini d\'uso',
      body: `
<p>Installando o usando l'estensione Chrome <strong>Salva immagine come</strong> ("l'estensione") accetti questi termini.</p>

<h2>Il servizio</h2>
<p>L'estensione è gratuita. Converte e salva immagini che il browser è già in grado di mostrare e permette di scaricare più immagini di una pagina in una volta.</p>

<h2>La tua responsabilità</h2>
<p>Le immagini sul web sono spesso protette da diritto d'autore o da altri diritti. Sei tu a doverti assicurare di avere il diritto di scaricare, convertire e usare le immagini che salvi. L'estensione è uno strumento e non concede alcun diritto sui contenuti scaricati.</p>

<h2>Uso consentito</h2>
<p>Non usare l'estensione per violare la legge, i diritti altrui o le condizioni dei siti che visiti, e non cercare di interferire con il suo funzionamento.</p>

<h2>Nessuna garanzia</h2>
<p>L'estensione è fornita "così com'è", senza garanzie di alcun tipo. Potrebbe non funzionare su tutti i siti o con tutte le immagini, e potrebbe cambiare o essere interrotta in qualsiasi momento.</p>

<h2>Limitazione di responsabilità</h2>
<p>Nei limiti consentiti dalla legge, l'autore non risponde dei danni derivanti dall'uso o dall'impossibilità di usare l'estensione, compresa la perdita di dati.</p>

<h2>Proprietà intellettuale</h2>
<p>Nome, logo e codice dell'estensione appartengono all'autore. Salva immagine come è un progetto indipendente, non affiliato né approvato da Google. Chrome è un marchio di Google LLC.</p>

<h2>Modifiche</h2>
<p>Questi termini possono essere aggiornati. La data in cima alla pagina indica l'ultima versione. Se continui a usare l'estensione dopo una modifica, accetti i nuovi termini.</p>

<h2>Legge applicabile</h2>
<p>Questi termini sono regolati dalla legge italiana, ferme restando le tutele inderogabili riconosciute ai consumatori dalla legge del paese in cui risiedono.</p>

<h2>Contatti</h2>
<p>Antonio Bertuccio, <a href="mailto:anto.bertu@gmail.com">anto.bertu@gmail.com</a></p>`
    }
  },

  es: {
    privacy: {
      title: 'Política de privacidad',
      body: `
<p>Esta política explica cómo la extensión de Chrome <strong>Guardar imagen como</strong> ("la extensión") y este sitio web tratan los datos. En resumen: la extensión no recopila datos personales y no nos envía nada.</p>

<h2>Datos que recopila la extensión</h2>
<p>Ninguno. La extensión no recopila, vende ni comparte datos personales, no rastrea tu navegación, no usa cookies y no incluye estadísticas ni publicidad.</p>

<h2>Cómo se procesan las imágenes</h2>
<p>Cuando eliges un formato, la extensión lee la imagen seleccionada, la convierte dentro del navegador y la entrega al administrador de descargas de Chrome. La imagen nunca se sube a un servidor. Con la descarga masiva, la extensión lee la lista de imágenes de la página solo después de que pulsas "Analizar página", y solo para mostrártelas.</p>

<h2>Datos guardados en tu dispositivo</h2>
<p>La extensión guarda en el almacenamiento local de Chrome solo estos ajustes:</p>
<ul>
  <li>cuántas imágenes guardaste y tu respuesta a la solicitud de valoración ("valorar", "más tarde" o "no, gracias"), para pedir una valoración como máximo una vez;</li>
  <li>si ya viste la novedad de la descarga masiva, para mostrar la etiqueta "nuevo" solo hasta que la abras;</li>
  <li>el modo de descarga elegido en la descarga masiva (archivo ZIP o archivos separados).</li>
</ul>
<p>Ninguno de estos valores te identifica. Nunca salen de tu dispositivo y se borran al quitar la extensión.</p>

<h2>Permisos</h2>
<ul>
  <li><strong>contextMenus</strong>: muestra el menú "Guardar imagen como..." al hacer clic derecho en una imagen.</li>
  <li><strong>downloads</strong>: guarda las imágenes convertidas en tu computadora.</li>
  <li><strong>scripting</strong> y acceso a sitios web: lee la imagen que elegiste, o las imágenes de la página que pediste analizar, para poder convertirlas.</li>
  <li><strong>storage</strong>: conserva los ajustes locales descritos arriba.</li>
</ul>

<h2>Página de desinstalación</h2>
<p>Cuando quitas la extensión, Chrome abre una página de comentarios en este sitio. Su dirección contiene solo la versión de la extensión y el idioma del navegador, para mostrar la página en tu idioma. Enviar comentarios es opcional y solo ocurre si decides mandar un correo.</p>

<h2>Este sitio web</h2>
<p>El sitio no usa cookies, estadísticas ni rastreadores de terceros. Está alojado por Vercel Inc., que, como cualquier proveedor de alojamiento, trata datos técnicos como las direcciones IP en los registros del servidor para entregar las páginas y proteger el servicio. Si nos escribes un correo, usamos tu dirección y tu mensaje solo para responderte.</p>

<h2>Bibliotecas de terceros</h2>
<p>La extensión no incluye bibliotecas de terceros y no se conecta a ningún servicio externo. Los archivos PDF los crea el propio código de la extensión, dentro del navegador.</p>

<h2>Menores</h2>
<p>La extensión no recopila a sabiendas información de nadie, incluidos los menores.</p>

<h2>Tus derechos</h2>
<p>Como la extensión no recopila datos personales, no tenemos datos que consultar, corregir o borrar. Puedes pedirnos en cualquier momento que borremos los correos que nos enviaste.</p>

<h2>Cambios</h2>
<p>Si esta política cambia, actualizaremos la fecha al inicio de esta página.</p>

<h2>Contacto</h2>
<p>Antonio Bertuccio, <a href="mailto:anto.bertu@gmail.com">anto.bertu@gmail.com</a></p>`
    },
    terms: {
      title: 'Términos de uso',
      body: `
<p>Al instalar o usar la extensión de Chrome <strong>Guardar imagen como</strong> ("la extensión") aceptas estos términos.</p>

<h2>El servicio</h2>
<p>La extensión es gratuita. Convierte y guarda imágenes que tu navegador ya puede mostrar y permite descargar varias imágenes de una página a la vez.</p>

<h2>Tu responsabilidad</h2>
<p>Las imágenes de la web suelen estar protegidas por derechos de autor u otros derechos. Eres responsable de asegurarte de que tienes derecho a descargar, convertir y usar las imágenes que guardas. La extensión es una herramienta y no otorga ningún derecho sobre el contenido descargado.</p>

<h2>Uso aceptable</h2>
<p>No uses la extensión para infringir la ley, los derechos de otras personas o las condiciones de los sitios que visitas, y no intentes interferir en su funcionamiento.</p>

<h2>Sin garantía</h2>
<p>La extensión se ofrece "tal cual", sin garantías de ningún tipo. Puede no funcionar en todos los sitios o con todas las imágenes, y puede cambiar o dejar de estar disponible en cualquier momento.</p>

<h2>Limitación de responsabilidad</h2>
<p>En la medida en que lo permita la ley, el autor no es responsable de los daños derivados del uso o de la imposibilidad de usar la extensión, incluida la pérdida de datos.</p>

<h2>Propiedad intelectual</h2>
<p>El nombre, el logotipo y el código de la extensión pertenecen al autor. Guardar imagen como es un proyecto independiente, no afiliado ni respaldado por Google. Chrome es una marca de Google LLC.</p>

<h2>Cambios</h2>
<p>Estos términos pueden actualizarse. La fecha al inicio de esta página indica la versión más reciente. Si sigues usando la extensión después de un cambio, aceptas los nuevos términos.</p>

<h2>Ley aplicable</h2>
<p>Estos términos se rigen por la ley italiana, sin perjuicio de las protecciones obligatorias que la ley de tu país de residencia otorga a los consumidores.</p>

<h2>Contacto</h2>
<p>Antonio Bertuccio, <a href="mailto:anto.bertu@gmail.com">anto.bertu@gmail.com</a></p>`
    }
  }
};
