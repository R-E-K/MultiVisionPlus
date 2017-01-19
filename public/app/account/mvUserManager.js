(function () {
    'use strict';

    angular.module('app')
        .factory('mvUserManager', function ($http, mvIdentity, mvUser, $q) {

            return {
                createUser: function (newUserData) {
                    var newUser = new mvUser(newUserData);
                    var dfd = $q.defer();

                    newUser.$save().then(function () {
                        // On logue directement après création du compte
                        mvIdentity.currentUser = newUser;
                        dfd.resolve();
                    }, function (response) {
                        dfd.reject(response.data.reason);
                    });

                    return dfd.promise;
                },

                updateCurrentUser: function (newUserData) {
                    var dfd = $q.defer();

                    // On update pas "currentUser" tant que la sauvegarde n'est pas entièrement correcte
                    // On travaille donc avec une copie pendant la sauvegarde
                    var clone = angular.copy(mvIdentity.currentUser);
                    angular.extend(clone, newUserData);
                    clone.$update().then(function () {
                        mvIdentity.currentUser = clone;
                        dfd.resolve();
                    }, function (response) {
                        dfd.reject(response.data.reason);
                    });

                    return dfd.promise;
                }
            };
        });
})();