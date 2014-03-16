/**
 * Bits and bobs. Largely for erroneous route handling.
 */

var REST = require( '../rest' );


/**
 * A truly generic 400 error response
 *
 * @param req
 * @param res
 * @param {String} status  Short status code, generally under 10 characters
 * @param {String} message  Lengthier description of the error
 * @param {Object} results  Optional container for any returned data
 */
exports.genericError = function( req, res, status, message, results ) {

    REST.envelop.call( res, 400, status, message, results );

};