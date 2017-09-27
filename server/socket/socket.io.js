const socketio = require('socket.io');
const http = require('http');

module.exports = function (app) {
  const server = http.createServer(app);
  const io = socketio.listen(server);
  io.on('connection', function(socket) {
    console.log(socket);
  });

  return server;
}

