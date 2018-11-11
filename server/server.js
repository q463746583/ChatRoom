const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

// listen for a new connection, do something after connection
io.on('connection', (socket) => {
  console.log('New user connected!');

  socket.on('disconnect', () => {
    console.log('User was disconnect');
  });
});


// chain the server to the localhost
server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});

// Connection in socketio