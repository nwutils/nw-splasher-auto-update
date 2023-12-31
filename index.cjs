'use strict';

/**
 * @file Entry point for the library. Exposes the external facing function that
 *       accepts the input defined in the API documentation.
 */

/* eslint-disable */

const { OPTIONS } = require('./api-type-definitions.cjs');

const validation = require('./src/validation.cjs');
const getVersionUrl = require('./src/getVersionUrl.cjs');
const getLatestLocal = require('./src/getLatestLocal.cjs');
const downloadZip = require('./src/downloadZip.cjs');

function stub () {}

const nwSplasherAutoUpdate = {
  /**
   * Checks for updates. Downloads zip and extracts it if
   * new version is available. Launches a window pointed
   * to the latest version.
   *
   * @param {OPTIONS} options  The user's options object
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

    if (!latestRemote) {
      return;
    }

    // get download path
    const downloadPath = await options.autoUpdate.downloadPath(versionUrlResponse);

    if (!downloadPath) {
      return;
    }

    console.log({ downloadPath, latestRemote });

    // download zip
    await downloadZip(options, downloadPath, latestRemote);

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
  },
  deletePastVersions: function () {
    console.log('This is a stub');
  }
};

module.exports = nwSplasherAutoUpdate;
