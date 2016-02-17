app.controller('myPoll', ['$http', 'userPoll', '$scope', function($http, $scope, userPoll) {
    latest.success(function(data) {
        $scope.userPolls = data;
    })
}]);