var express = require("express");
var router = express.Router();



var db = require("../models");
var User = require("../models").Users;
var Message = require("../models").Messages;
var UsersMessages = require("../models").UsersMessages;

var jwt = require("jsonwebtoken");

function Conversation(senderId, recipientId) {
    this.senderId = senderId,
    this.recipientId = recipientId,
    this.messages = [];

    this.pushMessage = function(text, createdAt, isFromUser) {
        this.messages.push({
            text: text, 
            createdAt: createdAt, 
            isFromUser: isFromUser
        });
    }, 

    this.sortMessages = function() {
        return messages.sort((msg1, msg2) => msg1.createdAt - msg2.createdAt);
    },

    this.equals = function(obj) {
        return this.senderId === obj.senderId && this.recipientId === obj.recipientId
    }
}

function parseMessageRow(senderId, row) {
    var message = {
        text: row.text, 
        createdAt: row.createdAt,
        isFromUser: senderId === row.id
    }

    if(senderId === row.recipientId) {
        message.senderId = row.recipientId;
        message.recipientId = row.id
    } else {
        message.senderId = row.id ;
        message.recipientId = row.recipientId;
    }

    return message;
}

function addMessageToConversations(message, conversations) {
    if(conversations.length > 0) {
        for(const conversation of conversations) {  
            if(conversation.equals(message)) {
                return conversation.pushMessage(
                    message.text, 
                    message.createdAt, 
                    message.isFromUser
                );
            }
        }
    }
    
    let newConversation = new Conversation(message.senderId, message.recipientId);
    newConversation.pushMessage(message.text, message.createdAt, message.isFromUser);

    return conversations.push(newConversation);
}


router.get("/chat", (req, res) => {
    const token = req.headers["token"];

    jwt.verify(token, process.env.JWT_KEY, (err, decodedToken) => {
        if(err) throw err;
        const id = decodedToken.id;

        const queryString = "SELECT m.recipientId, m.text, m.createdAt, u.id FROM Messages m JOIN \
            UsersMessages um ON m.id = um.messageId JOIN Users u ON um.userId = u.id \
            WHERE u.id = " + id + " OR m.recipientId = " + id + " ORDER BY m.createdAt ASC"

        db.sequelize.query(queryString)
        .then(rows => {
            let conversations = [];
            for(const row of rows[0]) {
                let message = parseMessageRow(id, row);
                addMessageToConversations(message, conversations);
            }

            if(conversations.length > 1) {
                conversations.sort((conv1, conv2) => {
                    const conv1Length = conv1.messages.length - 1;
                    const conv2Length = conv1.messages.length - 1;
                    return -(conv1.messages[conv1Length].createdAt - conv2.messages[conv2Length].createdAt);
                });
            }
           

            res.render("chat", {conversations: conversations});
        })
        .catch(err => {
            console.log(err);
        })
    });
});

router.post("/chat/create-connection", (req, res) => {
    client.set(req.body.id, req.body.socketId);
})

router.post("/chat", (req, res) => {
    // grabbing our redis connection and sender socket id  
    const client = req.app.get("client");
    const socketId = req.body.connectionId;

    // getting text and recipient id from request body
    const text = req.body.text;
    const recipientId = req.body.recipientId;
    // querying redis for the recipient socket id sent over from our client
    client.get(recipientId, (err, recipinetSocketId) => {
        if(err) throw err
        console.log(recipinetSocketId);
        // adding the message to the messages table in our database
        Message.create({
            text: text, 
            recipientId: recipientId
        })
        .then((createdMessage) => {
            // using the created message id to 
            UsersMessages.create({
                userId: req.body.senderId, 
                messageId: createdMessage.dataValues.id
            })
            .then(createdUserMessage => {
                // checking to see if the socket id exists in redis (i.e. if the user 
                // is currently on their chat page)
                if(recipientSocketId) {    
                    // grabbing our socket reference from app
                    const socket = req.app.get('socket');
                    // grabbing onto our recipient's socket server to send our message,
                    // checking if it exists, and, if it does, sending the sender's 
                    // text that we grabbed onto from the request body. 
                    if(socket.sockets.connected[recipinetSocketId]) {
                        const recipientSocket = socket.sockets.connected[recipinetSocketId];
                
                        recipientSocket.emit("message", {
                            text: text, 
                            senderId: 2
                        });
                    }
                } 
            });
        })
    })
});

module.exports = router;