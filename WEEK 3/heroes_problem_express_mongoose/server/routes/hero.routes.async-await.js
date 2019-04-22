const express = require('express');
const router = express.Router(); // SETUP ROUTER OBJECT
const hero = require('../models/hero.model.js');

//GET FROM DATABASE
//ASYNC-AWAIT
router.get('/heroes/') = async function (req, res) {
    try {
        value = await hero.find({});
        res.send(value);
    } catch (error) {
        res.status(422).send({
            error: next.message
        });
        console.log({
            error: error.message
        });
    }
};

router.get('/heroes/:id') = async function (req, res) {
    try {
        value = await hero.find({
            _id: req.params.id
        });
        res.send(value);
    } catch (error) {
        res.status(422).send({
            error: next.message
        });
        console.log({
            error: error.message
        });
    }
};

//ADD TO DATABASE
router.post('/heroes') = async function (req, res) {
    try {
        value = await hero.create(req.body); // var obj = new hero(req.body);
        res.send(value); // obj.save();
    } catch (error) {
        res.status(422).send({
            error: next.message
        });
        console.log({
            error: error.message
        });
    }
};

//UPDATE IN DATABASE
router.put('/heroes/:id') = async function (req, res) {
    try {
        if (await hero.findOne({
                _id: req.params.id
            })) {
            value = await hero.findByIdAndUpdate({
                _id: req.params.id
            });
        }
        res.send(value);
    } catch (error) {
        res.status(422).send({
            error: next.message
        });
        console.log({
            error: error.message
        });
    }
};

//UPDATE FOR FIGHTS WON * 3
router.put('/heroes/:id') = async function (req, res) {
    try {
        if (await hero.findOne({
                _id: req.params.id
            })) {
            value = await hero.findByIdAndUpdate({
                _id: req.params.id
            }, {
                fightsWon: (element.fightsWon * 3)
            })
        }
        res.send(value);
    } catch (error) {
        res.status(422).send({
            error: next.message
        });
        console.log({
            error: error.message
        });
    }
};

//UPDATE FANS FOLLOWING * 2
router.put('/heroes/') = async function (req, res) {
    try {
        value = await hero.find({})
        if (value) {
            value.forEach(element => {
                    if (element.fightsWon > 10 && element.superPowers == "SPIDER-SENSE")
                        await element.findByIdAndUpdate({
                            _id: req.params.id
                        }, {
                            fanFollowing: (element.fanFollowing * 3)
                        })

                    });
            }
            res.send(value);
        }
catch (error) {
    res.status(422).send({
        error: next.message
    });
    console.log({
        error: error.message
    });
}
}


//DELETE IN DATABASE
router.delete('/heroes/:id') = async function (req, res) {
    try {
        hero.findByIdAndRemove({
            _id: req.params.id
        });
        res.send(value);
    } catch (error) {
        res.status(422).send({
            error: next.message
        });
        console.log({
            error: error.message
        });
    }
};

module.exports = router;