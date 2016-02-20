app.factory('userData', ['$http', '$routeParams', function($http, $routeParams) {
    return $http.get('')
        .success(function(data) {
            return data;
        })
        .failure(function(data) {
            return data;
        })
}])
