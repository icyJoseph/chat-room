const {
  Card,
  Button,
  CardTitle,
  CardText,
  CardLink,
  Form,
  Label,
  Input
} = window["Reactstrap"];

class MessageList extends React.Component {
  state = { messages: [] };

  componentDidMount() {
    //subscribe the event handlers
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
        {this.state.messages.map(({ url, from, text }) => (
          <CardText
            style={{ width: "250px", padding: "15px", marginTop: "10px" }}
          >
            <CardTitle>{from} says:</CardTitle>
            {url ? (
              <CardLink href={url} target="_blank" rel="noopener">
                I am here!
              </CardLink>
            ) : (
              <CardText>{text}</CardText>
            )}
            {!url && <Button style={{ width: "50px" }}>Like</Button>}
          </CardText>
        ))}
      </div>
    );
  }
}
