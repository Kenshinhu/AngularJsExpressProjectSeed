/**
 * Created by jianxinhu on 15/3/18.
 */
exports.User = require("./user");
exports.Post = require("./post");
exports.Comment = require("./comment");
exports.Manager = require("./manager");
exports.GoodCollect = require("./goodCollect");

exports.FavorCollect = new (require("./favorCollect"))();

exports.Page = new (require("./page"))();
exports.Advertising = new (require("./advertising"))();
