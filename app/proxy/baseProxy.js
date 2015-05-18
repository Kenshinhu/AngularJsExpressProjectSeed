/**
 * Created by jianxinhu on 15/5/2.
 */
//
var db = require("../model");
//var m = require('mongoose');
var validator = require('validator');

var debug = require("debug");
var log = debug('baseProxy:log');
var error = debug('baseProxy:error');



function BaseProxy(modelName){

    log("baseProxy:%s",modelName);

    this._l = debug("baseProxy:"+modelName+":log");

    this.modelName = modelName;

    this.model = db.mongoose.model(modelName);
}

/**
 * 插入操作
 * @param source
 * @param fn
 */
BaseProxy.prototype.baseInsert = function(source,fn){

    this._l("baseInsert"+JSON.stringify(source,'','\t'));

    this.model.create(source,fn);
}

/**
 * 保存操作
 * @param conditions
 * @param doc
 * @param option
 * @param fn
 */
BaseProxy.prototype.baseSave = function(conditions,doc,option,fn){


    this._l("baseSave"+JSON.stringify(arguments,'','\t'));

    var callback = fn;

    if(typeof (fn === "undefined") && (typeof option === "undefined") && (typeof doc ==="function")){
        callback = doc;
        var obj = conditions;
        this.model.create(obj,callback);
    }else if(typeof (fn === "undefined") && (typeof option === "function")){

        callback = option;

        this.model.update(conditions,doc,callback);

    }else{

        this.model.update(conditions,doc,callback);
    }
}


/**
 * 查找单个记录
 * @param _id
 * @param fn
 */
BaseProxy.prototype.findById = function(_id,fn){
    this.model.findOne({"_id":_id},fn);
}


/**
 * 删除单个记录
 * @param _id
 * @param fn
 */
BaseProxy.prototype.removeById = function(_id,fn){
    this.model.remove({"_id":_id},fn);
}

module.exports = BaseProxy;