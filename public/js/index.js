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

// React Components

const Welcome = () => <h1>Welcome!</h1>;

class Form extends React.Component {
  state = {
    value: "",
    success: ""
  };

  handleChange = e => {
    e.preventDefault();
    return this.setState({ value: e.target.value, success: "" });
  };

  submit = e => {
    e.preventDefault();
    return socket.emit(
      "createMessage",
      {
        from: "Browser",
        text: this.state.value
      },
      ({ msg }) => {
        // currently ignoring the message
        return this.clearWith(msg);
      }
    );
  };

  clearWith = msg => this.setState({ value: "", success: msg });

  render() {
    const { success } = this.state;
    return (
      <div>
        <p>{success ? this.state.success : "Write something!"}</p>
        <form onSubmit={this.submit}>
          <input
            name="message"
            type="text"
            placeholder="Message"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <button>Send</button>
        </form>
      </div>
    );
  }
}

class MessageList extends React.Component {
  state = { messages: [] };

  componentDidMount() {
    socket.on("newMessage", msg => {
      return this.addMessage(msg);
    });
  }

  addMessage = msg => {
    return this.setState(prev => ({ messages: prev.messages.concat(msg) }));
  };

  render() {
    return this.state.messages.map(({ from, text }) => (
      <div>
        <p>from: {from}</p>
        <p>Message: {text}</p>
      </div>
    ));
  }
}

const App = () => (
  <div>
    <Welcome />
    <Form />
    <MessageList />
  </div>
);

ReactDOM.render(<App />, document.getElementById("root"));
