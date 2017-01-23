(function () {
    'use strict';

    angular.module('app')
        .service('AdminUserService', function ($http) {

            return {
                updateUserRoles: updateUserRoles
            };

            function updateUserRoles(idUser, checkedRoles) {
                return $http.put("/api/user-roles/" + idUser, {
                    roles: checkedRoles
                });
            }

        });
})();