const mongoose = require('mongoose');
const {Schema} = mongoose;

const playerSchema = new mongoose.Schema({
    playerID:{
        type: Number,
        required: true
    },
    firstName:{
        type: String,
        required: true,
    },
    lastName:{
        type: String,
        required:true,
    },
    teamID:{
        type: Number,
        required: true
    },
    position:{
        type:String
    }
})
const Player = mongoose.model('Player', playerSchema)



module.exports = Player

