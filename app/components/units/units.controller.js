angular.module('bgmarsApp')
.controller('unitsController', function($rootScope, $scope, $state, $sce, unitsService) {

    $scope.units = [];
    $scope.allUnitsLoaded = false;
    $scope.selectedUnitId = null;       // Unit id selected for booking
    $scope.searchQuery = '';
    let page = 0;

    var prepareUnits = function(units) {
        units.forEach(function(unit) {
            unit.description = $sce.trustAsHtml(unit.description);                              // Sanitize description html
            let pictureUrl = 'http://mars.theblueground.net' + unit.pictures[0].slice(0, -9);   // Remove last part from image urls (e.g -w200.jpg)
            unit.picturesUrl = {                    // Store image urls in object with sizes as keys
                small: pictureUrl + '-w200.jpg',
                medium: pictureUrl + '-w400.jpg',
                large: pictureUrl + '-w800.jpg'
            };
        });
        return units;
    };

    $scope.getNumber = function(number) {
        return new Array(number);
    };

    $scope.openBookModal = function(unitId) {
        $scope.selectedUnitId = unitId;     // Setting unit id triggers the modal to open
    };

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
    };

    $scope.loadUnits = function() {
        if (!$scope.allUnitsLoaded) {   // Check if all units have been loaded
            page++;
            unitsService.listUnits(page, 9, $scope.searchQuery).then(function(response) {
                $scope.units = $scope.units.concat(prepareUnits(response.data.data));
                if ($scope.units.length === response.data.meta.totalCount) {
                    $scope.allUnitsLoaded = true;
                }
            });
        }
    };

});
