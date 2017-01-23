(function () {
    'use strict';

    angular.module('app')
        .controller('mvUpdateUserRolesCtrl', function ($scope, $routeParams, AdminUserService, mvUser, userRolesEnum, mvNotifier) {

            var vm = this;
            vm.user = {};
            vm.roles = [];
            vm.update = update;

            (function init() {
                getUser();
            })();

            function getUser() {
                mvUser.get({id: $routeParams.id}).$promise.then(function(user) {
                    vm.user = user;
                }).then(function() {
                    getRolesCheckable();
                }).catch(function(error) {
                    console.log(error);
                });
            }

            function getRolesCheckable() {
                angular.forEach(userRolesEnum, function(role) {
                    var checkedBox = vm.user.roles.indexOf(role) > -1;
                    vm.roles.push({
                        name: role,
                        checked: checkedBox
                    });
                });
            }

            function update() {
                var checkedRoles = [];
                angular.forEach(vm.roles, function(role) {
                    if (role.checked) {
                        checkedRoles.push(role.name);
                    }
                });

                AdminUserService.updateUserRoles($routeParams.id, checkedRoles)
                    .then(function(success) {
                    mvNotifier.notify("Roles updated");
                }, function(error) {
                    mvNotifier.error(error);
                });
            }

        });

})();