angular.module('bgmarsApp')
.controller('logoutController', function($state) {

    delete localStorage.accessToken;
    delete localStorage.tokenType;
    $state.go('login');

});
