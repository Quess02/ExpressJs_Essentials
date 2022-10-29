const mongoose=require('mongoose');

/**
 * user schema
 */
userSchema=mongoose.Schema({
    name:String,
    surname:String,
});

userSchema.pre('save',function(next){
    next();
});

module.exports=mongoose.model('User',userSchema);
