const mongoose = require('mongoose');
const MySchema = mongoose.Schema;

//CREATE MySchema SCHEMA AND MODEL
const HeroSchema = new MySchema({
    heroName: {
        type: String,
        required: [true, 'heroName field is required']
    },
    heroHeight: {
        type: Number,
        required: [true, 'heroHeight field is required']
    },
    heroType: {
        type: String,
        required: [true, 'heroType field is required']
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
        required: [true, 'superPowers field is required']
    },
    fightsWon: {
        type: Number,
        default: 0
    }
});

const hero = mongoose.model('HEROES', HeroSchema);
module.exports = hero;