(function() {
    'use strict';

    angular.module('app')
        .controller('mvSignupCtrl', function ($scope, mvUser, mvNotifier, $location, mvAuth, mvUserManager) {

            var vm = this;

            vm.signup = function () {
                var newUserData = {
                    username: vm.email,
                    password: vm.password,
                    firstName: vm.fname,
                    lastName: vm.lname
                };

                mvUserManager.createUser(newUserData).then(function () {
                    mvNotifier.notify('User account created');
                    $location.path('/');
                }, function (reason) {
                    mvNotifier.error(reason);
                });
            };

        });
})();