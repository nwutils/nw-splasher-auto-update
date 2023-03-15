/**
 * @file    Entry point for the library. Exposes the external facing function that accepts the input defined in the API documentation.
 * @author  TheJaredWilcurt
 */
'use strict';

const validation = require('./src/validation.js');

const nwSplasherAutoUpdate = {
  downloadLatestAppAndOpenWindowInBackground: function (options) {
    options = validation.validateOptions(options);
    options = {
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
         * then pass the response into this callback function for you to use to provide
         * the URL to download the latest version.
         */
        versionUrl: 'https://example.com/versions.json',
        /**
         * Check if the latest remote version is newer than the latest local version.
         * If a new version is available, return the new version number to begin the
         * download/extract. If no new version exists, then return false and the latest
         * local version will be opened in a new window and the splash screen closed.
         *
         * @param  {string}  response     The network respone from versionUrl
         * @param  {string}  latestLocal  The latest downloaded version, or undefined if not present
         * @return {string}               The new version number (continue to download zip), or false (open current version)
         */
        confirmNewVersion: function (response, latestLocal) {
          response = JSON.parse(response);
          const latestRemote = response.latest.version;
          const updateAvailable = require('semver').gt(latestRemote, latestLocal);
          if (updateAvailable) {
            return latestRemote;
          }
          return false;
        },
        /**
         * Called after hitting the versionUrl with the response.
         * Must return a url to a ZIP file to be downloaded/extracted
         *
         * @param  {string} response  The response body from the network request
         * @return {string}           A url to a ZIP file to be downloaded
         */
        downloadPath: function (response) {
          response = JSON.parse(response);
          return response.latest.downloadUrl;
        },
        // If the download or extract fails, we will retry n times before stopping
        downloadRetries: 3,
        extractRetries: 3,
        /**
         * Called when an update occurs during download/extract.
         *
         * @param  {object} update                   Object containing percents
         * @param  {number} update.downloadProgress  The download progress percent
         * @param  {number} update.extractProgress   The extract progress percent
         */
        onUpdate: function ({ downloadProgress, extractProgress }) {
          if (downloadProgress) {
            console.log('Download progress: ' + downloadProgress + '%');
          }
          if (extractProgress) {
            console.log('Unzipping: ' + downloadProgress + '%');
          }
        },
        /**
         * Optional function. You can run any code to validate
         * that the downloaded zip matches expecations.
         * If it does return true. If you return false, then
         * nwSplasherAutoUpdate will retry or stop running.
         *
         * @param  {string}  pathToZip  File path to the downloaded zip file
         * @return {Boolean}            true = continue, false = retry/stop
         */
        validateZip: function (pathToZip) {
          return true;
        },
        /**
         * Optional function. You can run any code to validate
         * that the files extracted from the zip match your
         * expecations. If they do return true. If you return false,
         * then nwSplasherAutoUpdate will retry or stop running.
         *
         * @param  {string}  pathToExtract  File path to the downloaded zip file
         * @return {Boolean}                true = continue, false = retry/stop
         */
        validateExtract: function (pathToExtract) {
          return true;
        },
        /**
         * When download or extract fails, but we haven't
         * exhausted all retries yet, this is called.
         *
         * @param {string} message  Human readable warning message
         */
        onRetry: function (message) {
          console.log(message);
        }
        /**
         * Called when an error is encountered that ended execution
         * prematurely. Such as failing to download or extract after
         * all retries were exhausted.
         *
         * @param {string} errorMessage  Human readable error message
         * @param {object} err           Detailed error information if available
         */
        onError: function (errorMessage, err) {
          console.log(errorMessage, err);
        },
        /**
         * Called just prior to opening the new window
         * and closing the splash screen.
         */
        onComplete: function () {
          console.log('Finished');
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
  },
  setCurrentWorkingDirectory: function () {},
  closeSplashAndShowApp: function (options) {
    options = {
      // Must match the port number used in the splash.html
      port: 4443
    };
  }
};


module.exports = nwSplasherAutoUpdate;
