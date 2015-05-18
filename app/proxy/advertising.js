/**
 * Created by jianxinhu on 15/5/11.
 */
"use strict";

var baseProxy = require('./baseProxy');

function advertising(){};

advertising.prototype = new baseProxy("advertising");

module.exports = advertising;