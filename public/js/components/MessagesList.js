const { Card, Button, CardTitle, CardText, Form, Label, Input } = window[
  "Reactstrap"
];

class MessageList extends React.Component {
  state = { messages: [] };

  componentDidMount() {
    //subscribe the event handler
    socket.on("newMessage", msg => {
      return this.addMessage(msg);
    });
  }

  addMessage = msg => {
    return this.setState(prev => ({ messages: prev.messages.concat(msg) }));
  };

  render() {
    return (
      <div
        id="message-list"
        style={{
          width: "100%",
          height: "50%",
          position: "absolute",
          overflowY: "scroll",
          padding: "10px 30px"
        }}
      >
        {this.state.messages.map(({ from, text }) => (
          <Card style={{ width: "250px", padding: "15px", marginTop: "10px" }}>
            <CardTitle>{from} says:</CardTitle>
            <CardText>{text}</CardText>
            <Button style={{ width: "50px" }}>Like</Button>
          </Card>
        ))}
      </div>
    );
  }
}
