angular.module('bgmarsApp')
.directive('searchBar', function() {
    return {
        restrict: 'E',              // Only matches element name <search-bar></search-bar>
        scope: {
            onChange: '&onChangeFn'   // Function binding
        },
        templateUrl: 'app/components/search-bar/search-bar.html',
        controller: function($scope) {

            $scope.searchQuery = '';

        }
    };
});
