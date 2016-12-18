(function() {
    'use strict';

    angular.module('app')
        .controller('mvUserListCtrl', function ($scope, mvUser) {

            var vm = this;

            vm.users = mvUser.query();
        });
})();