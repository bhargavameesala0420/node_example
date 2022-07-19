import mongoose from 'mongoose';
import { articleModel } from "../models/articles.js";
import { articleTagsModel } from "../models/articletags.js";
import {articleLikesModel} from "../models/articlelikes.js";
import { commentsModel } from '../models/comments.js';
import { commentRepliesModel } from '../models/commentreplies.js';
import commonQuery from "../utility/commonQueries.js"
import {validateCreateArtile,validateCreateArticleLike,validateCreateArticleComment,validateCreateArticleCommentReply} from "../middleware/validations.js"
import {statusCodes} from "../middleware/constants.js"

async function createArticle(req, res, next) {
    try {
        /*** validate the tag fileds ***/
        console.log("req.body",req.body)
        var data = req.body;
        let validateRes = await validateCreateArtile(data);
        if (validateRes.status === 'true') {
            var articleData = {
                article: data.article,
                created_by: mongoose.Types.ObjectId(data.created_by),
              };
              let artileSaveData = await commonQuery.InsertIntoCollection(articleModel, articleData);
              if (artileSaveData) {
                let artileNewData = await commonQuery.lastInsertedId(articleModel);
                data.tags.forEach(async (tag) => {
                    var articleTagData = {
                        article_id: artileNewData,
                        tag_id: mongoose.Types.ObjectId(tag),
                      };
                    let artileTagSaveData = await commonQuery.InsertIntoCollection(articleTagsModel, articleTagData);
                });
                return res.json({
                    code: statusCodes.success,
                    message: "article created sucessfully.",
                    data: artileSaveData
                })
              }
              else{
                return res.json({
                    code: statusCodes.error,
                    message: "article not created.",
                    data: null
                })
              }
        }
    }
    catch (err) {
        console.log("err",err);
        return res.json({
          code: statusCodes.error,
          message: "article not created.",
          data: null
        })
    }

}

async function createArticleLike(req, res, next) {
    try {
        /*** validate the tag fileds ***/
        var data = req.body;
        let validateRes = await validateCreateArticleLike(data);
        if (validateRes.status === 'true') {
            var articleLikeData = {
                article_id: mongoose.Types.ObjectId(data.article_id),
                liked_by: mongoose.Types.ObjectId(data.created_by),
              };
              let artileLikedSaveData = await commonQuery.InsertIntoCollection(articleLikesModel, articleLikeData);
              if (artileLikedSaveData) {
                return res.json({
                    code: statusCodes.success,
                    message: "article Liked created sucessfully.",
                    data: artileLikedSaveData
                })
              }
              else{
                return res.json({
                    code: statusCodes.error,
                    message: "article Liked not created.",
                    data: null
                })
              }
        }
    }
    catch (err) {
        console.log("err",err);
        return res.json({
          code: statusCodes.error,
          message: "article Liked not created.",
          data: null
        })
    }

}

async function createArticleComment(req, res, next) {
    try {
        /*** validate the tag fileds ***/
        var data = req.body;
        let validateRes = await validateCreateArticleComment(data);
        if (validateRes.status === 'true') {
            var commentData = {
                article_id: mongoose.Types.ObjectId(data.article_id),
                commented_by: mongoose.Types.ObjectId(data.commented_by),
                comment:data.comment,
              };
              let artileLikedSaveData = await commonQuery.InsertIntoCollection(commentsModel, commentData);
              if (artileLikedSaveData) {
                return res.json({
                    code: statusCodes.success,
                    message: "commented sucessfully.",
                    data: artileLikedSaveData
                })
              }
              else{
                return res.json({
                    code: statusCodes.error,
                    message: "not commented.",
                    data: null
                })
              }
        }
    }
    catch (err) {
        console.log("err",err);
        return res.json({
          code: statusCodes.error,
          message: "not commented.",
          data: null
        })
    }

}

async function createArticleCommentReply(req, res, next) {
    try {
        /*** validate the tag fileds ***/
        var data = req.body;
        let validateRes = await validateCreateArticleCommentReply(data);
        console.log("validateRes",validateRes)
        if (validateRes.status === 'true') {
            var commentData = {
                comment_id: mongoose.Types.ObjectId(data.comment_id),
                reply:data.reply,
                commented_by: mongoose.Types.ObjectId(data.commented_by),
              };
              let artileLikedSaveData = await commonQuery.InsertIntoCollection(commentRepliesModel, commentData);
              console.log("artileLikedSaveData",artileLikedSaveData)
              if (artileLikedSaveData) {
                return res.json({
                    code: statusCodes.success,
                    message: "replied sucessfully.",
                    data: artileLikedSaveData
                })
              }
              else{
                return res.json({
                    code: statusCodes.error,
                    message: "not replied.",
                    data: null
                })
              }
        }
    }
    catch (err) {
        console.log("err",err);
        return res.json({
          code: statusCodes.error,
          message: "not replied.",
          data: null
        })
    }

}

async function getArticleList(req, res, next) {
    try{
        var match = {
            created_by: mongoose.Types.ObjectId(req.query.user_id),
          };
        let aggregateQuery = [
            {$match: match,},
            {
                              $lookup: {
                                  from: "articlelikes",
                                  let: { local_id: "$_id" },
                                  pipeline: [
                                      {
                                          $match:
                                              {
                                                  $expr:
                                                      {
                                                          $and:
                                                              [
                                                                  { $eq: ["$article_id", "$$local_id"] },
                                                                  
                                                              ]
                                                      }
                                              }
                                      },
                                      {
                                          $lookup: {
                                              from: "users",
                                              localField: "liked_by",
                                              foreignField: "_id",
                                              as: "usernames"
                                          }
                                      },
                                      {
                                          $unwind: "$usernames"
                                      },
                                      {
                                          $project: {
                                              _id: "$usernames._id",
                                              username: "$usernames.username",
                                          }
                                      }
                                  ],
                                  as: "likes"
                              }
                          },
                          {
                              $lookup: {
                                  from: "comments",
                                  let: { local_id: "$_id" },
                                  pipeline: [
                                      {
                                          $match:
                                              {
                                                  $expr:
                                                      {
                                                          $and:
                                                              [
                                                                  { $eq: ["$article_id", "$$local_id"] },
                                                                  
                                                              ]
                                                      }
                                              }
                                      },
                                      {
                                          $lookup: {
                                              from: "users",
                                              localField: "commented_by",
                                              foreignField: "_id",
                                              as: "usernames"
                                          }
                                      },
                                      {
                                          $unwind: "$usernames"
                                      },
                                      {
                                          $project: {
                                              _id: "$_id",
                                              comment: 1,
                                              createdAt: 1,
                                              updatedAt: 1,
                                              commented_by: {
                                                  "_id" : "$usernames._id",
                                          "name": "$usernames.username"
                                              }
                                          }
                                      }
                                  ],
                                  as: "comments"
                              }
                          },
        ];
        articleModel
        .aggregate(aggregateQuery)
        .then(async function (tableData) {
            return res.json({
                code: statusCodes.success,
                message: "Data retrived successfully.",
                data: tableData,
            });
        })
    }
    catch (err) {
        console.log("err",err);
        return res.json({
          code: statusCodes.error,
          message: "not replied.",
          data: null
        })
    }

}
async function getArticleListForTags(req, res, next) {
    try{
        var match = {
            tag_id: mongoose.Types.ObjectId(req.query.tag_id),
          };
        let aggregateQuery = [
            {$match: match,},
            {$lookup:{from: "articles",localField: "article_id",foreignField: "_id",as: "articleData"}},
            {$unwind: {path: "$articleData",preserveNullAndEmptyArrays: true,},},
            {$lookup:{from: "tags",localField: "tag_id",foreignField: "_id",as: "tagData"}},
            {$unwind: {path: "$tagData",preserveNullAndEmptyArrays: true,},},
            {$project: { "_id":1,"tag":"$tagData.name","tag_id":"$tagData._id","article":"$articleData.article"}},
            {
                $group: {
                  _id: "$tag_id",
                  tag: { $first: "$tag" },
                  article: { $push: "$article" },
                },
            },
        ];
        articleTagsModel
        .aggregate(aggregateQuery)
        .then(async function (tableData) {
            return res.json({
                code: statusCodes.success,
                message: "Data retrived successfully.",
                data: tableData,
            });
        })
    }
    catch (err) {
        console.log("err",err);
        return res.json({
          code: statusCodes.error,
          message: "not replied.",
          data: null
        })
    }

}
export { createArticle,createArticleLike,createArticleComment,createArticleCommentReply,getArticleList,getArticleListForTags };
