const { Button, Form, Label, Input } = window["Reactstrap"];

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

class MessageInput extends React.Component {
  state = {
    value: "",
    notice: ""
  };

  handleChange = e => {
    e.preventDefault();
    return this.setState({ value: e.target.value, notice: "" });
  };

  submit = e => {
    e.preventDefault();

    return socket.emit(
      "createMessage",
      {
        from: "Browser",
        text: this.state.value
      },
      this.ack // acknowledgement from server
    );
  };

  getLocation = () => {
    if (!navigator.geolocation) {
      return this.setState({ notice: "Geolocation not supported" });
    }
    return navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) =>
        socket.emit(
          "sharingGeolocation",
          {
            from: "Browser",
            latitude,
            longitude
          },
          this.ack // acknowledgement from server
        ),
      () => this.setState({ notice: "Geolocation not allowed" }),
      options
    );
  };

  ack = ({ msg }) => {
    // currently ignoring the message
    return this.clearWith(msg);
  };

  clearWith = msg => this.setState({ value: "", notice: msg });

  render() {
    const { notice } = this.state;
    return (
      <div className="message-input">
        <Label for="exampleText">
          {notice ? this.state.notice : "Write something!"}
        </Label>
        <div className="flex-container">
          <Form onSubmit={this.submit} className="flex-container">
            <Input
              name="message"
              type="text"
              placeholder="Message"
              value={this.state.value}
              onChange={this.handleChange}
            />
            <Button className="message-button">Send</Button>
          </Form>
          <Button className="message-button" onClick={this.getLocation}>
            Location
          </Button>
        </div>
      </div>
    );
  }
}
