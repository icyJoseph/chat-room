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
      <div className="messages">
        <div className="top-container message-list">
          {this.state.messages.map(({ url, from, text }) => (
            <CardText className="card-text-container">
              <CardTitle>{from} says:</CardTitle>
              {url ? (
                <CardLink href={url} target="_blank" rel="noopener">
                  I am here!
                </CardLink>
              ) : (
                <CardText>{text}</CardText>
              )}
              {!url && <Button className="action-button">Like</Button>}
            </CardText>
          ))}
        </div>

        {this.props.children}
      </div>
    );
  }
}
