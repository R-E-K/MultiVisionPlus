(function() {
    'use strict';

    angular.module('app')
        .factory('mvUser', function ($resource, userRolesEnum) {
            var UserResource = $resource('/api/users/:id', {
                _id: "@id"
            }, {
                update: {
                    method: 'PUT',
                    isArray: false
                }
            });

            UserResource.prototype.isAdmin = function () {
                return this.roles && this.roles.indexOf(userRolesEnum.admin) > -1;
            };

            return UserResource;
        });
})();