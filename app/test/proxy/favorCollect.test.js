/**
 * Created by jianxinhu on 15/4/8.
 */
var favorCollect = require('../../proxy').FavorCollect;
var assertCallback =require("../../common/utilTool");

describe(require('path').basename(__filename), function () {

    describe('#addFavor', function () {

        it('success',function(done){
            favorCollect.baseSave("5522bdf9520871e5303acf74","55238d1d43495ea30ffdc07f",function(err,result){
                assertCallback(err,result)(done);
            })
        });

    });

    describe('getUserFavorPost', function () {
        it('success',function(done){
            favorCollect.getUserFavorPost("5522bdf9520871e5303acf74",function(err,result){
                assertCallback(err,result)(done);
            })
        });
    });

    describe('#removeFavor', function () {
        it('success',function(done){
            favorCollect.removeById("5522bdf9520871e5303acf74","55238d1d43495ea30ffdc07f",function(err,result){
                assertCallback(err,result)(done);
            })
        });
    });



});