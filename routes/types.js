/**
 * The place for all routes type-related.
 */

// GETs
exports.getAllTypes = function( req, res ) {

    connector.query( 'types', {}, {}, function( results ) {
        res.send( results );
    });

};
exports.getType = function( req, res ) {

    res.send( {
        _id: req.params.id,
        type: 'I.T.'
    } );

};

// POSTs
exports.createType = function( req, res ) {

    res.send( {
        _id: 246852,
        status: 'CREATED',
        url: '/type/246852'
    } );

};

// PUTs
exports.updateType = function( req, res ) {

    res.send( {
        _id: req.params.id,
        status: 'UPDATED'
    } );

};

// DELETEs
exports.deleteType = function( req, res ) {

    res.send( {
        _id: req.params.id,
        status: 'DELETED'
    } );

};