const { Schema, model } = require('mongoose');

const Realty = new Schema({
    userId: {
        type: String,
        required: true,
        ref: 'User',
    },

    price: {
        type: Number,
        required: true,
    },

    rooms: [{
        id: {
            type: Number,
            required: true,
        },

        name: {
            type: String,
            required: true,
        },

        area: {
            type: Number,
            required: true,
        },

        living: {
            type: Boolean,
            default: false,
        },
    }],

    advantages: [{
        id: {
            type: Number,
            required: true,
        },

        name: {
            type: String,
            required: true,
        },
    }],

    disadvantages: [{
        id: {
            type: Number,
            required: true,
        },

        name: {
            type: String,
            required: true,
        },
    }],

    images: [String],
    link: String,
    floor: Number,
    location: String,
    coords: Array,
});

module.exports = model('Realty', Realty);
