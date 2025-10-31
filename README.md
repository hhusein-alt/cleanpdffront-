# CleanPDF.ai Frontend

React frontend for CleanPDF.ai - A fast and smart web service for removing watermarks from PDF files.

## Tech Stack

- **React 18.2.0** - UI framework
- **Tailwind CSS 3.3.5** - Styling
- **Framer Motion** - Animations
- **Lucide React** - Icons
- **Create React App** - Build tool

## Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm start
```

Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### Build

```bash
npm run build
```

Builds the app for production to the `build` folder.

## Environment Variables

Create a `.env` file in the root directory:

```
REACT_APP_API_URL=http://localhost:8000
```

For production, set `REACT_APP_API_URL` to your backend API URL (e.g., `https://your-backend.onrender.com`)

## Deployment to Vercel

1. Push this repository to GitHub
2. Import project in Vercel
3. Set build command: `npm run build`
4. Set output directory: `build`
5. Add environment variable: `REACT_APP_API_URL` with your backend URL
6. Deploy!

## Features

- Modern, responsive UI with dark theme
- Drag & drop PDF upload
- Real-time processing status
- Automatic download of processed PDFs
- Support for Gamma.app watermark removal

## License

MIT
