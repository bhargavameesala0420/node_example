'use strict';

import mongoose from 'mongoose';

var articleTagsSchema = new mongoose.Schema({
    article_id:         {type: mongoose.Schema.Types.ObjectId, ref: 'articles', default: null},
    tag_id:             {type: mongoose.Schema.Types.ObjectId, ref: 'tags', default: null},
}, {
    timestamps: true
});

var articleTagsModel = mongoose.model('airticletags', articleTagsSchema);
export {articleTagsModel}