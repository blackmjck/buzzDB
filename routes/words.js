/**
 * The place for all routes word-related.
 */
var connector = require( '../mongo' ),
    REST = require( '../rest' ),
    base = 'words';


// GETs
exports.getAllWords = function( req, res ) {

    // optional URL params
    var opts = {},
        params = req.params,
        query = req.query;


    // random or nonrandom?
    if( params.random || query.random ) {
        opts.random = true;
    } else {
        opts.random = false;
    }

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

};
exports.getWord = function( req, res ) {

    connector.queryByID( base, req.params.id, {}, function( results ) {

        REST.envelop.call( res, 200, 'RETRIEVED', '', results );

    }, function( err ) {

        REST.envelop.call( res, 500, 'ERROR', 'The server encountered an error', err );

    });

};

// POSTs
exports.createWord = function( req, res ) {

    var item = req.body;

    if( !item.rand ) item.rand = Math.random();

    connector.insert( base, item, function( results ) {

        // add the URL for the newly created object, as per REST standard
        var id = results[ 0 ]._id,
            opts = {
                url: '/word/' + id
            };

        REST.envelop.call( res, 201, 'CREATED', 'Item ' + id + ' created.', results, opts );

    }, function( err ) {

        REST.envelop.call( res, 500, 'ERROR', 'The server encountered an error.', err );

    });

};

// PUTs
exports.updateWord = function( req, res ) {

    var item = req.body;

    connector.update( base, req.params.id, item, function( results ) {

        REST.envelop.call( res, 200, 'UPDATED', 'Item ' + req.params.id + ' updated.', results );

    }, function( err ) {

        REST.envelop.call( res, 500, 'SERVERERR', 'The server encountered an error.', err );

    });

};
exports.assignType = function( req, res ) {

    res.send( {
        _id: '',
        status: '',
        msg: 'Not yet implemented'
    } );

};

// DELETEs
exports.deleteWord = function( req, res ) {

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

};
exports.unassignType = function( req, res ) {

    res.send( {
        _id: '',
        status: '',
        msg: 'Not yet implemented'
    } );

};