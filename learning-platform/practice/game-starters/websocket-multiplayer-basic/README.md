# WebSocket Multiplayer Basic Starter

Simple multiplayer game server and client using WebSockets.

## Setup

### Server
```bash
cd server
npm install
npm start
```

Server runs on `ws://localhost:8080`

### Client
```bash
cd client
npm install
npm run dev
```

Client runs on `http://localhost:5173`

## Features

- WebSocket server with room system
- Client prediction
- Multiple players
- Simple chat

## Testing

Open multiple browser tabs to see multiplayer in action.

## Project Structure

```
server/
  server.js     - WebSocket server
client/
  src/
    main.ts     - Client code
    game.ts     - Game logic
```
