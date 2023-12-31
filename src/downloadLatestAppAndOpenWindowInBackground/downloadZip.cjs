'use strict';

/**
 * @file Checks the most recent local version of the app
 */

const EasyDl = require('easydl');

const {
  DOWNLOADPROGRESS,
  OPTIONS
} = require('../../api-type-definitions.cjs');
const helpers = require('../helpers.cjs');

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
    reportInterval: 1250,
    httpOptions: {
      headers: {
        'User-Agent': 'nw-splasher-auto-update'
      }
    }
  };

  return new EasyDl(downloadUrl, zipFilePath, downloadOptions)
    .on(
      'progress',
      /**
       * Callback for when progress events occur while downloading zip file.
       *
       * @param {DOWNLOADPROGRESS} progress  Details about the progress of the download
       */
      function (progress) {
        options.autoUpdate.onUpdate({ downloadProgress: progress.total });
      }
    )
    .wait()
    .then((completed) => {
      console.log({ completed });
    })
    .catch((error) => {
      console.log({ error });
    });
};

module.exports = downloadZip;
