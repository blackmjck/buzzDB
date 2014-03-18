/**
 * Random GET
 */
var mongo = require('mongodb'),
    MongoClient = mongo.MongoClient,
    mongourl = require('./creds').connect_url;



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


// Do the search
dbconnect( function( db ) {

    var collection = db.collection('words'),
        rand = Math.random();

    console.log( "Attempting a random single VERB find gte/lte " + rand );

    collection.find({ rand: { $gte: rand }, verb: { $exists: true } }, { sort: [ [ 'rand', 1 ] ], limit: 1 }).toArray( function( err, docs ) {

        if( !docs.length ) {

            collection.find({ rand: { $lte: rand }, verb: { $exists: true } }, { sort: [ [ 'rand', 1 ] ], limit: 1 }).toArray( function( err, docs ) {

                console.log( '(LTE)', docs[ 0 ] );

                db.close();

            });

        } else {

            console.log( '(GTE)', docs[ 0 ] );

            db.close();

        }

    });

});
