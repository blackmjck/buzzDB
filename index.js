 var express = require( 'express' ),
     app = express(),
     ejs = require( 'ejs' ),
     words = require( './routes/words' ),
     types = require( './routes/types' ),
     phrases = require( './routes/phrases' ),
     generic = require( './routes/generic' ),
     bingo = require( './routes/bingo' ),
     valid = require( './valid' ),
     APP_PORT = 3555;



 app.configure( function () {
     app.use( express.logger( 'dev' ) );
     // for static files in /public
     app.use( express.static( __dirname + '/public' ) );
     app.set( 'view engine', 'ejs' );
     app.set( 'views',__dirname + '/public/views' );
     app.set( 'view options', { layout:false, root: __dirname + '/public/views' } );
     app.use( express.bodyParser() );
 });


 // Make sure the request can be handled on the return side
 app.all( '*', valid.takesJSON );


 // The splash/home page
 app.get( '/', [ ], generic.home );


 // The GETs
 app.get( '/words', [ ], words.getAllWords );
 app.get( '/types', [ ], types.getAllTypes );
 app.get( '/word/:id', [ valid.checkID ], words.getWord );
 app.get( '/type/:id', [ valid.checkID ], types.getType );
 app.get( '/word/:id/type', [ valid.checkID ], words.getType );
 app.get( '/phrases', [ ], phrases.getPhrase );
 app.get( '/bingo', [ ], bingo.getCard );
 app.get( '/bingo/:id', [ ], bingo.getCardById );

 // The POSTs (require auth)
 app.post( '/word', [ valid.detectJSON ], words.createWord );
 app.post( '/type', [ valid.detectJSON ], types.createType );

 // The PUTs (require auth)
 app.put( '/word/:id', [ valid.checkID, valid.detectJSON ], words.updateWord );
 app.put( '/type/:id', [ valid.checkID, valid.detectJSON ], types.updateType );
 app.put( '/word/:wordID/type/:typeID', [ valid.detectJSON ], words.assignType );

 // The DELETEs (require auth)
 app.delete( '/word/:id', [ valid.checkID ], words.deleteWord );
 app.delete( '/type/:id', [ valid.checkID ], types.deleteType );
 app.delete( '/word/:wordID/type/:typeID', [ ], words.unassignType );



 // The straight-up ERRORs (most common, that is; we're not trying to predict every bad request)
 app.all( '*', [ ], generic.badMethod );



 app.listen( APP_PORT, function() {

     console.log( "API started on port " + APP_PORT );

 });