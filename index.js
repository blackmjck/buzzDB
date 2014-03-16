 var express = require('express'),
     app = express(),
     passport = require('passport'),
     OAuth2Strategy = require('passport-oauth').OAuth2Strategy,
     words = require('./routes/words'),
     types = require('./routes/types'),
     phrases = require('./routes/phrases'),
     generic = require('./routes/generic'),
     APP_PORT = 3555;


 // set up bearer token security measures
 /*
 passport.use( new BearerStrategy(
     function( token, done ) {
         User.findOne( {}, function ( err, user ) {
             if ( err ) { return done( err ); }
             if ( !user ) { return done( null, false ); }
             return done( null, user, { scope: 'read' } );
         });
     }
 ));
 */


 app.configure( function () {
     app.use( express.logger( 'dev' ) );
     app.use( express.bodyParser() );
 });


 // The GETs
 app.get( '/words', words.getAllWords );
 app.get( '/types', types.getAllTypes );
 app.get( '/word/:id', words.getWord );
 app.get( '/type/:id', types.getType );
 app.get( '/phrases', phrases.getPhrase );

 // The POSTs (require auth)
 app.post( '/word', words.createWord );
 app.post( '/type', types.createType );

 // The PUTs (require auth)
 app.put( '/word/:id', words.updateWord );
 app.put( '/type/:id', types.updateType );
 app.put( '/word/:wordID/type/:typeID', words.assignType );

 // The DELETEs (require auth)
 app.delete( '/word/:id', words.deleteWord );
 app.delete( '/type/:id', types.deleteType );
 app.delete( '/word/:wordID/type/:typeID', words.unassignType );

 // The straight-up ERRORs
 app.get( '/word', function( req, res ) {

    generic.genericError( req, res, "BADREQUEST", "Invalid request. Must query on an ID.", {} );

 });
 app.put( '/word', function( req, res ) {

    generic.genericError( req, res, "BADREQUEST", "Invalid request. Must query on an ID.", {} );

 });
 app.delete( '/word', function( req, res ) {

    generic.genericError( req, res, "BADREQUEST", "Invalid request. Must query on an ID.", {} );

 });
 app.get( '/type', function( req, res ) {

    generic.genericError( req, res, "BADREQUEST", "Invalid request. Must query on an ID.", {} );

 });
 app.put( '/type', function( req, res ) {

    generic.genericError( req, res, "BADREQUEST", "Invalid request. Must query on an ID.", {} );

 });
 app.delete( '/type', function( req, res ) {

    generic.genericError( req, res, "BADREQUEST", "Invalid request. Must query on an ID.", {} );

 });


 app.listen( APP_PORT );
 console.log( "API started on port " + APP_PORT );