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
        controller: function($scope) {

            $scope.$watch('unitId', function(unitId) {     // Trigger on selectedUnitId change
                $scope.unit = {};

                if (unitId) {
                    $scope.getUnit(unitId).then(function(response) {
                        $scope.unit = response.data;

                        let pictureUrl = 'http://mars.theblueground.net' + $scope.unit.pictures[0].slice(0, -9);
                        $scope.unit.picturesUrl = {
                            small: pictureUrl + '-w200.jpg',
                            medium: pictureUrl + '-w400.jpg',
                            large: pictureUrl + '-w800.jpg'
                        }
                        console.log($scope.unit);
                    })
                }
            }, true);

        }
    };
});
