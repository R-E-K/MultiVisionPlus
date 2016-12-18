(function() {
    'use strict';

    angular.module('app')
        .controller('mvNavBarLoginCtrl', function ($scope, $http, mvNotifier, mvIdentity, mvAuth, $location) {

            var vm = this;

            vm.identity = mvIdentity;

            vm.signin = function (username, password) {
                mvAuth.authenticateUser(username, password)
                    .then(function (success) {
                        if (success) {
                            mvNotifier.notify("Signed in !");
                        } else {
                            mvNotifier.notify("Not signed in !");
                        }

                    });
            };

            vm.signout = function () {
                mvAuth.logoutUser().then(function () {
                    $scope.username = "";
                    $scope.password = "";
                    mvNotifier.notify("Logged out");
                    $location.path('/');
                });
            };
        });
})();