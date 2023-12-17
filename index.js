'use strict';

/**
 * @file    Entry point for the library. Exposes the external facing function that accepts the input defined in the API documentation.
 * @author  TheJaredWilcurt
 */

/* eslint-disable */

const { OPTIONS } = require('./api-type-definitions.js');

const validation = require('./src/validation.js');
const getVersionUrl = require('./src/getVersionUrl.js');

const nwSplasherAutoUpdate = {
  /**
   * [description].
   *
   * @param  {OPTIONS} options  [description].
   */
  downloadLatestAppAndOpenWindowInBackground: async function (options) {
    options = validation.validateDownloadLatestAppAndOpenWindowInBackgroundOptions(options);
    const data = await getVersionUrl(options);
    console.log({ data });
    // confirm version
    // get download path
    // download zip
    // validate zip
    // extract zip
    // validate extraction
    // Update/Retry/Error/Complete
    // close splash
    // open app window
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
