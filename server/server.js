const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");

const port = process.env.PORT || 1337;
// path to front end files
const publicPath = path.join(__dirname, "../public");

// returns express app
const app = express();

// pass the express app to http
const server = http.createServer(app);
// returns the webSocket server
const io = socketIO(server);

// register listener
io.on("connection", socket => {
  console.log("New user connected");

  // emit a message to the socket only
  socket.emit("newMessage", {
    from: "Server",
    text: "Welcome"
  });

  // emit a message to everyone but the socket. Broadcasting.
  socket.broadcast.emit("newMessage", {
    from: "Server",
    text: "New user joined"
  });

  socket.on("createMessage", message => {
    console.log("createMessage", message);

    //emit event to all connections
    io.emit("newMessage", {
      ...message,
      createdAt: new Date().getTime()
    });
  });

  socket.on("disconnect", () => {
    console.log("Lost a client :(");
  });
});

app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`Running in port ${port}`);
});
