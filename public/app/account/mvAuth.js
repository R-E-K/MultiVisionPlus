(function() {
    'use strict';

    angular.module('app')
        .factory('mvAuth', function ($http, mvIdentity, mvUser, $q) {

            return {
                authenticateUser: function (username, password) {
                    var dfd = $q.defer();
                    $http.post('/login', {
                        username: username,
                        password: password
                    }).then(function (response) {
                        if (response && response.data && response.data.success) {
                            var user = new mvUser();
                            angular.extend(user, response.data.user);
                            mvIdentity.currentUser = user;
                            dfd.resolve(true);
                        } else {
                            dfd.resolve(false);
                        }
                    });

                    return dfd.promise;
                },

                logoutUser: function () {
                    var dfd = $q.defer();
                    $http.post('/logout', {
                        logout: true
                    }).then(function () {
                        mvIdentity.currentUser = undefined;
                        dfd.resolve();
                    });

                    return dfd.promise;
                },

                authorizeCurrentUserForRoute: function (role) {
                    if (mvIdentity.isAuthorized(role)) {
                        return true;
                    } else {
                        return $q.reject('not authorized');
                    }
                },

                authorizeAuthenticatedUserForRoute: function () {
                    if (mvIdentity.isAuthenticated()) {
                        return true;
                    } else {
                        return $q.reject('not authorized');
                    }
                }
            };
        });

})();