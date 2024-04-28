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
        area: {
            type: Number,
            required: true,
        },

        isLiving: {
            type: Boolean,
            default: false,
        },
    }],

    images: [String],
    floor: Number,
    ceilingHeight: Number,
    coords: Array,
});

module.exports = model('Realty', Realty);
