'use strict';

import mongoose from 'mongoose';

var commentsSchema = new mongoose.Schema({
    article_id:     {type: mongoose.Schema.Types.ObjectId, ref: 'articles', default: null},
    commented_by:        {type: mongoose.Schema.Types.ObjectId, ref: 'users', default: null},
    comment:        {type: String, default: null},
}, {
    timestamps: true
});

var commentsModel = mongoose.model('comments', commentsSchema);
export {commentsModel}