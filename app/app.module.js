// Define the `bgmarsApp` module

angular.module('bgmarsApp', [
    'ui.router'
])
.run(function($rootScope) {
    $rootScope.API = 'http://mars.theblueground.net/api';
});
