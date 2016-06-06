'use strict';

/**
 * The place for all routes word-related.
 */

var express = require( 'express' ),
    routerAll = express.Router(),
    routerSingle = express.Router(),
    connector = require( '../lib/mongo' ),
    REST = require( './../lib/rest' ),
    generic = require( './fn/generic'),
    valid = require( './fn/valid' ),
    base = 'words';


// GETs
function getAllWords( req, res ) {

    // optional URL params
    var opts = {},
        params = req.params,
        query = req.query;


    // random or nonrandom?
    opts.random = ( params.random || query.random );

    // limit?
    if( params.perPage || query.perPage ) {
        opts.perPage = parseInt( params.perPage, 10 ) || parseInt( query.perPage, 10 );
    }

    // pagination?
    if( params.page || query.page ) {
        opts.page = parseInt( params.page, 10 ) || parseInt( query.page, 10 );
    } else {
        opts.page = 1;
    }

    // required field(s)? Should be passed as a comma-separated string list
    if( params.required ) {
        opts.required = params.required.split(',');
    } else if( query.required ) {
        opts.required = query.required.split(',');
    }


    console.log( opts );


    connector.query( base, {}, opts, function( results ) {

        REST.envelop.call( res, 200, 'RETRIEVED', '', results );

    }, function( err ) {

        REST.envelop.call( res, 500, 'ERROR', 'The server encountered an error', err );

    });

}


function getWord( req, res ) {

    connector.queryByID( base, req.params.id, {}, function( results ) {

        if( results.length ) {

            REST.envelop.call( res, 200, 'RETRIEVED', '', results );

        } else {

            generic.missing( req, res, "Word '" + req.params.id + "' not found.", results );

        }

    }, function( err ) {

        REST.envelop.call( res, 500, 'ERROR', 'The server encountered an error', err );

    });

}


function getType( req, res ) {

    /**
     * TODO: implement getType()
     */

    res.send( {
        _id: '',
        status: '',
        msg: 'Not yet implemented'
    } );

}

// POSTs
function createWord( req, res ) {

    var item = req.body;

    if( !item.rand ) item.rand = Math.random();

    connector.insert( base, item, function( results ) {

        // add the URL for the newly created object, as per REST standard
        var id = results.ops[ 0 ]._id,
            opts = {
                url: '/word/' + id
            };

        REST.envelop.call( res, 201, 'CREATED', 'Item ' + id + ' created.', results, opts );

    }, function( err ) {

        REST.envelop.call( res, 500, 'ERROR', 'The server encountered an error.', err );

    });

}

// PUTs
function updateWord( req, res ) {

    var item = req.body;

    connector.update( base, req.params.id, item, function( results ) {

        REST.envelop.call( res, 200, 'UPDATED', 'Item ' + req.params.id + ' updated.', results );

    }, function( err ) {

        REST.envelop.call( res, 500, 'SERVERERR', 'The server encountered an error.', err );

    });

}


function assignType( req, res ) {

    res.send( {
        _id: '',
        status: '',
        msg: 'Not yet implemented'
    } );

}


// DELETEs
function deleteWord( req, res ) {

    connector.remove( base, req.params.id, function( results ) {

        if( results.removed ) {

            REST.envelop.call( res, 200, 'DELETED', 'Item ' + req.params.id + ' deleted.', results );

        } else {

            REST.envelop.call( res, 200, 'NORESULTS', 'Item already deleted.', results );

        }

    },
    function( err ) {

        REST.envelop.call( res, 500, 'ERROR', 'The server encountered an error.', err );

    });

}


function unassignType( req, res ) {

    res.send( {
        _id: '',
        status: '',
        msg: 'Not yet implemented'
    } );

}


/**
 * '/words' endpoints
 */
routerAll.get( '/', getAllWords );


/**
 * '/word' and '/word/:id/type/:id' endpoints
 */
routerSingle.get( '/:id', [ valid.checkID ], getWord );
routerSingle.get( '/:id/type', [ valid.checkID ], getType );

// The POSTs (require auth)
routerSingle.post( '/', [ valid.detectJSON ], createWord );

// The PUTs (require auth)
routerSingle.put( '/:id', [ valid.checkID, valid.detectJSON ], updateWord );
routerSingle.put( '/:wordID/type/:typeID', [ valid.detectJSON ], assignType );

// The DELETEs (require auth)
routerSingle.delete( '/:id', [ valid.checkID ], deleteWord );
routerSingle.delete( '/:wordID/type/:typeID', unassignType );


/**
 * Expose both sets of endpoints
 */
module.exports = {
    all: routerAll,
    single: routerSingle
};