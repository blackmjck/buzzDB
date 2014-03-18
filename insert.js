var master = require('./buzzwords'),
    mongo = require('mongodb'),
    MongoClient = mongo.MongoClient,
    mongourl = require('./creds').connect_url,
    BSON = mongo.BSONPure,
    list = master.words,
    n = list.length;



/**
 * Mongo connector wrapper
 *
 * @param {Function} operation  Callback to be called on successful connection (receives the database object as its sole argument)
 * @param {Function} [failure]  Optional callback to be called on failed connection
 */
var dbconnect = function( operation ) {

    var failure;

    if( arguments.length > 1 && typeof arguments[ 1 ] === 'function' ) {
        failure = arguments[ 1 ];
    }

    MongoClient.connect( mongourl, function( err, db ) {

        if( err ) {

            console.log( 'MongoHQ connection failed.', err );

            if( failure ) {

                failure( err );

            } else {

                throw ( err );

            }

        } else {

            operation( db );

        }

    });

};




while( n-- ) {
    list[ n ].rand = Math.random();
}


dbconnect( function( db ) {

    var collection = db.collection('words');

    collection.insert( master.words, { safe: true }, function( err, result ) {

        db.close();

        console.log( result );

    });

});