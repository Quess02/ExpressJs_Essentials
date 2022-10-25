const express = require('express');
const app = express();
const path =require('path');
const routes = require('./routes/formHandling');

app.use(require('body-parser')());
app.set('port', process.env.PORT || 3000);

//set static file using express middleware
app.use(express.static(path.join(__dirname, 'public')));


app.get('/', function (req, res) { 
    res.sendFile(path.join(__dirname, 'public', 'form.html'));
});

//homepage route
app.get('/home', (req, res)=>{ 
    res.send(`Successful login `);
});


//processing forms
app.use('/process', routes);

//custom 404 page
app.use((req,res) => { 
    res.type('text/plain');
    res.status(404);
    res.send('404. Not Found');
});

    
//custom 500 page
app.use((err, eq, res, next) => {
    console.error(err.stack);
    res.type('text/plain');
    res.status(500);
    res.send('500. Internal Server Error')
});


app.listen(app.get('port'), (req,res) => {
    console.log(`Listening on http://localhost:${app.get('port')}`)
})