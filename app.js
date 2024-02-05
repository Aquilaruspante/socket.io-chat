const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.render('index');
})


io.use((socket, next) => {
    console.log(`This is some middleware`);
    return next();
})

io.on('connection', (socket) => {
    console.log(socket.id);
    socket.on('new-message', (message, id) => {
        io.emit('transmitted', message, id);
        
    })    
})



server.listen(3000, () => {
    console.log('Listening on port 3000');
})