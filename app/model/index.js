/**
 * Created by jianxinhu on 15/3/18.
 */
'use strict';

var m = require("mongoose");
var config = require('../../config');

var debug = require("debug");
var log = debug("boss:db:init");

m.connect(config.mongodbUrl,function(err){

    if(err){
        log(" connection to "+config.mongodbUrl+" is Failed");
    }else{
        log(" connection to "+config.mongodbUrl+" is Success");
    }


});

require("./user");
require("./post");
require("./postLang");
require("./comment");
require("./manager");
require("./goodCollect");
require("./favorCollect");
require("./page");
require("./advertising");

exports.User = m.model('User');  //用户模型
exports.Post = m.model('Post');  //文章模型
exports.PostLang = m.model('PostLang'); //文章第二语言
exports.Comment = m.model('Comment');   //文章评论
exports.Manager = m.model('Manager');   //管理员模型
exports.favorCollect = m.model('favorCollect'); // 用户文章收藏模型
exports.goodCollect = m.model('goodCollect');   // 用户评论模型
exports.Page = m.model("Page");                 // 页面管理
exports.advertising = m.model("advertising");   // 广告管理
exports.mongoose = m;