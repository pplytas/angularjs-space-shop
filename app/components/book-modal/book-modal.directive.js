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
                if (unitId) {
                    $scope.getUnit(unitId).then(function(response) {
                    })
                }
            }, true);
        }
    };
});
