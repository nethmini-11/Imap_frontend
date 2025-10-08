# Gmail IMAP Frontend - Setup Guide

## Prerequisites

- **Node.js** (version 18 or higher)
- **npm** (comes with Node.js)
- **Backend API** running on `http://localhost:3000`

## Installation Steps

### 1. Navigate to Project Directory
```bash
cd Imap-frontend
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration

Create a `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:3000/api/v1
VITE_APP_NAME=MailView
```

### 4. Development Server
```bash
npm run dev
```
Frontend will start at: `http://localhost:5173`

### 5. Production Build
```bash
npm run build
npm run preview
```

## Available Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## Project Structure

```
imap-frontend/
├── src/
│   ├── components/    # React components
│   ├── pages/         # Page components
│   ├── store/         # Redux store
│   ├── services/      # API services
│   ├── hooks/         # Custom React hooks
│   ├── types/         # TypeScript types
│   └── utils/         # Utility functions
├── public/            # Static assets
└── dist/              # Production build
```

## Features

- **React 19** with TypeScript
- **Redux Toolkit** for state management
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API calls
- **Lucide React** for icons

## Dependencies Overview

### Core Dependencies
- `react` & `react-dom` - React framework
- `@reduxjs/toolkit` & `react-redux` - State management
- `react-router-dom` - Client-side routing
- `axios` - HTTP client for API calls
- `lucide-react` - Icon library

### Styling
- `tailwindcss` - Utility-first CSS framework
- `@tailwindcss/forms` & `@tailwindcss/typography` - Tailwind plugins

### Development
- `typescript` - Type safety
- `vite` - Build tool and dev server
- `eslint` - Code linting

## Troubleshooting

### Common Issues

1. **Backend Connection Failed**
   - Ensure backend is running on `http://localhost:3000`
   - Check `VITE_API_URL` in `.env` file

2. **Port Already in Use**
   - Vite will automatically suggest another port
   - Or manually change port in `vite.config.ts`


### Getting Help

Check browser console for errors and verify:
- Backend API is accessible
- Environment variables are set correctly
- All dependencies are installed

Your frontend is now ready to connect with the Gmail IMAP backend!