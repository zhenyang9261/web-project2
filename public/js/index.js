$(function(){
  // Variable will be use to store details of input address: City's name, State, postal code, latitude and longitude.
  var addressData = {};

  //Loads route => /houses/:zipcode
  let getHomesForSaleData = function (zipcode) {
    window.location.href = "/houses/" + zipcode;
  }

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
      addressData.lat = (suggestion._geoloc.lat || "");
      addressData.lng = (suggestion._geoloc.lng || "");
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


// Get references to page elements
var $exampleText = $("#example-text");
var $exampleDescription = $("#example-description");
var $submitBtn = $("#submit");
var $exampleList = $("#example-list");

// // The API object contains methods for each kind of request we'll make
// var API = {
//   saveExample: function(example) {
//     return $.ajax({
//       headers: {
//         "Content-Type": "application/json"
//       },
//       type: "POST",
//       url: "api/examples",
//       data: JSON.stringify(example)
//     });
//   },
//   getExamples: function() {
//     return $.ajax({
//       url: "api/examples",
//       type: "GET"
//     });
//   },
//   deleteExample: function(id) {
//     return $.ajax({
//       url: "api/examples/" + id,
//       type: "DELETE"
//     });
//   }
// };

// // refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function() {
//   API.getExamples().then(function(data) {
//     var $examples = data.map(function(example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// // handleFormSubmit is called whenever we submit a new example
// // Save the new example to the db and refresh the list
// var handleFormSubmit = function(event) {
//   event.preventDefault();

//   var example = {
//     text: $exampleText.val().trim(),
//     description: $exampleDescription.val().trim()
//   };

//   if (!(example.text && example.description)) {
//     alert("You must enter an example text and description!");
//     return;
//   }

//   API.saveExample(example).then(function() {
//     refreshExamples();
//   });

//   $exampleText.val("");
//   $exampleDescription.val("");
// };

// // handleDeleteBtnClick is called when an example's delete button is clicked
// // Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function() {
//     refreshExamples();
//   });
// };

// // Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);
