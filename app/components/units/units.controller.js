angular.module('bgmarsApp')
.controller('unitsController', function($rootScope, $scope, $state, unitsService) {

    $scope.units = [];
    $scope.allUnitsLoaded = false;
    var page = 0;

    $scope.getNumber = function(number) {
        return new Array(number);
    }

    $scope.loadMoreUnits = function() {
        if (!$scope.allUnitsLoaded) {
            page++;
            unitsService.listUnits(page, 9).then(function(response) {
                console.log(response.data);
                $scope.units = $scope.units.concat(response.data.data);
                if ($scope.units.length === response.data.meta.totalCount) {
                    $scope.allUnitsLoaded = true;
                }
            });
        }
    }

});
