'use strict';

/**
 * @file Attempt to extract the contents of the zip file
 */

const _7z = require('7zip-min');

const {
  OPTIONS
} = require('../../api-type-definitions.cjs');
const helpers = require('../helpers.cjs');

/**
 * Extracts the zip file contents, retries in case of failure.
 *
 * @param  {OPTIONS} options       The user's options object
 * @param  {string}  latestRemote  The latest version number of the app we are downloading
 * @return {boolean}               True = successful extract, False = failed to unzip
 */
async function extractZip (options, latestRemote) {
  const zipFilePath = helpers.getZipFilePath(latestRemote);
  const extractFilePath = helpers.getExtractPath(latestRemote);
  const maxRetries = options.autoUpdate.extractRetries;

  let unzippedSuccessfully = false;

  function unpack () {
    return new Promise((resolve, reject) => {
      _7z.unpack(zipFilePath, extractFilePath, (error) => {
        if (error) {
          reject(error);
        } else {
          resolve(true);
        }
      });
    });
  }

  async function unzip (attempts) {
    attempts = attempts || 0;
    try {
      const success = await unpack();
      if (success === true) {
        unzippedSuccessfully = true;
      }
    } catch (error) {
      const lastFailure = attempts === maxRetries;

      if (lastFailure) {
        const message = 'Could not extract contents of zip file';
        const details = {
          attempts,
          error,
          extractFilePath,
          zipFilePath
        };
        if (options.autoUpdate.onError) {
          options.autoUpdate.onError(message, details);
        }
        helpers.throwError(message, details);
      } else {
        unzip(attempts + 1);
      }
    }
  }

  await unzip();

  return unzippedSuccessfully;
};

module.exports = extractZip;
