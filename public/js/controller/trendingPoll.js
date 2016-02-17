app.controller('myPoll', ['$http', 'trending', '$scope', function($http, $scope, trending) {
    trending.success(function(data) {
        $scope.trending = data;
    })
}]);