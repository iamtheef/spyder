const { app } = require("../server");
const { isProduction } = require("../utils/isProduction");
const path = require("path");

const checkHealth = async (_, __) => {
  const port = Number(
    isProduction() ? process.env.prod_PORT : process.env.dev_PORT
  );
  try {
    __.status(200).send({
      proxy: !!app,
      msg: "Spyder is up and running!",
      env: process.env.NODE_ENV,
      port: port,
      certificate: isProduction() ? checkCertificate() : "dev mode",
      time: new Date().toString(),
    });
  } catch (e) {
    __.status(500).send(e);
  }
  return;
};

const checkCertificate = () => {
  const { abs, ceil } = Math;
  const x509 = require("x509");
  let expDate = x509.parseCert(
    path.join(__dirname, "../certs/fullchain.pem")
  ).notAfter;
  return {
    validTill: expDate.toString(),
    isValid: expDate > new Date(),
    daysLeft: ceil(
      abs(new Date().getTime() - expDate.getTime()) / (1000 * 60 * 60 * 24)
    ),
  };
};

module.exports = {
  checkHealth,
};
