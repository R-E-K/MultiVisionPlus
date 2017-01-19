(function() {
    'use strict';

    var mongoose = require('mongoose');
    var userModel = require('../models/User');
    var courseModel = require('../models/Course');
    var bluebird = require('bluebird');

    module.exports = function (config) {
        mongoose.connect(config.db, config.options);
        mongoose.Promise = bluebird;

        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error...'));
        db.once('open', function callback() {
            console.log('multivisionplus db opened');
        });

        // Création de données de départ
        // (Histoire de ne pas avoir une application vide de contenu)
        userModel.createDefaultUsers();
        courseModel.createDefaultCourses();

    };

})();