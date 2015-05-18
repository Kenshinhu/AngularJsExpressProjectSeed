var m = require('mongoose');

var s = m.Schema;

var advertisingSchema = new s({
    title:String,
    tips:String,
    intro:String,
    content:String,
    pic:String,
    createAt:Number
});
 
m.model('advertising',advertisingSchema);


