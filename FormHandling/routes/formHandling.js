/**
 * Author: Tawanda Kanda
 * Title: Express Form Handling
 */
const express = require('express');
const handler = express.Router();
handler.use(require('body-parser')());

 
/**
 * Sending data to the server
 * -query String (using get request)
 * -request body (using post request)
 * 
 *  Both get and post request are secure when using HTTPS protocol
 * 
 * RECOMMEND using post request because get querystring has limited length
 * 
 * 
 * -DIRECT HTML RESPONSE
 * -302 REDIRECT
 * -303 REDIRECT (recommeded)
 * 
*/


handler.post('/', function (req, res) { 
    console.log(`You email was submitted: ${req.body.email}`);
    res.redirect(303, '/home');
});
 module.exports=handler
