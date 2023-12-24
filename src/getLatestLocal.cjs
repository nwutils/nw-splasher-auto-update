'use strict';

/**
 * @file Checks the most recent local version of the app
 */

const fs = require('fs');

const { OPTIONS } = require('../api-type-definitions.cjs');

const { EXTRACTS_LOCATION } = require('./constants.cjs');
const helpers = require('./helpers.cjs');

/**
 * Checks the previously downloaded app versions to find
 * the most recenter version number. If no local versions
 * are found, returns false.
 *
 * @param  {OPTIONS} options  User's validated options
 * @return {string}           The most recent local version number, or false
 */
async function getLatestLocal (options) {
  console.log('The getLatestLocal function is a stub and needs implemented');

  let latestLocal = '0.0.0';

  if (fs.existsSync(EXTRACTS_LOCATION)) {
    console.log(fs.readdirSync(EXTRACTS_LOCATION));
  }

  if (latestLocal) {
    return latestLocal;
  } else {
    let error;
    helpers.throwError(options, 'Error getting latest local version number', error);
  }
  return false;
};

module.exports = getLatestLocal;
