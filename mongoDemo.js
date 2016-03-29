var mongoDB = require('./models');


function saveToMongoDB(doc) {
    var detailModel = mongoDB.detail;
    detailModel.find({user_id: doc.user_id}, function (err, docs) {
        if (err) {
            console.log(err);
        } else {
            if (!!docs && docs.length > 0) {
                console.log("update");
                detailModel.update({user_id: doc.user_id}, doc, function (err, docs) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log(docs);
                    }
                })
            } else {
                console.log("insert");
                var detailEntity = new mongoDB.detail(doc);
                detailEntity.save(function (err, docs) {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("success");
                    }
                })
            }
        }
    });
}

saveToMongoDB({
    user_id: 122221,
    detail: "update db 122221",
    create_at: Date.now()
})



