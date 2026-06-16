# 🛍️ Vaymp E-Commerce App

Apk [link](https://expo.dev/artifacts/eas/aixSO1qVwAgMM3LtT_OxVNmGCSqwH_b1OxGFJgatFpg.apk)

A modern, fully-functional e-commerce mobile application built with React Native, Expo, and Redux Toolkit.

**Status**: ✅ Production Ready | Tested on Physical Android Device

---

## 📋 Features Implemented

### ✅ Core Features

- **📦 Product Listing**: Fetch and display 20+ products from FakeStoreAPI
- **🔍 Smart Filtering**: Filter products by category
- **📊 Advanced Sorting**: Sort by price (low-high, high-low) and rating
- **🛒 Shopping Bag**: Add, remove, and update product quantities
- **💾 Data Persistence**: Shopping bag survives app restart via Redux Persist
- **🎨 Professional UI**: Clean, modern design matching Figma specifications

### ✅ Advanced Features

- **📱 Responsive Design**: 2-column grid layout for products
- **⚡ Performance Optimized**: FlatList optimization, useMemo for filtering/sorting
- **🔤 Custom Fonts**: Outfit font family (Regular, Medium, SemiBold)
- **♿ Accessibility**: Proper touch feedback and UI conventions
- **🛡️ Type Safety**: Full TypeScript with strict mode

---

## 🏗️ Tech Stack

| Technology               | Version | Purpose                              |
| ------------------------ | ------- | ------------------------------------ |
| **React Native**         | 0.85.3  | Cross-platform mobile framework      |
| **Expo**                 | 56.0.11 | Development platform & build service |
| **React**                | 19.2.3  | UI library                           |
| **Redux Toolkit**        | 2.12.0  | State management                     |
| **Redux Persist**        | 6.0.0   | Data persistence                     |
| **React Redux**          | 9.3.0   | React-Redux bindings                 |
| **TypeScript**           | 6.0.3   | Type safety                          |
| **Tailwind CSS (twrnc)** | 4.16.0  | Styling                              |
| **Expo Router**          | 56.2.10 | Navigation                           |
| **AsyncStorage**         | 3.1.1   | Persistent storage                   |

---

## 📂 Folder Structure

```
src/
├── app/                      # Screen components (Expo Router)
│   ├── _layout.tsx          # Root layout with Redux Provider
│   ├── index.tsx            # Products listing screen
│   └── bag.tsx              # Shopping bag screen
│
├── components/              # Reusable UI components
│   ├── ProductCard.tsx      # Product display card
│   ├── SortBottomSheet.tsx  # Sort options modal
│   ├── FilterBottomSheet.tsx # Filter options modal
│   ├── QuantitySelector.tsx # +/- quantity control
│   └── EmptyBag.tsx         # Empty cart state
│
├── redux/                   # State management
│   ├── store.ts             # Redux store configuration
│   └── slices/
│       ├── productSlice.ts  # Product state & fetching
│       |── bagSlice.ts      # Shopping bag state
        ├── filterSlice.ts       # Filter state
│
├── hooks/                   # Custom React hooks
│   └── redux.ts             # Typed Redux hooks
│
├── types/                   # TypeScript interfaces
│   ├── product.ts           # Product types
│   ├── bag.ts               # Bag types
│   └── filter.ts            # Filter types
│
├── utils/                   # Utility functions
│   ├── filterProducts.ts    # Category filtering logic
│   └── sortProducts.ts      # Sorting logic
│
├── providers/               # Context providers
│   └── ReduxProvider.tsx    # Redux + Persist setup
│
└── global.css               # Global styles & CSS variables
```

---

## ⚙️ Installation

### Prerequisites

- Node.js 18+ and npm
- Expo CLI: `npm install -g expo-cli`
- Physical Android device OR Android emulator
- Expo Go app (for testing)

### Setup Steps

```bash
# Clone and install
git clone https://github.com/PailaKarthik/Vaymp-Assignment.git 
cd vaymp-assignment
npm install

# Start development
npm start -- --clear

# On device: Scan QR code with Expo Go app
```

---

## 🚀 Running the App

### Start Development Server

```bash
npm start -- --clear
```

### Testing Options

- **Expo Go** (Physical Device): Scan QR code
- **Android Emulator**: Press 'a'
- **iOS Simulator**: Press 'i' (macOS only)

---

## 📦 Building APK

### Prerequisites

```bash
npm install -g eas-cli
eas login
```

### Build Commands

```bash
# Cloud build (recommended)
eas build --platform android

# Local build
eas build --platform android --local
```

**Configuration**: See [eas.json](./eas.json)

---

## 🛠️ Redux State Management

### Store Structure

```
{
  product: { products[], loading, error },
  bag: { items[], totalItems, grandTotal },
  filter: { selectedCategory }
}
```

---

## 💾 Data Persistence

**Redux Persist + AsyncStorage**:

- Bag data automatically saved
- Persists across app restarts
- Secure device storage
- No additional configuration needed

---

## 🎯 Feature Details

| Feature         | Details                                              |
| --------------- | ---------------------------------------------------- |
| **Products**    | 20+ from FakeStoreAPI, 2-column grid                 |
| **Sorting**     | Price Low→High, Price High→Low, Rating High→Low      |
| **Filtering**   | Category filter (Electronics, Jewelery, Clothing)    |
| **Bag**         | Add, remove, quantity controls, totals               |
| **Persistence** | Redux + AsyncStorage, survives restart               |
| **UI**          | Outfit fonts, blue accent color, professional design |

---

## 🐛 Troubleshooting

| Issue                       | Solution                                       |
| --------------------------- | ---------------------------------------------- |
| **Products don't load**     | Check internet, verify FakeStoreAPI accessible |
| **Fonts look wrong**        | Clear cache: `npm start -- --clear`            |
| **Bag data not persisting** | Check AsyncStorage permissions                 |
| **App crashes**             | Clear app data, reinstall, check logs          |

---

**Last Updated**: 2026-06-15 | **Status**: ✅ Production Ready
