// returns the socket management
const socket = io();

socket.on("connect", function() {
  console.log("Gained connection to server");

  socket.emit("createMessage", {
    from: "kajsa@example.com",
    text: "Hejjj"
  });
});

socket.on("disconnect", function() {
  console.log("Connection dropped :(");
});

socket.on("newMessage", function(email) {
  console.log("newMessage", email);
});
