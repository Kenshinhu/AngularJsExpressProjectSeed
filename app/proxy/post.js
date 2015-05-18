/**
 * Created by jianxinhu on 15/3/19.
 */
var models = require('../model');
var Post = models.Post;
var PostLang = models.PostLang;
var favorCollect = models.favorCollect;
var goodCollect = models.goodCollect;
var Comment = models.Comment;
var debug = require('debug');
var log = debug('proxy:post:log');
var async = require('async');
var error = debug('proxy:post:error');
var eventproxy = require('eventproxy');

require('../common/stringUtil');

exports.addPostLang = function(title,content,fn){

    var postLang = new PostLang();
    postLang.lang='pt';
    postLang.title = title;
    postLang.intro = content.toString().filterStr().subCHStr(0,255); //从内容截取255个汉字
    postLang.content = content;
    postLang.save(fn);
}

exports.updatePostLang = function(_lang,fn){

    PostLang.findOne({_id:_lang._id},function(err,postlang){
        postlang.lang = _lang.lang;
        postlang.title = _lang.title;
        postlang.intro = _lang.content.toString().filterStr().subCHStr(0,255);
        postlang.content = _lang.content;
        postlang.save(fn);
    });

}

/**
 * 增加文章分类
 * @param title
 * @param content
 * @param fn
 */

exports.publishWithLang = function(poster,type,title,content,pt_title,pt_content,pic,fn){

    var postLang = new PostLang();
    postLang.lang='pt'
    postLang.title = pt_title;
    postLang.intro = pt_content.toString().filterStr().subCHStr(0,255); //从内容截取255个汉字
    postLang.content = pt_content;
    postLang.save(function(err,postLangResult){


        var post = new Post();
        post.poster = poster;
        post.title = title;
        post.intro = content.toString().filterStr().subCHStr(0,255); //从内容截取255个汉字
        post.type = type;
        post.content=content;
        post.pic = pic;
        post.lang = postLangResult;
        post.save(fn);

    });

}


/**
 * 发布日志信息
 * @param poster
 * @param title
 * @param type
 * @param content
 * @param pic
 * @param fn
 */
exports.publish = function(poster,title,type,content,pic,fn){
    var post = new Post();
    post.poster = poster;
    post.title = title;
    post.intro = content.toString().filterStr().subCHStr(0,255); //从内容截取255个汉字
    post.type = type;
    post.content=content;
    post.pic = pic;
    post.save(fn);
}

exports.removePost = function(id,fn){
    Post.findByIdAndRemove(id,fn);
}

exports.getUserPost = function(user,fn){
    return getPost(null,0,100,null,user,fn);
}

/**
 * 数据查询
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
 * 取最近的动态
 * @param time
 * @param fn
 */
exports.getLastNews = function(time,l,user,fn){
    return getPost('news',time,l,user,null,fn);
}

/**
 *  讨论
 * @param time
 * @param l
 * @param fn
 * @returns {*}
 */
exports.getLastTalk = function(time,l,user,fn){
    return getPost('talk',time,l,user,null,fn);
}

/**
 * 话题
 * @param time
 * @param l
 * @param fn
 * @returns {*}
 */
exports.getLastTopic = function(time,l,user,fn){
    return getPost('topic',time,l,user,null,fn);
}

exports.queryById = function(id,fn){
    Post.findOne({'_id': id}).exec(fn);
}




exports.findById = function(id,fn){
    Post.findOne({'_id': id})
        .select('_id title users_good_this_post users_favor_this_post content pic  poster comments favor comment good createAt lang')
        .populate([
            {path: 'poster', select:'-pass -__v'},
            {path: 'lang', select:'-pass -__v'},
            {path:'comments',options: { sort: { 'createAt': -1 } }},
            {path:'users_good_this_post'},
            {path:'users_favor_this_post'}
        ]).exec(function(err,docs){

            var opts = [
                {
                    path : 'comments.commenter',
                    select : '-pass -__v',
                    model : 'User'
                }
            ];

            Post.populate(docs, opts, function(err, populatedDocs) {

                fn(err,populatedDocs);
            });
        });
}


/**
 * 查询文件
 * @type {getPost}
 */
exports.getPost = getPost;

/**
 * 支持分页查询
 * @param query
 * @param skip
 * @param limit
 * @param fn
 */
exports.query=queryData;


function queryData(query,pageIndex,pageCount,fn){


    var q = Post.find(query)
        .populate([
            {path: 'poster', select:'-pass  -__v'},
            {path: 'lang', select:'-pass  -__v'}
        ])
        .sort({'createAt':-1});

    var skip = (pageIndex - 1 <=0) ? 0 : (pageIndex-1)*pageCount;
    var limit = pageCount;

    q.skip(skip).limit(limit);

    q.exec(function(err,result){
        log("err : "+JSON.stringify(err,'','\t'));
        log("result : "+JSON.stringify(result,'','\t'));

        fn(err,result);
    });
}


/**
 * 查询文章
 * @param query
 * @param opt
 * @param fn
 */
exports.getPostsByQuery = function(query,limit,fn){

    var callback = fn;

    if(typeof limit === "function")
    {
        callback = limit;
    }

    var q = Post.find(query)
        .populate([
            {path: 'poster', select:'-pass  -__v'}
        ])
        .sort({'createAt':-1});

    //console.log("typeof limit:"+(typeof limit));

    if(typeof limit === "number"){
        q.limit(limit);
    }

    q.exec(callback);
}


/**
 * 数量
 * @param query
 * @param fn
 */
exports.countByQuery =queryCount;

function queryCount(query,fn){

    var callback = fn;

    var q = Post.find(query);

    q.count(callback);
}


function getPost(type,time,l,user,poster, fn){

    var q;

    var params = {};

    if(type!=null)
        params.type = type;

    if(Number(time) !== 0)
        params.createAt = { $lt:time};

    log("params: %s",JSON.stringify(params,'','\t'));

    var q = Post.find(params)
        .select('_id title content pic poster  favor comment good createAt lang')
        .populate([
            {path: 'poster', select:'-pass  -__v'},
            {path: 'lang', select:'-pass  -__v'}
        ])
        .sort({'createAt':-1})
        .limit(l);

    q.exec(function(err,docs){

        var result = [];

        async.eachSeries(docs,function(item,callback){

            var obj =  item.toObject();

            if(obj.poster === null)
            {
                return callback();
            }

            var next = function(o){

                favorCollect.find({"post_id":o._id}).populate([
                    {path:'user_id', select:'-pass  -__v -accesstoken' ,  model : 'User' }
                ]).sort({'createAt':-1}).exec(function(err,favorResult){

                    var favor = 0;

                    for(var key in favorResult){

                        var obj = favorResult[key];

                        if(obj.user_id !== null && typeof obj ==="object")
                            favor++;

                    }

                    o.favor = favor;

                    //
                    goodCollect.find({"post_id":o._id}).populate([
                        {path:'user_id', select:'-pass  -__v -accesstoken' ,  model : 'User' }
                    ]).sort({'createAt':-1}).exec(function(err,goodResult){

                        var good = 0;

                        for(var key in goodResult){

                            var obj = goodResult[key];

                            if(obj.user_id != null && typeof obj ==="object")
                                good++;

                        }

                        o.good = good;

                        Comment.find({"post":o._id}).populate([
                            {path:'commenter', select:'-pass  -__v -accesstoken' ,  model : 'User' }
                        ]).sort({'createAt':-1}).exec(function(err,commentResult){

                            var comment = 0;

                            for(var key in commentResult){

                                var obj = commentResult[key].toObject();

                                if(typeof obj ==="object" && obj.commenter!=null) comment++;

                            }

                            o.comment = comment;

                            result.push(o);

                            callback();

                        });
                    });

                });
            };


            if(user !==null && (typeof user ==="object")){

                favorCollect.count(
                    {"user_id":user._id,"post_id":obj._id}
                    ,function(err,count){
                        obj.isfavor = count=== 0 ? 0 : 1;
                        //统计点赞的数量
                        goodCollect.count({"user_id":user._id,"post_id":obj._id},function(err,count){
                            obj.isgood = count=== 0 ? 0 : 1;
                            next(obj);
                        });
                    });

            }else{

                obj.isfavor=0;

                obj.isgood=0;

                next(obj);
            }

        },function(err){
            fn(err,result);
        });
    });
}