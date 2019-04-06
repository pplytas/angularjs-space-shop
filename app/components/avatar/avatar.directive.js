angular.module('bgmarsApp')
.directive('avatar', function() {
    return {
        restrict: 'E',      // Only matches element name <avatar></avatar>
        scope: {
            avatar: '=avatar'   // Two-way variable binding
        },
        templateUrl: 'app/components/avatar/avatar.html'
    };
});
