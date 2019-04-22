const express = require('express');
const router = express.Router(); // SETUP ROUTER OBJECT
const hero = require('../models/hero.model.js');


//GET FROM DATABASE
//CALLBACK
router.get('/heroes/', function (req, res, next) {
    hero.find({}).then(function (value) {
        res.send(value);
    }).catch(next);
});

router.get('/heroes/:id', function (req, res, next) {
    hero.find({ _id: req.params.id }).then(function (value) {
        res.send(value);
    }).catch(next);
});

//ADD TO DATABASE
router.post('/heroes', function (req, res, next) {
    hero.create(req.body).then(function (value) {           // var obj = new hero(req.body);
        res.send(value);                                    // obj.save();
    }).catch(next);
});

//UPDATE IN DATABASE
router.put('/heroes/:id', function (req, res, next) {
    hero.findOne({ _id: req.params.id }).then(function () {
        hero.findByIdAndUpdate({ _id: req.params.id }).then(function (value) {
            res.send(value);
        })
    }).catch(next);
});

//UPDATE FOR FIGHTS WON * 3
router.put('/heroes/:id', function (req, res, next) {
    hero.findOne({ _id: req.params.id }).then(function (element) {
        hero.findByIdAndUpdate({ _id: req.params.id }, { fightsWon: (element.fightsWon * 3) }).then(function (value) {
            res.send(value);
        })
    }).catch(next);
});

//UPDATE FANS FOLLOWING * 2
router.put('/heroes/', function (req, res, next) {
    hero.find({}).then(function (element) {

        element.forEach(element => {
            if (element.fightsWon > 10 && element.superPowers == "SPIDER-SENSE") {
                element.findByIdAndUpdate({ _id: req.params.id }, { fanFollowing: (element.fanFollowing * 3) }).then(function (value) {
                    res.send(value);
                })
            }
        }).catch(next);
            })
});


//DELETE IN DATABASE
router.delete('/heroes/:id', function (req, res, next) {
    hero.findByIdAndRemove({ _id: req.params.id }).then(function (value) {
        res.send(value);
    })
    // console.log(req.params.id);
});

// module.exports = router;