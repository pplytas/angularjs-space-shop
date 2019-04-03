angular.module('bgmarsApp')
.controller('rootController', function($state) {
    if (!localStorage.accessToken || !localStorage.tokenType) {
        $state.go('login');
    } else {
        $state.go('.browse');
    }
});
