/**
 * Created by jianxinhu on 15/5/1.
 */
var m = require('mongoose');

var s = m.Schema;

var pageSchema = new s({
    zh_pageTitle : String,
    pt_pageTitle : String,
    zh_pageBody : String,
    pt_pageBody : String,
    url:String,
    createAt: {type:Number,default:Date.now}
});

m.model("Page",pageSchema);



