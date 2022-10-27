const express = require('express');
const app = express();
const credentials = require('./credentials');
const cookieParser = require('cookie-parser');
const session  = require('express-session')
const PORT = process.env.PORT || 3000;
const { v4:uuidv4} = require('uuid');
//cookie parser middleware
app.use(cookieParser(credentials.cookieSecret));

//session middleware
app.use(session({
    genid: () => { return uuidv4() },
    secret: credentials.cookieSecret,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 60 * 100,
        signed: true,
        httpOnly: true,
        path: '/'
    }
}));
app.use('/', (req, res) => {
    req.session.restricted = true;
    res.send(req.session.restricted);
});
app.listen(PORT, () => { 
    console.log(`Server started on http://localhost:${PORT}`);
});