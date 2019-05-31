const express = require('express');
const socket = require('socket.io');

// app setup
const app = express();

const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

// static files
app.use(express.static('public'));

// socket setup
const io = socket(server);

// listen for connection requests and events
io.on('connection', (socket) => {
  console.log('Created socket connection:', socket.id);

  // when event 'chat' is received, emit the received data to every connected socket
  socket.on('chat', (data) => {
    io.emit('chat', data);
  });

  // when event 'typing' is received, broadcast the received data showing which user is typing
  socket.on('typing', (handle) => {
    socket.broadcast.emit('typing', `${handle} is typing...`);
  });
});
