'use strict';

/**
 * @file Checks the most recent local version of the app
 */

const { OPTIONS } = require('../api-type-definitions.js');

const helpers = require('./helpers.js');

/**
 *
 *
 * @param  {OPTIONS} options  User's validated options
 * @return {Promise}          .
 */
async function getLatestLocal (options) {
  return new Promise((resolve, reject) => {
    let latestLocal = '0.0.0';
    if (latestLocal) {
      resolve(latestLocal);
    } else {
      helpers.throwError(options, 'Error getting latest local version number', error);
      reject();
    }
  });
};

module.exports = getLatestLocal;
