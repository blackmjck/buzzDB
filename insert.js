var master = require('./buzzwords'),
    mongo = require('mongodb'),
    Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, { auto_reconnect: true }),
    db = new Db('buzz', server);


db.open( function( err, db ) {

    if( !err ) {

        db.collection('words', function( err, collection ) {

            collection.insert( master.words, { safe: true }, function( err, result ) {

                console.log( result );

            });

        });

    } else {

        console.log('MongoDB connection failed.');

    }

});