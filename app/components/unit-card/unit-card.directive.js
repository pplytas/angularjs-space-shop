angular.module('bgmarsApp')
.directive('unitCard', function() {
    return {
        restrict: 'E',              // Only matches element name <unit-card></unit-card>
        scope: {
            unit: '=unit',          // Two-way variable binding
            onClick: '&onClickFn'   // Function binding
        },
        templateUrl: 'app/components/unit-card/unit-card.html',
        controller: function($scope, $sce) {

            var prepareUnit = function(unit) {
                unit.description = $sce.trustAsHtml(unit.description);                              // Sanitize description html
                let pictureUrl = 'http://mars.theblueground.net' + unit.pictures[0].slice(0, -9);   // Remove last part from image urls (e.g -w200.jpg)
                unit.picturesUrl = {                    // Store image urls in object with sizes as keys
                    small: pictureUrl + '-w200.jpg',
                    medium: pictureUrl + '-w400.jpg',
                    large: pictureUrl + '-w800.jpg'
                };
                return unit;
            };

            $scope.getNumber = function(number) {       // Helper function used in ng-repeat to repeat certain number of times
                return new Array(number);
            };

            $scope.unit = prepareUnit($scope.unit);

        }
    };
});
