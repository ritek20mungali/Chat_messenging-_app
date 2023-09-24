const express = require('express');
const app = express();
const path = require('path');
const Server = require('http').createServer(app);

const io = require("socket.io")(Server);
app.use(express.static(path.join(__dirname + "/public")));

io.on("connection", function (socket) {
    socket.on("newUser", function (username) {
        socket.broadcast.emit("update", username + "joined the conversation");
    })

    socket.on("exitUser", function (username) {
        socket.broadcast.emit("update", username + "left the conversation");
    })
    socket.on("chat", function (message) {
        socket.broadcast.emit("chat", message);
    })
})
Server.listen(1010, () => {
    console.log("Server is running at 1010")
})
