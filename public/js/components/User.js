const { Button, Form, Label, Input } = window["Reactstrap"];

class User extends React.Component {
  state = {
    value: ""
  };

  handleChange = e => {
    e.preventDefault();
    return this.setState({ value: e.target.value.slice(0, 6) });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { value } = this.state;
    const { setUser } = this.props;
    setUser(value.slice(0, 6));
    return this.setState({ value: "" });
  };

  resetUser = () => this.props.setUser();

  render() {
    const { value } = this.state;
    const { user } = this.props;
    return (
      <div className="bottom-container">
        {user ? (
          <div>
            <div>Logged in as: {user}</div>
            <Button onClick={this.resetUser}>Change</Button>
          </div>
        ) : (
          <div>
            <Label for="Name">Choose a name or be Anon</Label>
            <div className="flex-container">
              <Form
                className="flex-container"
                onSubmit={this.handleSubmit}
                autocomplete="off"
              >
                <Input
                  type="text"
                  name="name"
                  placeholder="Max 6 characters."
                  value={value}
                  onChange={this.handleChange}
                />
                <Button className="message-button">Apply</Button>
              </Form>
            </div>
          </div>
        )}
      </div>
    );
  }
}
