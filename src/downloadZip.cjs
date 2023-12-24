'use strict';

/**
 * @file Checks the most recent local version of the app
 */

const fs = require('fs');

const { OPTIONS } = require('../api-type-definitions.cjs');

const { ZIPS_LOCATION } = require('./constants.cjs');

/**
 * Downloads the zip file to the download location.
 *
 * @param {OPTIONS} options       The user's options object
 * @param {string}  downloadPath  The zip file URL provided by the user
 */
async function downloadZip (options, downloadPath) {
  console.log('The downloadZip function is a stub and needs implemented');
  console.log(downloadPath);
};

module.exports = downloadZip;
