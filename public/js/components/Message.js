const { Button, Form, Label, Input } = window["Reactstrap"];

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

class Message extends React.Component {
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
      <div
        style={{
          position: "absolute",
          height: this.props.height,
          bottom: "25px",
          padding: "15px",
          width: "100%"
        }}
      >
        <Label for="exampleText">
          {notice ? this.state.notice : "Write something!"}
        </Label>
        <div style={{ width: "100%", display: "flex" }}>
          <Form
            onSubmit={this.submit}
            style={{ width: "100%", display: "flex" }}
          >
            <Input
              name="message"
              type="text"
              placeholder="Message"
              value={this.state.value}
              onChange={this.handleChange}
            />
            <Button style={{ margin: "0 5px" }}>Send</Button>
          </Form>
          <Button style={{ margin: "0 5px" }} onClick={this.getLocation}>
            Location
          </Button>
        </div>
      </div>
    );
  }
}
