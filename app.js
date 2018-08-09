const express  = require('express');
const http     = require('http');
const socketIO = require('socket.io');
const path     = require('path');

const app    = express();
const server = http.createServer(app);
const io     = socketIO(server);

server.listen(3000, err => {
  if (err) return console.log(err);
  console.log('server listening on port 3000');
});
