class ChatRoom extends React.Component {
  state = {
    user: this.props.username,
    inputShouldFocus: false
  };

  setUser = user => this.setState({ user });
  setInputShouldFocus = payload => this.setState({ inputShouldFocus: payload });

  render() {
    const { user, inputShouldFocus } = this.state;
    const { connected, goBack } = this.props;
    return (
      <React.Fragment>
        <Welcome user={user} connected={connected}>
          <User user={user} setUser={this.setUser} goBack={goBack} />
        </Welcome>
        <MessageList setInputShouldFocus={this.setInputShouldFocus}>
          <MessageInput
            user={user}
            inputShouldFocus={inputShouldFocus}
            setInputShouldFocus={this.setInputShouldFocus}
          />
        </MessageList>
      </React.Fragment>
    );
  }
}
