# ScanUpload Next.js Example

This project is a Next.js App Router example for integrating ScanUpload into a
web app. The browser creates ScanUpload sessions through a same-origin
`/hub-api` rewrite and connects to the hub with SignalR. It has no ScanUpload
server API routes and does not require a client secret.

## Requirements

- Node.js 20 or newer
- npm
- A ScanUpload client ID from https://app.scanupload.net/dashboard

## 1. Install dependencies

From the project root, run:

```sh
npm install
```

## 2. Create your local environment file

This project uses browser-visible configuration for the ScanUpload hub.

1. Copy `.env.example` to `.env.local`
2. Open `.env.local`
3. Replace the placeholder values with your real ScanUpload credentials

Example:

```dotenv
NEXT_PUBLIC_SESSION_URL=/hub-api/api/v2/front-end/session
NEXT_PUBLIC_CLIENT_ID=your-tenant-id
```

You can get these values from https://app.scanupload.net.

`NEXT_PUBLIC_SESSION_URL` is the browser-visible session route. The fixed
rewrite in `next.config.ts` forwards `/hub-api/*` to
`https://hub.scanupload.net/*`, avoiding a cross-origin session request. Do
not put a client secret in a `NEXT_PUBLIC_*` variable.

## 3. Start the development server

Run:

```sh
npm run dev
```

Next.js will start the app locally over HTTPS at:

```text
https://localhost:3000
```

## 4. Use the app

1. Open https://localhost:3000 in your browser.
2. Confirm the QR code loads.
3. Scan the QR code with your phone.
4. Upload one or more files from the phone.

Next.js generates a self-signed certificate for local development. On first
visit, use your browser's advanced option to proceed to localhost.

## Environment variables

These are the main variables used by the app:

```dotenv
NEXT_PUBLIC_SESSION_URL=/hub-api/api/v2/front-end/session
NEXT_PUBLIC_HUB_API_TARGET=https://hub.scanupload.net
NEXT_PUBLIC_CLIENT_ID=your-tenant-id
```

The client ID is public and used to scope requests; a client secret is for
server-side integrations and is intentionally not used in this demo.

## Local origins

For localhost development, enable **Test Mode** in the client configuration at
https://app.scanupload.net/dashboard. Before production deployment, disable
Test Mode and add the exact public origin, including scheme and port, to the
client's allowed origins.

HTTPS is required because the widget establishes a secure SignalR WebSocket.
If your deployment sets a Content Security Policy, allow the hub in
`connect-src`:

```text
connect-src 'self' https://hub.scanupload.net wss://hub.scanupload.net;
```

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

If you deploy this project to Vercel, add these values in the Vercel project
settings and rebuild the deployment:

- `NEXT_PUBLIC_SESSION_URL`
- `NEXT_PUBLIC_CLIENT_ID`
- `NEXT_PUBLIC_HUB_API_TARGET`

Register the Vercel application's exact public origin in ScanUpload before
using the production deployment. For example:

```text
https://scanupload-example-vercel.vercel.app
```

After deployment, the session request in browser DevTools should be a POST to
`https://scanupload-example-vercel.vercel.app/hub-api/api/v2/front-end/session`.
