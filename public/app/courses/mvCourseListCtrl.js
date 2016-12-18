(function() {
    'use strict';

    angular.module('app')
        .controller('mvCourseListCtrl', function ($scope, mvCachedCourses) {

            var vm = this;

            vm.courses = mvCachedCourses.query();

            vm.sortOptions = [
                {
                    value: "title",
                    text: "Sort by title"
                },
                {
                    value: "published",
                    text: "Sort by publish date"
                }
            ];

            vm.sortOrder = vm.sortOptions[0].value;
        });
})();