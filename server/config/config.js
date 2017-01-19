(function() {
    'use strict';

    var path = require('path');
    var rootPath = path.normalize(__dirname + '/../../');
    var bluebird = require('bluebird');

//noinspection JSUnresolvedVariable
    module.exports = {
        developpement: {
            db: 'mongodb://localhost/multivisionplus',
            rootPath: rootPath,
            port: process.env.PORT || 3030,
            options: {
                promiseLibrary: bluebird
            }

        },
        production: {
            db: process.env.MONGODB_URI,
            rootPath: rootPath,
            port: process.env.PORT || 80,
            options: {
                promiseLibrary: bluebird
            }
        }
    };

})();