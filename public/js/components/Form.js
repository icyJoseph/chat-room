class Form extends React.Component {
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
      <div>
        <p>{success ? this.state.success : "Write something!"}</p>
        <form onSubmit={this.submit}>
          <input
            name="message"
            type="text"
            placeholder="Message"
            value={this.state.value}
            onChange={this.handleChange}
          />
          <button>Send</button>
        </form>
      </div>
    );
  }
}
