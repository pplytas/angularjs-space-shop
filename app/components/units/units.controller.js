angular.module('bgmarsApp')
.controller('unitsController', function($scope, unitsService) {

    $scope.units = [];
    var page = 1;

    $scope.getNumber = function(number) {
        return new Array(number);
    }

    unitsService.getUnits(page, 10).then(function(response) {
        $scope.units = response.data.data;
    });

});
