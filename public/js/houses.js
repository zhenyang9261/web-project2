$(function () {
  // Save home to favorites button action
  $(".save-home-button").on("click", function (e) {
    e.stopPropagation();
    let button = $(this).children();
    button.toggleClass("font-weight-bold");

    var id = $(this).attr("id");

    // Get values from the elements
    var picURL = $("#pic-url-" + id).attr("src");
    var address = $("#house-address-" + id).text();
    var numBeds = $("#bedrooms-" + id).text();
    var numBathrooms = $("#bathrooms-" + id).text();
    var sqf = $("#sqft-" + id).text();
    var price = $("#price-" + id).text();

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
    sqf = 0;
    if (sqf) {
      var index = sqf.indexOf("sq");
      sqf = sqf.substring(0, index).trim();
      sqf = parseInt(sqf.replace(/,/g, ""));
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

    $.post("/api/property", property, function (data) {
      var favorite = {
        //userId: 1,
        propertyId: data.id
      };

      $.ajax({
        url: "/api/favorites",
        method: "POST",
        headers: {
          token: localStorage.getItem("jwt")
        },
        data: favorite
      });
    });
  });

  // When Saved Favorites button is clicked
  var handleGetFavoritesBtn = function () {
    //window.location.href = "/api/favorites/" + localStorage.getItem("jwt");
    $.ajax({
      url: "/api/favorites",
      method: "GET",
      headers: {
        token: localStorage.getItem("jwt")
      },
      dataType: 'html'
    }).done(function (data) {

      document.open();
      document.write(data);
      document.close();
    });

  };

  // Add button listeners 
  $("#get-favorites").on("click", handleGetFavoritesBtn);
});

// Google Maps API
var infoObj = [];

function initMap() {
  // Map options
  var options = {
    zoom: 10,
    center: $(".home-preview-card").data(),
    fullscreenControl: false
  };
  // New map
  var map = new google.maps.Map(document.getElementById("map"), options);

  // Array of markers
  var markers = [];
  // Loop through all properties elements and create marker info
  $(".home-preview-card").each(function (house) {
    let data = $(this).data();
    // Create content for marker popup
    let content =
      "<a href='#' class='house-mini-view'><div class='mini-view-image'><img id='map-mini-image' src='" +
      data.imgurl +
      "'></div><div class='mini-view-details'><span class='font-weight-bold'>" +
      data.price +
      "</span><div>" +
      data.bedrooms +
      " bd, " +
      data.bathrooms +
      " ba</div><di>" +
      data.sqft +
      "</di></div></a>";
    let coords = $(this).data();
    markers.push({ coords: coords, content: content });
  });

  // Loop through markers
  for (var i = 0; i < markers.length; i++) {
    // Add marker
    addMarker(markers[i]);
  }

  // Add Marker Function
  function addMarker(props) {
    // Marker Custom icon
    var iconImage = "/img/map-marker-icon.png";
    var marker = new google.maps.Marker({
      position: props.coords,
      map: map
    });

    if (iconImage) {
      // Set icon image
      marker.setIcon(iconImage);
    }

    // Check content
    if (props.content) {
      var infoWindow = new google.maps.InfoWindow({
        content: props.content
      });

      // Display popup on marker hover
      marker.addListener("mouseover", function () {
        closeOtherInfo();
        infoWindow.open(map, marker);
        infoObj[0] = infoWindow;
      });

      function closeOtherInfo() {
        if (infoObj.length > 0) {
          // detach the info-window from the marker
          infoObj[0].set("marker", null);
          // and close it
          infoObj[0].close();
          // blank the array
          infoObj.length = 0;
        }
      }
    }
  }
}
