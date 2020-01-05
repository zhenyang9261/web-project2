var createText = document.querySelector(".chat-typing-form");

const socket = io().connect();

var currChat = document.querySelector(".curr-chat");
var chatBody = document.querySelector(".chat-body");

var createNewChatButton = document.querySelector(".create-new-chat");
var chatListContainer = document.querySelector(".chat-list-container");

var currChatInitialsDisplay = document.getElementById("main-chat-initials-display");
var moreDetailsButton = document.getElementById("more-details-button");
var chatHeader = document.querySelector(".main-chat-header");
var chatNavHeaderInitials = document.querySelector(".chat-nav-header-initials");

var getNewContactForm = document.querySelector(".get-new-contact-form");
var createNewChatPrompt = document.querySelector(".create-new-chat-prompt");

var conversations = document.getElementsByClassName("conversation-preview-display");
var recipientIds = [];

function fillChatNavInitialsContainer() {
    var initialsId = "recipient-initials-" + currChat.dataset.recipientid;
    var initials = document.getElementById(initialsId);
    
    chatNavHeaderInitials.textContent = initials.textContent;
}

function checkForNewConversation() {
    if(document.getElementsByClassName("curr-chat").length > 1) {
        var currChats = document.getElementsByClassName("curr-chat");

        for(let i = currChats.length - 1; i > 0; i--) {
            currChats[i].classList.remove("curr-chat");
        }
    }

    clearChatDisplay();
}

function clearChatDisplay() {
    while(chatBody.firstChild) {
        chatBody.removeChild(chatBody.firstChild);
    }
}

function displayMessages(messages) {
    clearChatDisplay();

    try {
        messages = JSON.parse(messages);

        for(const message of messages) {
            displayMessage(message.text, message.isFromUser);
        }
    } catch(err) {

    }
}

function createRecipientInitialsDisplay() {
    var recipientInitialsDisplayContainer = document.createElement("div");
    recipientInitialsDisplayContainer.classList.add("recipient-initials-display-container");

    var recipientInitialsDisplay = document.createElement("div");
    recipientInitialsDisplay.classList.add("recipient-initials-display");

    var recipientInitials = document.createElement("p");
    recipientInitials.classList.add("initials");
    
    recipientInitialsDisplay.appendChild(recipientInitials);
    recipientInitialsDisplayContainer.appendChild(recipientInitialsDisplay);

    return recipientInitialsDisplayContainer;
}

function createRecipientInformationContainer() {
    var recipientName = document.createElement("p");
    recipientName.classList.add("recipient-name");
    recipientName.setAttribute("id", "recipient-id-");

    var lastTextSentTime = document.createElement("p");
    lastTextSentTime.classList.add("last-text-sent-time");

    var recipientNameAndTimeDisplay = document.createElement("div");
    recipientNameAndTimeDisplay.classList.add("recipient-name-and-time-display");
    recipientNameAndTimeDisplay.appendChild(recipientName);
    recipientNameAndTimeDisplay.appendChild(lastTextSentTime);
    
    var lastTextSent = document.createElement("p");
    lastTextSent.classList.add("last-text-sent");

    var recipientInformationContainer = document.createElement("div");
    recipientInformationContainer.classList.add("recipient-information-container");
    recipientInformationContainer.appendChild(recipientNameAndTimeDisplay);
    recipientInformationContainer.appendChild(lastTextSent);

    return recipientInformationContainer;
}

function createNewChatPreviewDisplay() {
    var newChatDisplay = document.createElement("div");
    newChatDisplay.classList.add("conversation-preview-display");
    newChatDisplay.classList.add("new-conversation")
    newChatDisplay.classList.add("curr-chat");

    currChat.classList.remove("curr-chat");
    currChat = newChatDisplay;

    var recipientInitialsDisplay = createRecipientInitialsDisplay();
    var recipientInformationContainer = createRecipientInformationContainer();

    currChat.appendChild(recipientInitialsDisplay);
    currChat.appendChild(recipientInformationContainer);
    currChat.classList.add("pending-chat");
    currChat.addEventListener("click", changeCurrChat);

    chatListContainer.prepend(currChat);
}

function createNewChat() {
    clearChatDisplay();
    createNewChatPreviewDisplay();
}

function fillNewChat(id, firstName, lastName) {
    currChat.dataset.recipientid = id;

    var initialsId = "recipient-intiials-" + id;
    currChat.childNodes[0].childNodes[0].childNodes[0].setAttribute("id", initialsId);
    document.getElementById(initialsId).textContent = firstName[0] + lastName[0];

    var nameId = "recipient-id-" + id;
    currChat.childNodes[1].childNodes[0].childNodes[0].setAttribute("id", nameId);
    currChat.childNodes[1].childNodes[0].childNodes[0].textContent = firstName + " " + lastName;
}

function displayMessage(text, isUserText) {
    const newText = document.createElement("p");
    const textContainer = document.createElement("div");

    newText.textContent = text;
    newText.classList.add("text");

    if(isUserText) {
        newText.classList.add("user-text");
        textContainer.classList.add("user-text-container");
    } else {
        newText.classList.add("recipient-text");
        textContainer.classList.add("recipient-text-container");
    }

    textContainer.appendChild(newText);
    chatBody.appendChild(textContainer);

    createText.elements[0].value = "";
}

function hideChatNavDisplay() {
    currChatInitialsDisplay.classList.add("off");
    moreDetailsButton.classList.add("off");

    chatHeader.classList.remove("main-chat-header");
    chatHeader.classList.remove("chat-nav-header");
    chatHeader.classList.add("create-new-chat-header");

    getNewContactForm.classList.remove("off");
    createNewChatPrompt.classList.remove("off");
}

for(const conv of conversations) {
    recipientIds.push(conv.dataset.recipientid);
}

var arr = encodeURIComponent(JSON.stringify(recipientIds));

$.ajax({
    url: "/users/chat/contacts/" + arr, 
    method: "GET", 
})
.then(response => {
    for(const recipient of response) {
        let currId = "recipient-id-" + recipient.id;
        let currInitialsId = "recipient-initials-" + recipient.id;

        let currDisplay = document.getElementById(currId);
        let currInitials = document.getElementById(currInitialsId);

        currDisplay.textContent = recipient.firstName + " " + recipient.lastName;
        currInitials.textContent = recipient.firstName[0] + recipient.lastName[0];
    } 

    fillChatNavInitialsContainer()
})
.catch(err => {
    console.log(err);
})

socket.on("connect", () => {
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
        displayMessage(createText.elements[0].value, true);
    })
    .catch(err => {
        console.log(err);
    })

});

for(const conversationDisplay of conversations) {
    conversationDisplay.addEventListener("click", changeCurrChat);
}

function changeCurrChat(event) {
    if(document.querySelector(".pending-chat")) {
        const pendingChat = document.querySelector(".pending-chat");
        pendingChat.parentNode.removeChild(pendingChat);

        getNewContactForm.classList.add("off")
        createNewChatPrompt.classList.add("off");
    }

    var display = event.target;

    while(display.classList[0] != "conversation-preview-display") {
        display = display.parentNode;
    }

    currChat.classList.remove("curr-chat");

    currChat = display;
    currChat.classList.add("curr-chat");
    fillChatNavInitialsContainer();

    currChatInitialsDisplay.classList.remove("off");
    moreDetailsButton.classList.remove("off");

    chatHeader.classList.add("main-chat-header");
    chatHeader.classList.add("chat-nav-header");
    chatHeader.classList.remove("create-new-chat-header");

    displayMessages(currChat.dataset['texts']);
}

createNewChatButton.addEventListener("click", event => {
    hideChatNavDisplay();
    createNewChat();
});

getNewContactForm.addEventListener("submit", event => {
    event.preventDefault();

    $.ajax({
        url: "/users/chat/new-contact/" + getNewContactForm.elements[0].value, 
        method: "GET"
    })
    .then(response => {
        fillNewChat(response.id, response.firstName, response.lastName);
    })
    .catch(err => {
        console.log(err);
    })
})

checkForNewConversation();
