var db = require("../models");

module.exports = function(app) {
  // Get all properties
  app.get("/api/properties", function(req, res) {
    db.Properties.findAll({}).then(function(dbProperties) {
      console.log("findAll in apiRoutes --------------- \n\n");
      console.log(dbProperties);
      res.json(dbProperties);
    });
  });

  // Create a new example
  // app.post("/api/examples", function(req, res) {
  //   db.Properties.create(req.body).then(function(dbExample) {
  //     res.json(dbExample);
  //   });
  // });

  // Delete an example by id
  // app.delete("/api/examples/:id", function(req, res) {
  //   db.Properties.destroy({ where: { id: req.params.id } }).then(function(
  //     dbExample
  //   ) {
  //     res.json(dbExample);
  //   });
  // });
};
