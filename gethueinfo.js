const hue = require('node-hue-api');
const auth = require('./auth.json');
const api = new hue.HueApi(auth.host, auth.username);
const state = hue.lightState.create();

var displayResult = function(result) {
    console.log(JSON.stringify(result, null, 2));
};

api.lights(function(err, lights) {
    if (err) throw err;
    displayResult(lights);
});