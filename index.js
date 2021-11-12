const { app, runServer } = require("./server");
const { validateRequest } = require("./middleware/requestValidator");
const { checkHealth } = require("./endpoints/checkHealth");
const { rateLimiter } = require("./middleware/rateLimiter");
const { rejectForeignRequests } = require("./middleware/rejectForeignRequests");
const { getContent } = require("./endpoints/getContent");

(() => {
  runServer();
})();

app.get("/status", (req, res) => checkHealth(req, res));

app.use("/*", rejectForeignRequests);
app.use("/*", rateLimiter);
app.use("/*", validateRequest);

app.post("/getContent", (req, res) => getContent(req, res));
