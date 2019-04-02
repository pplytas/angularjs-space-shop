angular.module('bgmarsApp')
.factory('loginService', function($rootScope, $http) {

    let loginService = {};

    loginService.login = function(email, password) {
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

    return loginService;

});