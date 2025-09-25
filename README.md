# 📸 Capacitor Picture Bucket

A modern, cross-platform photo gallery app built with React, TypeScript, and Capacitor. This project was created to be used at the VI Wecomp @ IFSP São Carlos.

![Capacitor](https://img.shields.io/badge/Capacitor-7.4.3-blue)
![React](https://img.shields.io/badge/React-19.1.1-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.8.3-blue)
![Firebase](https://img.shields.io/badge/Firebase-12.2.1-orange)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.13-blue)

## 🔗 Links

-   🌐 **Live App**: [picbucket.diegopagotto.me](https://picbucket.diegopagotto.me)
-   📱 **Download APK**: [picbucket.diegopagotto.me/download](https://picbucket.diegopagotto.me/download)

## ✨ Features

-   📷 **Camera Integration**: Take photos directly from your device
-   ☁️ **Cloud Storage**: Photos stored in Firebase Storage
-   🔄 **Real-time Sync**: Automatic photo synchronization across devices
-   📱 **Cross-platform**: Runs on iOS, Android, and Web
-   🎨 **Modern UI**: Masonry grid layout with smooth animations
-   🔐 **Anonymous Auth**: Secure Firebase authentication without sign-up
-   🗑️ **Photo Management**: Delete photos with long-press interaction

## 🛠️ Tech Stack

-   **Frontend**: React 19 + TypeScript
-   **UI Framework**: TailwindCSS 4
-   **Mobile Framework**: Capacitor 7
-   **Backend**: Firebase (Firestore + Storage + Auth)
-   **Build Tool**: Vite 7
-   **Icons**: FontAwesome
-   **Camera**: Capacitor Camera Plugin

## 🚀 Quick Start

### Prerequisites

-   Node.js 18+
-   npm or yarn
-   Android Studio (for Android development)
-   Xcode (for iOS development)

### Installation

1. **Clone the repository**

    ```bash
    git clone https://github.com/DiegoPagotto/capacitor-picture-bucket.git
    cd capacitor-picture-bucket
    ```

2. **Install dependencies**

    ```bash
    npm install
    # or
    yarn install
    ```

3. **Set up Firebase**

    - Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
    - Enable Authentication (Anonymous sign-in)
    - Create a Firestore database
    - Set up Firebase Storage
    - Copy your Firebase config

4. **Configure environment variables**

    ```bash
    cp .env.example .env
    ```

    Fill in your Firebase configuration in `.env`:

    ```env
    VITE_FIREBASE_API_KEY=your_api_key
    VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
    VITE_FIREBASE_PROJECT_ID=your_project_id
    VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
    VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
    VITE_FIREBASE_APP_ID=your_app_id
    VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
    ```

5. **Start development server**
    ```bash
    npm run dev
    # or
    yarn dev
    ```

## 📱 Mobile Development

### Android

1. **Build and sync**

    ```bash
    npm run build
    npx cap add android
    npx cap sync android
    ```

2. **Open in Android Studio**
    ```bash
    npx cap open android
    ```

### iOS

1. **Build and sync**

    ```bash
    npm run build
    npx cap add ios
    npx cap sync ios
    ```

2. **Open in Xcode**
    ```bash
    npx cap open ios
    ```

## 🏗️ Project Structure

```
src/
├── components/          # React components
│   ├── Header.tsx      # App header with camera button
│   ├── PhotoGrid.tsx   # Masonry photo grid
│   └── PhotoItem.tsx   # Individual photo item
├── config/             # App configuration
│   ├── firebase.ts     # Firebase configuration
│   └── firebaseAuth.ts # Authentication setup
├── hooks/              # Custom React hooks
│   └── usePhotoGallery.ts # Photo management hook
├── services/           # Business logic
│   └── photoService.ts # Photo CRUD operations
├── types/              # TypeScript definitions
│   └── photo.ts        # Photo type definitions
└── App.tsx            # Main app component
```

## 🔐 Firebase Security Rules

### Firestore Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /photos/{document} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### Storage Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /photos/{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
