app.factory('userPoll', ['$http', function($http) {
    return $http.get('')
        .success(function(data) {
            return data;
        })
        .error(function(data) {
            return data;
        })
}]);