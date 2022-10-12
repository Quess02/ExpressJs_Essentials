//How to handle path portion of the url

const { query } = require('express');
var express = require('express');
var http = require('http');
const { send } = require('process');
var app = express();

//configuring express settings
app.enable('trust proxy');
app.disable('strict routing');
app.set('view engine','pug');

http.createServer(app).listen(3000);

//app.<method>(path,[callback...],callback)
//implementing routes (GET & POST)
app.get('/', function (req, res) {
    res.send("<h1>Welcome to the home of Express</h1>");
});
app.get('/about', function (req, res) {
    res.send('<h1>Learn more about Express </h1>');
});
//cannot GET
app.post('/register',function(req,res) {
    res.send('<h1>Register with Express</h1>')
});

/**
 * Works same as POST and GET but the callback function is called
 * on every request for specifed path regardless of HTTP method
 *      (*) wildcard in the path
 */
app.all('/about/*',function(req,res) {
    res.send('<h1>Learning more about wildcard path in Express </h1>');
});


//APPLYING ROUTES PARAMETERS

/**
 * USING QUERY STRINGS
 */
var url = require('url');
app.get('/find', function (req, res) {
    var url_parts = url.parse(req.url, true, false);
    var queryStr = url_parts.query;
    res.send(`finding Book: Author: ${queryStr.author} Title: ${queryStr.title}`);
    
});
/**
 * USING REGEX
 */
app.get(/^\/book\/(\w+)\:(\w+)?$/, function (req, res) {
    res.send(`Get Book: Chapter: ${req.params[0]} Page: ${req.params[0]}`);
});

/**
 * USING DEFINED PARAMETERS
 *  best for well structure data,allows parameter to be define by name
 * within the route path
 */
app.get('/user/:userid', function (req, res) { 
    res.send(`Get User: ${req.params('userid')}`);
});

/**
 * APPLYING CALLBACK FUNCTIONS FOR DEFINED PARAMETERS
 * ==> callback function is exexuted 
 * if the defined parameter is found in the url
 */
app.param('userid', function (res, req, next,value) { 
    console.log(`Request with userid: ${value}`);
    next();
});
