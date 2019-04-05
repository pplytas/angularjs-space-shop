// Define the app routes

angular.module('bgmarsApp')
.config(function($urlRouterProvider, $stateProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('login', {
        url: '/login',
        templateUrl: 'app/components/login/login.html',
        controller: 'loginController'
    })
    .state('root', {
        url: '/',
        controller: 'rootController',
        resolve: {
            userResponse: function(userService) {
                return userService.userProfile();
            }
        }
    })
    .state('root.browse', {
        url: 'browse',
        redirectTo: 'root.browse.units'
    })
    .state('root.browse.units', {
        url: '/units',
        templateUrl: 'app/components/units/units.html',
        controller: 'unitsController'
    })
    .state('logout', {
        url: '/logout',
        controller: 'logoutController'
    });

});