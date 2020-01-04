$(function () {
    // Save home to favorites 
    $(".save-home-button").on("click", function (e) {
        e.stopPropagation();
        let button = $(this).children();
        button.toggleClass("font-weight-bold");
        alert("Save property test");
    });

    // Show property details in modal
    $(".home-preview-card").on("click", function () {

    });
});

// Google Maps API
var infoObj = [];

function initMap() {
    // Map options
    var options = {
        zoom: 10,
        center: $(".home-preview-card").data(),
        fullscreenControl: false
    }
    // New map
    var map = new google.maps.Map(document.getElementById('map'), options);

    // Array of markers
    var markers = [];
    // Loop through all properties elements and create marker info
    $(".home-preview-card").each(function (house) {
        let data = $(this).data();
        // Create content for marker popup
        let content = "<a href='#' class='house-mini-view'><div class='mini-view-image'><img id='map-mini-image' src='" + data.imgurl + "'></div><div class='mini-view-details'><span class='font-weight-bold'>" + data.price + "</span><div>" + data.bedrooms + " bd, " + data.bathrooms + " ba</div><di>" + data.sqft + "</di></div></a>"
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
        var iconImage = '/img/map-marker-icon.png';
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
            marker.addListener('mouseover', function () {
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


    /*=============================================
  =        Autocomplete Places Search           =
  =============================================*/
    // Variable will be use to store details of input address: City's name, State, postal code, latitude and longitude.
    var addressData = {};

    //Loads route => /houses/:zipcode
    let getHomesForSaleData = function (zipcode) {
        window.location.href = "/houses/" + zipcode;
    }

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
    =              Geolocation API               =
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
}
