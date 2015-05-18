/**
 * Created by jianxinhu on 15/3/19.
 */
var m = require('mongoose');
var s = m.Schema;

var commentSchema = new s({
    post        : { type: s.Types.ObjectId, ref: "Post" },
    commenter   : { type: s.Types.ObjectId, ref: 'User' },
    content     : String,
    createAt    : { type:Number , default: Date.now }
});

var comment = m.model('Comment', commentSchema);

m.model('Comment',commentSchema);

