// var Hero = require('./libs/classes/Hero.js');
const routes = require('./server/routes/hero.routes.promises');
// const routes = require('./server/routes/hero.routes.async-await');
const mongoose = require('mongoose');
const Hero = require('./server/models/hero.model.js');


const express = require('express');
const bodyParser = require('body-parser');
const app = express(); //SET UP EXPRESS APP
mongoose.connect('mongodb://localhost/heroesDb')//MONGOOSE CONNCECT TO mongodb
mongoose.Promise = global.Promise;//MONGOOSE PROMISE IS DEPRECATED
// var heroes = [];
// heroes[0] = new Hero("SPIDERMAN", 5.7, "NOVICE", "NO", 10000000, "WEB", 200);

app.use(bodyParser.json());
//INITIALISE ROUTES
app.use('/api', routes);
//ERROR HANDLING MIDDLEWARE
app.use(function(err,req,res,next){
    res.status(422).send({error: err.message});
});

//LISTEN TO REQUESTS
// app.listen(process.env.port || 4000, function () ...
app.listen(3000, function () {
    console.log("LISTENING FOR REQUESTS AT PORT:3000")
}); //LISTENING TO PORT 3000
