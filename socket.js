const { Server } = require("socket.io");
const Msg = require('./model/message')




module.exports = (server) => {

    const io = new Server(server);
    const connected_users = [];

    io.on('connection', (socket) => {
        let username = socket.handshake.auth.token;
        io.emit('online:users', connected_users);
        io.emit('chat:message', {username, msg: 'I\'m online'})
        console.log( `New client has connected: ${socket.id}` );
        connected_users.push(username);
        // console.log(socket);
    
        socket.on('message', ( data ) => {
          io.emit('chat:message', data);
          Msg(data);
        });
    
        socket.on('on:typing', ( username ) => {
          io.emit('on:typing', username);
        });
    
        socket.on('off:typing', ( username ) => {
          io.emit('off:typing', username);
        });

        socket.on('disconnect', () => {
          io.emit('chat:message', {username, msg: `${username} has disconnected`})
          console.log(`${username} disconnected`)
          connected_users.splice(username, 1);
        })

        // socket.on('show:user', (data) => {
        //   io.emit('show:user', data)
        // })
      
    
      });

}