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
    return this.setState(
      prev => ({ messages: prev.messages.concat(msg) }),
      scrollToBottom
    );
  };

  render() {
    return (
      <div className="messages">
        <div id="messages-container" className="top-container message-list">
          {this.state.messages.map(({ url, from, text, formattedTime }) => (
            <CardText className="card-text-container">
              <CardTitle>
                <span className="message-username">{from}</span> says:
              </CardTitle>
              {url ? (
                <CardLink href={url} target="_blank" rel="noopener">
                  I am here!
                </CardLink>
              ) : (
                <CardText>{text}</CardText>
              )}
              {/* {!url && <Button className="action-button">Like</Button>} */}
              <CardText className="timestamp">Sent at {formattedTime}</CardText>
            </CardText>
          ))}
        </div>
        {this.props.children}
      </div>
    );
  }
}

// Reasoning for scroll
// if  scrollTop + containerHeight + newMessageHeight + previousLastMessage>= scrollHeight (all messages)
// then autoscroll
// if we are nearby the bottom, second to last message, scroll to bottom

function scrollToBottom() {
  const container = document.getElementById("messages-container");
  const scrollTop = container.scrollTop;
  const containerHeight = container.offsetHeight;
  const scrollHeight = container.scrollHeight;

  const newMessageHeight = container.lastChild.offsetHeight;
  const prevLast =
    container.lastChild.previousElementSibling &&
    container.lastChild.previousElementSibling.offsetHeight;

  const shouldScrollToBottom =
    scrollTop + containerHeight + newMessageHeight + prevLast >= scrollHeight;

  if (shouldScrollToBottom) {
    container.scrollTo(0, scrollHeight);
  }
  return null;
}
