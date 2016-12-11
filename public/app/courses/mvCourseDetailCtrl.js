angular.module('app')
    .controller('mvCourseDetailCtrl', function($scope, mvCachedCourses, $routeParams) {

        // On utilise également le cache à cet endroit là
        // Car si l'utilisateur est directement arrivé sur une page de détail
        // sans passer par la page de liste des cours qui initialise le cache
        // alors on ferait une requête en base alors qu'il suffit de chercher
        // l'objet dans le cache
        mvCachedCourses.query().$promise.then(function(collection) {
            collection.forEach(function(course) {
                if (course._id === $routeParams.id) {
                    $scope.course = course;
                }
            })
        });

    });