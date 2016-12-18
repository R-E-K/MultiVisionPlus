(function() {
    'use strict';

    angular.module('app')
        .factory('mvCourse', function ($resource) {

            return $resource('/api/courses/:_id', {
                _id: "@id"
            }, {
                update: {
                    method: 'PUT',
                    isArray: false
                }
            });
        });
})();