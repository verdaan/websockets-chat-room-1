// make websocket connection
const socket = io.connect('http://localhost:5000');

// query DOM
const message = document.getElementById('message');
const handle = document.getElementById('handle');
const btn = document.getElementById('send');
const output = document.getElementById('output');
const feedback = document.getElementById('feedback');

// emit event
// when send button clicked, emit event via websocket with values of inputs
btn.addEventListener('click', () => {
  socket.emit('chat', {
    message: message.value,
    handle: handle.value
  });
});

// when typing a message, broadcast event showing user typing
message.addEventListener('keypress', () => {
  socket.emit('typing', handle.value);
});

// listen for events from server
socket.on('chat', (data) => {
  // when chat event received on client side, add HTML with message to output div
  output.innerHTML += `<p><strong>${data.handle}: </strong>${data.message}</p>`;

  // when typing event received, add HTML to feedback div
  feedback.innerHTML = `<p><em>${data}</em></p>`;
});
