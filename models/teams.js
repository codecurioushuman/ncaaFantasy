const mongoose = require('mongoose');
const Player = require('./players.js');
const {Schema} = mongoose;








const teamSchema = new mongoose.Schema({
    name:{
        type:String
    },
    logo:{
        type:String
    },
    teamID:{
        type:Number
    },
    athletes:[{
        type:mongoose.ObjectId, ref:'Player'
    }]

})

const Team = mongoose.model('Team', teamSchema)
module.exports = Team