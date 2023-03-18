'use strict';

/**
 * @file    Used for manually testing the code
 * @author  TheJaredWilcurt
 */

const validation = require('./src/validation.js');

const options = {
  autoUpdate: {
    versionUrl: 'http://example.com/versions.json',
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

console.log(validation.validateDownloadLatestAppAndOpenWindowInBackgroundOptions(options));
