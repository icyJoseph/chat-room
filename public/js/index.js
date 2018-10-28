// returns the socket management
const socket = io();

socket.on("connect", function() {
  console.log("Gained connection to server");

  socket.emit("createMessage", {
    from: "kajsa@example.com",
    text: "Hejjj"
  });
});

socket.on("newMessage", function(message) {
  console.log("newMessage", message);
});

socket.on("disconnect", function() {
  console.log("Connection dropped :(");
});
