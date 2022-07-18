'use strict';

import mongoose from 'mongoose';

var tagsSchema = new mongoose.Schema({
    name:     {type: String, default: null},
}, {
    timestamps: true
});

var tagModel = mongoose.model('tags', tagsSchema);
export {tagModel}