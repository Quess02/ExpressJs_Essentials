const express = require('express');
const app = express();
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const PORT = process.env.PORT || 3000;

/**
 * generate secure passwords
 */
function hashPW(pwd) { 
    return crypto.createHash('sha256').update(pwd).digest('base64').toString();
}
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(require('cookie-parser')("MAGICKEY"));
app.use(require('express-session')(
    {
        genid: function () { return uuidv4() },
        secret: uuidv4(),
        cookie: {
            maxAge: 36000,
            path: '/login',
            hhtpOnly:true
        },
        saveUninitialized: false,
        resave:true
    }
));

app.get('/restricted', (req, res) => {
    if (req.session.user) {
        res.send(`
            <h2>${req.session.success}</h2>
            <p>You entered restricted area</p><br>
            <a href='/login'>logout</a>
        `);
    } else { 
        req.session.error = 'Access denied!'
        res.redirect(303,'/login')
    }

});

//logout route
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        res.redirect(303, '/login')
    });
});
//login route
app.get('/login', (req, res) => {
    var response = '<form method="POST">' +
        'Username: <input type="text" name="username"><br>' +
        'Password: <input type="password" name="password"><br>' +
        '<input type="submit" value="Submit"></form>';
    if (req.session.user) {
        res.redirect(303, '/restricted');
    } else if (req.session.error) { 
        response+=`<h2>${req.session.error}</h2>`
    }
    res.type('html');
    res.send(response);
});
//login route
app.post('/login', function (req, res) { 
    // this could be fom the database
    let user = {
        name: req.body.username,
        password: req.body.password
    }
    if (user.password===hashPW(req.body.password.toString())) {
        req.session.regenerate(function () {
            req.session.user = user;
            req.session.success = `Authenticated as ${user.name}`;
            res.redirect(303, '/restricted');
        });
    } else {
        req.session.regenerate(() => {
            req.session.error = 'Authentication failed';
            //return res.redirect(303, '/restricted');
        });
        res.redirect(303, '/login');
    }
});
app.listen(PORT, () => { 
    console.log(`Server started on http://localhost:${PORT}`);
})