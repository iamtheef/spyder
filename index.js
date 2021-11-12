const { app, runServer } = require("./server");
const { validateRequest } = require("./middleware/requestValidator");
const { getContent } = require("./endpoints/getContent");

(() => {
  runServer();
})();

app.use("/*", validateRequest);
app.post("/getContent", (req, res) => getContent(req, res));
