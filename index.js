 var express = require('express'),
     app = express(),
     passport = require('passport'),
     OAuth2Strategy = require('passport-oauth').OAuth2Strategy,
     words = require('./routes/words'),
     types = require('./routes/types'),
     phrases = require('./routes/phrases'),
     generic = require('./routes/generic'),
     valid = require('./valid'),
     APP_PORT = 3555;



 app.configure( function () {
     app.use( express.logger( 'dev' ) );
     // for static files in /public
     app.use(express.static(__dirname + '/public'));
     app.use( express.bodyParser() );
 });


 // Make sure the request can be handled on the return side
 app.all( '*', valid.takesJSON );


 // The GETs
 app.get( '/words', words.getAllWords );
 app.get( '/types', types.getAllTypes );
 app.get( '/word/:id', valid.checkID, words.getWord );
 app.get( '/type/:id', valid.checkID, types.getType );
 app.get( '/phrases', phrases.getPhrase );

 // The POSTs (require auth)
 app.post( '/word', valid.detectJSON, words.createWord );
 app.post( '/type', valid.detectJSON, types.createType );

 // The PUTs (require auth)
 app.put( '/word/:id', [ valid.checkID, valid.detectJSON ], words.updateWord );
 app.put( '/type/:id', [ valid.checkID, valid.detectJSON ], types.updateType );
 app.put( '/word/:wordID/type/:typeID', [ valid.detectJSON ], words.assignType );

 // The DELETEs (require auth)
 app.delete( '/word/:id', valid.checkID, words.deleteWord );
 app.delete( '/type/:id', valid.checkID, types.deleteType );
 app.delete( '/word/:wordID/type/:typeID', words.unassignType );

 // The straight-up ERRORs (most common, that is; we're not trying to predict every bad request)
 app.get( '/word', generic.missingID );
 app.put( '/word', generic.missingID );
 app.delete( '/word', generic.missingID );
 app.get( '/type', generic.missingID );
 app.put( '/type', generic.missingID );
 app.delete( '/type', generic.missingID );
 app.post( '/word/:id', function( req, res ) {
     generic.badMethod( req, res, "GET, PUT, DELETE" );
 });
 app.post( '/type/:id', function( req, res ) {
     generic.badMethod( req, res, "GET, PUT, DELETE" );
 });



 app.listen( APP_PORT, function() {

     console.log( "API started on port " + APP_PORT );

 });