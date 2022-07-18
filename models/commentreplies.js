'use strict';

import mongoose from 'mongoose';

var commentRepliesSchema = new mongoose.Schema({
    comment_id:         {type: mongoose.Schema.Types.ObjectId, ref: 'comments', default: null},
    reply:              {type: String, default: null},
    commented_by:       {type: mongoose.Schema.Types.ObjectId, ref: 'users', default: null},
}, {
    timestamps: true
});

var commentRepliesModel = mongoose.model('commentreplies', commentRepliesSchema);
export {commentRepliesModel}