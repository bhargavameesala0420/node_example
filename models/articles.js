'use strict';

import mongoose from 'mongoose';

var articleSchema = new mongoose.Schema({
    article:     {type: String, default: null},
    created_by:  {type: mongoose.Schema.Types.ObjectId, ref: 'users', default: null},
}, {
    timestamps: true
});

var articleModel = mongoose.model('articles', articleSchema);
export {articleModel}