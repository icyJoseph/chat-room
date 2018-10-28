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
  // creates a custom event
  socket.emit("newEmail", {
    from: "joseph@example.com",
    text: "What's up?",
    createAt: 123
  });

  socket.on("createEmail", newEmail => {
    console.log("createEmail", newEmail);
  });

  socket.on("disconnect", () => {
    console.log("Lost a client :(");
  });
});

app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`Running in port ${port}`);
});
