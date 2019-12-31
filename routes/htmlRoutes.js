var db = require("../models");
var path = require("path");
var getHousesForSale = require("../public/js/getHomesData.js");

var Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    res.render("index");
  });

  app.get("/login", (req, res) => {
    res.render("login");
  });

  app.get("/signup", (req, res) => {
    res.render("signup");
  });

  app.get("/houses/:zipcode", function(req, res) {
    // Use zip code variable to call api and get house for sale data
    getHousesForSale(req.params.zipcode, res);
  });

  // Get all favorites of the user
  app.get("/api/favorites/:userId", function(req, res) {
    db.Users_Properties.findAll({
      where: {
        userId: req.params.userId
      }
    }).then(function(dbFavorites) {
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
      }).then(function(dbProperties) {
        //res.json(dbProperties);
        //console.log(dbProperties);

        return res.render("favorites", { propertyList: dbProperties });
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
