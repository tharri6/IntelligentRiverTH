/*eslint-env node*/

//------------------------------------------------------------------------------
// node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');
  request = require('request'),

_ = require('lodash');
// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();


app.get('/process_get', function (req, res) {
   // Prepare output in JSON format
   response = {
      latitude:req.query.latitude,
      longitude:req.query.longitude,
	  startDate:req.query.startDate,
	  endDate:req.query.endDate
     };
                     
      var callURL = "https://54549c0b-9018-44dd-8d78-f0dd1d628a98:DO2cRAPAFa@twcservice.mybluemix.net/api/weather/v1/geocode/"+response.latitude+"/"+response.longitude+"/almanac/daily.json?units=e&start="+response.startDate+"&end="+response.endDate

      request.get(callURL, {
        json: true
      },
      function (error, response, body) {
		if(error){
			console.log(error);
		} else {
			//var meta = body["metadata"];
			//var id = meta["transaction_id"];
			res.send(body);
		}

      });
})


// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {
  // print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
