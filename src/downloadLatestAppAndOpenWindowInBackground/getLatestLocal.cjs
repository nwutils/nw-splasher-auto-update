'use strict';

/**
 * @file Checks the most recent local version of the app
 */

const fs = require('fs');

const semver = require('semver');

const { OPTIONS } = require('../../api-type-definitions.cjs');
const helpers = require('../helpers.cjs');

/**
 * Checks the previously downloaded app versions to find
 * the most recenter version number. If no local versions
 * are found, returns false.
 *
 * @param  {OPTIONS} options  User's validated options
 * @return {string}           The most recent local version number, or false
 */
async function getLatestLocal (options) {
  let latestLocal;
  let error;
  const errorMessage = 'Error getting latest local version number';
  const extractsLocation = helpers.getExtractsLocation();

  try {
    if (fs.existsSync(extractsLocation)) {
      const folders = fs.readdirSync(extractsLocation);
      latestLocal = semver.maxSatisfying(folders, '>=0');
    }
  } catch (err) {
    error = err;
  }

  if (error) {
    helpers.throwError(options, errorMessage, error);
  }

  if (latestLocal) {
    return latestLocal;
  } else if (!error) {
    helpers.throwError(options, errorMessage);
  }
  return false;
};

module.exports = getLatestLocal;
