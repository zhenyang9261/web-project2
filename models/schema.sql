CREATE DATABASE Pillow;
USE Pillow;

CREATE TABLE Users(
	Id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
    -- adding phone number
    phone VARCHAR(11),
    -- changing length of password to the length of the hash
    password VARCHAR(60) NOT NULL,
    firstName VARCHAR(40), 
    lastName VARCHAR(40), 
    -- adding a type to the db to be able to control permsissions
    type ENUM ("buyer", "seller", "realtor") DEFAULT "buyer",
    PRIMARY KEY(Id)
);

CREATE TABLE Properties(
	Id INT NOT NULL AUTO_INCREMENT, 
    street VARCHAR(255) NOT NULL, 
    city VARCHAR(30) NOT NULL, 
    stateCode VARCHAR(2), 
    zipCode VARCHAR(5) NOT NULL, 
    -- adding longitude and latitude so we don't have to reverse geocode everytime we 
    -- need to search for a home 
    longitude FLOAT NOT NULL, 
    latitude FLOAT NOT NULL,
	numBeds DOUBLE NOT NULL, 
    numBathrooms DOUBLE NOT NULL, 
    propertyType VARCHAR(25) DEFAULT "house", 
    -- deleting num stories
    -- numStories INT DEFAULT 1, 
    -- adding size of lot
    lotSize INT,
    sqf INT,
    yearBuilt INT,
    price FLOAT,
    -- adding date the property was last sold and the price it was last sold for
    lastSoldPrice FLOAT,
    lastSoldDate DATE,
    PRIMARY KEY(Id)
);

CREATE TABLE Users_Properties(
    Id INT NOT NULL AUTO_INCREMENT,
	userId INT NOT NULL, 
    propertyId INT NOT NULL, 
    FOREIGN KEY(userId) REFERENCES Users(Id) ON DELETE CASCADE, 
    FOREIGN KEY(propertyId) REFERENCES Properties(Id) ON DELETE CASCADE, 
    PRIMARY KEY(Id)
);

CREATE TABLE Messages(
    Id INT NOT NULL AUTO_INCREMENT, 
    text TEXT NOT NULL, 
    timeSent DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    recipientId INT NOT NULL,
    PRIMARY KEY(Id), 
    FOREIGN KEY(recipientId) REFERENCES Users(Id)
);

CREATE TABLE Users_Messages(
    userId INT NOT NULL,
    messageId INT NOT NULL, 
    FOREIGN KEY(userId) REFERENCES Users(Id) ON DELETE CASCADE, 
    FOREIGN KEY(messageId) REFERENCES Messages(Id) ON DELETE CASCADE,
    PRIMARY KEY(userId, messageId)

);


