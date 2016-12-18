(function() {
    'use strict';

    var path = require('path');
    var rootPath = path.normalize(__dirname + '/../../');
//noinspection JSUnresolvedVariable
    module.exports = {
        developpement: {
            db: 'mongodb://localhost/multivisionplus',
            rootPath: rootPath,
            port: process.env.PORT || 3030
        },
        production: {
            db: process.env.MONGODB_URI,
            rootPath: rootPath,
            port: process.env.PORT || 80
        }
    };

})();