Number.prototype.toRadians = function() {
    return this * Math.PI / 180;
};


// Latidude/Longitude of user's position
var prompt = require("prompt");
var request = require("request");
prompt.start();

prompt.get(["location"], function(err1, result1) {
    var address = "https://maps.googleapis.com/maps/api/geocode/json?address=" + result1.location;
    request((address), function(err1, result2) {
        var parsed = JSON.parse(result2.body);
        var userLat = parsed.results[0].geometry.location.lat.toFixed(2);
        var userLon = parsed.results[0].geometry.location.lng.toFixed(2);
        
        // Latitude/Longitude of the ISS
        var address2 = "http://api.open-notify.org/iss-now.json";
        request(address2, function(error, result3) {
            var resultObject = JSON.parse(result3.body);
            var issLat = resultObject.iss_position.latitude.toFixed(2);
            var issLon = resultObject.iss_position.longitude.toFixed(2);
            var p1 = LatLon(userLat, userLon);
            var p2 = LatLon(issLat, issLon);
            var d = p1.distanceTo(p2);
            console.log("The distance between your location and the ISS is: " + d.toFixed(2) + " metres");
        });
    });
});




/**
 * Creates a LatLon point on the earth's surface at the specified latitude / longitude.
 *
 * @constructor
 * @param {number} lat - Latitude in degrees.
 * @param {number} lon - Longitude in degrees.
 *
 * @example
 *     var p1 = new LatLon(52.205, 0.119);
 */
function LatLon(lat, lon) {
    // allow instantiation without 'new'
    if (!(this instanceof LatLon)) return new LatLon(lat, lon);

    this.lat = Number(lat);
    this.lon = Number(lon);
}

/**
 * Returns the distance from ‘this’ point to destination point (using haversine formula).
 *
 * @param   {LatLon} point - Latitude/longitude of destination point.
 * @param   {number} [radius=6371e3] - (Mean) radius of earth (defaults to radius in metres).
 * @returns {number} Distance between this point and destination point, in same units as radius.
 *
 * @example
 *     var p1 = new LatLon(52.205, 0.119);
 *     var p2 = new LatLon(48.857, 2.351);
 *     var d = p1.distanceTo(p2); // 404.3 km
 */


LatLon.prototype.distanceTo = function(point, radius) {
    if (!(point instanceof LatLon)) throw new TypeError('point is not LatLon object');
    radius = (radius === undefined) ? 6371e3 : Number(radius);

    var R = radius;
    var φ1 = this.lat.toRadians(),  λ1 = this.lon.toRadians();
    var φ2 = point.lat.toRadians(), λ2 = point.lon.toRadians();
    var Δφ = φ2 - φ1;
    var Δλ = λ2 - λ1;

    var a = Math.sin(Δφ/2) * Math.sin(Δφ/2)
          + Math.cos(φ1) * Math.cos(φ2)
          * Math.sin(Δλ/2) * Math.sin(Δλ/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;

    return d;
};