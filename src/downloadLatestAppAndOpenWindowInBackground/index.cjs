'use strict';

/**
 * @file Top level function to compose logic for checking updates, downloading, extracting, and launching new app version window.
 */

const { OPTIONS } = require('../../api-type-definitions.cjs');
const helpers = require('../helpers.cjs');

const downloadZip = require('./downloadZip.cjs');
const extractZip = require('./extractZip.cjs');
const getLatestLocal = require('./getLatestLocal.cjs');
const getVersionUrl = require('./getVersionUrl.cjs');
const validation = require('./validation.cjs');

/**
 * Dummy stub function.
 */
function stub () {}

/**
 * Checks for updates. Downloads zip and extracts it if
 * new version is available. Launches a window pointed
 * to the latest version.
 *
 * @param {OPTIONS} options  The user's options object
 */
async function downloadLatestAppAndOpenWindowInBackground (options) {
  // Validate options
  options = validation.validateDownloadLatestAppAndOpenWindowInBackgroundOptions(options);

  // Get remote version data
  const versionUrlResponse = await getVersionUrl(options);

  // Get latest local
  const latestLocal = await getLatestLocal(options);

  // confirm version
  const latestRemote = await options.autoUpdate.confirmNewVersion(versionUrlResponse, latestLocal);

  if (!latestRemote || !['number', 'string'].includes(typeof(latestRemote))) {
    return;
  }

  // get download path
  const downloadPath = await options.autoUpdate.downloadPath(versionUrlResponse);

  if (!downloadPath) {
    return;
  }

  // download zip
  await downloadZip(options, downloadPath, latestRemote);

  // validate zip
  let zipIsValid = true;
  if (options.autoUpdate.validateZip) {
    try {
      const zipFilePath = helpers.getZipFilePath(latestRemote);
      zipIsValid = await options.autoUpdate.validateZip(zipFilePath);
    } catch (error) {
      zipIsValid = false;
      helpers.throwError(options, 'Issue found with your options.autoUpdate.validateZip function.', error);
    }
  }
  if (!zipIsValid) {
    return;
  }

  // extract zip
  const extractedSuccessfully = await extractZip(options, latestRemote);

  console.log({ extractedSuccessfully });

  // validate extraction
  let extractIsValid = true;
  if (options.autoUpdate.validateExtract) {
    try {
      const extractFilePath = helpers.getExtractPath(latestRemote);
      extractIsValid = await options.autoUpdate.validateExtract(extractFilePath);
    } catch (error) {
      extractIsValid = false;
      helpers.throwError(options, 'Issue found with your options.autoUpdate.validateExtract function.', error);
    }
  }
  if (!extractIsValid) {
    return;
  }

  // Update/Retry/Error/Complete
  stub();

  // close splash
  stub();

  // open app window
  stub();
}

module.exports = downloadLatestAppAndOpenWindowInBackground;
