$(function () {
  // Variable will be use to store details of input address: City's name, State, postal code, latitude and longitude.
  var addressData = {};

  //Loads route => /houses/:zipcode
  let getHomesForSaleData = function (zipcode) {
    window.location.href = "/houses/" + zipcode;
  };

  /*=============================================
  =        Autocomplete Places Search           =
  =============================================*/
  var placesAutocomplete = places({
    appId: "plUZWS470NUB",
    apiKey: "d8417e1882d8024fb43cf8a17e547c76",
    container: document.getElementsByClassName("input-address")[0]
  });

  placesAutocomplete.on("change", function (e) {
    // Create object with location data
    addressData.city = e.suggestion.name || "";
    addressData.state = e.suggestion.administrative || "";
    addressData.zip = e.suggestion.postcode || "";
    addressData.lat = e.suggestion.latlng.lat || "";
    addressData.lng = e.suggestion.latlng.lng || "";
    getHomesForSaleData(addressData.zip);
  });

  /*=============================================
=              Geolocation API            =
=============================================*/
  var locations = algoliasearch.initPlaces(
    "plUZWS470NUB",
    "d8417e1882d8024fb43cf8a17e547c76"
  );

  function getCurrentAddress(response) {
    var hits = response.hits;
    var suggestion = hits[0];
    // Create object with location data
    if (suggestion && suggestion.locale_names && suggestion.city) {
      addressData.city = suggestion.city.default[0] || "";
      addressData.state = suggestion.administrative[0] || "";
      addressData.zip = (suggestion.postcode || [])[0] || "";
      addressData.lat = suggestion._geoloc.lat || "";
      addressData.lng = suggestion._geoloc.lng || "";
      getHomesForSaleData(addressData.zip);
    }
  }

  var $button = document.getElementsByClassName("ap-icon-pin")[0];
  $button.addEventListener("click", function () {
    navigator.geolocation.getCurrentPosition(function (response) {
      var coords = response.coords;
      lat = coords.latitude.toFixed(6);
      lng = coords.longitude.toFixed(6);
      locations
        .reverse({
          aroundLatLng: lat + "," + lng,
          hitsPerPage: 1
        })
        .then(getCurrentAddress);
    });
  });
});

/* ================================
 Saved Favorites
 ================================== */

/*=======
=  Working with login and logout functionality  =
  =============================================*/
var chatButton = document.querySelector(".chat-button");
var logoutButton = document.querySelector(".logout-button");

function getLoggedInElements() {
  const loggedInElems = document.getElementsByClassName("logged-in");
  const loggedOutElems = document.getElementsByClassName("logged-out");

  for (const loggedInElem of loggedInElems) {
    loggedInElem.getElementsByClassName.display = "inline-block";
  }

  for (const loggedOut of loggedOutElems) {
    loggedOut.style.display = "none";
  }
}

function getLoggedOutElems() {
  const loggedInElems = document.getElementsByClassName("logged-in");
  const loggedOutElems = document.getElementsByClassName("logged-out");

  for (const loggedInElem of loggedInElems) {
    loggedInElem.style.display = "none";
  }

  for (const loggedOut of loggedOutElems) {
    loggedOut.style.display = "inline-block";
  }
}

if (localStorage.getItem("jwt")) {
  getLoggedInElements();
} else {
  getLoggedOutElems();
}

logoutButton.addEventListener("click", event => {
  localStorage.removeItem("jwt");
  location.reload();
});

chatButton.addEventListener("click", event => {
  event.preventDefault();

  location.href = "/users/chat?token=" + localStorage.getItem("jwt");
});

  // When Saved Favorites button is clicked
  var handleGetFavoritesBtn = function () {
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
