const { Badge, Jumbotron } = window["Reactstrap"];

const Welcome = ({ connected, user, children }) => {
  return (
    <div className="welcome-container">
      <Jumbotron className="top-container">
        <h1 className="display-3">Hello, {user || "world!"}</h1>
        <Badge color={connected ? "success" : "danger"}>
          Connection: {connected ? "OK" : "Bad"}
        </Badge>
        <p className="lead">This is a simple chat app.</p>
        <hr className="my-2" />
        <p>It uses SocketIO to bring people together</p>
      </Jumbotron>
      {children}
    </div>
  );
};
