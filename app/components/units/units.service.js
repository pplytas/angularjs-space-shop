angular.module('bgmarsApp')
.factory('unitsService', function($rootScope, $http) {

    let unitsService = {};

    unitsService.getUnits = function(page=null, perPage=null, query=null) {
        let endpoint = '/units';
        let parameters = {};
        if (page) {
            parameters.page = page;
        }
        if (perPage) {
            parameters.perPage = perPage;
        }
        if (query) {
            parameters.query = query;
        }

        return $http({
            method: 'GET',
            url: $rootScope.API + endpoint,
            headers: {
                'Authorization': localStorage.tokenType + ' ' + localStorage.accessToken
            },
            params: parameters
        });
    };

    return unitsService;

});