// returns the socket management
const socket = io();

socket.on("connect", function() {
  console.log("Gained connection to server");
});

socket.on("newMessage", function(message) {
  console.log("newMessage", message);
});

socket.on("disconnect", function() {
  console.log("Connection dropped :(");
});

socket.emit(
  "createMessage",
  {
    from: "Fr",
    text: "Hi"
  },
  function({ msg }) {
    console.log("ACK", msg);
  }
);

const Awesome = () => <p>Awesome</p>;

ReactDOM.render(<Awesome />, document.getElementById("root"));
