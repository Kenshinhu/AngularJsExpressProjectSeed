/**
 * Created by jianxinhu on 15/3/18.
 */

var m = require('mongoose');
var s = m.Schema;


var userSchema = new s({
    p_name   : { type : String }, //用户 主要名称
    s_name   : { type : String }, //用户 次要名称
    mobile : { type : String }, //用户 手机号码
    pass   : { type : String },//用户 登陆密码
    userType :{ type : String , default: 'normal'}, //用户类型， normal 为普通
    avatar      : { type : String }, // 用户头像
    accesstoken : {type:String},     // 用户登陆授权码
    createAt : { type:Number , default: Date.now } // 用户创建时间
});

userSchema.index({mobile:1},{unique:true});
userSchema.set('toJSON', {virtuals: true});
userSchema.set('toObject', {virtuals: true});

userSchema.method('toClient', function() {
    var obj = this.toObject();

    //Rename fields
    obj.id = obj._id;
    obj.v = obj.__v;
    delete obj._id;
    delete obj.__v;
    return obj;
});

userSchema.virtual('avatar_url').get(function () {
    return "http://58.96.190.181:18883/"+this.avatar;
});


m.model('User',userSchema);