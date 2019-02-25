const request = require('request');

let getWeather = (lat, long,callback) =>{
  request({
    url: `https://api.darksky.net/forecast/ad3e94e468d818afc46fe4ae4b553a09/${lat},${long}`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to Forecast.io server.');
    } else if (response.statusCode === 400) {
      callback('Unable to fetch weather.');
    } else if (response.statusCode === 200) {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemperature: body.currently.apparentTemperature
      });
    }
  });
};
module.exports.getWeather = getWeather;