'use strict';

/**
 * The place for all routes type-related.
 */

var express = require( 'express' ),
    routerSingle = express.Router(),
    routerAll = express.Router(),
    valid = require( './fn/valid' );

// GETs
function getAllTypes( req, res ) {

    connector.query( 'types', {}, {}, function( results ) {
        res.send( results );
    });

}
function getType( req, res ) {

    // TODO: flesh out this stub with real functionality
    res.send( {
        _id: req.params.id,
        type: 'I.T.'
    } );

}

// POSTs
function createType( req, res ) {

    // TODO: flesh out this stub with real functionality
    res.send( {
        _id: 246852,
        status: 'CREATED',
        url: '/type/246852'
    } );

}

// PUTs
function updateType( req, res ) {

    // TODO: flesh out this stub with real functionality
    res.send( {
        _id: req.params.id,
        status: 'UPDATED'
    } );

}

// DELETEs
function deleteType( req, res ) {

    // TODO: flesh out this stub with real functionality
    res.send( {
        _id: req.params.id,
        status: 'DELETED'
    } );

}


/**
 * '/types' path endpoints
 */
routerAll.get( '/', getAllTypes );

/**
 * '/type' path endpoints
 */
routerSingle.get( '/:id', [ valid.checkID ], getType );
// The POSTs (require auth)
routerSingle.post( '/', [ valid.detectJSON ], createType );
// The PUTs (require auth)
routerSingle.put( '/:id', [ valid.checkID, valid.detectJSON ], updateType );
// The DELETEs (require auth)
routerSingle.delete( '/:id', [ valid.checkID ], deleteType );


/**
 * Expose both sets of endpoints
 */
module.exports = {
    all: routerAll,
    single: routerSingle
};