var db = require("../models");

module.exports = function(app) {
  // Get all properties
  app.get("/api/properties", function(req, res) {
    db.Properties.findAll({}).then(function(dbProperties) {
      res.json(dbProperties);
    });
  });

  // Get all properties based on search criteria
  app.get("/api/properties/:params", function(req, res) {
    //var params = req.params.params;
    var where = queryToJson(req.params.params);

    //console.log("\nparams: " + params + "\n");
    console.log("\nwhere: " + where + "\n");

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

  function queryToJson(query) {
    var keyValues = query.split("&");

    var result = {};
    keyValues.forEach(function(keyValue) {
      keyValue = keyValue.split("=");
      result[keyValue[0]] = decodeURIComponent(keyValue[1] || "");
    });
    return JSON.parse(JSON.stringify(result));
  }
};
