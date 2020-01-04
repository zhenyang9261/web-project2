var db = require("../models");
var path = require("path");
var getHousesForSale = require("../public/js/getHomesData.js");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    res.render("index");
  });

  app.get("/login", (req, res) => {
    res.render("login");
  });

  app.get("/signup", (req, res) => {
    res.render("signup");
  });

  app.get("/houses/:zipcode", function (req, res) {
    // Use zip code variable to call api and get house for sale data
    getHousesForSale(req.params.zipcode, res);
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
