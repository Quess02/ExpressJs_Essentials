const express = require('express');
const PORT = process.env.PORT || 3000;
const app = express();
const credentials = require('./credentials');
const cookieParser=require('cookie-parser')

//RegistercookieParser middleware
app.use(cookieParser(credentials.cookieSecret));
app.get('/', function (req,res) { 
    console.log(req.cookies);
    if (!req.cookies.hasVisited) {
        res.cookie('hasVisited','1', {
            maxAge:60*60*1000,
            signed: true,
            httpOnly: true,
            path:'/'
        })
    }
    res.send(`Sending cookie ${req.cookies}`);
});
app.listen(PORT, () => { 
    console.log(`Server started on http://localhost:${PORT}`);
});