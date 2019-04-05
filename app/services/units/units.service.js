angular.module('bgmarsApp')
.factory('unitsService', function($rootScope, $http) {

    let unitsService = {};

    unitsService.listUnits = function(page=null, perPage=null, query=null) {
        let endpoint = '/units';
        let parameters = {};
        if (page) {
            parameters.page = page;
        }
        if (perPage) {
            parameters.perPage = perPage;
        }
        if (query) {
            parameters.q = query;
        }

        return $http({
            method: 'GET',
            url: $rootScope.API + endpoint,
            headers: {
                'Authorization': localStorage.tokenType + ' ' + localStorage.accessToken,
                'Content-Type': 'application/json'
            },
            params: parameters
        });
    };

    unitsService.getUnit = function(unitId) {
        let endpoint = '/units/' + unitId;

        return $http({
            method: 'GET',
            url: $rootScope.API + endpoint,
            headers: {
                'Authorization': localStorage.tokenType + ' ' + localStorage.accessToken,
                'Content-Type': 'application/json'
            }
        });
    };

    unitsService.bookUnit = function(unitId, year) {
        let endpoint = '/units/book';
        let parameters = {
            unitId: unitId,
            year: year
        };

        return $http({
            method: 'POST',
            url: $rootScope.API + endpoint,
            headers: {
                'Authorization': localStorage.tokenType + ' ' + localStorage.accessToken,
                'Content-Type': 'application/json'
            },
            data: parameters
        });
    };

    return unitsService;

});