'use strict';

const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    name:     {type: String, default: null},
    username: {type: String, default: null},
    password: {type: String, default: null},
}, {
    timestamps: true
});

module.exports = mongoose.model('users', userSchema);