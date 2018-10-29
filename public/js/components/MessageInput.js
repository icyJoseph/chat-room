const { Button, Form, Label, Input } = window["Reactstrap"];

const options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0
};

// TODO: implement debounce for submit
class MessageInput extends React.Component {
  state = {
    value: "",
    notice: "",
    disableGeoLocation: false
  };

  _input = React.createRef();

  componentDidUpdate(prevProps) {
    if (!prevProps.inputShouldFocus && this.props.inputShouldFocus) {
      this.props.setInputShouldFocus(false);
      return this._input.focus();
    }
  }

  handleChange = e => {
    e.preventDefault();
    return this.setState({ value: e.target.value, notice: "" });
  };

  submit = e => {
    e.preventDefault();

    return (
      this.state.value &&
      socket.emit(
        "createMessage",
        {
          from: this.props.user || "Anon",
          text: this.state.value
        },
        this.ack // acknowledgement from server
      )
    );
  };

  getLocation = () => {
    if (!navigator.geolocation) {
      return this.setState({ notice: "Geolocation not supported" });
    }
    this.updateGeoButton({ payload: true });
    return navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) =>
        socket.emit(
          "sharingGeolocation",
          {
            from: this.props.user || "Anon",
            latitude,
            longitude
          },
          this.updateGeoButton // acknowledgement from server
        ),
      () => this.setState({ notice: "Geolocation not allowed" }),
      options
    );
  };

  updateGeoButton = ({ payload, msg }) => {
    this.setState(prev => ({
      disableGeoLocation: payload,
      notice: msg || prev.msg
    }));
  };

  ack = ({ msg }) => {
    // currently ignoring the message
    return this.clearWith(msg);
  };

  clearWith = msg => this.setState({ value: "", notice: msg });

  render() {
    const { notice, disableGeoLocation } = this.state;
    return (
      <div className="bottom-container">
        <Label for="notice">
          {notice ? this.state.notice : "Write something!"}
        </Label>
        <div className="flex-container">
          <Form
            onSubmit={this.submit}
            className="flex-container"
            autocomplete="off"
          >
            <Input
              name="message"
              type="text"
              placeholder="Message"
              autofocus="true"
              value={this.state.value}
              onChange={this.handleChange}
              innerRef={this._input}
            />
            <Button className="message-button">Send</Button>
          </Form>
          <Button
            className="message-button"
            disabled={disableGeoLocation}
            onClick={this.getLocation}
          >
            Location
          </Button>
        </div>
      </div>
    );
  }
}
