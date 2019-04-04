angular.module('bgmarsApp')
.directive('bookModal', function() {
    return {
        restrict: 'E',              // Only matches element name
        scope: {
            modalId: '@modalId',        // One-way text binding
            unitId: '=unitId',          // Two-way model binding
            getUnit: '=getUnitFn',      // Two-way model binding
            bookUnit: '=bookUnitFn',    // Two-way model binding
        },
        templateUrl: 'app/components/book-modal/book-modal.html',
        controller: function($scope, $sce) {

            $scope.selectedYear = null;
            $scope.unit = {};

            $scope.$watch('unitId', function(unitId) {     // Trigger on selectedUnitId change
                if (unitId) {
                    $scope.unit = {};
                    $scope.getUnit(unitId).then(function(response) {
                        $scope.unit = response.data;

                        $scope.unit.description = $sce.trustAsHtml($scope.unit.description);

                        let pictureUrl = 'http://mars.theblueground.net' + $scope.unit.pictures[0].slice(0, -9);
                        $scope.unit.picturesUrl = {
                            small: pictureUrl + '-w200.jpg',
                            medium: pictureUrl + '-w400.jpg',
                            large: pictureUrl + '-w800.jpg'
                        }

                        $scope.unit.amenitiesStr = $scope.unit.amenities.join(', ');

                        let allYears = Array.from(Array(8).keys());
                        $scope.unit.allYears = allYears.map(function(year) { return year + 2080; });

                        console.log($scope.unit);
                    })
                }
            }, true);

            $scope.selectYear = function(year) {
                $scope.selectedYear = year;
            };

            $scope.getNumber = function(number) {
                return new Array(number);
            };

            $scope.book = function(unitId, year) {
                $scope.bookUnit(unitId, year).then(function(response) {
                    $('#' + $scope.modalId).modal('toggle');
                })
            };

        }
    };
});
