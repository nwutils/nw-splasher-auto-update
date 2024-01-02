'use strict';

/**
 * @file File contains helper functions used by different files in the library.
 */

const fs = require('fs');
const path = require('path');

const { OPTIONS } = require('../api-type-definitions.cjs');

const { LIBRARY_LOG_PREFIX } = require('./constants.cjs');

/**
 * If a folder path does not exist, creates it.
 *
 * @param {string} directory  Desired location of a folder
 */
function ensureExists (directory) {
  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory, { recursive: true });
  }
}

const helpers = {
  /**
   * Helper function for human readable logging. Calls customLogger
   * if passed in, or uses console.error to log human readable
   * warnings and errors. Used to report invalid API settings or
   * errors that occur during execution.
   *
   * @example
   * throwError(options, 'Message', err);
   *
   * @param {OPTIONS} options  The user's options containing verbose and customLogger settings
   * @param {string}  message  The text to be logged
   * @param {object}  error    Optional object with additional details
   */
  throwError: function (options, message, error) {
    options = options || {};

    if (options.verbose && options.customLogger && error) {
      options.customLogger(message, error);
    } else if (options.verbose && options.customLogger) {
      options.customLogger(message);
    } else if (options.verbose && error) {
      console.error(
        LIBRARY_LOG_PREFIX,
        message,
        error
      );
    } else if (options.verbose) {
      console.error(
        LIBRARY_LOG_PREFIX,
        message
      );
    }
  },
  /**
   * Dummy function used if a required function was not passed in.
   */
  requiredFunctionMissing: function () {
    throw 'ERROR: Required function missing.';
  },
  /**
   * Generate the path to the zips folder.
   *
   * @return {string} Path the zips folder
   */
  getZipsLocation: function () {
    return path.join(nw.App.dataPath, 'nwSplasherZips');
  },
  /**
   * Generate the path the extracts folder.
   *
   * @return {string} Path to the extracts folder
   */
  getExtractsLocation: function () {
    return path.join(nw.App.dataPath, 'nwSplasherExtracts');
  },
  /**
   * Generates the file path to the zip file based on the app version.
   *
   * @param  {string} version  The version number of the app
   * @return {string}          The full file path to the zip
   */
  getZipFilePath: function (version) {
    const zipsLocation = this.getZipsLocation();
    const directory = path.join(zipsLocation, version);
    ensureExists(directory);
    return path.join(directory, 'app.zip');
  },
  /**
   * Generates the file path to the extracted zip files folder.
   *
   * @param  {string} version  The version number of the app
   * @return {string}          The full file path to the extract folder
   */
  getExtractPath: function (version) {
    const extractsLocation = this.getExtractsLocation();
    const directory = path.join(extractsLocation, version);
    ensureExists(directory);
    return directory;
  }
};

module.exports = helpers;
