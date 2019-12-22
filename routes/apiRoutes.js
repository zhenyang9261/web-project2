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

  // Get all properties based on search criteria
  app.get("/api/properties/:params", function(req, res) {
    var where = queryToJson(req.params.params);

    db.Properties.findAll({ where: where }).then(function(dbProperties) {
      res.json(dbProperties);
    });
  });

  // Create a new favorite
  // app.post("/api/favorites", function(req, res) {
  //   db.Favorites.create(req.body).then(function(dbFavorites) {
  //     res.json(dbFavorites);
  //   });
  // });

  // Delete a favorite property by id
  // app.delete("/api/favorites/:id", function(req, res) {
  //   db.Favorites.destroy({ where: { id: req.params.id } }).then(function(
  //     dbFavorite
  //   ) {
  //     res.json(dbFavorite);
  //   });
  // });

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
        var value = {};
        value[[Op.gte]] = decodeURIComponent(keyValue[1]);
        result[keyValue[0]] = value;
      } else if (keyValue[0] == "price") {
        var value = {};
        value["[Op.lte]"] = decodeURIComponent(keyValue[1]);
        result[keyValue[0]] = value;
        //result[keyValue[0]] = "[Op.lte]: " + decodeURIComponent(keyValue[1]);
      } else {
        result[keyValue[0]] = decodeURIComponent(keyValue[1] || "");
      }
    });
    console.log(result);
    return JSON.parse(JSON.stringify(result));
  }
};
