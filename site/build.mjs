// Genera il sito statico in site/public. Uso: node site/build.mjs
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { LANGS, LANG_NAMES, UPDATED, T, LEGAL } from './content.mjs';

const SITE_URL = 'https://save-image-as.vercel.app';
const STORE_URL = 'https://chromewebstore.google.com/detail/ogbmmojbdhijgnijijmmcobjlamkciko';
const EMAIL = 'anto.bertu@gmail.com';
// Verifica della proprietà in Google Search Console (deve restare, anche dopo la verifica)
const GOOGLE_SITE_VERIFICATION = 'g7xri24Xg4MY35Gdu6_DIuYTLGbrwXvKU3q08LzjQKI';

const here = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(here, 'public');

const VERSION = '1.2.0';
const BULK_PATH = '/bulk-image-downloader';
const LASTMOD = '2026-10-06';

const prefix = lang => (lang === 'en' ? '' : `/${lang}`);
const storeLink = (campaign) => `${STORE_URL}?utm_source=website&utm_medium=${campaign}`;

const CHROME_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><path d="M21.17 8H12M3.95 6.06 8.54 14M10.88 21.94 15.46 14"/></svg>';

function write(rel, content) {
  const file = path.join(out, rel);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content);
}

function hreflang(pagePath) {
  return LANGS.map(l => `<link rel="alternate" hreflang="${l}" href="${SITE_URL}${prefix(l)}${pagePath}">`).join('\n  ')
    + `\n  <link rel="alternate" hreflang="x-default" href="${SITE_URL}${pagePath}">`;
}

function layout({ lang, title, description, pagePath, body, extraHead = '', noindex = false }) {
  const t = T[lang];
  const p = prefix(lang);
  const langLinks = LANGS.map(l =>
    `<a href="${prefix(l)}${pagePath || '/'}" hreflang="${l}" lang="${l}" title="${LANG_NAMES[l]}"${l === lang ? ' aria-current="true"' : ''}>${l}</a>`
  ).join('');

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${description}">
  ${noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${SITE_URL}${p}${pagePath}">\n  ${hreflang(pagePath)}`}
  <meta property="og:type" content="website">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:image" content="${SITE_URL}/assets/og.png">
  <meta property="og:url" content="${SITE_URL}${p}${pagePath}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="theme-color" content="#6366f1">
  <meta name="google-site-verification" content="${GOOGLE_SITE_VERIFICATION}">
  <link rel="icon" type="image/png" href="/assets/icon128.png">
  <link rel="stylesheet" href="/assets/style.css">
  ${extraHead}
</head>
<body>
  <header class="site-header">
    <div class="wrap">
      <a class="brand" href="${p}/"><img src="/assets/icon128.png" alt="" width="28" height="28">${brandName(lang)}</a>
      <nav class="site-nav" aria-label="Main">
        <a href="${p}/#features">${t.nav.features}</a>
        <a href="${p}${BULK_PATH}">${t.nav.bulk}</a>
        <a href="${p}/#faq">${t.nav.faq}</a>
        <a href="${p}/#support">${t.nav.support}</a>
      </nav>
      <div class="lang-switch">${langLinks}</div>
      <a class="btn btn-small" href="${storeLink('header')}">${t.nav.install}</a>
    </div>
  </header>
  <main>
${body}
  </main>
  <footer class="site-footer">
    <div class="wrap">
      <nav aria-label="Legal">
        <a href="${p}/privacy">${t.footer.privacy}</a>
        <a href="${p}/terms">${t.footer.terms}</a>
        <a href="${p}/#support">${t.footer.support}</a>
      </nav>
      <p>&copy; 2026 Antonio Bertuccio. ${t.footer.note}</p>
    </div>
  </footer>
</body>
</html>
`;
}

function brandName(lang) {
  return { en: 'Save Image As', it: 'Salva immagine come', es: 'Guardar imagen como' }[lang];
}

// Dati strutturati dell'estensione, condivisi da home e pagina del download in blocco
function appLd(lang) {
  const t = T[lang];
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: brandName(lang),
    alternateName: ['Save Image As', 'Save image as JPG, PNG, WEBP, PDF'],
    applicationCategory: 'BrowserApplication',
    applicationSubCategory: 'Chrome extension',
    operatingSystem: 'Chrome, Windows, macOS, Linux, ChromeOS',
    softwareVersion: VERSION,
    description: t.meta.description,
    url: `${SITE_URL}${prefix(lang)}/`,
    downloadUrl: STORE_URL,
    installUrl: STORE_URL,
    sameAs: [STORE_URL, 'https://github.com/m0n0t0ny/save-image-as'],
    featureList: [
      ...t.features.items.map(([h]) => h),
      ...T[lang].bulkPage.features.map(([h]) => `${t.nav.bulk}: ${h}`)
    ],
    screenshot: [`${SITE_URL}/assets/hero-${lang}.webp`, `${SITE_URL}/assets/bulk-${lang}.webp`],
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
    author: { '@type': 'Person', name: 'Antonio Bertuccio', email: EMAIL },
    inLanguage: lang
  };
}

function faqLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } }))
  };
}

// "Novità: testo" diventa etichetta + testo
function newsLink(lang) {
  const [label, ...rest] = T[lang].hero.news.split(': ');
  return `<a class="news" href="${prefix(lang)}${BULK_PATH}"><span>${label}</span>${rest.join(': ')}</a>`;
}

function home(lang) {
  const t = T[lang];
  const p = prefix(lang);
  const jsonLd = appLd(lang);
  const body = `
    <section class="hero">
      <div class="wrap">
        <div>
          ${newsLink(lang)}
          <span class="eyebrow">${t.hero.eyebrow}</span>
          <h1>${t.hero.title}</h1>
          <p class="lead">${t.hero.lead}</p>
          <a class="btn" href="${storeLink('hero')}">${CHROME_ICON}${t.hero.cta}</a>
          <p class="proof">${t.hero.proof}</p>
        </div>
        <div class="hero-shot">
          <img src="/assets/hero-${lang}.webp" alt="${t.hero.alt}" width="1280" height="800" fetchpriority="high">
        </div>
      </div>
    </section>

    <section id="how">
      <div class="wrap">
        <h2>${t.how.title}</h2>
        <ol class="steps">
          ${t.how.steps.map(([h, d]) => `<li><h3>${h}</h3><p>${d}</p></li>`).join('\n          ')}
        </ol>
      </div>
    </section>

    <section id="features" class="alt">
      <div class="wrap">
        <h2>${t.features.title}</h2>
        <div class="features">
          ${t.features.items.map(([h, d]) => `<article><h3>${h}</h3><p>${d}</p></article>`).join('\n          ')}
        </div>
      </div>
    </section>

    <section id="bulk">
      <div class="wrap split">
        <div>
          <h2>${t.bulk.title}</h2>
          <p class="lead">${t.bulk.lead}</p>
          <ul class="checks">
            ${t.bulk.points.map(x => `<li>${x}</li>`).join('\n            ')}
          </ul>
          <a class="more-link" href="${p}${BULK_PATH}">${t.bulk.more}</a>
        </div>
        <div class="hero-shot">
          <img src="/assets/bulk-${lang}.webp" alt="${t.bulk.alt}" width="1280" height="800" loading="lazy">
        </div>
      </div>
    </section>

    <section id="privacy">
      <div class="wrap">
        <div class="privacy-band">
          <h2>${t.privacy.title}</h2>
          <p>${t.privacy.lead}</p>
          <a href="${p}/privacy">${t.privacy.link}</a>
        </div>
      </div>
    </section>

    <section id="faq" class="faq alt">
      <div class="wrap">
        <h2>${t.faq.title}</h2>
        ${t.faq.items.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('\n        ')}
      </div>
    </section>

    <section id="support" class="support">
      <div class="wrap">
        <h2>${t.support.title}</h2>
        <p>${t.support.lead}</p>
        <a class="btn" href="mailto:${EMAIL}?subject=${encodeURIComponent(brandName(lang))}">${t.support.cta}</a>
      </div>
    </section>`;

  return layout({
    lang,
    title: t.meta.title,
    description: t.meta.description,
    pagePath: '/',
    body,
    extraHead: `<script type="application/ld+json">${JSON.stringify(jsonLd)}</script>\n  <script type="application/ld+json">${JSON.stringify(faqLd(t.faq.items))}</script>`
  });
}

// Pagina dedicata al download in blocco (per le ricerche "scaricare tutte le immagini di una pagina")
function bulkPage(lang) {
  const t = T[lang];
  const b = t.bulkPage;
  const p = prefix(lang);
  const url = `${SITE_URL}${p}${BULK_PATH}`;
  const howTo = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: b.stepsTitle,
    description: b.lead,
    inLanguage: lang,
    tool: [{ '@type': 'HowToTool', name: `${brandName(lang)} (Chrome)` }],
    step: b.steps.map(([name, text], i) => ({ '@type': 'HowToStep', position: i + 1, name, text, url: `${url}#step-${i + 1}` }))
  };
  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: brandName(lang), item: `${SITE_URL}${p}/` },
      { '@type': 'ListItem', position: 2, name: t.nav.bulk, item: url }
    ]
  };

  const body = `
    <section class="hero">
      <div class="wrap">
        <div>
          <span class="eyebrow">${b.eyebrow}</span>
          <h1>${b.h1}</h1>
          <p class="lead">${b.lead}</p>
          <a class="btn" href="${storeLink('bulk-hero')}">${CHROME_ICON}${b.cta}</a>
          <p class="proof">${t.hero.proof}</p>
        </div>
        <div class="hero-shot">
          <img src="/assets/bulk-${lang}.webp" alt="${t.bulk.alt}" width="1280" height="800" fetchpriority="high">
        </div>
      </div>
    </section>

    <section id="how">
      <div class="wrap">
        <h2>${b.stepsTitle}</h2>
        <ol class="steps">
          ${b.steps.map(([h, d], i) => `<li id="step-${i + 1}"><h3>${h}</h3><p>${d}</p></li>`).join('\n          ')}
        </ol>
      </div>
    </section>

    <section id="features" class="alt">
      <div class="wrap">
        <h2>${b.featuresTitle}</h2>
        <div class="features">
          ${b.features.map(([h, d]) => `<article><h3>${h}</h3><p>${d}</p></article>`).join('\n          ')}
        </div>
      </div>
    </section>

    <section id="uses">
      <div class="wrap">
        <h2>${b.usesTitle}</h2>
        <ul class="checks">
          ${b.uses.map(x => `<li>${x}</li>`).join('\n          ')}
        </ul>
        <p class="cta-row">${b.single} <a href="${p}/#features">${b.singleLink}</a></p>
      </div>
    </section>

    <section id="faq" class="faq alt">
      <div class="wrap">
        <h2>${b.faqTitle}</h2>
        ${b.faq.map(([q, a]) => `<details><summary>${q}</summary><p>${a}</p></details>`).join('\n        ')}
        <p class="cta-row"><a class="btn" href="${storeLink('bulk-faq')}">${CHROME_ICON}${b.cta}</a></p>
      </div>
    </section>`;

  return layout({
    lang,
    title: b.meta.title,
    description: b.meta.description,
    pagePath: BULK_PATH,
    body,
    extraHead: [appLd(lang), howTo, faqLd(b.faq), breadcrumb]
      .map(x => `<script type="application/ld+json">${JSON.stringify(x)}</script>`).join('\n  ')
  });
}

// Riassunto per i motori di risposta AI (llms.txt): fatti verificabili e link alle pagine
function llmsTxt() {
  const en = T.en;
  return `# Save Image As

> Free Chrome extension (version ${VERSION}) to save any image on the web as JPG, PNG, WEBP or PDF from the right-click menu, and to download all the images on a web page at once (bulk image downloader). All processing happens locally in the browser: no account, no upload, no tracking. About 7,700 weekly users (September 2026).

## Key facts

- Name: Save Image As (Italian: Salva immagine come; Spanish: Guardar imagen como)
- Type: Chrome extension, Manifest V3, also works in Chromium-based browsers that accept Chrome Web Store extensions
- Price: free, no ads, no paid version
- Formats for single images: JPG, PNG, WEBP, PDF (transparent backgrounds become white in JPG and PDF; quality 92%)
- Bulk download: right-click a page and choose "Open Bulk Download...", or open it from the extension icon; scans the main page and all its iframes by default (or can be limited to the main page plus up to 5 iframe levels); keeps the largest version of duplicate images; can exclude icons up to 64 px, SVG files and CSS backgrounds; downloads as original or converted to PNG, JPG or WEBP
- Interface languages: English, Italian, Spanish (Spain and Latin America), Portuguese (Brazil), French, German
- Privacy: no data collection; only a local counter of saved images is stored on the device
- Author: Antonio Bertuccio (${EMAIL})
- Install: ${STORE_URL}
- Source code: https://github.com/m0n0t0ny/save-image-as

## Pages

- [Home (English)](${SITE_URL}/): features, how it works, FAQ
- [Bulk image downloader (English)](${SITE_URL}${BULK_PATH}): how to download all images from a web page
- [Home (Italiano)](${SITE_URL}/it/)
- [Download in blocco (Italiano)](${SITE_URL}/it${BULK_PATH})
- [Home (Español)](${SITE_URL}/es/)
- [Descarga masiva (Español)](${SITE_URL}/es${BULK_PATH})
- [Privacy policy](${SITE_URL}/privacy)
- [Terms of use](${SITE_URL}/terms)

## FAQ

${[...en.faq.items, ...en.bulkPage.faq].map(([q, a]) => `- ${q} ${a}`).join('\n')}
`;
}

function legal(lang, kind) {
  const doc = LEGAL[lang][kind];
  const updatedLabel = { en: 'Last updated', it: 'Ultimo aggiornamento', es: 'Última actualización' }[lang];
  const body = `
    <article class="doc">
      <h1>${doc.title}</h1>
      <p class="updated">${updatedLabel}: ${UPDATED[lang]}</p>
      ${doc.body}
    </article>`;
  return layout({
    lang,
    title: `${doc.title} | ${brandName(lang)}`,
    description: `${doc.title}, ${brandName(lang)}`,
    pagePath: `/${kind}`,
    body
  });
}

// Pagina aperta da Chrome alla disinstallazione: la lingua arriva da ?lang=
function uninstall() {
  const extra = {
    pt: {
      title: 'Que pena que você está saindo',
      lead: 'O que deu errado? Um clique abre um e-mail já preenchido: isso ajuda muito a melhorar a extensão.',
      reasons: ['Não funcionou em um site', 'A imagem salva ficou com baixa qualidade', 'Preciso de um formato que não existe', 'O download em massa não encontrou minhas imagens', 'Só precisei uma vez', 'Encontrei uma alternativa melhor'],
      reinstall: 'Mudou de ideia? Reinstale'
    },
    fr: {
      title: 'Dommage de vous voir partir',
      lead: 'Qu\'est-ce qui n\'a pas marché ? Un clic ouvre un e-mail prérempli : cela nous aide vraiment à améliorer l\'extension.',
      reasons: ['Elle ne marchait pas sur un site', 'L\'image enregistrée était de mauvaise qualité', 'Il me manque un format', 'Le téléchargement en masse ne trouvait pas mes images', 'Je n\'en avais besoin qu\'une fois', 'J\'ai trouvé une meilleure alternative'],
      reinstall: 'Vous avez changé d\'avis ? Réinstallez-la'
    },
    de: {
      title: 'Schade, dass du gehst',
      lead: 'Was hat nicht gepasst? Ein Klick öffnet eine vorausgefüllte E-Mail: das hilft sehr, die Erweiterung zu verbessern.',
      reasons: ['Es hat auf einer Website nicht funktioniert', 'Das gespeicherte Bild hatte schlechte Qualität', 'Mir fehlt ein Format', 'Der Massen-Download hat meine Bilder nicht gefunden', 'Ich brauchte es nur einmal', 'Ich habe eine bessere Alternative gefunden'],
      reinstall: 'Meinung geändert? Neu installieren'
    }
  };
  const dict = { en: T.en.uninstall, it: T.it.uninstall, es: T.es.uninstall, ...extra };

  const body = `
    <article class="doc">
      <h1 id="title">${T.en.uninstall.title}</h1>
      <p id="lead">${T.en.uninstall.lead}</p>
      <div class="reasons" id="reasons"></div>
      <p><a id="reinstall" href="${storeLink('uninstall')}">${T.en.uninstall.reinstall}</a></p>
    </article>
    <script>
      const D = ${JSON.stringify(dict)};
      const params = new URLSearchParams(location.search);
      const raw = (params.get('lang') || navigator.language || 'en').toLowerCase();
      const lang = D[raw.slice(0, 2)] ? raw.slice(0, 2) : 'en';
      const t = D[lang];
      const version = (params.get('v') || 'unknown').replace(/[^0-9.]/g, '');
      document.documentElement.lang = lang;
      document.getElementById('title').textContent = t.title;
      document.getElementById('lead').textContent = t.lead;
      document.getElementById('reinstall').textContent = t.reinstall;
      const box = document.getElementById('reasons');
      t.reasons.forEach((reason, i) => {
        const a = document.createElement('a');
        const subject = '[Uninstall] Save Image As v' + version + ' - reason ' + (i + 1);
        const bodyText = reason + '\\n\\n(lang: ' + raw + ', version: ' + version + ')\\n\\n';
        a.href = 'mailto:${EMAIL}?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(bodyText);
        a.textContent = reason;
        box.appendChild(a);
      });
    </script>`;

  return layout({ lang: 'en', title: 'Feedback | Save Image As', description: 'Uninstall feedback', pagePath: '/uninstall', body, noindex: true });
}

function notFound() {
  const t = T.en.notFound;
  const body = `
    <article class="doc">
      <h1>${t.title}</h1>
      <p>${t.lead}</p>
      <p><a href="/">${t.back}</a> · <a href="/it/">${T.it.notFound.back}</a> · <a href="/es/">${T.es.notFound.back}</a></p>
    </article>`;
  return layout({ lang: 'en', title: `${t.title} | Save Image As`, description: t.lead, pagePath: '/404', body, noindex: true });
}

// Build
fs.rmSync(out, { recursive: true, force: true });

for (const lang of LANGS) {
  const p = lang === 'en' ? '' : `${lang}/`;
  write(`${p}index.html`, home(lang));
  write(`${p}${BULK_PATH.slice(1)}.html`, bulkPage(lang));
  write(`${p}privacy.html`, legal(lang, 'privacy'));
  write(`${p}terms.html`, legal(lang, 'terms'));
}
write('uninstall.html', uninstall());
write('404.html', notFound());

fs.cpSync(path.join(here, 'src', 'assets'), path.join(out, 'assets'), { recursive: true });
fs.copyFileSync(path.join(here, 'src', 'style.css'), path.join(out, 'assets', 'style.css'));

// Sitemap con le versioni nelle altre lingue (hreflang) e la data di aggiornamento
const pages = ['/', BULK_PATH, '/privacy', '/terms'];
const entries = LANGS.flatMap(l => pages.map(pg => {
  const alts = LANGS.map(a => `    <xhtml:link rel="alternate" hreflang="${a}" href="${SITE_URL}${prefix(a)}${pg}"/>`).join('\n');
  return `  <url>\n    <loc>${SITE_URL}${prefix(l)}${pg}</loc>\n    <lastmod>${LASTMOD}</lastmod>\n${alts}\n    <xhtml:link rel="alternate" hreflang="x-default" href="${SITE_URL}${pg}"/>\n  </url>`;
}));
write('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`);
write('llms.txt', llmsTxt());
write('robots.txt', `User-agent: *\nAllow: /\nDisallow: /uninstall\n\nSitemap: ${SITE_URL}/sitemap.xml\n`);

console.log('Sito generato in', out);
