import Joi from "@hapi/joi";
import { tag,article,statusCodes } from "./constants.js";
function validateCreateTag(data) {
    return new Promise(function (resolve, reject) {
        const JoiSchema = Joi.object({
            name: Joi.string().required().label(tag.name),
        }).options({ abortEarly: false });
        let response = JoiSchema.validate(data, { abortEarly: false });
        if(response.error == undefined || response.error == null || response.error == '') {
            resolve({status: statusCodes.resultStatusSuccess, data:''})
        }else {
            resolve({status: statusCodes.resultStatusFail, data:response.error.details.map(
                (error) => { return error.context.label})})
        }
    })
};

function validateCreateArtile(data) {
    return new Promise(function (resolve, reject) {
    console.log("data",data)
        const JoiSchema = Joi.object({
            article: Joi.string().required().label(article.article),
            created_by: Joi.string().required().label(article.created_by),
            tags: Joi.optional()
        }).options({ abortEarly: false });
        let response = JoiSchema.validate(data, { abortEarly: false });
        if(response.error == undefined || response.error == null || response.error == '') {
            resolve({status: statusCodes.resultStatusSuccess, data:''})
        }else {
            resolve({status: statusCodes.resultStatusFail, data:response.error.details.map(
                (error) => { return error.context.label})})
        }
    })
};


function validateCreateArticleLike(data) {
    return new Promise(function (resolve, reject) {
    console.log("data",data)
        const JoiSchema = Joi.object({
            article_id: Joi.string().required().label(article.article),
            liked_by: Joi.string().required().label(article.created_by),
        }).options({ abortEarly: false });
        let response = JoiSchema.validate(data, { abortEarly: false });
        if(response.error == undefined || response.error == null || response.error == '') {
            resolve({status: statusCodes.resultStatusSuccess, data:''})
        }else {
            resolve({status: statusCodes.resultStatusFail, data:response.error.details.map(
                (error) => { return error.context.label})})
        }
    })
};


function validateCreateArticleComment(data) {
    return new Promise(function (resolve, reject) {
    console.log("data",data)
        const JoiSchema = Joi.object({
            article_id: Joi.string().required().label(article.article),
            commented_by: Joi.string().required().label(article.created_by),
            comment: Joi.string().required().label(article.comment),
        }).options({ abortEarly: false });
        let response = JoiSchema.validate(data, { abortEarly: false });
        if(response.error == undefined || response.error == null || response.error == '') {
            resolve({status: statusCodes.resultStatusSuccess, data:''})
        }else {
            resolve({status: statusCodes.resultStatusFail, data:response.error.details.map(
                (error) => { return error.context.label})})
        }
    })
};

function validateCreateArticleCommentReply(data) {
    return new Promise(function (resolve, reject) {
    console.log("data",data)
        const JoiSchema = Joi.object({
            comment_id: Joi.string().required().label(article.comment_id),
            reply: Joi.string().required().label(article.comment),
            commented_by: Joi.string().required().label(article.created_by),
        }).options({ abortEarly: false });
        let response = JoiSchema.validate(data, { abortEarly: false });
        if(response.error == undefined || response.error == null || response.error == '') {
            resolve({status: statusCodes.resultStatusSuccess, data:''})
        }else {
            resolve({status: statusCodes.resultStatusFail, data:response.error.details.map(
                (error) => { return error.context.label})})
        }
    })
};
export {validateCreateTag,validateCreateArtile,validateCreateArticleLike,validateCreateArticleComment,validateCreateArticleCommentReply}