/**
 * Created by jianxinhu on 15/3/25.
 */
"use strict";
var models = require('../model');
var Manager = models.Manager;
var baseProxy = require('./baseProxy');

exports.saveAneReNews = function(user,fn){

    var manager = new Manager();
    manager.manager_name = user.manager_name;
    manager.manager_pass = user.manager_pass;
    manager.save(fn);

}

exports.findbyUserName = function(username,fn){
    Manager.findOne(
        {manager_name:username},fn);
}

exports.removeByUserName = function(username,fn){
    Manager.remove(
        {manager_name:username},fn);
}