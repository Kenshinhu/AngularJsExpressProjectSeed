/**
 * Created by jianxinhu on 15/4/2.
 */

var should = require("should");

function assertCallback(err,result){


    should(err).not.be.ok;

    should.exist(result);

    return function(fn){
        fn();
    }
};

 module.exports = assertCallback;

