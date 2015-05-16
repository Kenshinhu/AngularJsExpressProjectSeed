/**
 * Created by jianxinhu on 15/3/19.
 */
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var logger = require('morgan');
var path = require('path');
var uuid = require('node-uuid');
var session = require('express-session'); //加载Session
//var csrf = require('csurf');
//var multer = require('multer');

var debug = require('debug')('application');
var fs = require('fs');

var config = require("./config");

//define Query
app.use(express.query());


//app.use(csrf({ cookie: true }));

//define logger environment
app.use(logger(config.environment));

//define body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//define session
app.use(session({
    genid: function(req) {
        return uuid.v4() // use UUIDs for session IDs
    },
    secret: config.sessionSecret
}));


//define static folder
//var options = {
//    dotfiles: 'ignore',
//    etag: false,
//    extensions: ['jpg', 'png','gif','apk'],
//    index: false,
//    maxAge: '1d',
//    redirect: false,
//    setHeaders: function (res, path, stat) {
//        res.set('x-timestamp', Date.now())
//    }
//};
//app.use(express.static(path.join(__dirname, 'public'), options));
//app.use(express.static(path.join(__dirname, 'uploads')));
//app.use(express.static(path.join(__dirname, 'android')));

app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'dist')));




//define views
app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

app.get("/test",function(req,res){

    debug("HELLOWorld");

    res.json({
        "ok":"1"
    });
});

////define upload
//app.use(multer({
//    dest: "./uploads",
//    changeDest: function (dest, req, res) {
//
//        console.log(req.path);
//
//        if(req.path == "/api/v1/user_avator"){
//            dest += "/avator";
//        }
//
//        var stat = null;
//
//        try {
//            stat = fs.statSync(dest);
//        } catch(err) {
//            // for nested folders, look at npm package "mkdirp"
//            fs.mkdirSync(dest);
//        }
//
//        if (stat && !stat.isDirectory()) {
//            // Woh! This file/link/etc already exists, so isn't a directory. Can't save in it. Handle appropriately.
//            throw new Error('Directory cannot be created because an inode of a different type exists at "' + dest + '"');
//        }
//
//        return dest;
//    },
//    onParseStart: function() {
//        console.log('STARTING ...');
//    },
//    onFileUploadStart: function (file, req, res) {
//        console.log(file.fieldname + ' is starting ...')
//    },
//    onFileUploadData: function (file, data) {
//        //console.log(data.length + ' of ' + file.fieldname + ' arrived')
//    },
//    onError: function (error, next) {
//        console.log(error);
//        next(error)
//    },
//    rename: function (fieldname, filename) {
//        return Date.now()
//    }
//}));


module.exports = app;