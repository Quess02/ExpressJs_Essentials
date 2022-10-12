const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;


app.get('/', (req, res) => { 
    //access all HTTP headers using Request.headers property
    console.log(req.headers);
    //access one individual request header value using Request.header() method
    req.header('User-Agent')
    //change any HTTP header value using Response.set()
    res.set('Content-Type','text/html');
    res.end();
   
})


app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
