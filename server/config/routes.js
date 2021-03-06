(function() {
    'use strict';

    var auth = require('./auth');
    var users = require('../controllers/users');
    var courses = require('../controllers/courses');
    var mongoose = require('mongoose');

    var User = mongoose.model('User');

    module.exports = function (app, enums) {

        app.get('/api/users', auth.requiresRole(enums.userRolesEnum.admin), users.getUsers);
        app.get('/api/users/:id', auth.requiresRole(enums.userRolesEnum.admin), users.getUserById);
        app.post('/api/users', users.createUser);
        app.put('/api/users', users.updateUser);
        app.delete('/api/users/:id', auth.requiresRole(enums.userRolesEnum.admin), users.deleteUser);

        app.put('/api/user-roles/:id', auth.requiresRole(enums.userRolesEnum.admin), users.updateUserRole);

        app.get('/api/courses', courses.getCourses);
        app.get('/api/courses/:id', courses.getCourseById);
        app.post('/api/courses', courses.createCourse);
        app.put('/api/courses/:id', courses.updateCourse);
        app.delete('/api/courses/:id', courses.deleteCourse);

        app.get('/partials/*', function (req, res) {
            // Le premier paramètre est égal à ce qu'il y a à la place de l'astérisque
            res.render('../../public/app/' + req.params[0]);
        });

        app.post('/login', auth.authenticate);

        app.post('/logout', function (req, res) {
            req.logout();
            res.end();
        });

        app.all('/api/*', function (req, res) {
            res.send(404);
        });

        app.get('*', function (req, res) {
            res.render('index', {
                bootstrappedUser: req.user
            });
        });
    };

})();