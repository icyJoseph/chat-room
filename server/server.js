const path = require("path");
const http = require("http");
const express = require("express");
const socketIO = require("socket.io");
const {
  generateMessage,
  generateMessageFromGeolocation
} = require("./utils/message");

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
  socket.emit("newMessage", generateMessage("Server", "Welcome"));

  // emit a message to everyone but the socket. Broadcasting.
  socket.broadcast.emit(
    "newMessage",
    generateMessage("Server", "New User joined")
  );

  socket.on("createMessage", ({ from, text }, callback) => {
    console.log("createMessage", { from, text });

    //emit event to all connections
    io.emit("newMessage", generateMessage(from, text));
    callback({
      msg: "Sent your message"
    });
  });

  socket.on("sharingGeolocation", ({ from, latitude, longitude }, callback) => {
    console.log("sharingGeolocation", { from, latitude, longitude });

    //emit event to all connections
    io.emit(
      "newMessage",
      generateMessageFromGeolocation(from, latitude, longitude)
    );
    callback({
      msg: "Shared your location"
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
