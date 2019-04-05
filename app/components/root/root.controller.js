angular.module('bgmarsApp')
.controller('rootController', function($scope, $state, userResponse) {
    if (!localStorage.accessToken || !localStorage.tokenType) {
        $state.go('login');
    } else {
        $scope.user = userResponse.data;
        $state.go('.browse');
    }
});
