'use strict';

/**
 * Bingo card methodology
 */

/**
 * @name getCard
 * @description
 * Trigger the random generation of a bingo card and return it as a PDF via download
 */
function getCard() {
    
}

/**
 * @name getCardById
 * @param {String} id  MD5 hash string id
 * @description
 * Looks up an existing saved bingo card via its ID and returns it as a download or a 404
 * if the ID is invalid or missing
 */
function getCardById( id ) {}

module.exports = {
    getCard: getCard,
    getCardById: getCardById
};