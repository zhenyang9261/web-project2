CREATE DATABASE Pillow;
USE Pillow;

CREATE TABLE Users(
	Id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL UNIQUE,
	-- whatever length of hash is
    password VARCHAR(255) NOT NULL,
    firstName VARCHAR(40), 
    lastName VARCHAR(40), 
    PRIMARY KEY(Id)
);

CREATE TABLE Properties(
	Id INT NOT NULL AUTO_INCREMENT, 
    street VARCHAR(255) NOT NULL, 
    city VARCHAR(30) NOT NULL, 
    stateCode VARCHAR(2), 
    zipCode VARCHAR(5) NOT NULL, 
	numBeds INT NOT NULL, 
    numBathrooms INT NOT NULL, 
    propertyType VARCHAR(25) DEFAULT "Single Family", 
    numStories INT DEFAULT 1, 
    sqf INT NOT NULL,
    yearBuilt INT NOT NULL,
    price DOUBLE NOT NULL,
    picURL VARCHAR(255),
    PRIMARY KEY(Id)
);

CREATE TABLE Favorites(
	userId INT NOT NULL, 
    propertyId INT NOT NULL, 
    FOREIGN KEY(userId) REFERENCES Users(Id) ON DELETE CASCADE, 
    FOREIGN KEY(propertyId) REFERENCES Properties(Id) ON DELETE CASCADE, 
    PRIMARY KEY(userId, propertyId)
);
