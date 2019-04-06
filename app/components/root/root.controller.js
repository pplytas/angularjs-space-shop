angular.module('bgmarsApp')
.controller('rootController', function($scope, $state, userResponse) {
    if (localStorage.accessToken && localStorage.tokenType) {
        $scope.user = userResponse.data;
        $state.go('.browse');
    } else {
        $state.go('login');
    }
});
