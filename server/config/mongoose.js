var mongoose = require('mongoose');
var userModel = require('../models/User');
var courseModel = require('../models/Course');

module.exports = function(config) {
    mongoose.connect(config.db);

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('multivision db opened');
    });

    // Création de données de départ
    // (Histoire de ne pas avoir une application vide de contenu)
    userModel.createDefaultUsers();
    courseModel.createDefaultCourses();

};