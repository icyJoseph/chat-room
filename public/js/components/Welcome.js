const { Jumbotron } = window["Reactstrap"];

const Welcome = () => {
  return (
    <div className="flex-height">
      <Jumbotron>
        <h1 className="display-3">Hello, world!</h1>
        <p className="lead">This is a simple chat app.</p>
        <hr className="my-2" />
        <p>It uses SocketIO to bring people together</p>
      </Jumbotron>
    </div>
  );
};
