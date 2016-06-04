'use strict';

var express = require( 'express' ),
    router = express.Router();

/**
 * Bingo card methodology
 */

/**
 * @name getCard
 * @description
 * Trigger the random generation of a bingo card and return it as a PDF (via res.download?)
 */
function getCard() {

    // TODO: query for random card and return as PDF

}

/**
 * @name getCardById
 * @param {String} id  MD5 hash string id
 * @description
 * Looks up an existing saved bingo card via its ID and returns it as a download or a 404
 * if the ID is invalid or missing
 */
function getCardById( id ) {

    // TODO: query for card by ID

}

// set paths on the router object
router.get( '/', getCard );
router.get( '/:id', getCardById );

module.exports = router;