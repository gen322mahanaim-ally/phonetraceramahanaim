# Phone Trace App - Phone Tracking Software

A full-stack phone tracing application built with **Next.js**, **Firebase**, **TypeScript**, and **Tailwind CSS** that enables tracking phones using IMEI numbers or phone numbers, even when offline.

## Features

✅ **Track by IMEI or Phone Number** - Locate phones using either identifier  
✅ **Offline Tracking** - Access last known location of offline devices  
✅ **Real-time Location Updates** - WebSocket support for live tracking  
✅ **Admin Dashboard** - Comprehensive management interface  
✅ **JWT Authentication** - Secure token-based authentication  
✅ **Location History** - Track device movement over time  
✅ **Firebase Integration** - Cloud-based data storage and real-time database  
✅ **Responsive Design** - Works on desktop and mobile devices  

## Tech Stack

- **Frontend**: Next.js 16+, React 19, Tailwind CSS 4, TypeScript
- **Backend**: Next.js API Routes
- **Database**: Firebase Firestore & Realtime Database
- **Authentication**: JWT + Firebase Auth
- **State Management**: Zustand
- **Maps**: React Map GL + Mapbox (optional)
- **Real-time**: WebSocket (ws)

## Getting Started

### 1. Prerequisites

- Node.js 18+ and npm
- Firebase Project (create at https://firebase.google.com)

### 2. Installation

```bash
npm install
```

### 3. Configuration

Copy the environment template and update with your Firebase credentials:

```bash
cp .env.local.example .env.local
```

### 4. Development

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

### 5. Build for Production

```bash
npm run build
npm start
```

## API Endpoints

**Authentication**: `POST /api/auth`  
**Search Device**: `GET /api/device/search?imei=xxx` or `?phoneNumber=xxx`  
**Update Location**: `POST /api/device/location`  
**Get History**: `GET /api/device/location?deviceId=xxx`  

All device endpoints require JWT authorization header: `Authorization: Bearer <token>`

## Database Collections

**devices** - Device information with IMEI, phone number, status, last location  
**locations** - Location history with GPS coordinates and timestamps  

## Offline Tracking

The app stores and displays the last known location of offline devices, enabling users to view where a device was last connected.

## Security

- JWT token authentication on all sensitive endpoints
- Firebase security rules for data protection
- Environment variables for configuration
- Request validation on API routes

## Support

Refer to `.env.local.example` for required configuration variables and check Firebase console for setup details.
