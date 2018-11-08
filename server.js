const app    = require('express');
const server = require('http').createServer(app);
const socket = require('socket.io');
const io     = socket.listen(server);
const port   = process.env.PORT || 3000;

server.listen(port, function () {
    console.log('Server listening at port %d', port);
});



io.sockets.on('connection',function(client){
	console.log("connected");

    var userId = client.handshake.query.userId;
    client.join(userId);

    client.on('send message', function( data ) {
		io.sockets.emit('new message',{msg:data});
           /* io.sockets.to(rec_id).emit('new message', {
                msg :data
            });*/
    });


	client.on('send offer', function( data ) {
		io.sockets.emit('new offer',{msg:data});
		/* io.sockets.to(rec_id).emit('new message', {
             msg :data
         });*/
	});

	client.on('send cosale', function( data ) {
		io.sockets.emit('new cosale',{msg:data});
		/* io.sockets.to(rec_id).emit('new message', {
             msg :data
         });*/
	});


    client.on('disconnect', function( data ) {
        client.leave(userId);

    });


});

