'use strict';

/**
 * @file    This file validates the options object passed in by the user of this library to ensure it meets the expectations of the code.
 * @author  TheJaredWilcurt
 */

const {
  DEFAULT_CLOSE_SPLASH_AFTER,
  DEFAULT_PORT_NUMBER
} = require('./constants.js')
const helpers = require('./helpers.js');

const validation = {
  /**
   * Creates, validates, and/or defaults the options object
   * and its values, including global settings.
   *
   * @example
   * options = validateDownloadLatestAppAndOpenWindowInBackgroundOptions(options);
   *
   * @param  {object} options  User's options
   * @return {object}          Validated or mutated user options
   */
  validateDownloadLatestAppAndOpenWindowInBackgroundOptions: function (options) {
    options = this.defaultObject(options);
    if (typeof(options.verbose) !== 'boolean') {
      options.verbose = true;
    }
    if (!options.customLogger) {
      delete options.customLogger;
    } else if (typeof(options.customLogger) !== 'function') {
      delete options.customLogger;
      helpers.throwError(options, 'Optional customLogger must be a type of function.');
    }

    options = this.validateSplasherOptions(options);
    options = this.validateAutoUpdateOptions(options);
    options = this.validateNewWindowOptions(options);

    return options;
  },
  validateSplasherOptions: function (options) {
    options.splasher = this.defaultObject(options.splasher);
    options.splasher.port = this.defaultNumber(options, options.splasher.port, DEFAULT_PORT_NUMBER, 'splasher.port');
    options.splasher.closeSplashAfter = this.defaultNumber(options, options.splasher.closeSplashAfter, DEFAULT_CLOSE_SPLASH_AFTER, 'splasher.closeSplashAfter');
    return options;
  },
  validateAutoUpdateOptions: function (options) {
    options.autoUpdate = this.defaultObject(options.autoUpdate);

    return options;
  },
  validateNewWindowOptions: function (options) {
    options.newWindow = this.defaultObject(options.newWindow);
    return options;
  },

  // Generic
  defaultObject: function (value) {
    if (typeof(value) !== 'object' || Array.isArray(value)) {
      value = {};
    }
    return value;
  },
  defaultNumber: function (options, value, defaultValue, key) {
    if (value === undefined) {
      return defaultValue;
    }
    if (
      typeof(value) !== 'number' ||
      isNaN(value) ||
      value !== Math.round(value) ||
      value === Infinity ||
      value === -Infinity
    ) {
      helpers.throwError(options, 'Optional ' + key + ' must be a whole number. Defaulting to ' + defaultValue);
      return defaultValue;
    }
    return value;
  }
};

module.exports = validation;
