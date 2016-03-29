var Schema = require("mongoose").Schema;

module.exports = function (db) {
    var detailSchema = new Schema({
        user_id: {type: Number},
        type: {type: Number},
        status: {type: Number},
        data_value: {type: String},
        create_at: {type: Date}
    });
    return db.model("s_user_profile_data", detailSchema, "s_user_profile_data");
};
