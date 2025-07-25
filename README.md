# 📱 QRCodeX – Scan & Generate Smarter QR Codes

**QRCodeX** is a sleek and powerful QR code utility app that allows you to **scan**, **detect**, and **generate** a wide variety of QR codes.  
Whether you're scanning Wi-Fi credentials, visiting URLs, sharing contacts, or creating dynamic codes, **QRCodeX** has your back with speed, accuracy, and flexibility.

---

## ✨ Features

### 🔍 Scan & Detect

- 📷 **Real-Time QR Code Scanning**
  - Lightning-fast camera scanning with auto-focus
- 🧠 **Smart Detection**
  - Automatically detects the type of content:
    - 🔗 URLs
    - 📧 Emails
    - 📞 Phone numbers
    - 📍 Locations
    - 📶 Wi-Fi credentials
    - 📇 vCards / contact info
    - 📄 Plain text
- 📚 **Scan History**
  - Keeps a list of recently scanned codes (optional)
- 🌗 **Flashlight & Dark Mode Support**

---

### 🧾 Generate QR Codes

- 🛠️ **Generate Multiple QR Code Types**
  - URL
  - Email address
  - Phone number
  - Text message
  - Contact (vCard)
  - Wi-Fi network login
  - Plain text
- 🎨 **Customization Options**
  - Change QR code color, size, and background
  - Optional branding/logo overlay *(coming soon!)*
- 📥 **Download & Share**
  - Save as PNG or instantly share via other apps

---

## 🧰 Tech Stack

| Layer         | Tech                           |
|---------------|--------------------------------|
| **Framework** | React Native + Expo            |
| **Language**  | TypeScript                     |
| **QR Scanning** | `expo-camera` + `react-native-vision-camera` / `expo-barcode-scanner` |
| **QR Generation** | `qrcode.react` / `react-native-qrcode-svg` |
| **Storage**   | AsyncStorage / SecureStore (for history) |
| **Sharing**   | `expo-sharing` or `react-native-share` |
| **Styling**   | custom CSS-in-JS |

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Expo CLI installed
- A physical device or emulator with a camera

### Installation

```
git clone https://github.com/yourusername/qrcodex.git
cd qrcodex
npm install
npx expo start
```
Use the QR code to open in Expo Go on your phone.

## 📂 Folder Structure
```
qrcodex/
├── src/
│   ├── components/         # Reusable UI components
│   ├── screens/            # Scanner, Generator, History, Settings
│   ├── utils/              # Helpers for parsing/scanning QR types
│   ├── assets/             # Icons, logos
│   └── App.tsx             # Entry point
├── .env
├── app.json
└── README.md
 ```
## 🔐 Permissions
QRCodeX requires:

- 📷 Camera permission (for scanning)

- 📁 Media library permission (to save generated QR codes)

- ⚡ Flashlight toggle access (optional)

## 🌟 Planned Features
- 🧠 Smart QR suggestion based on clipboard contents

- 💬 In-app history search

- 🧾 PDF export for multiple QR codes

- 👤 Profile-specific QR generators (LinkedIn, GitHub, etc.)

- 🎨 Logo overlay in QR generator

- 🌍 Multi-language support

## 📱 Use Cases
- Students sharing project links

- Event organizers generating entry codes

- Devs sharing repo links or contact cards

- Offices managing Wi-Fi QR displays

- Anyone needing to quickly scan and decode information

## 👨‍💻 Author
Brendan Mebuge Kamsiyochukwu
📬 brendanmebson@gmail.com

## 🙏 Acknowledgments
Thanks to the amazing open-source packages that power this app, and all devs who love mixing utility with elegance.
QRCodeX is for the hackers, the hustlers, the doers, and everyone tired of typing long URLs by hand. 😎

Scan it. Share it. Own it. 🚀
