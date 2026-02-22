require('dotenv').config();
const express = require('express');
const http = require('http');
const { Server } = require ("socket.io");
const mongoose = require('mongoose');
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

// Boot Sequence: Connect to DB -> Init World -> Start Loop
async function bootServer(){
    try{
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB successfully.");

        await world.init();
        
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
    } catch (error){
        console.error("Failed to boot server:", error);
    }
}

bootServer();