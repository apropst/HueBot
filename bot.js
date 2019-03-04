const hue = require("node-hue-api").HueApi;
const auth = require('./auth.json');

var displayResult = function(result) {
    console.log(JSON.stringify(result, null, 2));
};

const api = new hue(auth.host, auth.username);

api.getConfig().then(displayResult).done();