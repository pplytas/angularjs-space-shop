angular.module('bgmarsApp')
.directive('navbar', function() {
    return {
        restrict: 'E',      // Only matches element name <navbar></navbar>
        scope: {
            logoSrc: '@logoSrc',    // One-way text binding
            avatar: '=avatar'       // Two-way variable binding
        },
        templateUrl: 'app/components/navbar/navbar.html'
    };
});
