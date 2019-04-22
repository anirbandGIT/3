const mongoose = require('mongoose');
const MySchema = mongoose.Schema;

//CREATE MySchema SCHEMA AND MODEL
const HeroSchema = new MySchema({
    heroName: {
        type: String,
        required: [true, 'THOU HERO SHOULD HAVE A NAME']
    },
    heroHeight: {
        type: Number,
        required: true
    },
    heroType: {
        type: String,
        required: true
    },
    canFly: {
        type: Boolean,
        default: false
    },
    fanFollowing: {
        type: Number,
        default: 0
    },
    superPowers: {
        type: [],
        required: [true, 'SUPER-POWERS ARE A MUST']
    },
    fightsWon: {
        type: Number,
        default: 0
    }
});

const hero = mongoose.model('HEROES', HeroSchema);
module.exports = hero;