var navigation = angular.module('navList', []);

navigation.controller('navCtrl', ['$scope', function($scope) {
    $scope.class = function(page) {
        return page === window.location.pathname ? 'active' : '';
    };
}]);
