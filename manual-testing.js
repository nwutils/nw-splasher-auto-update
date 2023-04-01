'use strict';

/**
 * @file    Used for manually testing the code
 * @author  TheJaredWilcurt
 */

const library = require('./index.js');

const options = {
  autoUpdate: {
    versionUrl: 'https://api.github.com/repos/scout-app/scout-app/releases',
    confirmNewVersion: function (response, latestLocal) {
      response = JSON.parse(response);
      const latestRemote = response.latest.version;
      const updateAvailable = require('semver').gt(latestRemote, latestLocal);
      if (updateAvailable) {
        return latestRemote;
      }
      return false;
    },
    downloadPath: function (response) {
      response = JSON.parse(response);
      return response.latest.downloadUrl;
    }
  }
};

library.downloadLatestAppAndOpenWindowInBackground(options);
