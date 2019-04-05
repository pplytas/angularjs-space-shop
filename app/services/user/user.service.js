angular.module('bgmarsApp')
.factory('userService', function($rootScope, $http) {

    let userService = {};

    userService.userProfile = function() {
        let endpoint = '/users/profile';

        return $http({
            method: 'GET',
            url: $rootScope.API + endpoint,
            headers: {
                'Authorization': localStorage.tokenType + ' ' + localStorage.accessToken,
                'Content-Type': 'application/json'
            }
        });
    };

    return userService;

});