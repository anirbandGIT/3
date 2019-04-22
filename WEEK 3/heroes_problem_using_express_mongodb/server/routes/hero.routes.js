const express = require('express');
const router = express.Router(); // SETUP ROUTER OBJECT
const hero = require('../models/hero.model');

//GET FROM DATABASE
//CALLBACK
router.get('/heroes/findAll', function (req, res, next) {
    hero.find({}).then(function (value) {
        res.send(value);
    })
});

router.get('/heroes/findOne/:id', function (req, res, next) {
    hero.find({ _id: req.params.id }).then(function (value) {
        res.send(value);
    })
});

//PROMISES
// var promise1 = new Promise(function(resolve,reject){
//     resolve();
// })

// promise1.then(function(req,res){
//     res.send({ type: "GET" });
// }, function(next){

// })


//ADD TO DATABASE
router.post('/heroes', function (req, res, next) {
    hero.create(req.body).then(function (value) {           // var obj = new hero(req.body);
        res.send(value);                                    // obj.save();
    }).catch(next);
});

//UPDATE IN DATABASE
router.put('/heroes/:id', function (req, res, next) {
    hero.findByIdAndUpdate({ _id: req.params.id }, req.body).then(function () {
        hero.findOne({ _id: req.params.id }).then(function (value) {
            res.send(value);
        })
    })
});

//DELETE IN DATABASE
router.delete('/heroes/:id', function (req, res, next) {
    hero.findByIdAndRemove({ _id: req.params.id }).then(function (value) {
        res.send(value);
    })
    // console.log(req.params.id);
});

module.exports = router;