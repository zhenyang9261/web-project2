var createText = document.querySelector(".chat-typing-form");
const socket = io().connect();
var currChat = document.querySelector(".curr-chat");
var chatBody = document.querySelector(".chat-body");

function displayMessage(text, isUserText) {
    const newText = document.createElement("p");
    newText.textContent = text;
    
    if(isUserText) {
        newText.classList.add("userTest")
    } else {
        newText.classList.add("recipientText");
    }

    chatBody.appendChild(newText);
}

socket.on("connect", () => {
    console.log("we get in the connection");
    console.log(socket.id);
    $.ajax({
        url: "/users/chat/create-connection", 
        method: "POST",
        headers: {
            "token": localStorage.getItem("jwt")
        },
        data: {
            socketId: socket.id 
        }
    })
    .then(response => {
        console.log(response);
    })
    .catch(err => {
        console.log(err);
    })
});

socket.on("message", message => {
    displayMessage(message.text, false);
})

createText.addEventListener("submit", event => {
    event.preventDefault();
    
    $.ajax({
        url: "/users/chat", 
        method: "POST", 
        data: {
            connectionId: socket.id, 
            recipientId: currChat.dataset.recipientid, 
            text: createText.elements[0].value
        }, 
        headers: {
            "token": localStorage.getItem("jwt")
        }
    })
    .then(response => {
        console.log(response);
    })
    .catch(err => {
        console.log(err);
    })

})