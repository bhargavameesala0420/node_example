'use strict';

import mongoose from 'mongoose';

var articleLikesSchema = new mongoose.Schema({
    article_id:     {type: mongoose.Schema.Types.ObjectId, ref: 'articles', default: null},
    liked_by:        {type: mongoose.Schema.Types.ObjectId, ref: 'users', default: null}, //user who liked the article
}, {
    timestamps: true
});

var articleLikesModel = mongoose.model('articlelikes', articleLikesSchema);
export {articleLikesModel}