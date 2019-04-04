angular.module('bgmarsApp')
.controller('unitsController', function($rootScope, $scope, $state, unitsService) {

    $scope.units = [];
    $scope.allUnitsLoaded = false;
    $scope.selectedUnitId = null;       // Unit id selected for booking
    $scope.searchQuery = '';
    let page = 0;

    $scope.getNumber = function(number) {
        return new Array(number);
    }

    $scope.openBookModal = function(unitId) {
        $scope.selectedUnitId = unitId;     // Setting unit id triggers the modal to open
    }

    $scope.onBookSuccess = function(data) {
        let bookedUnit = $scope.units.find(function(unit) {
            return unit.id === data.unitId;
        });
        bookedUnit.booking = {
            reference: data.reference,
            year: data.year
        };
    };

    $scope.searchUnits = function() {
        $scope.units = [];
        $scope.allUnitsLoaded = false;
        $scope.selectedUnitId = null;       // Unit id selected for booking
        page = 0;
        $scope.loadUnits();
    }

    $scope.loadUnits = function() {
        if (!$scope.allUnitsLoaded) {   // Check if all units have been loaded
            page++;
            unitsService.listUnits(page, 9, $scope.searchQuery).then(function(response) {
                $scope.units = $scope.units.concat(response.data.data);
                if ($scope.units.length === response.data.meta.totalCount) {
                    $scope.allUnitsLoaded = true;
                }
            });
        }
    }

});
