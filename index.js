'use strict';

/**
 * @file Entry point for the library. Exposes the external facing function that
 *       accepts the input defined in the API documentation.
 */

/* eslint-disable */

const { OPTIONS } = require('./api-type-definitions.js');

const validation = require('./src/validation.js');
const getVersionUrl = require('./src/getVersionUrl.js');
const getLatestLocal = require('./src/getLatestLocal.js');

function stub () {}

const nwSplasherAutoUpdate = {
  /**
   * Checks for updates. Downloads zip and extracts it if
   * new version is available. Launches a window pointed
   * to the latest version.
   *
   * @param  {OPTIONS} options  The user's options object
   */
  downloadLatestAppAndOpenWindowInBackground: async function (options) {
    // Validate options
    options = validation.validateDownloadLatestAppAndOpenWindowInBackgroundOptions(options);

    // Get remote version data
    const versionUrlResponse = await getVersionUrl(options);

    // Get latest local
    const latestLocal = await getLatestLocal(options);

    // confirm version
    const latestRemote = await options.autoUpdate.confirmNewVersion(versionUrlResponse, latestLocal);

    console.log({ latestRemote, latestLocal });

    // get download path
    stub();

    // download zip
    stub();

    // validate zip
    stub();

    // extract zip
    stub();

    // validate extraction
    stub();

    // Update/Retry/Error/Complete
    stub();

    // close splash
    stub();

    // open app window
    stub();
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
