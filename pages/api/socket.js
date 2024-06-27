import { Server } from 'socket.io';

export default function SocketHandler(req, res) {
  if (res.socket.server.io) {
    console.log('Socket is already running')
  } else {
    console.log('Socket server is initializing')
    const io = new Server(res.socket.server)
    res.socket.server.io = io;

    io.on('connection', (socket) => {
      socket.on('userInfo', (user) => {
        socket.broadcast.emit("new-user", user)
      })

      socket.on('message', msgObj => {
        socket.broadcast.emit('new-message', msgObj)
      })
    })
  }
  res.end()
}