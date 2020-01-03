var q;
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
        q = $(this);
        console.log("we got in here");
        $(".modal-container").removeClass("off");
        
        var numBaths = document.getElementsByClassName("num-bed");
        var numBeds = document.getElementsByClassName("num-bath");
        var sqrft = document.getElementsByClassName("sqrft");

        for(let i = 0; i < numBaths.length; i++) {
            numBaths[i].textContent = $(this).data("bathrooms");
        }

        for(let j = 0; j < numBeds.length; j++) {
            numBeds[j].textContent = $(this).data("bedrooms");
        }

        for(let w = 0; w < sqrft.length; w++) {
            sqrft[w].textContent = $(this).data("sqft");
        }

        var price = $(this).data("price");

        price = price.substring(1).replace(",", "");
        var monthlyPrice = Math.round(parseInt(price) / 30, 2);

        $(".monthly-price").text(" " + monthlyPrice);

        $(".address-modal-display").text($(this).data("address"));
        var address = $(this).data("address").replace(" ", "+");
        console.log($(this).children()[1]);
        q = $(this).children()[1];

        $.ajax({
            url: "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyA9RYFLOsAjw3UtphZfNyO8DHo8fCwmJn8", 
            method: "GET", 
        }).then(response => {
            var url = "https://www.google.com/maps/embed/v1/streetview?location=" + response.results[0].geometry.location.lat + "," + response.results[0].geometry.location.lng + "&key=AIzaSyA9RYFLOsAjw3UtphZfNyO8DHo8fCwmJn8";
            $(".street-view-iframe").attr("src", url);
        });

        $(".main-property-image").src = $(this).children()[1].src;
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
}

