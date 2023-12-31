'use strict';

/**
 * @file Used for manually testing the code
 */

const semver = require('semver');

const library = require('../index.cjs');

/**
 * Manual testing.
 */
function manualTesting () {
  let options = {
    autoUpdate: {
      versionUrl: 'https://api.github.com/repos/scout-app/scout-app/releases',
      confirmNewVersion: function (response, latestLocal) {
        response = JSON.parse(response);
        const latestRemote = response.latest.version;
        const updateAvailable = semver.gt(latestRemote, latestLocal);
        if (updateAvailable) {
          return latestRemote;
        }
        return false;
      },
      downloadPath: function (response) {
        console.log(response);
        response = JSON.parse(response);
        return response.latest.downloadUrl;
      }
    }
  };

  options = {
    // OPTIONAL: defaults to true
    verbose: true,
    splasher: {
      /**
       * The websocket port the splash screen window listens on. When your main app window
       * loads, it will use the same port to signal the splash screen to close itself.
       */
      port: 4443,
      /**
       * Time in ms to wait after the new window is launched before auto-closing
       * splash screen if a signal is not recieved to close sooner. Send -1 to
       * only close if signaled via the websocket port.
       */
      closeSplashAfter: 3000
    },
    autoUpdate: {
      /**
       * NW.js Splasher Auto Update will make a network request to the versionUrl,
       * then pass the response into the confirmNewVersion and downloadPath
       * callback functions you provide.
       */
      // This is an example, you can put whatever URL you want here
      versionUrl: 'https://api.github.com/repos/scout-app/scout-app/releases',
      /**
       * Check if the latest remote version is newer than the latest local version.
       * If a new version is available, return the new version number to begin the
       * download/extract. If no new version exists, then return false and the latest
       * local version will be opened in a new window and the splash screen closed.
       *
       * @param  {string} response     The network respone from versionUrl
       * @param  {string} latestLocal  The latest downloaded version, or undefined if not present
       * @return {string}              The new version number (continue to download zip), or false (open current version)
       */
      confirmNewVersion: function (response, latestLocal) {
        console.log('confirmNewVersion');
        const latestRemote = response.data[0].tag_name.replace('v', '');
        const updateAvailable = semver.gt(latestRemote, latestLocal);
        if (updateAvailable) {
          return latestRemote;
        }
        return false;
      },
      /**
       * Called after hitting the versionUrl with the response.
       * Must return a url to a ZIP file to be downloaded/extracted.
       *
       * @param  {string} response  The response body from the network request
       * @return {string}           A url to a ZIP file to be downloaded
       */
      downloadPath: function (response) {
        return response.data[0].zipball_url;
      },
      // If the download or extract fails, we will retry n times before stopping
      downloadRetries: 3,
      extractRetries: 3,
      /**
       * Called when an update occurs during download/extract.
       *
       * @param {object} update                   Object containing percents
       * @param {object} update.downloadProgress  The download progress percent
       * @param {number} update.extractProgress   The extract progress percent
       */
      onUpdate: function ({ downloadProgress, extractProgress }) {
        console.log('onUpdate');
        // This is just an example, you can put any logic you want here
        if (downloadProgress) {
          console.log('Download progress:', downloadProgress);
        }
        if (extractProgress) {
          console.log('Unzipping: ' + extractProgress + '%');
        }
      },
      /**
       * Optional function. You can run any code to validate
       * that the downloaded zip matches expecations.
       * If it does return true. If you return false, then
       * nwSplasherAutoUpdate will retry or stop running.
       *
       * @param  {string}  pathToZip  File path to the downloaded zip file
       * @return {boolean}            true = continue, false = retry/stop
       */
      validateZip: function (pathToZip) {
        console.log('validateZip', pathToZip);
        // This is just an example, you can put any logic you want here
        return true;
      },
      /**
       * Optional function. You can run any code to validate
       * that the files extracted from the zip match your
       * expecations. If they do return true. If you return false,
       * then nwSplasherAutoUpdate will retry or stop running.
       *
       * @param  {string}  pathToExtract  File path to the downloaded zip file
       * @return {boolean}                true = continue, false = retry/stop
       */
      validateExtract: function (pathToExtract) {
        console.log('validateExtract', pathToExtract);
        // This is just an example, you can put any logic you want here
        return true;
      },
      /**
       * When download or extract fails, but we haven't
       * exhausted all retries yet, this is called.
       *
       * @param {string} message  Human readable warning message
       */
      onRetry: function (message) {
        // This is just an example, you can put any logic you want here
        console.log('onRetry', message);
      },
      /**
       * Called when an error is encountered that ended execution
       * prematurely. Such as failing to download or extract after
       * all retries were exhausted.
       *
       * @param {string} errorMessage  Human readable error message
       * @param {object} error         Detailed error information if available
       */
      onError: function (errorMessage, error) {
        // This is just an example, you can put any logic you want here
        console.log('onError', errorMessage, error);
      },
      /**
       * Called just prior to opening the new window
       * and closing the splash screen.
       */
      onComplete: function () {
        console.log('onComplete');
      }
    },
    newWindow: {
      // The file from the extracted zip to load in the new window
      entry: 'index.html',
      // Any NW.js window subfield options: docs.nwjs.io/en/latest/References/Manifest%20Format/#window-subfields
      window: {
        min_width: 400,
        min_height: 250
      }
    }
  };


  library.downloadLatestAppAndOpenWindowInBackground(options);
}

module.exports = {
  manualTesting
};
