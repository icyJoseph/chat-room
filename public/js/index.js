// returns the socket management
const socket = io();

function setConnection(payload) {
  return this.setConnection(payload);
}

class App extends React.Component {
  state = {
    connected: false,
    room: undefined,
    username: undefined,
    insideRoom: false
  };

  componentDidMount() {
    // bind the socket to Component
    socket.on("connect", setConnection.bind(this, true));
    socket.on("disconnect", setConnection.bind(this, false));
  }

  setConnection = payload => this.setState({ connected: payload });

  setRoomAndUser = (username, room) =>
    this.setState({ room, username, insideRoom: true });

  goBack = () =>
    this.setState({ room: undefined, username: undefined, insideRoom: false });

  render() {
    const { connected, room, username, insideRoom } = this.state;
    return (
      <React.Fragment>
        {!insideRoom && (
          <RoomSelection
            setRoomAndUser={this.setRoomAndUser}
            connected={connected}
          />
        )}
        {insideRoom && (
          <ChatRoom
            room={room}
            username={username}
            connected={connected}
            goBack={this.goBack}
          />
        )}
      </React.Fragment>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
