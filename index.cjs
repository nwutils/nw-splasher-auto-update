'use strict';

/**
 * @file Entry point for the library. Exposes the external facing function that
 *       accepts the input defined in the API documentation.
 */

/* eslint-disable */

const { OPTIONS } = require('./api-type-definitions.cjs');
const downloadLatestAppAndOpenWindowInBackground = require('./src/downloadLatestAppAndOpenWindowInBackground/index.cjs');

function stub () {}

const nwSplasherAutoUpdate = {
  /**
   * Checks for updates. Downloads zip and extracts it if
   * new version is available. Launches a window pointed
   * to the latest version.
   *
   * @param {OPTIONS} options  The user's options object
   */
  downloadLatestAppAndOpenWindowInBackground,
  setCurrentWorkingDirectory: function () {},
  closeSplashAndShowApp: function (options) {
    options = {
      // Must match the port number used in the splash.html
      port: 4443
    };
  },
  deletePastVersions: function () {
    console.log('This is a stub');
  }
};

module.exports = nwSplasherAutoUpdate;
