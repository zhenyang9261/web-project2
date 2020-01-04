var db = require("../models");
var path = require("path");
var getHousesForSale = require("../public/js/getHomesData.js");


let data = {
  housesData: [
    {
      address: "5709 NC Highway 61 N, Gibsonville, 27249",
      price: "50,000",
      bedrooms: 1,
      bathrooms: 1,
      sqft: "1234",
      imgUrl: "https://ap.rdcpix.com/46fcc18c0f8756114a83ac5056a77845l-m1812007639x.jpg",
      latLng: {
        lat: 36.109204,
        lng: -79.535069
      }
    },
    {
      address: "5709 NC Highway 61 N, Gibsonville, 27249",
      price: "30,000",
      bedrooms: 2,
      bathrooms: 2,
      sqft: "1234",
      imgUrl: "https://picsum.photos/200?random=1",
      latLng: {
        lat: 36.18923,
        lng: -79.688841
      }
    },
    {
      address: "5709 NC Highway 61 N, Gibsonville, 27249",
      price: "$20,000",
      bedrooms: 3,
      bathrooms: 3,
      sqft: "1234",
      imgUrl: "https://picsum.photos/200?random=2",
      latLng: {
        lat: 36.114684,
        lng: -79.549979
      }
    },
    {
      address: "5709 NC Highway 61 N, Gibsonville, 27249",
      price: "$10,000",
      bedrooms: 4,
      bathrooms: 4,
      sqft: "1234",
      imgUrl: "https://picsum.photos/200?random=3",
      latLng: {
        lat: 36.114684,
        lng: -79.549979
      }
    },
    {
      address: "5709 NC Highway 61 N, Gibsonville, 27249",
      price: "$40,000",
      bedrooms: 5,
      bathrooms: 5,
      sqft: "1234",
      imgUrl: "https://picsum.photos/200?random=4",
      latLng: {
        lat: 36.114684,
        lng: -79.549979
      }
    }
  ],
  cityState: "Worndercity, WC"
}


module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
      res.render("index");
  });

  app.get("/login", (req, res) => {
    res.render("login");
  })

  app.get("/signup", (req, res) => {
    res.render("signup");
  })

  app.get("/houses/:zipcode", function(req, res){
    // Use zip code variable to call api and get house for sale data
    getHousesForSale(req.params.zipcode, res);
    // res.render("houses", {housesList: data})
  });

  // Render 404 page for any unmatched routes
  // app.get("*", function (req, res) {
  //   res.render("404");
  // });
};
