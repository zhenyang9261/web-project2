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

