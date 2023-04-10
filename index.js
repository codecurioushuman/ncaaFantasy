const mongoose = require('mongoose');
const express = require('express');
const app = express();
const path = require('path');
const Player = require('./models/players.js')
const User = require('./models/user.js')
const methodOverride = require('method-override');
const { findByIdAndUpdate } = require('./models/user.js');
const Team = require('./models/teams.js');
//connection to mongoose
mongoose.connect('mongodb://localhost:27017/Players', {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("MONGO connection OPEN")
})
.catch(err => {
    console.log("OOOPS MONGO ERROR")
    console.log(err)
})

//setting the views engine
app.set('views', path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}))
app.use(methodOverride('_method'))

//start express server
app.listen(3000, () => {
    console.log('App is listening on port 3000');
})

app.get('/login', (req,res) => {
    res.render('index')
})
app.post('/login', async (req,res) => {
    const newUser = new User(req.body)
    console.log(req.body)
    await newUser.save();
    res.redirect(`/${newUser._id}/teams`)
})
app.get('/:id/teams', async (req,res) =>{
    const {id} = req.params
    //console.log(req.params)
    console.log(req.body)
    const teams = await Team.find({})
    const user = await User.findById(id)
    res.render('teams', {teams, user})
    
})
app.get('/:id/teams/:teamid', async (req,res) =>{
    const id = req.params.id  
    const teamid = req.params.teamid 
    console.log(req.params)
    const teams = await Team.findById(teamid)
    await teams.populate('athletes')
    console.log(teams)
    const user = await User.findById(id)
    //const players = await Player.find

    res.render('players', {user,teams})
})
app.put('/:id/choosePlayers', async (req,res) =>{
    const {id} = req.params
    const player = Player(req.body)
    const user = await User.findById(id)
    await User.findByIdAndUpdate(id, user.roster.push(player), {runValidators: true})
    //user.roster.push(player)
    await user.save();
    console.log(req.body)
    res.redirect('/login')
})

async function pushRoster(userID, playerID){
    const user = await User.findById(userID)
    const player = await Player.findById(playerID)
    user.roster.push(player);
    await user.save()
}





   
