// const validator = require("../middleware/validations");
import {validateCreateTag} from "../middleware/validations.js"
import { tagModel } from "../models/tags.js";
import commonQuery from "../utility/commonQueries.js"
import {statusCodes} from "../middleware/constants.js"
async function createTag(req, res, next) {
    try {
        /*** validate the tag fileds ***/
        let validateUserRes = await validateCreateTag(req.body);
        if (validateUserRes.status === 'true') {
            var tagData = {
                name: req.body.name,
              };
              let tagSaveData = await commonQuery.InsertIntoCollection(tagModel, tagData);
              if (tagSaveData) {
                return res.json({
                    code: statusCodes.success,
                    message: "tag created sucessfully.",
                    data: tagSaveData
                })
              }
              else{
                return res.json({
                    code: statusCodes.error,
                    message: "tag not created.",
                    data: null
                })
              }
        }
    }
    catch (err) {
        console.log("err",err);
        return res.json({
          code: statusCodes.error,
          message: "tag not created.",
          data: null
        })
    }
}

export { createTag };