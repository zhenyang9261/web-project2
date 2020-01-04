/* Export functionality to make API call and get House for sale data   */
// This API is just for testing. Unsure to be use in production
module.exports = function (zipcode, res) {
    var http = require("https");
    var data = {
        housesData : [],
        cityState: ""
    }
    // Realtor API
    var options = {
        "method": "GET",
        "hostname": "realtor.p.rapidapi.com",
        "port": null,
        "path": "/properties/list-for-sale?postal_code=" + zipcode + "&prop_status=for_sale&price_min=1&beds_min=1&baths_min=1&sqft_min=1&sort=relevance&radius=15",
        "headers": {
            "x-rapidapi-host": "realtor.p.rapidapi.com",
            "x-rapidapi-key": "6fda13d354msh7ef414a666d5f78p1c48e3jsnd0ca247d8fe4"
        }
    };

    var req = http.request(options, function (response) {
        var chunks = [];

        response.on("data", function (chunk) {
            chunks.push(chunk);
        });

        response.on("end", function () {
            var body = Buffer.concat(chunks);
            var propertiesForSale = JSON.parse(body.toString()).listings;
            var cityState = JSON.parse(body.toString()).meta.market;
            data.cityState = cityState.substring(0, cityState.length - 2).concat(", " + cityState.slice(cityState.length - 2));
            const regex = /\d+[ ](?:[A-Za-z0-9.-]+[ ]?)+(?:Avenue|Lane|Road|Boulevard|Drive|Street|Ave|Dr|Rd|Blvd|Ln|St)\.?/g;
            const regex2 = /\d+/g;
            for (let home of propertiesForSale) {
                let homeForSale = {};

                /**
                    TODO:
                    - Validate data
                */

                homeForSale.address = home.address || "" ;
                homeForSale.price = home.price  || "" ;
                homeForSale.bedrooms = home.beds  || "";
                homeForSale.bathrooms = home.baths || "";
                homeForSale.sqft = home.sqft || "" ;
                homeForSale.imgUrl = home.photo || "https://picsum.photos/200";
                homeForSale.latLng = {lat: home.lat, lng: home.lon};
                data.housesData.push(homeForSale);
            }
            res.render("houses", { housesList: data });
        });
    });
    req.end();
}
