angular.module('app')
    .factory('mvIdentity', function($window, mvUser) {

        var currentUser;

        if (!!$window.bootstrappedUserObject) {
            currentUser = new mvUser();
            angular.extend(currentUser, $window.bootstrappedUserObject);
        }
        
        return {
            currentUser: currentUser,
            isAuthenticated: function() {
                return !!this.currentUser
            },
            isAuthorized: function(role) {
                return this.currentUser && this.currentUser.roles.indexOf(role) > -1;
            }
        };
        // le "!!" est une sorte de conversion en booléen
        // Il faut voir comme 2 "!" à la suite et non comme une instruction à part entière
        // le premier "!" retourne : est-ce que la variable est non définie ?
        // le deuxième "!" retourne l'inverse : est-ce que la variable est définie ?
});