angular.module('bgmarsApp')
.controller('unitsController', function($scope, unitsService) {

    $scope.units = [];
    $scope.allUnitsLoaded = false;
    $scope.selectedUnitId = null;       // Unit id selected for booking
    var searchQuery = '';
    let page = 0;

    $scope.openBookModal = function(unitId) {
        $scope.selectedUnitId = unitId;     // Setting unit id triggers the modal to open
    };

    $scope.addBookingInfoToUnit = function(data) {
        let bookedUnit = $scope.units.find(function(unit) {
            return unit.id === data.unitId;
        });
        bookedUnit.booking = {
            reference: data.reference,
            year: data.year
        };
    };

    $scope.searchUnits = function(query) {
        $scope.units = [];
        $scope.allUnitsLoaded = false;
        $scope.selectedUnitId = null;       // Unit id selected for booking
        page = 0;
        searchQuery = query;
        $scope.loadUnits();
    };

    $scope.loadUnits = function() {
        if (!$scope.allUnitsLoaded) {   // Check if all units have been loaded
            page++;
            unitsService.listUnits(page, 9, searchQuery).then(function(response) {
                $scope.units = $scope.units.concat(response.data.data);
                if ($scope.units.length === response.data.meta.totalCount) {
                    $scope.allUnitsLoaded = true;
                }
            });
        }
    };

});
