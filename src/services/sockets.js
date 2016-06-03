import io from 'socket.io-client'

const socket = io('localhost:8000');

var secretKey = ''

console.log('init socket')

socket.on('news', function (data) {
  console.log('Socket !!!!', data)
})

export function setSecretKey(key) {
  secretKey = key
}

export function on(eventName, cb) {
  return socket.on(eventName, cb)
}

export function emit(eventName, data) {
  return socket.emit(eventName, data)
}

export function emitWithKey(eventName, data) {
  socket.emit(eventName, {
    key: secretKey,
    data: data
  });
}
