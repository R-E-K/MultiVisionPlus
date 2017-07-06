(function() {
    'use strict';

    var mongoose = require('mongoose');
    var Course = mongoose.model('Course');

    exports.getCourses = function (req, res) {
        Course.find({}).exec(function (err, collection) {
            res.send(collection);
        });
    };

    exports.getCourseById = function (req, res) {
        Course.findOne({
            _id: req.params.id
        }).exec(function (err, course) {
            res.send(course);
        });
    };

    exports.createCourse = function (req, res) {
        var courseData = req.body;

        Course.create(courseData, function(error, course) {
            if (error) {
                res.status(400);
                return res.send({
                    reason: err.toString()
                });
            }
            res.send(course);
        });
    };

    exports.updateCourse = function (req, res) {
        var updateCourse = req.body;

        req.course.title = updateCourse.title;
        req.course.content = updateCourse.content;
        req.course.featured = updateCourse.featured;
        req.course.published = updateCourse.published;
        req.course.tags = updateCourse.tags;
        req.course.user = updateCourse.user;

        req.course.save(function (err) {
            if (err) {
                res.status(400);
                return res.send({
                    reason: err.toString()
                });
            }

            res.send(req.course);
        });
    };

    exports.deleteCourse = function (req, res) {
        var idCourse = req.params.id;

        Course.findByIdAndRemove(idCourse).exec(function(error) {
            res.send(error);
        });
    };

})();