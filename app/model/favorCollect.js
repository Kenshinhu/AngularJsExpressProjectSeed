/**
 * Created by jianxinhu on 15/4/8.
 */
var m = require('mongoose');
var s = m.Schema;
var ObjectId = s.ObjectId;

var favorCollectSchema = new s({
    user_id  : { type: ObjectId },
    post_id  : { type: ObjectId },
    createAt : { type:Number , default: Date.now }
});

favorCollectSchema.index({user_id:1 , post_id:1 },{unique:true});

m.model('favorCollect',favorCollectSchema);