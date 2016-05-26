'use strict';

var pdf = require( 'html-pdf' ),
    fs = require( 'fs' ),
    path = require( 'path' ),
    handlebars = require( 'handlebars' ),
    templatePath = path.normalize( __dirname + '/templates/' ),
    outputPath = path.normalize( templatePath + '../pdf/' ),
    source = fs.readFileSync( templatePath + 'card.html' ).toString(),
    template = handlebars.compile( source );


