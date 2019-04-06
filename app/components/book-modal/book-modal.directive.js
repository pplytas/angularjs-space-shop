angular.module('bgmarsApp')
.directive('bookModal', function() {
    return {
        restrict: 'E',              // Only matches element name <book-modal></book-modal>
        scope: {
            unitId: '=unitId',          // Two-way variable binding
            onSuccess: '&onSuccessFn'   // Function binding
        },
        templateUrl: 'app/components/book-modal/book-modal.html',
        controller: function($scope, $sce, unitsService) {

            $scope.unit = {};
            $scope.selectedYear = null;
            $scope.displayNoYearMsg = false;
            $scope.displayErrorMsg = false;

            $scope.$watch('unitId', function(unitId) {      // On modal open fetch unit details
                if (unitId) {
                    $('#bookModal').modal('show');
                    unitsService.getUnit(unitId).then(function(response) {
                        $scope.unit = prepareUnit(response.data);
                    });
                    $scope.unitId = null;
                }
            });

            var prepareUnit = function(unit) {
                unit.description = $sce.trustAsHtml(unit.description);                              // Sanitize description html
                let pictureUrl = 'http://mars.theblueground.net' + unit.pictures[0].slice(0, -9);   // Remove last part from image urls (e.g -w200.jpg)
                unit.picturesUrl = {                    // Store image urls in object with sizes as keys
                    small: pictureUrl + '-w200.jpg',
                    medium: pictureUrl + '-w400.jpg',
                    large: pictureUrl + '-w800.jpg'
                };
                unit.amenitiesStr = unit.amenities.join(', ');        // Convert amenities array to comma seperated sting
                let allYears = Array.from(Array(10).keys());           // Create array with all year options (2081-2090)
                unit.allYearOptions = allYears.map(function(year) { return year + 2081; });
                return unit;
            };

            $scope.getNumber = function(number) {       // Helper function used in ng-repeat to repeat certain number of times
                return new Array(number);
            };

            $scope.selectYear = function(year) {        // Select year to book
                $scope.selectedYear = year;
                $scope.displayNoYearMsg = false;
            };

            $scope.book = function(unitId, year) {
                if ($scope.selectedYear) {              // Check if year is selected
                    unitsService.bookUnit(unitId, year).then(function(response) {
                        $scope.onSuccess({data:response.data});
                        $('#bookModal').modal('hide');
                    })
                    .catch(function(error) {
                        $scope.displayErrorMsg = true;
                    });
                } else {
                    $scope.displayNoYearMsg = true;
                }
            };

            $('#bookModal').on('hide.bs.modal', function() {      // On modal close reset all variables
                $scope.unit = {};
                $scope.selectedYear = null;
                $scope.displayNoYearMsg = false;
                $scope.displayErrorMsg = false;
            });

        }
    };
});
