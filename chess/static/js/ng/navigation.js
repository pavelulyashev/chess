var navigation = angular.module('navigation', []);

navigation.controller('navController', ['$scope', '$location', function ($scope, $location) {
    $scope.class = function (page) {
        var currentRoute = $location.path().substring(1) || 'home';
        return page === currentRoute ? 'active' : '';
    };
}]);
