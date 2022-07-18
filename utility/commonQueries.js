var commonQuery = {};
commonQuery.InsertIntoCollection = function InsertIntoCollection(model, obj) {
    return new Promise(function (resolve, reject) {
        new model(obj).save(function (err, info) {
            if (err) {
                console.log('err', err);
                reject(err);
            } else {
                resolve(info);
            }
        });
    })
}

commonQuery.lastInsertedId = function lastInsertedId(model) {
    return new Promise(function (resolve, reject) {
        model.findOne().sort({
            _id: -1
        }).exec(function (err, data) {
            if (err) {
                resolve(0);
            } else {
                resolve(data._id);
            }
            
        });
    })
}


export {commonQuery as default}