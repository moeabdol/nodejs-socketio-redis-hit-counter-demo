const express  = require('express');
const http     = require('http');
const socketIO = require('socket.io');
const path     = require('path');
const redis    = require('redis');

const app    = express();
const server = http.createServer(app);
const io     = socketIO(server);
const client = redis.createClient();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));

server.listen(3000, err => {
  if (err) return console.log(err);
  console.log('server listening on port 3000');
});

io.on('connect', socket => {
  console.log('client connected');

  socket.on('hello', data => {
    socket.join(data.hashID);

    client.incr(data.hashID, (err, count) => {
      io.to(data.hashID).emit('stats', count);
    });
  });
});
