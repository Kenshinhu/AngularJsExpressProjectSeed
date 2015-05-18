/**
 * Created by jianxinhu on 15/4/7.
 */

var models = require('../model');
var goodCollect = models.goodCollect;

var debug = require("debug");
var log = debug('proxy:goodCollect:log');
var error = debug('proxy:goodCollect:error');


/**
 * 增加 赞
 * @param post_id
 * @param user_id
 * @param fn
 */
exports.addGood= function(post_id,user_id,fn){
    log("post_id : %s",post_id);
    log("user_id : %s",user_id);
    var good_collect = new goodCollect();
    good_collect.user_id = user_id;
    good_collect.post_id = post_id;
    good_collect.save(fn);
}

/**
 * 删除 赞
 * @param post_id
 * @param user_id
 * @param fn
 */
exports.removeGood = function(post_id,user_id,fn){
    log("post_id : %s",post_id);
    log("user_id : %s",user_id);
    goodCollect.remove({"post_id":post_id, "user_id":user_id}, fn);
}

/**
 * 查询收藏
 * @param query
 * @param fn
 */
exports.getGoodByQuery = function(query,fn){

    var q = goodCollect.find(query).populate([
        {path:'user_id', select:'-pass  -__v -accesstoken' ,  model : 'User' }
    ]).sort({'createAt':-1});

    q.exec(fn);
}

/**
 * 按用户ID 查找文章
 * @param user_id
 * @param fn
 */
exports.getPostByUserID = function(user_id,fn){
    goodCollect.find({"user_id":user_id}).sort('-createAt').exec(fn);
}