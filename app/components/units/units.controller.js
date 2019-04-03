angular.module('bgmarsApp')
.controller('unitsController', function($rootScope, $scope, $state, unitsService) {

    $scope.units = [];
    $scope.allUnitsLoaded = false;
    var page = 0;

    // bookModal variables and functions
    $scope.selectedUnitId = null;
    $scope.getUnit = unitsService.getUnit;
    $scope.bookUnit = unitsService.bookUnit;

    $scope.getNumber = function(number) {
        return new Array(number);
    }

    $scope.setSelectedUnitId = function(unitId) {
        $scope.selectedUnitId = unitId;
    }

    $scope.loadMoreUnits = function() {
        if (!$scope.allUnitsLoaded) {   // Check if all units have been fetched
            page++;
            unitsService.listUnits(page, 9).then(function(response) {
                $scope.units = $scope.units.concat(response.data.data);
                if ($scope.units.length === response.data.meta.totalCount) {
                    $scope.allUnitsLoaded = true;
                }
            });
        }
    }

});