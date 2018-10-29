// returns the socket management
const socket = io();

function setConnection(payload) {
  return this.setConnection(payload);
}

class App extends React.Component {
  state = {
    connected: false,
    user: undefined
  };

  componentDidMount() {
    // bind the socket to Component
    socket.on("connect", setConnection.bind(this, true));

    socket.on("disconnect", setConnection.bind(this, false));
  }

  setConnection = payload => this.setState({ connected: payload });
  setUser = user => this.setState({ user });

  render() {
    const { connected, user } = this.state;
    return (
      <React.Fragment>
        <Welcome user={user} connected={connected}>
          <User user={user} setUser={this.setUser} />
        </Welcome>
        <MessageList>
          <MessageInput user={user} />
        </MessageList>
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
