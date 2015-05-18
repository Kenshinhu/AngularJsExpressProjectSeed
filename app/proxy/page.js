/**
 * Created by jianxinhu on 15/5/1.
 */

'use strict';

var models = require('../model');

var baseProxy = require("./baseProxy");

function Page(){}

Page.prototype = new baseProxy("Page");

Page.prototype.queryByUrl = function(url,fn){
    this.model.findOne({"url":url},fn);
}


module.exports = Page;
