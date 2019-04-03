// Define the `bgmarsApp` module

angular.module('bgmarsApp', [
    'ui.router',
    'infinite-scroll'
])
.run(function($rootScope) {
    $rootScope.API = 'http://mars.theblueground.net/api';
});
