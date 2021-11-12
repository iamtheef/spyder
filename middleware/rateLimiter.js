const limiter = require("express-rate-limit");

const opts = limiter({
  windowMs: 1000 * 60 * 60, // 1 hour
  max: 1000, // limit each IP to 1000 requests per windowMs
  message: "Too many requests.",
});

const rateLimiter = (req, res, next) => {
  opts(req, res, next);
};

module.exports = {
  rateLimiter,
};
