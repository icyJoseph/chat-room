// returns the socket management
const socket = io();

socket.on("connect", function() {
  console.log("Gained connection to server");

  socket.emit("createEmail", {
    to: "kajsa@example.com",
    text: "Hejjj"
  });
});

socket.on("disconnect", function() {
  console.log("Connection dropped :(");
});

socket.on("newEmail", function(email) {
  console.log("New Email", email);
});
