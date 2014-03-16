/**
 * All things DB-related
 */
var mongo = require('mongodb'),
    MongoClient = mongo.MongoClient,
    Db = mongo.Db,
    Server = mongo.Server,
    BSON = mongo.BSONPure,
    mongoclient = new MongoClient( new Server( "localhost", 27017 ), { native_parser: true }),
    base = "buzz";


/**
 * Array shuffling algorithm.
 * Variant of Mike Bostock's Fisher-Yates Shuffle implementation. Source: http://bost.ocks.org/mike/shuffle/
 *
 * @param {Array} arr  The array to be shuffled
 * @returns {Array} The shuffled array
 */
function shuffle( arr ) {

    var m = arr.length,
        t,
        i;

    // While there remain elements to shuffle…
    while ( m ) {

        // Pick a remaining element…
        i = Math.floor( Math.random() * m-- );

        // And swap it with the current element.
        t = arr[ m ];
        arr[ m ] = arr[ i ];
        arr[ i ] = t;
    }

    return arr;

}


/**
 * Fetches a random single document from the DB
 *
 * @param db  The Mongo database connection
 * @param collection  Reference to the collection within the database
 * @param {Object} query  Query parameters for searching on
 * @param {Object} options  Query options to pass to the DB connector
 * @param {Function} success  Callback to be executed on successful query
 * @param {Function} failure  Callback to be executed on failed operation
 */
function randomSingle( db, collection, query, options, success, failure ) {

    var rand = Math.random();

    console.log( query, options );

    // add the randomizer
    query.rand = { $gte: rand };

    // and the sorter
    options.sort = [ [ 'rand', 1 ] ];
    options.limit = 1;


    collection.find( query, options ).toArray( function( err, docs ) {

        if( err ) {

            db.close();

            failure( err );

        } else if ( !docs.length ) {

            // switch the randomizer
            query.rand = { $lte: rand };

            collection.find( query, options ).toArray( function( err, docs ) {

                db.close();

                if( err ) {

                    failure( err );

                } else {

                    success( docs );

                }

            });

        } else {

            db.close();

            success( docs );

        }

    });



}


/**
 * Fetches multiple random (unique) documents from the DB
 *
 * @param db  The Mongo database connection
 * @param collection  Reference to the collection within the database
 * @param {Object} query  Query parameters for searching on
 * @param {Object} options  Query options to pass to the DB connector
 * @param {Number} limit  Total number of results desired (pass null or undefined for no limit)
 * @param {Function} success  Callback to be executed on successful query
 * @param {Function} failure  Callback to be executed on failed operation
 */
function randomMultiple( db, collection, query, options, limit, success, failure ) {

    console.log( query, options );

    if( options.limit ) delete options.limit;

    collection.find( query, options ).toArray( function( err, docs ) {

        db.close();


        if( err ) {

            if( typeof err === "string" ) err = "Query error: " + err;

            console.log( err );

            failure( err );

        } else {

            // now to randomize the array
            docs = shuffle( docs ).slice( 0, limit );

            // now just return a randomized chunk of the list, limited to the correct number
            success( docs );

        }

    });

}



/**
 * Simple wrapper for the mongoDB.find() operator
 *
 * @param {String} type  Name of the collection to search
 * @param {Object} query  Query selector(s)
 * @param {Object} options  Any search options, e.g. sort, aggregation, etc.
 * @param {Function} success  The callback function to execute on the returned data
 * @param {Function} failure  The callback function to execute on a failed operation
 */
exports.query = function( type, query, options, success, failure ) {


    mongoclient.open(function( err, mongoclient ) {

        var db = mongoclient.db( base ),
            collection = db.collection( type ),
            opts = {};


        /**
         * Keep in mind that the options are for our use, but may not be directly usable by the Mongo connector.
         * So there's a translation step or two.
         */

        // required field(s)
        if( options.required ) {

            var n = options.required.length;
            while( n-- ) {
                if( !query[ options.required[ n ] ] ) {
                    query[ options.required[ n ] ] = {
                        $exists: true,
                        $ne: ""
                    };
                } else {
                    query[ options.required[ n ] ].$exists = true;
                    query[ options.required[ n ] ].$ne = "";
                }

            }

        }


        // limit per-page (and pagination)
        if( options.perPage ) {

            opts.limit = options.perPage;

            if( options.page ) {

                opts.skip = opts.limit * ( options.page - 1 );

            }

        } else if( !options.random ) {

            delete options.page;

        }


        // random v.s. non-random
        if( options.random ) {

            if( options.perPage && options.perPage === 1 ) {

                console.log( 'Random single...' );

                randomSingle( db, collection, query, opts, success, failure );

            } else {

                console.log( 'Random multi... (limit ' + options.perPage + ')' );

                randomMultiple( db, collection, query, opts, options.perPage, success, failure );

            }

        } else {

            if( options.sortBy ) {

                opts.sortBy = options.sortBy;

            }

            console.log( query, opts );


            collection.find( query, opts ).toArray( function( err, docs ) {

                db.close();


                if( err ) {

                    failure( err );

                } else {

                    success( docs );

                }

            });

        }

    });

};


/**
 * Simple wrapper for the mongoDB.findOne() operator
 *
 * @param {String} type  Name of the collection to search
 * @param {String} id  The primary key (_id)
 * @param {Object} options  Any search options, e.g. sort, aggregation, etc.
 * @param {Function} success  The callback function to execute on the returned data
 * @param {Function} failure  The callback function to execute on a failed operation
 */
exports.queryByID = function( type, id, options, success, failure ) {

    return exports.query( type, { _id: new BSON.ObjectID( id ) }, options, success, failure );

};


/**
 * Simple wrapper for the mongoDB.insert() operator
 *
 * @param {String} type  Name of the collection to search
 * @param {Object} item  Item to insert into the DB
 * @param {Function} success  The callback function to execute on the returned data
 * @param {Function} failure  The callback function to execute on a failed operation
 */
exports.insert = function( type, item, success, failure ) {

    mongoclient.open(function( err, mongoclient ) {

        var db = mongoclient.db( base ),
            collection = db.collection( type ),
            options = { safe: true };

        collection.insert( item, options, function( err, result ) {

            db.close();


            if( err ) {

                failure( err );

            } else {

                success( result );

            }

        });

    });

};


/**
 * Simple wrapper for the mongoDB.update() operator
 *
 * @param {String} type  Name of the collection to search
 * @param {String} id  The primary key (_id)
 * @param {Object} item  Item data to replace or insert into the DB
 * @param {Function} success  The callback function to execute on the returned data
 * @param {Function} failure  The callback function to execute on a failed operation
 */
exports.update = function( type, id, item, success, failure ) {

    mongoclient.open(function( err, mongoclient ) {

        var db = mongoclient.db( base ),
            collection = db.collection( type ),
            options = { safe: true },
            changes = { $set: {} },
            key;


        for( key in item ) {

            if( item.hasOwnProperty( key ) ) changes[ '$set' ][ key ] = item[ key ];

        }


        collection.update( { _id: new BSON.ObjectID( id ) }, changes, options, function( err, result ) {

            db.close();


            if( err ) {

                failure( err );

            } else {

                success( result );

            }

        });

    });

};


/**
 * Simple wrapper for the mongoDB.remove() operator
 *
 * @param {String} type  Name of the collection to search
 * @param {String} id  The primary key (_id)
 * @param {Function} success  The callback function to execute post operation
 * @param {Function} failure  The callback function to execute on a failed operation
 */
exports.remove = function( type, id, success, failure ) {

    mongoclient.open(function( err, mongoclient ) {

        var db = mongoclient.db( base ),
            collection = db.collection( type ),
            options = { w: 1 };


        collection.remove( { _id: new BSON.ObjectID( id ) }, options, function( err, num ) {

            db.close();


            if( err ) {

                failure( err );

            } else {

                success( { removed: num } );

            }

        });

    });

};