// returns the socket management
const socket = io();

socket.on("connect", function() {
  console.log("Gained connection to server");
});

socket.on("disconnect", function() {
  console.log("Connection dropped :(");
});

// React Setup
const Welcome = () => <h1>Welcome!</h1>;

const App = () => (
  <div>
    <Welcome />
    <Form />
    <MessageList />
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));
