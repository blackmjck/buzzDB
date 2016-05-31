'use strict';

var pdf = require( 'html-pdf' ),
    fs = require( 'fs' ),
    path = require( 'path' ),
    md5 = require( './lib/md5' ),
    handlebars = require( 'handlebars' ),
    templatePath = path.normalize( __dirname + '/templates/' ),
    outputPath = path.normalize( templatePath + '../pdf/' ),
    source = fs.readFileSync( templatePath + 'card.html' ).toString(),
    template = handlebars.compile( source );

var json = require( './words.json' ).response,
    words = [];

var fileData = {
        hash: '',
        rows: [],
        title: 'BuzzDB Bingo',
        url: 'https://buzzdb.net/bingo/'
    },
    pdfOptions = {
        format: 'Letter'
    };

// extract words, preferring noun over verb over adjective where applicable
json.forEach( function( word ) {
    words.push( word.noun ? word.noun : word.verb ? word.verb : word.adj );
} );

Array.prototype.shuffle = function() {

    var arr = this,
        m = arr.length,
        t,
        i;

    // While there remain elements to shuffle…
    while ( m ) {

        // Pick a remaining element…
        i = Math.floor( Math.random() * m-- );

        // And swap it with the current element.
        t = arr[ m ];
        arr[ m ] = arr[ i ];
        arr[ i ] = t;
    }

    return arr;

};

// generate randomized list of 24 words plus free space in the center
words = words.shuffle().slice( 0, 24 );
words.splice( 12, 0, 'FREE SPACE' );

// generate hash from the word list
fileData.hash = md5( words.join( '' ) );
fileData.url += fileData.hash;

// split into 5 rows of 5 words
for( var i = 0, n = 25; i<n; i += 5 ) {
    fileData.rows.push( words.slice( i, i+5 ) );
}

// create the HTML and convert to PDF
pdf.create( template( fileData, pdfOptions ) ).toFile( outputPath + fileData.hash + '.pdf', function( err, res ) {
    if( err ) throw err;

    console.log( res.filename );
} );
