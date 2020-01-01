$(function() {
  // Save home to favorites
  $(".save-home-button").on("click", function(e) {
    e.stopPropagation();
    let button = $(this).children();
    button.toggleClass("font-weight-bold");

    var id = $(this).attr("id");
    console.log("id: " + id);
    // Get values from the elements
    var picURL = $("#pic-url-" + id).attr("src");
    var address = $("#house-address-" + id).text();
    var numBeds = $("#bedrooms-" + id).text();
    var numBathrooms = $("#bathrooms-" + id).text();
    var sqf = $("#sqft-" + id).text();
    var price = $("#price-" + id).text();
    console.log(numBeds + " " + address);

    // Conversions to match database table constraints
    // Get street, city, zip from address;
    var addressArray = address.split(",");
    var street = addressArray[0].trim();
    var city = addressArray[1].trim();
    var zipCode = addressArray[2].trim();

    // Convert price from string to float, remove the first $ sign first
    price = price.substring(1);
    price = parseFloat(price.replace(/,/g, ""));

    // Convert bedrooms and bathrooms to integer
    numBeds = parseInt(numBeds);
    numBathrooms = parseInt(numBathrooms);

    // Remove text part of the sqf and comma, then convert to integer
    if (sqf) {
      var index = sqf.indexOf("sq");
      sqf = sqf.substring(0, index).trim();
      sqf = parseInt(sqf.replace(/,/g, ""));
    } else {
      sqf = 0;
    }

    var property = {};
    property["street"] = street;
    property["city"] = city;
    property["zipCode"] = zipCode;
    property["numBeds"] = numBeds;
    property["numBathrooms"] = numBathrooms;
    property["sqf"] = sqf;
    property["picURL"] = picURL;
    property["price"] = price;

    console.log(property);

    $.post("/api/property", property, function(data) {
      var favorite = {
        userId: 1,
        propertyId: data.id
      };
      $.post("/api/favorites", favorite, function() {});
    });
  });

  // Show property details in modal
  $(".home-preview-card").on("click", function() {});
});
