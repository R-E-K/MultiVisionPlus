(function() {
    'use strict';

    angular.module('app')
        .controller('mvMainCtrl', function ($scope, mvCachedCourses) {

            var vm = this;

            // On utilise le cache plutôt que de requêter à chaque fois
            vm.courses = mvCachedCourses.query();
        });
})();