# Save Image As - Chrome Extension

> Convert and save web images in JPG, PNG, WEBP, or PDF format with a single right-click.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-green.svg)](manifest.json)

## 🎯 Features

- **4 Format Support**: Convert images to JPG, PNG, WEBP, or PDF
- **One-Click Conversion**: Right-click on any image and choose your format
- **High Quality**: 92% quality setting for JPG/WEBP conversions
- **Smart Transparency Handling**: Automatically converts transparent backgrounds to white for JPG
- **Privacy-Focused**: No data collection, 100% local processing
- **Works Everywhere**: Compatible with all websites
- **Lightweight**: Less than 500KB total size
- **Multilingual**: Support for 6 languages

## 📦 Installation

### From Chrome Web Store (Recommended)

Coming soon! Extension is currently under review.

### From Source

```bash
git clone https://github.com/m0n0t0ny/save-image-as-extension.git
cd save-image-as-extension
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
- Deutsch (de)
- Français (fr)
- Português Brasileiro (pt_BR)

## 🛠️ Technical Details

- **Manifest V3**: Latest Chrome Extension standard
- **Canvas API**: High-quality image conversion
- **jsPDF**: Professional PDF generation
- **No external dependencies**: All processing happens locally

### Permissions Explained

- **`contextMenus`**: Display the "Save image as..." menu
- **`downloads`**: Save converted images
- **`scripting`**: Process image conversion
- **`<all_urls>`**: Work on any website

**All processing happens locally. No data is sent to any server.**

## 🔒 Privacy & Security

- ✅ No data collection
- ✅ No tracking or analytics
- ✅ No external connections
- ✅ All processing happens locally
- ✅ Open source code

Read our full [Privacy Policy](https://m0n0t0ny.github.io/save-image-as/PRIVACY_POLICY).

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

- [jsPDF](https://github.com/parallax/jsPDF) - PDF generation library
- Chrome Extension documentation and community

## 📞 Support

Need help? Have questions?

- **Email**: anto.bertu@gmail.com
- **Issues**: [GitHub Issues](https://github.com/m0n0t0ny/save-image-as-extension/issues)
- **Privacy Policy**: [Read here](https://m0n0t0ny.github.io/save-image-as/PRIVACY_POLICY)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

**Made with ❤️ for the open-source community**
