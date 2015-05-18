/**
 * Created by jianxinhu on 15/4/23.
 */

var m = require('mongoose');

var s = m.Schema;

var postLangSchema = new s({
    lang        : String, //语言标识
    title       : String, //语言标题
    intro       : String, //语言简要
    content     : String  //语言内容
});

postLangSchema.set('toJSON', {virtuals: true});

postLangSchema.set('toObject', {virtuals: true});

m.model('PostLang',postLangSchema);