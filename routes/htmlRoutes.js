var db = require("../models");
var path = require("path");

/*============  TEST DATA  =============*/
let housesData = {
  housesList: [
    {
      price: 1000000,
      bedrooms: 6,
      bathrooms: 7,
      sqft: 8766,
      imgUrl: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    },
    {
      price: 2000000,
      bedrooms: 5,
      bathrooms: 6,
      sqft: 9766,
      imgUrl: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    },
    {
      price: 2000000,
      bedrooms: 3,
      bathrooms: 2,
      sqft: 4766,
      imgUrl: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
    }
  ]
}

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
    res.render("index");
  });

  app.get("/houses", function (req, res) {
    // Render list of houses user enters address into search page
    res.render("houses", housesData);
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};
