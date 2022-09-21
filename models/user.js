const Player = require('./players.js');
const mongoose = require('mongoose');
const {Schema} = mongoose;

const userSchema = Schema({
    userName:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true,
    },
    roster:[
        {type:mongoose.ObjectId, ref:'Player'} 
    ],
    score:{
        type:Number,

    }
})

const User = mongoose.model('User', userSchema)

module.exports = User;