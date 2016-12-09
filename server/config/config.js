var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');
module.exports = {
    developpement: {
        db: 'mongodb://localhost/multivision',
        rootPath: rootPath,
        port: process.env.PORT || 3030
    },
    production: {
        db: 'mongodb://jeames:multivision@ds119568.mlab.com:19568/multivision',
        rootPath: rootPath,
        port: process.env.PORT || 80
    }
};