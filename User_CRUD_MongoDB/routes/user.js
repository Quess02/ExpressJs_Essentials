const express=require('express');
const userHandler=express.Router();
const User=require('../models/user.js');
userHandler.use(express.urlencoded({extended:true}));
userHandler.use(express.json())
const mongoose=require('mongoose');

//connect to MongoDB
mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/users');

//get all user
userHandler.get('/',(req,res)=>{
    //get all users from the database
    User.find().then((rslt)=>{
        res.json({
            message:'success',
            description:'user details succesfully saved',
            users:rslt
        });
    })
});

//get specific user
userHandler.get('/:username',(req,res)=>{
    //get a user with specific username
    User.findOne({name:`${req.params.username}`}).then((rslt)=>{
        res.json({
            message:'success',
            description:'user details succesfully found',
            users:rslt
        });
    })
    
});
//create new user
userHandler.post('/',(req,res)=>{
    let newUser=new User({
        name:req.body.name,
        surname:req.body.surname,
    })
    newUser.save((error,record)=>{
        if(error){
            res.json({
                message:'error',
                description:'some error occured while saving the user in database'
            });
        }else{
            res.json({
                message:'success',
                description:'user details succesfully saved',
                user:record
            });
        }
    })

})
//update user
userHandler.post('/update',(req,res)=>{
    //update user details
    User.updateOne(
        {name:`${req.body.name}`},
        {$set:{surname:`${req.body.surname}`}},
        (err)=>{
        if (err) {
           res.json(
               {
                   status:400,
                   message:'error'
               }
           );
        } else {
            res.json(
                {
                    status:200,
                    message:'user updated successfully'
                }
            );
        }
    });
    
});

module.exports=userHandler;
