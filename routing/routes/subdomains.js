const express = require('express');
/**
 * Express does not take subdomains into account by default.
 * -Install vhost(npm install --save vhost)
 * 
 * */



const admin = express.Router();
admin.get('/', function (req, res) {
    res.send('admin site')
});

admin.get('/users', function (req,res) { 
    res.send('Users works');
});

module.exports = admin;
