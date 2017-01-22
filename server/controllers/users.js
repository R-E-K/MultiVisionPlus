(function() {
    'use strict';

    var mongoose = require('mongoose');
    var User = mongoose.model('User');
    var encrypt = require('../utilities/encryption');
    var enums = require('../config/enums');

    exports.getUsers = function (req, res) {
        User.find().exec(function (err, collection) {
            res.send(collection);
        });
    };

    exports.getUserById = function (req, res) {
        User.findOne({
            _id: req.params.id
        }).exec(function (err, user) {
            res.send(user);
        });
    };

    exports.createUser = function (req, res, next) {
        var userData = req.body;
        userData.username = userData.username.toLowerCase();
        userData.salt = encrypt.createSalt();
        userData.hashed_pwd = encrypt.hashPwd(userData.salt, userData.password);
        // Un utilisateur n'a que le droit de lecture par défaut
        userData.roles = [enums.userRolesEnum.reader];

        User.create(userData, function (err, user) {
            if (err) {
                // Si un autre utilisateur à déjà le même username
                // (On formate en message compréhensible)
                if (err.toString().indexOf('E11000') > -1) {
                    err = new Error('Duplicate username');
                }

                res.status(400);
                return res.send({
                    reason: err.toString()
                });
            }
            req.logIn(user, function (err) {
                if (err) {
                    return next(err);
                }
                res.send(user);
            });
        });
    };

    exports.updateUser = function (req, res) {
        var userUpdates = req.body;

        if (req.user._id != userUpdates._id && req.user.hasRole(enums.userRolesEnum.admin)) {
            res.status(403);
            return res.end();
        }

        req.user.firstName = userUpdates.firstName;
        req.user.lastName = userUpdates.lastName;
        req.user.username = userUpdates.username;

        // Mot de passe
        if (userUpdates.password) {
            req.user.password = userUpdates.password;
        }

        if (req.user.password && req.user.password.length > 0) {
            req.user.salt = encrypt.createSalt();
            req.user.hashed_pwd = encrypt.hashPwd(req.user.salt, req.user.password);
        }

        req.user.save(function (err) {
            if (err) {
                res.status(400);
                return res.send({
                    reason: err.toString()
                });
            }

            res.send(req.user);
        });
    };

    exports.updateUserRole = function (req, res) {
        var userUpdates = req.body;

        User.update({
            _id: req.params.id
        },{
            $set: {
                roles: userUpdates.roles
            }
        }).exec(function(err) {
            res.send(err);
        });
    };

})();