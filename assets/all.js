/**
 * Created by jianxinhu on 15/5/16.
 */
angular
    .module('app', []);
/**
 * Created by jianxinhu on 15/5/16.
 */

(function() {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    function LoginController($scope) {

        $scope.login=function(){
            console.log("is Login");
        }

    }

})();
