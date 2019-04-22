var user = require('../models/user.model.js');
const joi = require('joi');

var signin = async (req, res) => {
    // try {
    //     schema = joi.object().keys({
    //         email: joi.string().trim().email().required(),
    //         password: joi.string().regex(/^[a-zA-Z0-9_]{8,12}$/).required()
    //     });
    //     await joi.validate(req.body, schema, (err, result) => {
    //         if (err) {
    //             res.send("PASSWORD DOES NOT MATCH CRITERIA");
    //         }
    //         res.send("PASSWORD ACCEPTED");
    //     })
    // } catch (err) {
    //     res.status(422).send({ error: err.message });
    //     console.log({ error: err.message });
    // }
    schema = joi.object().keys({
        email: joi.string().trim().email().required(),
        password: joi.string().regex(/[a-zA-Z0-9_]{8,12}/).required()
    });
    await joi.validate(req.body, schema, (err, result) => {
        if (err) {
            res.send("PASSWORD DOES NOT MATCH CRITERIA");
        }
        else { res.send("PASSWORD ACCEPTED"); }

    })
}

// var signup = async (req, res) => {
//     if (Object.keys(req.body).length != 0) {
//         try {
//             await user.create(req.body);
//             res.send();
//         } catch (err) {
//             res.status(422).send({ error: err.message });
//             console.log({ error: err.message });
//         }
//     }
//     else res.send("SENDING EMPTY JSON OBJECT!!!");
// }


var getUsers = async (req, res) => {
    try {
        await user.find({}).then(function (value) {
            res.send(value);
        });
    } catch (err) {
        res.status(422).send({ error: err.message });
        console.log({ error: err.message });
    }
}

module.exports = { signup, getUsers, signin };