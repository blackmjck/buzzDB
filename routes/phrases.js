/**
 * The place for all routes phrase-related.
 */

// GETs
exports.getPhrase = function( req, res ) {

    res.send( {
        _id: req.params.id,
        noun: 'AJAX',
        verb: 'leverage',
        adjective: 'RESTful',
        string: 'leverage the RESTful AJAX',
        format: '{{ verb }} the {{ adjective }} {{ noun }}'
    } );

};