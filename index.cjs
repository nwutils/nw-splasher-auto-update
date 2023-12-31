'use strict';

/**
 * @file Entry point for the library. Exposes the external facing function that
 *       accepts the input defined in the API documentation.
 */

const { OPTIONS } = require('./api-type-definitions.cjs');
const downloadLatestAppAndOpenWindowInBackground = require('./src/downloadLatestAppAndOpenWindowInBackground/index.cjs');

const nwSplasherAutoUpdate = {
  downloadLatestAppAndOpenWindowInBackground,
  /**
   * Sets the current working directory (process.cwd) to the latest downloaded/extracted app version.
   */
  setCurrentWorkingDirectory: function () {
    console.log('This is a stub');
  },
  /**
   * Ran from the new app window. This will tell the splash window to close itself. Then displays the new window.
   *
   * @param {OPTIONS} options  Users options object.
   */
  closeSplashAndShowApp: function (options) {
    options = {
      // Must match the port number used in the splash.html
      port: 4443
    };
    console.log(options);
    console.log('This is a stub');
  },
  /**
   * Deletes past downloaded app versions, leaving the latest in place.
   */
  deletePastVersions: function () {
    console.log('This is a stub');
  }
};

module.exports = nwSplasherAutoUpdate;
