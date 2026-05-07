const { PeerServer } = require('peer');
const express = require('express');

const app = express();

// Health check so Glitch keeps the server alive
app.get('/', (req, res) => res.send('VibeCheck signaling server is running ✓'));

const server = app.listen(process.env.PORT || 3000, () => {
  console.log('Server running on port', process.env.PORT || 3000);
});

// Mount PeerJS on /peerjs path
const peerServer = PeerServer({
  server,
  path: '/peerjs',
  allow_discovery: false,
  proxied: true,
});

peerServer.on('connection', client => {
  console.log('Peer connected:', client.getId());
});

peerServer.on('disconnect', client => {
  console.log('Peer disconnected:', client.getId());
});
