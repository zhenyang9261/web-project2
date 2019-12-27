//Require the express moule
const express = require("express");
var exphbs = require("express-handlebars");

//create a new express application
const app = express();

//create an event listener
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.engine(
    "handlebars",
    exphbs({
      defaultLayout: "main"
    })
);

//require the http module
const http = require("http").Server(app);
// require the socket.io module
const io = require("socket.io");

const port = 500;

const socket = io(http);

app.set("view engine", "handlebars");
app.get("/", (req, res) => {
    res.render("chat");
})

//To listen to messages
socket.on("connection", socket => {
    console.log("user connected");
    socket.emit("message", {"message": "hello, world"});

    socket.on("clientSend", msg => {
        console.log({msg});
    });
});



//wire up the server to listen to our port 500
http.listen(port, () => {
    console.log("connected to port: " + port)
});

