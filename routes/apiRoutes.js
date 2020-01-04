var db = require("../models");
var Sequelize = require("sequelize");

const Op = Sequelize.Op;
var checkAuth = require("./check-auth");

module.exports = function (app) {
  // Get all properties
  app.get("/api/properties", function (req, res) {
    db.Properties.findAll({}).then(function (dbProperties) {
      res.json(dbProperties);
    });
  });

  // Get one property based on id
  app.get("/api/properties/:id", function (req, res) {
    db.Properties.findOne({
      where: {
        Id: req.params.id
      }
    }).then(function (dbProperties) {
      res.json(dbProperties);
    });
  });

  // Get all properties based on search criteria
  app.get("/api/properties/:params", function (req, res) {
    var where = queryToJson(req.params.params);

    db.Properties.findAll({ where: where }).then(function (dbProperties) {
      res.json(dbProperties);
    });
  });

  // Create a new property
  app.post("/api/property", function (req, res) {
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a user id and a property id
    db.Properties.create({
      street: req.body.street,
      city: req.body.city,
      zipCode: req.body.zipCode,
      numBeds: req.body.numBeds,
      numBathrooms: req.body.numBathrooms,
      sqf: req.body.sqf,
      price: req.body.price,
      picURL: req.body.picURL,
      latitude: 35, // required field, dummy value
      longitude: -75 // required field, dummy value
    }).then(function (dbProperty) {
      res.json(dbProperty);
    });
  });

  // Create a new favorite
  app.post("/api/favorites", checkAuth, function (req, res) {
    console.log("user id in post favorites: " + req.token.id);
    // create takes an argument of an object describing the item we want to
    // insert into our table. In this case we just we pass in an object with a user id and a property id
    db.Users_Properties.create({
      //userId: req.body.userId,
      userId: req.token.id,
      propertyId: req.body.propertyId
    }).then(function (dbFavorites) {
      // We have access to the new favorite as an argument inside of the callback function

      res.json(dbFavorites);
    });
  });

  // Delete a favorite property by property id
  app.delete("/api/favorites/:propertyId", function (req, res) {
    db.Users_Properties.destroy({
      where: { propertyId: req.params.propertyId }
    }).then(function (dbFavorite) {
      res.json(dbFavorite);
    });
  });

  // Get all favorites of a user identified by the user id in header
  app.get("/api/favorites/", checkAuth, function (req, res) {
    console.log("user id in get favorites: " + req.token.id);
    db.Users_Properties.findAll({
      where: {
        userId: req.token.id
      }
    }).then(function (dbFavorites) {
      var conditions = [];
      for (var i = 0; i < dbFavorites.length; i++) {
        // Compose the where clause conditions
        var condition = { id: dbFavorites[i].propertyId };
        conditions.push(condition);
      }

      // Find properties and pass to favorites handlebar
      db.Properties.findAll({
        where: {
          [Op.or]: conditions
        }
      }).then(function (dbProperties) {
        // for (var i = 0; i < dbProperties.length; i++)
        //   console.log(dbProperties[i].street);
        res.render("favorites", { propertyList: dbProperties });
      });
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
    keyValues.forEach(function (keyValue) {
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
