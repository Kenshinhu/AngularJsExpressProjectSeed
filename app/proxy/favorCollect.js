/**
 * Created by jianxinhu on 15/4/8.
 */

"use strict";

var baseProxy = require('./baseProxy');

function favor_collect(){}

favor_collect.prototype = new baseProxy("favorCollect");


/**
 * 查询收藏
 * @param query
 * @param fn
 */
favor_collect.prototype.getFavorByQuery = function(query,fn){

    var q = this.model.find(query).populate([
        {path:'user_id', select:'-pass  -__v -accesstoken' ,  model : 'User' }
    ]).sort({'createAt':-1});

    q.exec(fn);
}

/**
 * 获取用户的收藏文章
 * @param user_id
 * @param fn
 */
favor_collect.prototype.getUserFavorPost = function(user_id,fn){
    this.model.find({"user_id":user_id}).sort('-createAt').exec(fn);
}

module.exports = favor_collect;
