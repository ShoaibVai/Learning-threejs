# Express Basic Starter

A simple Express.js server for learning local and LAN hosting.

## Setup

```bash
npm install
npm start
```

## Features

- Serves on `0.0.0.0` (accessible from LAN)
- Request counter
- API endpoint at `/api/info`
- Server statistics dashboard

## Usage

1. Start the server: `npm start`
2. Access locally: `http://localhost:3000`
3. Find your local IP: `ipconfig` (Windows) or `ifconfig` (Mac/Linux)
4. Access from another device: `http://YOUR_LOCAL_IP:3000`

## Development

```bash
npm install -g nodemon  # For auto-restart
npm run dev
```

## Next Steps

- Add authentication
- Implement port forwarding
- Set up HTTPS
