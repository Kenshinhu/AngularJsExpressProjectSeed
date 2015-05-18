/**
 * Created by jianxinhu on 15/3/19.
 */
var m = require('mongoose');

var s = m.Schema;

var postSchema = new s({
    poster      : { type: s.Types.ObjectId, ref: 'User' }, //文章发布者
    title       : String, //文章标题
    intro       : String, //文章简要内容
    type        : String, //类型:
    content     : String, //文章 内容
    lang        : { type: s.Types.ObjectId, ref: 'PostLang' }, //文章
    pic         : [String], //文章图片列表
    good        : {type: Number, default: 0}, //文章评价数
    comment     : { type:Number , default: 0 }, //文章评论数
    favor       : { type:Number , default: 0 }, //文章收藏数
    createAt    : { type:Number , default: Date.now } //文章创建时间
});


postSchema.set('toJSON', {virtuals: true});
postSchema.set('toObject', {virtuals: true});
m.model('Post',postSchema);

