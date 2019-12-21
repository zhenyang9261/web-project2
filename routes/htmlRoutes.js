var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Properties.findAll({}).then(function(dbProperties) {
      res.render("index", {
        msg: "Welcome!",
        properties: dbProperties
      });
    });
  });

  // Load property page and pass in a property by id
  app.get("/property/:id", function(req, res) {
    db.Properties.findOne({ where: { id: req.params.id } }).then(function(
      dbProperty
    ) {
      res.render("property", {
        property: dbProperty
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
