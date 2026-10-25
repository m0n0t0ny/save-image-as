> The official, always up-to-date version of this policy is published at https://save-image-as.vercel.app/privacy

# Privacy Policy - Save Image As Extension

**Effective Date:** March 16, 2026
**Last Updated:** October 25, 2026

## Overview

Save Image As .jpg/.png/.webp/.pdf ("the Extension") is committed to protecting your privacy. This Privacy Policy explains how the Extension handles data.

## Data Collection

**We do not collect, store, or transmit any personal data.**

The Extension operates entirely on your local device and does not:
- Collect any personal information
- Track your browsing history
- Store any personal data about your usage (only an anonymous local counter, see "Data Storage")
- Send any data to external servers
- Use cookies or similar tracking technologies
- Communicate with any third-party services

## Permissions Explained

The Extension requires certain permissions to function:

### 1. Context Menus (`contextMenus`)
- **Purpose:** Display the "Save Image As..." menu when you right-click on images
- **Data Access:** None. Only used to show menu options

### 2. Downloads (`downloads`)
- **Purpose:** Save converted images to your chosen download location
- **Data Access:** Only the image you explicitly choose to convert. The image is processed locally and saved directly to your device

### 3. Scripting (`scripting`)
- **Purpose:** Inject the image conversion script to process the image format conversion
- **Data Access:** Only accesses the specific image you right-click on for conversion purposes

### 4. Storage (`storage`)
- **Purpose:** Keep a few settings: a counter of saved images and your answer to the rating request (so a rating is requested at most once), whether you have seen the new bulk download feature, whether the welcome page has been shown, the bulk download mode you chose, and where the save dialog starts
- **Data Access:** Only these settings. They are never sent to us (see "Data Storage" for the two values kept in Chrome sync storage)

### 5. Host Permissions (`<all_urls>`)
- **Purpose:** Allow the Extension to work on any website where you want to save images
- **Data Access:** Only the images you explicitly select to convert. No browsing data is collected or transmitted

## How the Extension Works

1. You right-click on an image
2. You select a conversion format (JPG, PNG, WEBP, or PDF)
3. The image is downloaded and processed **locally in your browser**
4. The converted image is saved to your download folder
5. **No data leaves your device**

## Third-Party Services

The Extension does **not** use any third-party services, analytics, or external libraries that collect data.

PDF files are created by the Extension's own code, entirely locally in your browser, without third-party libraries or external connections.

## Data Storage

All image processing happens in real-time and temporarily in your browser's memory. Once the conversion is complete, no image data is retained.

The Extension stores only these settings locally on your device: the number of images saved and your answer to the rating request (rate, later, no thanks), whether you have already seen the new bulk download feature, the download mode chosen in bulk download (ZIP archive or separate files), and where the save dialog starts (Downloads folder, a subfolder of Downloads with the name you typed, or the last folder used). Two of these values, your final answer to the rating request and whether the welcome page has already been shown after installation, are also kept in Chrome's sync storage: if Chrome sync is on, Chrome copies them to your other computers so you are not asked again. None of these values identify you; they are never sent to us and are removed when you uninstall the Extension.

## Uninstall Feedback Page

When you uninstall the Extension, Chrome opens a feedback page on https://save-image-as.vercel.app. The page address includes only the Extension version and your browser language, so the page can be shown in your language. Answering is optional. If you pick a reason, the page sends only that reason, the Extension version and the language, stored as anonymous counts. If you also write a note, it is stored with the date, the reason, the version and the language; please do not include personal information. No IP addresses or other identifiers are stored. The answers are kept in a database provided by Upstash, Inc. through Vercel.

## Children's Privacy

The Extension does not knowingly collect any information from anyone, including children under the age of 13.

## Changes to This Privacy Policy

We may update this Privacy Policy from time to time. Any changes will be reflected in the "Last Updated" date above. Continued use of the Extension after changes constitutes acceptance of the updated policy.

## Contact Information

If you have questions about this Privacy Policy, please contact:

**Email:** anto.bertu@gmail.com
**Website:** https://save-image-as.vercel.app

## Consent

By using the Extension, you consent to this Privacy Policy.

---

**In Summary:** This Extension is completely privacy-friendly. It doesn't collect or transmit any of your data. All operations happen locally on your device.
