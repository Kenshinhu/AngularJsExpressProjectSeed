var proxy = require("./app/proxy");

proxy.Advertising.baseSave({"title":"no name"},{
    "title":"no name",
    "tips":"tips111222",
    "intro":"intro",
    "content":"content,show dbs\"ddddd\"",
    "pic":"abc123.jpg",
    "createAt":12312312
},function(err,result){

    console.log("result:"+JSON.stringify(result,'','\t'));

});

//proxy.Advertising.baseInsert({
//    "title":"no name",
//    "tips":"tips",
//    "intro":"intro",
//    "content":"content,show dbs\"ddddd\"",
//    "pic":"xxx.jpg",
//    "pic111":"xxx.jpg",
//    "createAt":12312312
//},function(err,result){
//    console.log(result);
//}).find({}).exec(function(err,result){
//    console.log(result);
//});