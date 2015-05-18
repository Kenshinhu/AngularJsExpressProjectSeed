/**
 * Created by jianxinhu on 15/3/20.
 */
var models = require('../model');
var Comment = models.Comment;
var debug = require("debug");
var log = debug('proxy:comment:log');
var error = debug('proxy:comment:error');

var baseProxy = require('./baseProxy');



/**
 * 增加评论
 * @param poster
 * @param postId
 * @param content
 * @param fn
 */
exports.insertNew = function(poster,post,content,fn){
    log("poster : %s",JSON.stringify(poster,'','\t'));
    log("post : %s",JSON.stringify(post,'','\t'));
    log("content : %s",content);
    var comment = new Comment();
    comment.post = post;
    comment.commenter = poster;
    comment.content = content;
    comment.save(fn);
}


/**
 * 删除评论
 * @param commentId
 * @param fn
 */
exports.removeComment = function(commentId,fn){
    Comment.findByIdAndRemove(commentId,fn);
}



/**
 * 清空指定文章的评论
 * @param post_id
 * @param fn
 */
exports.removeByPost_id = function(post_id,fn){
    Comment.remove({"post":post_id},fn);
}

/**
 * 分页查询
 * @param opt
 * @param fn
 */
exports.data = function(opt,fn){

    var pageIndex = (opt.hasOwnProperty("pageIndex") && (!isNaN(opt.pageIndex))) ? opt.pageIndex : 1;
    var pageCount = (opt.hasOwnProperty("pageCount") && (!isNaN(opt.pageCount))) ? opt.pageCount : 10;
    var query = opt.hasOwnProperty("query")? opt.query:{};

    var ep = new eventproxy();

    ep.fail(fn);

    ep.all('query','count',function(result,total){

        var _d = {};

        //计算分页
        var totalPage = total % pageCount === 0 ? parseInt(total/pageCount) : parseInt(total/pageCount)+1;

        _d.totalPage = totalPage;
        _d.total=total;
        _d.pageIndex = pageIndex;
        _d.pageCount = pageCount;
        _d.data = result;

        fn(null,_d);
    });

    queryData(query,pageIndex,pageCount,ep.done(function(result){
        ep.emit('query',result);
    }));

    queryCount(query,ep.done(function(count){
        ep.emit('count',count);
    }));

}

/**
 * 按 query 查看 文章
 * @param query
 * @param pageIndex
 * @param pageCount
 * @param fn
 */
exports.query = queryData;

function queryData(query,pageIndex,pageCount,fn){

    var q = Comment.find(query)
        .populate([
            {path: 'commenter', select:'-pass  -__v'}
        ])
        .sort({'createAt':-1});

    var skip = (pageIndex - 1 <=0) ? 0 : (pageIndex-1)*pageCount;
    var limit = pageCount;

    q.skip(skip).limit(limit);

    q.exec(function(err,result){
        fn(err,result);
    });
}

/**
 * 按 query 统计文章
 * @param query
 * @param fn
 */
exports.countByQuery = queryCount;

function queryCount(query,fn){

    var callback = fn;

    var q = Comment.find(query);

    q.count(callback);

}


/**
 * 查询评论
 * @param query
 * @param opt
 * @param fn
 */
exports.getCommentByQuery = function(query,fn){

    var q = Comment.find(query)
        .populate([
            {path:'commenter', select:'-pass  -__v -accesstoken' ,  model : 'User' },
            {path:'post'     , select:'-pass  -__v' ,  model : 'Post' }
        ]).sort({'createAt':-1});

    q.exec(fn);
}


/**
 * 通过用户标识查找评论
 * @param user_id
 * @param fn
 */
exports.getCommentByUserId = function(user_id,fn){

    var q = Comment.find({'commenter':user_id})
            .populate([
                    {path:'commenter', select:'-pass  -__v -accesstoken' ,  model : 'User' },
                    {path:'post'     , select:'-pass  -__v' ,  model : 'Post' }
            ])
            .sort("-createAt");

    q.exec(fn);
}