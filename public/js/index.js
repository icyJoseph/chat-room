// returns the socket management
const socket = io();

socket.on("connect", function() {
  console.log("Gained connection to server");
});

socket.on("disconnect", function() {
  console.log("Connection dropped :(");
});

const App = () => (
  <React.Fragment>
    <Welcome />
    <MessageList>
      <MessageInput />
    </MessageList>
  </React.Fragment>
);

ReactDOM.render(<App />, document.getElementById("root"));
