require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");

var db = require("./models");

var env = process.env.NODE_ENV || "development";
var config = require(__dirname + "/config/config.js")[env];

var redis = require("redis");
if (config.use_redis_env_variable) {
  var client = redis.createClient(process.env[config.use_redis_env_variable]);
} else {
  var client = redis.createClient();
}

client.on("connect", () => {
  app.set("client", client);
});

var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var auth = require("./routes/auth");
app.use("/", auth);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  var server = app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );

    var io = require("socket.io");
    var socket = io(server);
    app.set("socket", socket);

    socket.on("connect", socket => {
      socket.emit("id", socket.id);
    });
  });
});

module.exports = app;
