const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

const players = new Map();
let nextPlayerId = 1;

wss.on('connection', (ws) => {
  const playerId = nextPlayerId++;
  
  players.set(playerId, {
    id: playerId,
    x: Math.random() * 400 + 200,
    y: Math.random() * 300 + 150,
    color: `hsl(${Math.random() * 360}, 70%, 50%)`
  });

  console.log(`Player ${playerId} connected. Total players: ${players.size}`);

  // Send player their ID and current players
  ws.send(JSON.stringify({
    type: 'init',
    playerId: playerId,
    players: Array.from(players.values())
  }));

  // Broadcast new player to others
  broadcast({
    type: 'player-joined',
    player: players.get(playerId)
  }, playerId);

  ws.on('message', (data) => {
    try {
      const msg = JSON.parse(data);

      if (msg.type === 'move') {
        const player = players.get(playerId);
        if (player) {
          player.x = msg.x;
          player.y = msg.y;
          
          // Broadcast position to others
          broadcast({
            type: 'player-moved',
            playerId: playerId,
            x: msg.x,
            y: msg.y
          }, playerId);
        }
      } else if (msg.type === 'chat') {
        broadcast({
          type: 'chat',
          playerId: playerId,
          message: msg.message
        });
      }
    } catch (error) {
      console.error('Error handling message:', error);
    }
  });

  ws.on('close', () => {
    players.delete(playerId);
    console.log(`Player ${playerId} disconnected. Total players: ${players.size}`);
    
    broadcast({
      type: 'player-left',
      playerId: playerId
    });
  });
});

function broadcast(message, excludePlayerId = null) {
  const data = JSON.stringify(message);
  let i = 0;
  for (const [playerId, _] of players) {
    if (playerId !== excludePlayerId) {
      const client = Array.from(wss.clients)[i];
      if (client && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    }
    i++;
  }
}

console.log('✅ WebSocket server running on ws://localhost:8080');
