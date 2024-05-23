const { Schema, model } = require('mongoose');

const User = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },

    updateToken: {
        type: String,
        required: true,
        unique: true,
    },

    emailConfirmed: Boolean,
    refreshToken: String,
});

module.exports = model('User', User);
