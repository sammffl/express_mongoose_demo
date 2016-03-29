var fs = require("fs"),
    path = require("path"),
    json_parser = require("json-parser"),
    lodash = require("lodash"),
    mongoose = require("mongoose");

var db_info = json_parser.parse(fs.readFileSync('config.json'));

var mongoDB = mongoose.connect('mongodb://' + db_info.mongo_db_ip + '/' + db_info.mongo_db_dbname);
var db = {};

mongoDB.connection.on("error", function (error) {
    console.log("数据库连接失败：" + error);
});
mongoDB.connection.on("open", function () {
    console.log("------数据库连接成功！------");
});

fs.readdirSync(__dirname)
    .filter(function (file) {
        return (file.indexOf('.') !== 0) && (file !== 'index.js')
    })
    .forEach(function (file) {
        var model = require(path.join(__dirname, file))(mongoDB);
        db[model.collection.name] = model;
        //console.log(model);
    });


module.exports = db;