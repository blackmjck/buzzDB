'use strict';

/**
 * Custom validation utilities
 */

var generic = require( './generic' );


/**
 * Checks a string as a valid MongoDB ObjectID (24 character hex)
 *
 * @param id  The string to test
 * @returns {Boolean}
 */
function testID( id ) {

    return /^[0-9a-f]{24}$/i.test( id );

}


/**
 * Common middleware function to test the passed ID parameter as valid MongoDB ObjectID
 *
 * @param req
 * @param res
 * @param next
 */
function checkID( req, res, next ) {

    var id = req.params.id;

    if( testID( id ) ) {

        next();

    } else {

        generic.genericError( req, res, 400, 'MALFORMED', 'The ID must be a string of 24 hex characters.', {} );

    }

}


/**
 * Checks the Content-Type header for JSON type
 *
 * @param req
 * @param res
 * @param next
 */
function detectJSON( req, res, next ) {

    var type = req.get( 'content-type' );

    if( !type ) {
        type = req.get( 'Content-Type' );
    }

    console.log( type );

    if( /application.json/i.test( type ) ) {

        next();

    } else {

        generic.genericError( req, res, 415, 'WRONGTYPE', 'The message body must have a Content-Type of "application/json" to be accepted.', { invalid_type: type } );

    }

}


/**
 * Checks the sender's Accept header for JSON
 *
 * @param req
 * @param res
 * @param next
 */
function takesJSON( req, res, next ) {

    if( req.accepts( 'json' ) ) {

        next();

    } else {

        var accepts = req.get( 'Accepts' );

        if( !accepts ) {
            accepts = req.get( 'accepts' );
        }

        generic.genericError( req, res, 406, 'CANTRETURN', 'The recipient must be able to accept JSON content.', { accepts_currently: accepts } );

    }

}


module.exports = {
    checkID:    checkID,
    detectJSON: detectJSON,
    takesJSON:  takesJSON,
    testID:     testID
};