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

io.on('connection', (socket) => {
  console.log('Created socket connection: ', socket);
});
