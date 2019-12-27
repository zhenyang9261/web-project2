var form = document.querySelector(".chat-typing-form");
var chatBody = document.querySelector(".chat-body");
var socket = io.connect();
var connectionId;
var currChat = document.querySelector(".curr-chat");
var conversations = document.getElementsByClassName("conversation-preview-display");

socket.on("connect", () => {
    connectionId = socket.id;

    $.post("/users/chat/create-connection", {
        id: , 
        connectionId: connectionId
    });
});

function changeCurrConversation(newConversationElement) {
    console.log(newConversationElement);
}

for(const conversation of conversations) {
    conversation.addEventListener("click", (event) => {
        if(event.target.classList[0] != "conversation-preview-display") {
            const parentElement = event.target.parentElement;
           
            changeCurrConversation(parentElement);
        } else {
            changeCurrConversation(event.target);
        }
    })
}


function addTextToScreen(text, isFromUser) {
    const newText = document.createElement("p");
    newText.textContent = text;

    if(isFromUser) {
        newText.classList.add("userText");
    } else {
        newText.classList.add("recipientText");
    }
  
    chatBody.appendChild(newText);
}


form.addEventListener("submit", event => {
    event.preventDefault();

    addTextToScreen(form.elements[0].value, true);

    $.post("/users/chat", {
        text: form.elements[0].value, 
        connectionId: connectionId, 
        recipientId: currChat.dataset.recipientid 
    })
    .then(response => {
        console.log(response);
    })
    .catch(err => {
        console.log(err);
    })
});

socket.on("message", msg => console.log(msg));


