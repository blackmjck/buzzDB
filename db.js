/**
 * Random GET
 */
var mongo = require('mongodb'),
    MongoClient = mongo.MongoClient,
    Db = mongo.Db,
    Server = mongo.Server,
    BSON = mongo.BSONPure,
    assert = require('assert');

var mongoclient = new MongoClient( new Server( "localhost", 27017 ), { native_parser: true } );


mongoclient.open(function( err, mongoclient ) {

    var db = mongoclient.db("buzz"),
        collection = db.collection('words'),
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