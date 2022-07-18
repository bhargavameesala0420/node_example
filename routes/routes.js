import express from 'express';
var app = express();
export var router = express.Router();
import {createArticle ,createArticleLike,createArticleComment,createArticleCommentReply,getArticleList,getArticleListForTags} from "../controllers/articleController.js";
import {createTag} from "../controllers/tagController.js";

router.post('/creatArticle', createArticle);
router.post('/creatTag', createTag);
router.post('/articleLike', createArticleLike);
router.post('/articleComment', createArticleComment);
router.post('/articleCommentReply', createArticleCommentReply);
router.get('/articleListOfUser',getArticleList);
router.get('/articleListForTags',getArticleListForTags);