'use strict';

/**
 * @file File contains helper functions used by different files in the library.
 */

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
   * @param {object} options  The user's options containing verbose and customLogger settings
   * @param {string} message  The text to be logged
   * @param {object} error    Optional object with additional details
   */
  throwError: function (options, message, error) {
    const libraryString = '_________________________\nNW-Splasher-Auto-Update:\n';
    if (options.verbose && options.customLogger && error) {
      options.customLogger(message, error);
    } else if (options.verbose && options.customLogger) {
      options.customLogger(message);
    } else if (options.verbose && error) {
      console.error(
        libraryString,
        message,
        error
      );
    } else if (options.verbose) {
      console.error(
        libraryString,
        message
      );
    }
  },
  /**
   * Dummy function used if a required function was not passed in.
   */
  requiredFunctionMissing: function () {
    throw 'ERROR: Required function missing.';
  }
};

module.exports = helpers;
