const express = require('express')

const app = express()
const port = process.env.PORT || 8000

app.use(express.static('dist'))

app.set('port', port)

const server = require('http').Server(app);
const io = require('socket.io')(server);

var state = {
  steps: 0,
  geoloc: {
    lat: 0,
    lng: 0
  }
}

io.on('connection', function (socket) {

  io.emit('STATE_UPDATED', state)

  function isAuth (key) {
    if (key === '4242') {
      return true
    } else {
      socket.emit('WRONG_KEY')
      return false
    }
  }

  function stateUpdated () {
    io.emit('STATE_UPDATED', state)
  }

  socket.on('TRY_KEY', function (request) {
    if (isAuth(request)) {
      io.emit('CORRECT_KEY')
    }
  })

  socket.on('UPDATE_STATE', function (request) {
    if (isAuth(request.key)) {
      state = request.data
      stateUpdated()
    }
  })

});

server.listen(port, () => {
  console.error('Server is up, visit  http://localhost:' + port + ' !')
})

// const express  = require('express')
//
// exports.static = function initServer (server) {
//   server.use(express.static('dist'))
// }
//
// exports.socket = function useSocket (server) {
//   var http = require('http').Server(server);
//   var io = require('socket.io')(http);
//
//   io.on('connection', function (socket) {
//     socket.on('SET_ME_POSITION', function (data) {
//       io.emit('UPDATE_ME_POSITION', data)
//     });
//     socket.on('STOP_ALL_MOVE', function () {
//       socket.broadcast.emit('STOP_MOVE')
//     });
//     socket.on('SET_PEDOMETER', function (data) {
//       io.emit('UPDATE_PEDOMETER', data)
//     });
//   });
//
//   return http
// } // end useSocket
