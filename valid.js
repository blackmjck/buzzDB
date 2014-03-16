/**
 * Custom validation utilities
 */

var generic = require('./routes/generic');


/**
 * Checks a string as a valid MongoDB ObjectID (24 character hex)
 *
 * @param id  The string to test
 * @returns {Boolean}
 */
var testID = function( id ) {

    return /^[0-9a-f]{24}$/i.test( id );

}


/**
 * Common middleware function to test the passed ID parameter as valid MongoDB ObjectID
 *
 * @param req
 * @param res
 * @param next
 */
var checkID = function( req, res, next ) {

    var id = req.params.id;

    if( testID( id ) ) {

        next();

    } else {

        generic.genericError( req, res, 400, 'MALFORMED', 'The ID must be a string of 24 hex characters.', {} );

    }

};


/**
 * Checks the Content-Type header for JSON type
 *
 * @param req
 * @param res
 * @param next
 */
var detectJSON = function( req, res, next ) {

    var type = req.get('content-type');

    if( !type ) type = req.get('Content-Type');

    console.log( type );

    if( /application.json/i.test( type ) ) {

        next();

    } else {

        generic.genericError( req, res, 415, 'WRONGTYPE', 'The message body must have a Content-Type of "application/json" to be accepted.', { invalid_type: type } );

    }

};


/**
 * Checks the sender's Accept header for JSON
 *
 * @param req
 * @param res
 * @param next
 */
var takesJSON = function( req, res, next ) {

    if( req.accepts('json') ) {

        next();

    } else {

        var accepts = req.get('Accepts');

        if( !accepts ) accepts = req.get('accepts');

        generic.genericError( req, res, 406, 'CANTRETURN', 'The recipient must be able to accept JSON content.', { accepts_currently: accepts } );

    }

};


exports.testID = testID;
exports.checkID = checkID;
exports.detectJSON = detectJSON;
exports.takesJSON = takesJSON;