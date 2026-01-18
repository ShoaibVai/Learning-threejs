const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Request counter
let requestCount = 0;

// Routes
app.get('/', (req, res) => {
  requestCount++;
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>My Server</title>
      <style>
        body { font-family: Arial; max-width: 800px; margin: 50px auto; padding: 20px; }
        .stats { background: #f0f0f0; padding: 20px; border-radius: 8px; }
      </style>
    </head>
    <body>
      <h1>🚀 My Local Server</h1>
      <div class="stats">
        <h2>Server Info</h2>
        <p><strong>Hostname:</strong> ${require('os').hostname()}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Request Count:</strong> ${requestCount}</p>
        <p><strong>Your IP:</strong> ${req.ip}</p>
      </div>
    </body>
    </html>
  `);
});

app.get('/api/info', (req, res) => {
  res.json({
    hostname: require('os').hostname(),
    uptime: process.uptime(),
    requests: requestCount,
    timestamp: new Date().toISOString()
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
  console.log(`📡 Access from LAN: http://YOUR_LOCAL_IP:${PORT}`);
});
