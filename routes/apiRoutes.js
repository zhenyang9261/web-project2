var db = require("../models");
var Sequelize = require("sequelize");

const Op = Sequelize.Op;

module.exports = function(app) {
  // Get all properties
  app.get("/api/properties", function(req, res) {
    db.Properties.findAll({}).then(function(dbProperties) {
      res.json(dbProperties);
    });
  });

  // Get one property based on id
  app.get("/api/properties/:id", function(req, res) {
    db.Properties.findOne({
      where: {
        Id: req.params.id
      }
    }).then(function(dbProperties) {
      res.json(dbProperties);
    });
  });

  // Get all properties based on search criteria
  app.get("/api/properties/:params", function(req, res) {
    var where = queryToJson(req.params.params);

    db.Properties.findAll({ where: where }).then(function(dbProperties) {
      res.json(dbProperties);
    });
  });

  // Get all favorites of the user
  app.get("/api/favorites/:userId", function(req, res) {
    db.Users_Properties.findAll({
      where: {
        userId: req.params.userId
      }
    }).then(function(dbFavorites) {
      var properties = [];
      for (var i = 0; i < dbFavorites.length; i++) {
        console.log(dbFavorites[0].propertyId);
        // Get property info from Properties table and compose the object to pass to favorite handlebar
        db.Properties.findOne({
          where: {
            id: dbFavorites[0].propertyId
          }
        }).then(function(dbProperty) {
          var property = { street: dbProperty.street };
          properties.push(property);
        });
      }
      console.log(properties);
      res.json(properties);
    });
  });

  // Create a new favorite
  app.post("/api/favorites", function(req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a user id and a property id
    db.Users_Properties.create({
      userId: req.body.userId,
      propertyId: req.body.propertyId
    }).then(function(dbFavorites) {
      // We have access to the new favorite as an argument inside of the callback function
      console.log(dbFavorites.id);
      res.json(dbFavorites);
    });
  });

  // Delete a favorite property by property id
  app.delete("/api/favorites/:propertyId", function(req, res) {
    db.Users_Properties.destroy({
      where: { propertyId: req.params.propertyId }
    }).then(function(dbFavorite) {
      res.json(dbFavorite);
    });
  });

  /*
   * Function to compose a JSON object for sequelize where query
   *
   * Search criteria and operator:
   * zip, city - equal
   * numBeds, numBaths, sqf, yearBuilt - greater than or equal to
   * price - less than or equal to
   *
   * @param: query string in URL in the format of key=value&key=value.....
   */
  function queryToJson(query) {
    var keyValues = query.split("&");

    var result = {};
    keyValues.forEach(function(keyValue) {
      keyValue = keyValue.split("=");
      if (
        keyValue[0] == "numBeds" ||
        keyValue[0] == "numBaths" ||
        keyValue[0] == "sqf" ||
        keyValue[0] == "yearBuilt"
      ) {
        result[keyValue[0]] = { [Op.gte]: decodeURIComponent(keyValue[1]) };
      } else if (keyValue[0] == "price") {
        result[keyValue[0]] = { [Op.lte]: decodeURIComponent(keyValue[1]) };
      } else {
        result[keyValue[0]] = decodeURIComponent(keyValue[1] || "");
      }
    });
    console.log(result);
    return result;
  }
};
