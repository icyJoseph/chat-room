// returns the socket management
const socket = io();

socket.on("connect", function() {
  console.log("Gained connection to server");

  socket.emit("createMessage", {
    from: "kajsa@example.com",
    text: "Hejjj"
  });
});

socket.on("newMessage", function(email) {
  console.log("newMessage", email);
});

socket.on("disconnect", function() {
  console.log("Connection dropped :(");
});
