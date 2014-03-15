 var express = require('express'),
     app = express(),
     words = require('./routes/words'),
     types = require('./routes/types'),
     phrases = require('./routes/phrases'),
     APP_PORT = 3555;


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

 // The POSTs
 app.post( '/word', words.createWord );
 app.post( '/type', types.createType );

 // The PUTs
 app.put( '/word/:id', words.updateWord );
 app.put( '/type/:id', types.updateType );
 app.put( '/word/:wordID/type/:typeID', words.assignType );

 // The DELETEs
 app.delete( '/word/:id', words.deleteWord );
 app.delete( '/type/:id', types.deleteType );
 app.delete( '/word/:wordID/type/:typeID', words.unassignType );

 // The straight-up ERRORs
 app.get( '/word', function( req, res ) {

     res.send( "Invalid request. Must query on an ID." );

 });


 app.listen( APP_PORT );
 console.log( "API started on port " + APP_PORT );