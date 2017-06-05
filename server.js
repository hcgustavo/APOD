/********** get the packages we need **********/
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var babyParser = require('babyparse');
var fs = require('fs');
var morgan = require('morgan');


/********** configuration **********/
var port = process.env.PORT || 8080;
// use body parser so we can get info from POST and/or URL parameters
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));

// use morgan to log requests to the console
app.use(morgan('dev'));

/********** start the server **********/
app.listen(port);
console.log('App running at http://localhost:' + port);
