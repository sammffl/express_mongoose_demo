var Schema = require("mongoose").Schema;

module.exports = function (db) {
    var detailSchema = new Schema({
        user_id: {type: Number},
        detail: {type: String},
        create_at: {type: Date}
    });
    return db.model("detail", detailSchema, "detail");
};