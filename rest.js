/**
 * Helper functions for the RESTful API output
 */


/**
 * Simple response wrapper generator. Takes the payload, wraps it, and dispatches the response.
 * NOTE: MUST BE CALLED IN THE CONTEXT OF THE "res" OBJECT! Otherwise `this` won't work as expected.
 *
 * @param {Number} code  HTTP status code. Default is 200 if not provided
 * @param {String} status  Short status label
 * @param {String} response  Text description of the result or error
 * @param {Array|Object} [payload]  Optional payload to wrap. Defaults to an empty object
 * @param {Array} [options]  Optional additional parameters to attach to the envelope before sending. Array of arrays as in: [[key,val],[key2,val2]]
 */
exports.envelop = function( code, status, response, payload, options ) {

    var code = ( code && code >= 100 ) ? code : 200,
        payload = payload || {},
        result = {},
        options = options || [],
        i = 0;


    result.status = status;
    result.msg = response;
    result.response = payload;


    // tag the number of results being returned
    if( payload instanceof Array ) {
        result.results = payload.length;
    }


    // add any additional params
    if( options ) {

        i = options.length;
        while( i-- ) {
            result[ options[ i ][ 0 ] ] = options[ i ][ 1 ];
        }

    }


    this.status( code ).send( result );

};