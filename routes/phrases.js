'use strict'

/**
 * The place for all routes phrase-related.
 */

var express = require( 'express' ),
    router = express.Router();

// GETs
function getPhrase( req, res ) {

    /**
     * TODO: flesh out this stub
     */
    res.send( {
        _id: req.params.id,
        noun: 'AJAX',
        verb: 'leverage',
        adjective: 'RESTful',
        string: 'leverage the RESTful AJAX',
        format: '{{ verb }} the {{ adjective }} {{ noun }}'
    } );

}

// set paths on the router object
router.get( '/', getPhrase );

module.exports = router;