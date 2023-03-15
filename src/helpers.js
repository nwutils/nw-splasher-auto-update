'use strict';

/**
 * @file    File contains helper functions used by different files in the library.
 * @author  TheJaredWilcurt
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
    if (options.verbose && options.customLogger) {
      options.customLogger(message, error);
    } else if (options.verbose) {
      console.error(
        '_________________________\n' +
        'NW-Splasher-Auto-Update:\n' +
        message,
        error
      );
    }
  }
};

module.exports = helpers;
