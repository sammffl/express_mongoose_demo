var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var db = mongoose.connect('mongodb://27.115.58.228/xinyongjin');
db.connection.on("error", function (error) {
    console.log("数据库连接失败：" + error);
});
db.connection.on("open", function () {
    console.log("------数据库连接成功！------");
});

//数据库结构
var detailSchema = new Schema({
    user_id: {type: Number},
    type: {type: Number},
    status: {type: Number},
    data_value: {type: String},
    create_at: {type: Date}
});
//操作model
var DetailModel = db.model("detail", detailSchema,"detail");
//实体
var DetailEntity = new DetailModel({
    user_id: 555555,
    type: 20,
    status: 1,
    data_value: "test",
    create_at: Date.now()
});

console.log(DetailEntity.data_value);

DetailEntity.save(function (err, detail) {
    if (err) {
        console.log("err:", err);
    } else {
        console.log(detail)
    }
});

//var model_name = coll_name = 's_user_profile_data';
//mongoose.model(model_name, detailSchema, coll_name);
//var Detail = mongoose.model(model_name, detailSchema);
//
//var detail = new Detail({
//    user_id: 555555,
//    type: 20,
//    status: 1,
//    data_value: "test",
//    create_at: Date.now()
//});
//detail.save(function (err) {
//    if (err) {
//        console.log('save failed');
//    }
//    console.log('save success');
//});