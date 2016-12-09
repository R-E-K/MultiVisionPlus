angular.module('app').controller('mvMainCtrl', function($scope) {
    $scope.courses = [
        {name: "test 1", featured: true, published: new Date()},
        {name: "test 2", featured: false, published: new Date()}
    ]
});