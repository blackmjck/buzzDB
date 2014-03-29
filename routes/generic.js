/**
 * Bits and bobs. Largely for erroneous route handling.
 */

var REST = require( '../rest'),
    fs = require('fs'),
    md = require('marked');


/**
 * Generic home page
 *
 * @param req
 * @param res
 */
var home = function( req, res ) {

    fs.readFile( 'README.md', { encoding: 'utf8' }, function( err, data ) {

        if(err) throw err;

        md.setOptions({
            gfm: true,
            tables: true,
            breaks: true,
            sanitize: true,
            smartLists: true,
            smartypants: true,
            highlight: function ( code ) {
                return require('highlight.js').highlightAuto(code).value;
            }
        });

        var md_text = md( data );

        res.set('Content-Type', 'text/html');
        res.render( 'home.ejs', { contents: md_text } );

    });

};



/**
 * A truly generic 400 error response
 *
 * @param req
 * @param res
 * @param {Number} code  HTTP status code, generally a 400
 * @param {String} status  Short status code, generally under 10 characters
 * @param {String} message  Lengthier description of the error
 * @param {Object} results  Optional container for any returned data
 */
var genericError = function( req, res, code, status, message, results ) {

    if( !code ) code = 400;

    REST.envelop.call( res, code, status, message, results );

};


/**
 * For bad requests to an endpoint that requires an ID (e.g. PUTs to /word)
 *
 * @param req
 * @param res
 */
var missingID = function( req, res ) {

    genericError( req, res, 400, "BADREQUEST", "Invalid request. Missing ID.", {} );

};


/**
 * For valid calls to missing resources
 *
 * @param req
 * @param res
 * @param {String} message  Lengthier description of the error
 * @param {Object} results  Optional container for any returned data
 */
var missing = function( req, res, message, results ) {

    if( !results ) results = {};

    genericError( req, res, 404, "NOTFOUND", message, results );

};


/**
 * Response to bad verb calls to good endpoints (i.e. trying to POST to a GET-only endpoint)
 *
 * @param req
 * @param res
 */
var badMethod = function( req, res ) {

    var method = req.route.method,
        endpoint = req.route.path,
        acceptable = res.get( 'Accepts' );


    genericError( req, res, 405, "BADMETHOD", "Method " + method.toUpperCase() + " not allowed on endpoint " + endpoint, { method_attempted: method, methods_accepted: acceptable } );

};


exports.genericError = genericError;
exports.missingID = missingID;
exports.missing = missing;
exports.badMethod = badMethod;
exports.home = home;