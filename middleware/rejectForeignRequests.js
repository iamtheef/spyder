const rejectForeignRequests = (req, res, next) => {
  if (isBanned(req)) {
    return res.status(403).send("You've been banned forever from this API.");
  }

  if (isFromRapidAPI(req)) {
    next();
  } else {
    res.status(403).send("You don't have access here.");
    return;
  }
};

const isFromRapidAPI = (req) => {
  return (
    !!req.headers["x-rapidapi-proxy-secret"] &&
    req.headers["x-rapidapi-proxy-secret"] === process.env.rapidAPISecret
  );
};

const isBanned = (req) => {
  const bannedIPs = ["103.152.158.50"];
  return bannedIPs.includes(req.ip.split(":").pop());
};

module.exports = {
  rejectForeignRequests,
};
