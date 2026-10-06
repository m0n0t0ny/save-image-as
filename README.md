# Save Image As - Chrome Extension

> Convert and save web images in JPG, PNG, WEBP, or PDF format with a single right-click, or bulk download every image on a page.

**[Install from the Chrome Web Store](https://chromewebstore.google.com/detail/ogbmmojbdhijgnijijmmcobjlamkciko?utm_source=github&utm_medium=readme&utm_campaign=readme)**, free, 7,000+ weekly users. Website: https://save-image-as.vercel.app

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.2.0-green.svg)](manifest.json)

## 🎯 Features

- **4 Format Support**: Convert images to JPG, PNG, WEBP, or PDF
- **One-Click Conversion**: Right-click on any image and choose your format
- **Bulk Download**: Scan a page (including iframes) and download all images at once, with smart deduplication and size filters
- **Common conversions**: WEBP to JPG, WEBP to PNG, PNG to JPG, image to PDF
- **High Quality**: 92% quality setting for JPG/WEBP conversions
- **Smart Transparency Handling**: Automatically converts transparent backgrounds to white for JPG
- **Privacy-Focused**: No data collection, 100% local processing
- **Works Everywhere**: Compatible with all websites
- **Lightweight**: Less than 500KB total size
- **Multilingual**: Support for 7 languages

## 📦 Installation

### From Chrome Web Store (Recommended)

[Save Image As on the Chrome Web Store](https://chromewebstore.google.com/detail/ogbmmojbdhijgnijijmmcobjlamkciko?utm_source=github&utm_medium=readme&utm_campaign=readme)

### From Source

```bash
git clone https://github.com/m0n0t0ny/save-image-as.git
cd save-image-as
```

Then:
1. Open Chrome and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top-right)
3. Click "Load unpacked"
4. Select this folder
5. Done!

## 🚀 Usage

1. **Right-click** on any image on a webpage
2. Hover over **"Save image as..."** in the context menu
3. **Select your desired format**:
   - **JPG** - Smaller files, best for photos (transparency becomes white)
   - **PNG** - Supports transparency, ideal for logos and graphics
   - **WEBP** - Modern format with excellent compression
   - **PDF** - Save image as a PDF document
4. **Choose where to save** the file
5. Done!

## 🌍 Supported Languages

- English (en)
- Italiano (it)
- Español (es)
- Español Latinoamérica (es_419)
- Deutsch (de)
- Français (fr)
- Português Brasileiro (pt_BR)

## 🛠️ Technical Details

- **Manifest V3**: Latest Chrome Extension standard
- **Canvas API**: High-quality image conversion
- **Built-in PDF writer**: Single-page PDFs created without external libraries
- **No external dependencies**: All processing happens locally, the whole package is under 40 KB

### Permissions Explained

- **`contextMenus`**: Display the "Save image as..." menu
- **`downloads`**: Save converted images
- **`scripting`**: Process image conversion
- **`storage`**: Remember a few local settings (saved-images counter for the rating request, the "new" label, the bulk download mode). Nothing leaves your device
- **`<all_urls>`**: Work on any website

**All processing happens locally. No data is sent to any server.**

## 🔒 Privacy & Security

- ✅ No data collection
- ✅ No tracking or analytics
- ✅ No external connections
- ✅ All processing happens locally

Read our full [Privacy Policy](https://save-image-as.vercel.app/privacy).

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License
Copyright (c) 2026 Antonio Bertuccio
```

## 👤 Author

**Antonio Bertuccio**

- Email: anto.bertu@gmail.com
- GitHub: [@m0n0t0ny](https://github.com/m0n0t0ny)

## 🙏 Acknowledgments

- Chrome Extension documentation and community

## 📞 Support

Need help? Have questions?

- **Email**: anto.bertu@gmail.com
- **Website**: [save-image-as.vercel.app](https://save-image-as.vercel.app)
- **Privacy Policy**: [Read here](https://save-image-as.vercel.app/privacy)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**Made with ❤️ for the open-source community**
