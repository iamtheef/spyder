const compression = require("compression");
const cors = require("cors");
const helmet = require("helmet");
const express = require("express");

require("dotenv").config();

const app = require("express")();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(compression());
app.set("trust proxy", true);
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

const runServer = () => {
  const http = require("http");
  const server = http.createServer(app);
  const p = Number(process.env.PORT);
  server.listen(p, console.log("Server is on port:", p));
  return server;
};

module.exports = {
  runServer,
  app,
};
