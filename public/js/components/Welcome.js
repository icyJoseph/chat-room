const { Badge, Jumbotron } = window["Reactstrap"];

const Welcome = ({ connected }) => {
  return (
    <div className="flex-height">
      <Jumbotron>
        <h1 className="display-3">Hello, world!</h1>
        <Badge color={connected ? "success" : "danger"}>
          Connection: {connected ? "OK" : "Bad"}
        </Badge>
        <p className="lead">This is a simple chat app.</p>
        <hr className="my-2" />
        <p>It uses SocketIO to bring people together</p>
      </Jumbotron>
    </div>
  );
};
