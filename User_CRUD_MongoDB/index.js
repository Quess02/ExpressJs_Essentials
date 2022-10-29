const express=require('express');
const server=express();
const path=require('path');
const PORT=process.env.PORT||3000;

//users route middleware
server.use('/user',require('./routes/user'));
//static file middleware
server.use(express.static(path.join(__dirname,'public')));

//entry route
server.get('/',(req,res)=>{
    res.type('html');
    res.sendFile(path.join(__dirname,'public','/templates/home.html'));
});


server.listen(PORT,()=>{
    console.log('Server started on http://localhost:'+PORT);
})