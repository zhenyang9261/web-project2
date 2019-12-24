console.log("shit ran");
var form = document.querySelector(".chat-typing-form");
var socket = io();

form.addEventListener("submit", event => {
    event.preventDefault();

    socket.emit("clientSend", form.elements[0].value);
});


