const { Button, Form, Label, Input } = window["Reactstrap"];

class Message extends React.Component {
  state = {
    value: "",
    success: ""
  };

  handleChange = e => {
    e.preventDefault();
    return this.setState({ value: e.target.value, success: "" });
  };

  submit = e => {
    e.preventDefault();

    return socket.emit(
      "createMessage",
      {
        from: "Browser",
        text: this.state.value
      },
      ({ msg }) => {
        // currently ignoring the message
        return this.clearWith(msg);
      }
    );
  };

  clearWith = msg => this.setState({ value: "", success: msg });

  render() {
    const { success } = this.state;
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
          {success ? this.state.success : "Write something!"}
        </Label>
        <Form onSubmit={this.submit} style={{ width: "100%", display: "flex" }}>
          <Input
            name="message"
            type="text"
            placeholder="Message"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <Button>Send</Button>
        </Form>
      </div>
    );
  }
}
