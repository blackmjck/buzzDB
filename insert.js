var master = require('./buzzwords'),
    mongo = require('mongodb'),
    Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, { auto_reconnect: true }),
    db = new Db('buzz', server),
    list = master.words,
    n = list.length;


while( n-- ) {
    list[ n ].rand = Math.random();
}


db.open( function( err, db ) {

    if( !err ) {

        db.collection('words', function( err, collection ) {

            collection.insert( master.words, { safe: true }, function( err, result ) {

                db.close();

                console.log( result );

            });

        });

    } else {

        db.close();

        console.log('MongoDB connection failed.');

    }

});