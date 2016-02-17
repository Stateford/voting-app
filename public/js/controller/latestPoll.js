app.controller('latestPoll', ['$http', 'latest', '$scope', function($http, $scope, latest) {
    latest.success(function(data) {
        $scope.latest = data;
    })
}]);