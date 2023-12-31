'use strict';

/**
 * @file Checks the most recent local version of the app
 */

const EasyDl = require('easydl');

const {
  DOWNLOADPROGRESS,
  OPTIONS
} = require('../api-type-definitions.cjs');

const helpers = require('./helpers.cjs');

/**
 * Downloads the zip file to the download location.
 *
 * @param  {OPTIONS} options       The user's options object
 * @param  {string}  downloadUrl   The zip file URL provided by the user
 * @param  {string}  latestRemote  The latest version number of the app we are downloading
 * @return {Promise}               Returns a promise to await download completion
 */
async function downloadZip (options, downloadUrl, latestRemote) {
  const zipFilePath = helpers.getZipFilePath(latestRemote);
  const downloadOptions = {
    existBehavior: 'overwrite',
    maxRetry: options.autoUpdate.downloadRetries,
    reportInterval: 1250
  };

  return new EasyDl(downloadUrl, zipFilePath, downloadOptions)
    .on(
      'progress',
      /**
       * Callback for when progress events occur while downloading zip file.
       *
       * @param {DOWNLOADPROGRESS} downloadProgress  Details about the progress of the download
       */
      function (downloadProgress) {
        options.autoUpdate.onUpdate({ downloadProgress });
      }
    )
    .wait()
    .then((completed) => {
      console.log('Downloaded?', completed);
    })
    .catch((error) => {
      console.log('[error]', error);
    });
};

module.exports = downloadZip;
