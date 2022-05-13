import express from "express";
import cors from "cors";
import http from 'http'
import path from "path";
import fs from "fs"
import { Server } from 'socket.io'
import { playerContainer } from "./PlayerContainer";

const app = express();
const PORT = 2002;
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ['GET', 'POST']
    }
})

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static(path.join(__dirname, "public")));

io.on('connection', (socket) => {
    playerContainer.addUser(socket.id)
    console.log(`Logged in from: ${socket.id}\npopulation: ${playerContainer.length}`)

    socket.on('initPlayer', (arg) => {
        playerContainer.updateUser(socket.id, arg)
    })
    socket.on('update', (arg) => {
        playerContainer.updateUser(socket.id, arg)
    })
    socket.on('disconnect', () => {
        playerContainer.removeUser(socket.id)
        console.log(`Logged out from: ${socket.id}\npopulation: ${playerContainer.length}`)

    })

    setInterval(() => {
        io.emit('update', {timestamp: new Date(),payload:playerContainer.list})
    }, 40)
})

server.listen(PORT, () => {
    console.log(`http listening on port: ${PORT}`);
    console.log(`population: ${playerContainer.length}`);
});