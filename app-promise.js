const yargs = require('yargs');
const axios = require('axios');
const key = require('./keys.js');

const argv = yargs
  .options({
    a: {
      demand: true,
      alias: 'address',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

  let encodedAddress = encodeURIComponent(argv.address);
  let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}&key=${key.googleKey}`

  axios.get(geocodeUrl).then((response)=>{
    if(response.data.status === 'ZERO_RESULTS'){
      throw new Error('unable to find that address ');
    }
    let lat = response.data.results[0].geometry .location.lat;
    let long = response.data.results[0].geometry .location.lng;
    let weatherUrl =`https://api.darksky.net/forecast/ad3e94e468d818afc46fe4ae4b553a09/${lat},${long}`;
    
    return axios.get(weatherUrl);

    console.log(response.data.results[0].formatted_address);
  }).then((response)=>{
    let temperature = response.data.currently.temperature;
    let apprentTemperature = response.data.currently.apprentTemperature;
    console.log(`Its currently ${temperature} It feels like ${apprentTemperature}`);
  }).catch((e)=>{
    if(e.code==='ENOTFOUND'){
      console.log('unable to connect to api server')
    }else{
      console.log(e.message);
    }
  });