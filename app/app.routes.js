// Define the app routes

angular.module('bgmarsApp')
.config(function($urlRouterProvider, $stateProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider
    .state('login', {
        url: '/login',
        templateUrl: 'app/components/login/login.html',
        controller: 'loginController'
    });

});