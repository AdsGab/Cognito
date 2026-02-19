const express = require('express');
const http = require('http');
const { Server } = require ("socket.io");
const World = require ('./World');
const path = require ('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, '../../public')));

const world = new World();
world.init();

io.on('connection', (socket)=>{
    console.log('User connected:', socket.id);

    //Send initial state
    socket.emit('state_update',world.agents);

    socket.on('disconnect',()=>{
        console.log('User disconnected:', socket.id);
    });
});

// The Game Loop
// Runs at 10 ticks per second 
setInterval(()=> {
    const gameState = world.tick();
    io.emit('state_update', gameState);
}, 1000/world.tickRate);

const PORT = process.env.PORT|| 3000;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});