const hue = require('node-hue-api');
const schedule = require('node-schedule');
const riseset = require('sunrise-sunset-js');
const auth = require('./auth.json');
const api = new hue.HueApi(auth.host, auth.username);
const state = hue.lightState.create();

let today = new Date();
let sunrise = riseset.getSunrise(40.073870, -75.297450)
let sunset = riseset.getSunset(40.073870, -75.297450, new Date(String(today.getFullYear()) + "-" + ((String(today.getMonth() + 1)).padStart(2, '0') + "-" + String(today.getDate() + 2).padStart(2, '0'))))

/*
console.log("The sunrise today is: " + sunrise);
console.log("The sunset today is: " + sunset);
*/

// Turns off living room lights, gets new sunrise and sunset values, and kicks off rescheduling of all other tasks
let schedMidnight = schedule.scheduleJob(new schedule.RecurrenceRule({hour: 0, minute: 0}), function(){
    api.setLightState(8, state.off());
    api.setLightState(9, state.off());
    api.setLightState(11, state.off());

    sunrise = riseset.getSunrise(40.073870, -75.297450)
    sunset = riseset.getSunset(40.073870, -75.297450, new Date(String(today.getFullYear()) + "-" + ((String(today.getMonth() + 1)).padStart(2, '0') + "-" + String(today.getDate() + 2).padStart(2, '0'))))
});

// Turns on exterior lights one hour before sunset

// Turns off exterior lights at sunrise
let schedExteriorOff = schedule.scheduleJob(new schedule.RecurrenceRule({hour: sunrise.getHours(), minute: sunrise.getMinutes()}), function() {
    api.setLightState(5, state.off());
    api.setLightState(6, state.off());
    api.setLightState(7, state.off());
});

/*
let sched = schedule.scheduleJob('14 * * * *', function() {
    api.setLightState(4, state.off());
});
*/