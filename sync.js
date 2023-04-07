const Player = require('./models/players.js')
const Team = require('./models/players.js')
const mongoose = require('mongoose')
const { default: axios } = require('axios')


mongoose.connect('mongodb://localhost:27017/Players', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("MONGO connection OPEN")
})
.catch(err => {
    console.log("OOOPS MONGO ERROR")
    console.log(err)
})

async function syncDatabase(){
    try{
        const response = await axios.get('https://api.sportsdata.io/v3/cbb/scores/json/Players?key=<Your API Key>')
        const playerData = response.data
        for(let player of playerData){
          await Player.create({playerID:player.PlayerID, firstName:player.FirstName, lastName:player.LastName, teamID:player.TeamID, position:player.Position})
        }
    }
    catch(error){
        console.log(error)
    }
}
