// On encapsule la "stricticité" dans une fonction car on ne veut pas que "use strict" soit global
// Si on le met en global, on suppose que TOUT le code javascript est conforme au mode strict
// Ce qui dans la réalité est faux, car les différentes librairies tierces ne sont pas forcément en mode strict
// On fait donc en sorte que seul notre code soit en mode strict et strictement (c'est peu dire...) rien d'autre
// chaque fichier du projet rédigé par moi-même sera donc de la forme suivante :

// Lien intéressant : http://cjihrig.com/blog/javascripts-strict-mode-and-why-you-should-use-it/


/*

 (function() {
    'use strict';

      // code javascript

 })();

 */

(function() {
    'use strict';

    angular.module('app', ['ngResource', 'ngRoute']);

    angular.module('app').config(function($routeProvider, $locationProvider, userRolesEnum) {

        var routeRoleChecks = {
            admin: {
                auth: function (mvAuth) {
                    return mvAuth.authorizeCurrentUserForRoute(userRolesEnum.admin);
                }
            },
            user: {
                auth: function (mvAuth) {
                    return mvAuth.authorizeAuthenticatedUserForRoute();
                }
            }
        };

        $locationProvider.html5Mode(true);
        $routeProvider.when('/',
            {
                templateUrl: '/partials/main/main',
                controller: 'mvMainCtrl',
                controllerAs: 'mainCtrl'
            });

        $routeProvider.when('/admin/users',
            {
                templateUrl: '/partials/admin/user-list',
                controller: 'mvUserListCtrl',
                controllerAs: 'userListCtrl',
                resolve: routeRoleChecks.admin
            });

        $routeProvider.when('/signup',
            {
                templateUrl: '/partials/account/signup',
                controller: 'mvSignupCtrl',
                controllerAs: 'signupCtrl'
            });

        $routeProvider.when('/profile',
            {
                templateUrl: '/partials/account/profile',
                controller: 'mvProfileCtrl',
                controllerAs: 'profileCtrl',
                resolve: routeRoleChecks.user
            });

        $routeProvider.when('/courses',
            {
                templateUrl: '/partials/courses/course-list',
                controller: 'mvCourseListCtrl',
                controllerAs: 'courseListCtrl'
            });

        $routeProvider.when('/courses/:id',
            {
                templateUrl: '/partials/courses/course-details',
                controller: 'mvCourseDetailCtrl',
                controllerAs: 'courseDetailCtrl'
            });
    });

    angular.module('app').run(function($rootScope, $location) {
        $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
            if (rejection === 'not authorized') {
                $location.path('/');
            }
        });
    });

})();