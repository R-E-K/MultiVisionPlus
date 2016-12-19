(function() {
    'use strict';

    var gulp = require('gulp');
    var exec = require('child_process').exec;
    var nodemon = require('gulp-nodemon');

    var handleRunCommandErrors = function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
    };

    gulp.task('start-app', function () {
        exec("\"C:/Program Files/MongoDB/Server/3.2/bin/mongod\" --dbpath \"D:\\Databases\\MongoDB\"", handleRunCommandErrors);
        nodemon({
            script: 'server.js',
            ext: 'js html',
            env: {
                'NODE_ENV': 'developpement'
            }
        });
    });

})();