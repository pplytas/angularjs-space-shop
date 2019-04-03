angular.module('bgmarsApp')
.controller('loginController', function($rootScope, $scope, $state, loginService) {

    if (localStorage.accessToken && localStorage.tokenType) {
        $state.go('root');
    }

    $scope.messages = [];
    $scope.credentials = {
        colonistID: '',
        password: ''
    };

    $scope.login = function() {
        loginService.login($scope.credentials.colonistID, $scope.credentials.password)
        .then(function(response) {
            localStorage.accessToken = response.data.token.accessToken;
            localStorage.tokenType = response.data.token.tokenType;
            $rootScope.user = response.data.user;
            $state.go('root');
        })
        .catch(function(response) {
            $scope.messages = [];
            if (response.data.code === 401) {
                $scope.messages.push(response.data.message);
            } else if (response.data.code === 400) {
                response.data.errors.forEach(function(error) {
                    $scope.messages.push(...error.messages);
                });
            }
        });
    };

});