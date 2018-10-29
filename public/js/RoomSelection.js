const { Button, Form, FormGroup, Label, Input } = window["Reactstrap"];

class RoomSelection extends React.Component {
  userInput = React.createRef();
  roomInput = React.createRef();

  onChangeUser = () => {
    return this.setState({ userValue });
  };

  onChangeRoom = () => {
    return this.setState({ roomValue });
  };

  submit = e => {
    e.preventDefault();
    const userValue = this.userInput.current.value;
    const roomValue = this.roomInput.current.value;
    const { setRoomAndUser } = this.props;

    return setRoomAndUser(userValue, roomValue);
  };

  render() {
    return (
      <div className="room-selection-page">
        <Form onSubmit={this.submit}>
          <FormGroup>
            <Label for="userName">Username</Label>
            <Input
              type="text"
              name="username"
              placeholder="Username"
              innerRef={this.userInput}
              autocomplete="off"
            />
          </FormGroup>
          <FormGroup>
            <Label for="room">Room</Label>
            <Input
              type="text"
              name="room"
              placeholder="Room name"
              innerRef={this.roomInput}
              autocomplete="off"
            />
          </FormGroup>
          <Button>Go!</Button>
        </Form>
      </div>
    );
  }
}
