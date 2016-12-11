angular.module('app')
    .controller('mvMainCtrl', function($scope, mvCachedCourses) {

        // On utilise le cache plutôt que de requêter à chaque fois
        $scope.courses = mvCachedCourses.query();
});