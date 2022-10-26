const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

const logger=require('./middleware/logger')

//Init middleware
//app.use(logger);
//Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//set static file using express middleware
app.use(express.static(path.join(__dirname, 'public')));
/**app.get('/', function (req, res) { 
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
 });*/

//IMPLEMENTING A SIMPLE API
//Members API Routes
app.use('/api/members',require('./routes/api/members'))


app.listen(PORT,()=>console.log(`Listening on port ${PORT} `));