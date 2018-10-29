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
  state = { messages: [], show: false };

  componentDidMount() {
    //subscribe the event handlers
    socket.on("newMessage", msg => {
      return this.addMessage(msg);
    });
    this.container = document.getElementById("messages-container");
    this.container.addEventListener("scroll", this.shouldShowToBottom);
  }

  componentWillUnmount() {
    this.container.removeEventListener("scroll", this.shouldShowToBottom);
  }

  shouldShowToBottom = () => {
    const scrollTop = this.container.scrollTop;
    const scrollHeight = this.container.scrollHeight;
    const containerHeight = this.container.offsetHeight;
    const nextState = scrollHeight - containerHeight > scrollTop + 5;

    return this.setState({ show: nextState });
  };

  toBottom = () => {
    const scrollHeight = this.container.scrollHeight;
    this.props.setInputShouldFocus(true);
    return this.container.scrollTo(0, scrollHeight);
  };

  addMessage = msg => {
    return this.setState(
      prev => ({ messages: prev.messages.concat(msg) }),
      scrollToBottom
    );
  };

  render() {
    const { show } = this.state;
    return (
      <div className="messages">
        {show && (
          <div className="to-bottom-container">
            <div className="to-bottom-wrapper">
              <Button onClick={this.toBottom}>To Bottom</Button>
            </div>
          </div>
        )}
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
    scrollTop + containerHeight + newMessageHeight + prevLast >=
    scrollHeight - 10;

  if (shouldScrollToBottom) {
    container.scrollTo(0, scrollHeight);
  }
  return null;
}
