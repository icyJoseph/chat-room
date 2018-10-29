// returns the socket management
const socket = io();

function setConnection(payload) {
  console.log("Connection status: ", payload);
  return this.setConnection(payload);
}

class App extends React.Component {
  state = {
    connected: false
  };

  componentDidMount() {
    socket.on("connect", setConnection.bind(this, true));

    socket.on("disconnect", setConnection.bind(this, false));
  }

  setConnection = payload => this.setState({ connected: payload });

  render() {
    const { connected } = this.state;
    return (
      <React.Fragment>
        <Welcome connected={connected} />
        <MessageList>
          <MessageInput />
        </MessageList>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
