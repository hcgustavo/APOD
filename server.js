/********** get the packages we need **********/
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

/********** configuration **********/
var port = process.env.PORT || 8080;
// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public", {index: "landing.html"}));

/********** start the server **********/
app.listen(port, function() {
  console.log("APOD server is running...");
});
