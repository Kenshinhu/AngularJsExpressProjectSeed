/**
 * Created by jianxinhu on 15/4/7.
 */
var m = require('mongoose');
var s = m.Schema;
var ObjectId = s.ObjectId;

var goodCollectSchema = new s({
    user_id  : { type: ObjectId },
    post_id  : { type: ObjectId },
    createAt : { type:Number , default: Date.now }
});

goodCollectSchema.index({user_id:1 , post_id:1 },{unique:true});

var goodCollect = m.model('goodCollect',goodCollectSchema);