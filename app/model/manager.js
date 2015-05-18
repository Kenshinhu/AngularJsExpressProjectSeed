/**
 * Created by jianxinhu on 15/3/25.
 */
var m = require('mongoose');
var s = m.Schema;

var managerSchema = new s({
    manager_name   : { type : String },
    manager_pass   : { type : String },
    avatar      : { type : String },
    lastLogin: { type:Number , default: Date.now },
    createAt : { type:Number , default: Date.now }
});

managerSchema.index({manager_name:1},{unique:true});

m.model('Manager',managerSchema);