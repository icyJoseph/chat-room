const path = require("path");
const http = require("http");
const express = require("express");

const port = process.env.PORT || 1337;
// path to front end files
const publicPath = path.join(__dirname, "../public");

const app = express();

const server = http.createServer(app);

app.use(express.static(publicPath));

server.listen(port, () => {
  console.log(`Running in port ${port}`);
});
