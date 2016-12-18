(function() {
    'use strict';

    var express = require('express');

    // process.env.NODE_ENV permet de savoir si on en Dev/recette/production/etc...
    // On met comme valeur par défaut Dev si la propriété n'est pas définie
    var env = process.env.NODE_ENV = process.env.NODE_ENV || 'developpement';

    var app = express();

    var config = require('./server/config/config')[env];

    require('./server/config/express')(app, config);
    require('./server/config/mongoose')(config);
    require('./server/config/passport')();
    require('./server/config/routes')(app);


    app.listen(config.port);
    console.log('Listening on port ' + config.port + '...');

})();