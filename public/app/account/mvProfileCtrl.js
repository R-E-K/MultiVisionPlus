(function() {
    'use strict';

    angular.module('app')
        .controller('mvProfileCtrl', function ($scope, mvAuth, mvIdentity, mvNotifier) {

            var vm = this;

            vm.email = mvIdentity.currentUser.username;
            vm.fname = mvIdentity.currentUser.firstName;
            vm.lname = mvIdentity.currentUser.lastName;

            vm.update = function () {
                var newUserData = {
                    username: vm.email,
                    firstName: vm.fname,
                    lastName: vm.lname
                };

                // Si l'utilisateur a rentré un nouveau mot de passe
                if (vm.password && vm.password.length > 0) {
                    newUserData.password = vm.password;
                }

                mvAuth.updateCurrentUser(newUserData).then(function () {
                    mvNotifier.notify('Your account has been updated');
                }, function (reason) {
                    mvNotifier.error(reason);
                });
            };
        });
})();