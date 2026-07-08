# ScanUpload Next.js Example

This project is a Next.js example for integrating ScanUpload into a web app.
It renders the ScanUpload QR code flow in the browser and uses server-side route
handlers to create sessions, refresh tokens, and download uploaded files.

## Requirements

- Node.js 20 or newer
- npm
- A ScanUpload client ID and client secret from https://app.scanupload.net

## 1. Install dependencies

From the project root, run:

```sh
npm install
```

## 2. Create your local environment file

This project uses server-side environment variables for ScanUpload credentials.

1. Copy `.env.example` to `.env.local`
2. Open `.env.local`
3. Replace the placeholder values with your real ScanUpload credentials

Example:

```dotenv
SCANUPLOAD_CLIENT_ID=your-client-id
SCANUPLOAD_CLIENT_SECRET=your-client-secret
```

You can get these values from https://app.scanupload.net.

The project also supports optional non-secret overrides in `.env.local`, but in
most cases you do not need to change them.

## 3. Start the development server

Run:

```sh
npm run dev
```

Next.js will start the app locally at:

```text
http://localhost:3000
```

## 4. Use the app

1. Open http://localhost:3000 in your browser.
2. Confirm the QR code loads.
3. Scan the QR code with your phone.
4. Upload one or more files from the phone.
5. Use the Download Files button in the app to download the uploaded files.

## Environment variables

These are the main variables used by the app:

```dotenv
SCANUPLOAD_CLIENT_ID=your-client-id
SCANUPLOAD_CLIENT_SECRET=your-client-secret
```

Optional overrides are already documented in [.env.example](.env.example).

## Available scripts

```sh
npm run dev
npm run build
npm run start
```

- `npm run dev` starts the local development server.
- `npm run build` creates a production build.
- `npm run start` runs the production build locally after `npm run build`.

## Deploying to Vercel

If you deploy this project to Vercel, add the same environment variables in the
Vercel project settings:

- `SCANUPLOAD_CLIENT_ID`
- `SCANUPLOAD_CLIENT_SECRET`

Do not commit real secrets to the repository.
