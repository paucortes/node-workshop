var request = require("request");
var address = "http://api.open-notify.org/iss-now.json";

request(address, function(error, result){
    var resultObject = JSON.parse(result.body);
    console.log("The current position of the ISS is: latitude: " + resultObject.iss_position.latitude.toFixed(2) + ", and longitude: " + resultObject.iss_position.longitude.toFixed(2));
});


