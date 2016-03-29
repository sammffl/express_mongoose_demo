var express = require('express');


var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
mongoose.connect('mongodb://27.115.58.228/xinyongjin');

var testSchema = new Schema({
    user_id: {type: Number},
    type: {type: Number},
    status: {type: Number},
    data_value: {type: String},
    create_at: {type: Date}
});

var model_name = coll_name = 's_user_profile_data';
mongoose.model(model_name, testSchema, coll_name);
var TAOBAO = mongoose.model(model_name, coll_name);
var taobao = new TAOBAO();
taobao.user_id = 854885;
taobao.type = 20;
taobao.status = 1;
taobao.data_value = "testValue";
taobao.create_at = new Date();

taobao.save(function (err) {
    if (err) {
        console.log('save failed');
    }
    console.log('save success');
});


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
