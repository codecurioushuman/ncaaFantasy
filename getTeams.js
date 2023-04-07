
const Player = require('./models/players.js')
const Team = require('./models/teams.js')
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
async function getTeams(){
    try{
        const response = await axios.get('https://api.sportsdata.io/v3/cbb/scores/json/teams?key=<Insert Your API Key>')
        const teamData = response.data
        const players = await Player.find({})
        for(let team of teamData){
            if(team.ConferenceID!==null){
                await Team.create({name:team.Name, logo:team.TeamLogoUrl, teamID:team.TeamID})
            }
        }

          const teams = await Team.find({})
          for(let team of teams){
            
             for(let player of players){
                 if(player.teamID===team.teamID){
                     console.log("MATCH")
                     team.athletes.push(player)
                     await team.save()
                     console.log(`player ${player.firstName} was added to team ${team.name}`)
                     console.log(team.athletes)
                 }
             }
            
          }
        }
    catch(error){
        console.log(error)
    }
}

//getTeams();
