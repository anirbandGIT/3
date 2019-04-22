const routes = require('./server/routes/user.routes.js');
const mongoose = require('mongoose');


const express = require('express');
const bodyParser = require('body-parser');
const app = express();                                   //SET UP EXPRESS APP
mongoose.connect('mongodb://localhost/userDatabase')     //MONGOOSE CONNCECT TO mongodb
mongoose.Promise = global.Promise;                       //MONGOOSE PROMISE IS DEPRECATED

app.use(bodyParser.json());
//INITIALISE ROUTES
app.use('/api/user', routes);
//ERROR HANDLING

//LISTEN TO REQUESTS
// app.listen(process.env.port || 4000, function () ...
app.listen(process.env.port || 3000, function () {
    console.log("LISTENING FOR REQUESTS AT PORT:3000")
}); //LISTENING TO PORT 3000
