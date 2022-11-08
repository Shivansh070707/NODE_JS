const express=require('express')
const http=require('http')
var app = express();
var server = http.createServer(app);
const port=8000;
app.use(express.static(__dirname+'/public'))
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html')
})
const io = require('socket.io')(server)

const users = {};

io.on('connection', socket =>{

    socket.on('new-user-joined', name =>{ 
        console.log('user joined',name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name);
    });

    
    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });

 
    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });


})
server.listen(port,()=>{
    console.log("server is listening at port" ,port);
})
