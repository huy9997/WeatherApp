const request = require('request');

let geocodeAddress = (address, callback) => {
  let encodedAddress = encodeURIComponent(address);
  request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=AIzaSyDdlg0YT2VVP5fZ1r-zNctVL27B3tX0jgA`,
    json: true
  }, (error, response, body) => {
    if (error) {
      callback('Unable to connect to Google servers.');
    } else if (body.status === 'ZERO_RESULTS') {
      callback('Unable to find that address.');
    } else if (body.status === 'OK') {
      callback(undefined, {

        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng
      });
    }
  });
};

module.exports.geocodeAddress = geocodeAddress;

//https://maps.googleapis.com/maps/api/js?key=AIzaSyAmWEWCSoJ2E7cz_6q-27Kgwio93YFjyKc/geocode/json?address=${encodedAddress}


//AIzaSyAmWEWCSoJ2E7cz_6q-27Kgwio93YFjyKc 

//http://www.mapquestapi.com/geocoding/v1/address?key=jtsQA2gGaEjQNcSENRVt7PceMdjApZ7D&location=${encodedAddress}

