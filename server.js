const compression = require("compression");
const cors = require("cors");
const helmet = require("helmet");
const express = require("express");
const { isProduction } = require("./utils/isProduction");

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
  if (isProduction()) {
    console.log("PRODUCTION");

    const fs = require("fs");
    const https = require("https");
    const p = Number(process.env.prod_PORT);

    const options = {
      cert: fs.readFileSync(__dirname + "/certs/fullchain.pem", "utf8"),
      key: fs.readFileSync(__dirname + "/certs/privkey.pem", "utf8"),
    };
    const server = https.createServer(options, app);
    server.listen(p, console.log("Server is on port:", p));
    return server;
  } else {
    console.log("DEVELOPMENT");
    const http = require("http");
    const server = http.createServer(app);
    // connectDB();
    const p = Number(process.env.dev_PORT);
    server.listen(p, console.log("Server is on port:", p));
    return server;
  }
};

module.exports = {
  runServer,
  app,
};
