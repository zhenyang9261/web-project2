var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Properties.findAll({}).then(function(dbProperties) {
      console.log("findAll in htmlRoutes --------------- \n\n");
      console.log(dbProperties);
      res.render("index", {
        msg: "Welcome!",
        properties: dbProperties
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/properties/:id", function(req, res) {
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
