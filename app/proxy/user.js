/**
 * Created by jianxinhu on 15/3/18.
 */
var models = require("../model");
var User = models.User;
var Post = models.Post;

/**
 * 插入新的用户数据
 * @param name
 * @param mobile
 * @param pass
 * @param avatar_url
 * @param fn
 */
exports.insertNew = function(p_name,s_name,mobile,pass,avatar_url,fn){

    var user = new User();
    user.p_name = p_name;
    user.s_name = s_name;
    user.mobile = mobile;
    user.pass = pass;
    if(avatar_url === '')
        user.avatar = 'default_ico.jpg';
    else
        user.avatar = avatar_url;

    user.save(fn);
}


/**
 * 删除用户
 * @param _id
 * @param fn
 */
exports.removeUser = function(_id,fn){
    User.remove({'_id':_id},fn);
}

exports.getUsersByQuery = function(query,opt,fn){
    User.find(query,'',opt,fn);
}
