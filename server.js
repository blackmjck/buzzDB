'use strict';

// dependencies
var bodyParser = require( 'body-parser' ),
    favicon = require( 'serve-favicon' ),
    handlebars = require( 'express-handlebars' ),
    express = require( 'express' ),
    app = express(),
    port = process.env.PORT || 3555;

// routing components
var words = require( './routes/words' ),
    types = require( './routes/types' ),
    phrases = require( './routes/phrases' ),
    bingo = require( './routes/bingo' ),
    // routing functions (non route-specific)
    generic = require( './routes/fn/generic' ),
    valid = require( './routes/fn/valid' );

// use Handlebars for our view engine (largely just to present the README static text)
app.engine( '.hbs', handlebars( { defaultLayout: false, extname: '.hbs' } ) );
app.set( 'view engine', '.hbs' );
app.set( 'views', __dirname + '/public/views' );

// serve our favicon
app.use( favicon( __dirname + '/public/media/favicon.ico' ) );

// serve up static files
app.use( express.static( __dirname + '/public' ) );

// Populate the body properly
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: true } ) );


// Make sure the request can be handled on the return side
app.all( '*', valid.takesJSON );


// The splash/home page
app.get( '/', generic.home );


// Individual routing components
app.use( '/bingo', bingo );
app.use( '/phrases', phrases );
app.use( '/type', types.single );
app.use( '/types', types.all );
app.use( '/word', words.single );
app.use( '/words', words.all );


// The straight-up ERRORs (most common, that is; we're not trying to predict every bad request)
app.all( '*', generic.badMethod );


// start 'er up
app.listen( port, function() {
    console.log( 'App listening on port ' + port );
} );