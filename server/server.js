const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');
const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

// listen for a new connection, do something after connection
io.on('connection', (socket) => {
  console.log('New user connected!');

  // when a user join chat room, greeting individual user
  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat room'));

  // brodcaset everyone know new user join
  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joind'));


  socket.on('createMessage', (m, callback) => {
    console.log('Created message', m);
    io.emit('newMessage', generateMessage(m.from, m.text));
    callback('Thi is Cool!');
  });

  // When you colse the tab in the browser which exit the server
  // you will get the message in your termial
  socket.on('disconnect', () => {
    console.log('User was disconnect');
  });
});


// chain the server to the localhost
server.listen(port, () => {
  console.log(`Server is up on ${port}`);
});

// Connection in socketio
