var axios = require("axios");

var requestURL = "http://www.zillow.com/webservice/GetDeepSearchResults.htm?zws-id=X1-ZWz17hg4h6h05n_a6mew&address=2114+Bigelow+Ave&citystatezip=Seattle%2C+WA";

var parseString = require('xml2js').parseString;
var xml = '<?xml version="1.0" encoding="UTF-8" ?><business><company>Code Blog</company><owner>Nic Raboy</owner><employee><firstname>Nic</firstname><lastname>Raboy</lastname></employee><employee><firstname>Maria</firstname><lastname>Campos</lastname></employee></business>';

axios.get(requestURL).then(response => {
    var cleanedString = response.replace("\ufeff", "");
    parseString(cleanedString)
        .then(results => {
            console.log(results);
        })
        .catch(error => {
            console.log(error)
        })
});
