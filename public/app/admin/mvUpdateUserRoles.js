(function () {
    'use strict';

    angular.module('app')
        .controller('mvUpdateUserRolesCtrl', function ($scope, $routeParams, mvUser, userRolesEnum) {

            var vm = this;
            vm.roles = userRolesEnum;
            vm.update = update;

            getUser();

            function getUser() {
                mvUser.get({id: $routeParams.id}).$promise.then(function(user) {
                    vm.user = user;
                    console.log(user);
                }).catch(function(error) {
                    console.log(error);
                });

            }

            function update() {
                // TODO
            }

        });

})();