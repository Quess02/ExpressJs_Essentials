/**
 * author: Tawanda Kanda
 * title: Routing
 * date: 25/10/22
 * Description: Routing is the mechanism by which requests(as specified by URL and HTTP method) are 
 * routed to the code that handles them.
 */
const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;
const admin = require('./routes/subdomains');
const loans = require('./routes/api/loans');
/**
 * create "admin" subdomain...this should appear
 * before all other routes
 */
//app.use(vhost('admin.*',admin));
app.use('/admin', admin);

//loans api
app.use('/api/loans', loans);

//Static files
app.use(express.static(path.join(__dirname,'public')));
//Entry route
app.get('/', (req, res) => {
    res.send('hello from Express');
});

//Route handlers are Middleware
app.get('/about',
    function (req, res, next) {
        if (Math.random() < 0.33) return next;
        res.send('Alternative 1');

     },
    function (req,res,next) {
        if (Math.random() < 0.5) return next;
        res.send('Alternative 2');
    },
    function (req, res) { 
        res.send('Alternative 3');
    }
);
//Not found
app.use((req, res) => {
    res.type('text/plain');
    res.status(404);
    res.send('404. Not Found'); 
});
//Server error
app.use((req, res) => {
    res.type('text/plain');
    res.status(500);
    res.send('Internal Server Error')
});





app.listen(port, (req, res) => {
    console.log(`Server started on http://localhost:${port}`);
});
