angular.module('bgmarsApp')
.factory('authService', function($rootScope, $http) {

    let authService = {};

    authService.login = function(email, password) {
        let endpoint = '/auth/login';
        let parameters = {
            email: email,
            password: password
        };

        return $http({
            method: 'POST',
            url: $rootScope.API + endpoint,
            headers: {
                'Content-Type': 'application/json'
            },
            data: parameters
        });
    };

    return authService;

});