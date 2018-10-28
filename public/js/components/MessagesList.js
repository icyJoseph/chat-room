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
