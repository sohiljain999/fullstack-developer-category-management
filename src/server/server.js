const {
  router
} = require('./api/categories.controller');

const {
  dbConnect
} = require('./config/db');

// Use Express
var express = require('express');

// Create new instance of the express server
const app = express();
const PORT = process.env.PORT || 3000;

dbConnect();

app.use(express.json());
app.use(router);

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// Init the server
var server = app.listen(PORT, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});

/*  "/health"
 *   GET: Get server status
 */
app.get("/api/health", function (req, res) {
  try {
    res.status(200).json({
      status: "Server is UP"
    });
  } catch (err) {
    res.status(500).send(err);
  }

});
