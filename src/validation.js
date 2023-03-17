'use strict';

/**
 * @file    This file validates the options object passed in by the user of this library to ensure it meets the expectations of the code.
 * @author  TheJaredWilcurt
 */

const {
  DEFAULT_CLOSE_SPLASH_AFTER,
  DEFAULT_DOWNLOAD_RETRIES,
  DEFAULT_EXTRACT_RETRIES,
  DEFAULT_PORT_NUMBER
} = require('./constants.js');
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
    this.failed = false;
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
  /**
   * Validates the NW-Splasher settings passed into the downloadLatest... method.
   *
   * @param  {object} options  The user's options object
   * @return {object}          The user's options object (mutated)
   */
  validateSplasherOptions: function (options) {
    options.splasher = this.defaultObject(options.splasher);
    options.splasher.port = this.defaultNumber(
      options,
      options.splasher.port,
      DEFAULT_PORT_NUMBER,
      'splasher.port'
    );
    options.splasher.closeSplashAfter = this.defaultNumber(
      options,
      options.splasher.closeSplashAfter,
      DEFAULT_CLOSE_SPLASH_AFTER,
      'splasher.closeSplashAfter'
    );
    return options;
  },
  /**
   * Validates the Auto updater settings passed into the downloadLatest... method.
   *
   * @param  {object} options  The user's options object
   * @return {object}          The user's options object (mutated)
   */
  validateAutoUpdateOptions: function (options) {
    options.autoUpdate = this.defaultObject(options.autoUpdate);
    if (
      typeof(options.autoUpdate.versionUrl) !== 'string' ||
      !options.autoUpdate.versionUrl.startsWith('http')
    ) {
      delete options.autoUpdate.versionUrl;
      helpers.throwError(options, 'The autoUpdate.versionUrl must be a string starting with http');
    }
    options.autoUpdate.downloadPath = this.validateRequiredFunction(
      options,
      options.autoUpdate.downloadPath,
      'autoUpdate.downloadPath'
    );
    if (!options.autoUpdate.downloadPath) {
      delete options.autoUpdate.downloadPath;
    }
    options.autoUpdate.downloadRetries = this.defaultNumber(
      options,
      options.autoUpdate.downloadRetries,
      DEFAULT_DOWNLOAD_RETRIES,
      'autoUpdate.downloadRetries'
    );
    options.autoUpdate.extractRetries = this.defaultNumber(
      options,
      options.autoUpdate.extractRetries,
      DEFAULT_EXTRACT_RETRIES,
      'autoUpdate.extractRetries'
    );
    options = this.validateOptionalFunctions(options, 'autoUpdate' [
      'confirmNewVersion',
      'onUpdate',
      'validateZip',
      'validateExtract',
      'onRetry',
      'onError',
      'onComplete'
    ]);
    return options;
  },
  /**
   * Validates the New Window settings passed into downloadLatest... method.
   *
   * @param  {object} options  The user's options object
   * @return {object}          The user's options object (mutated)
   */
  validateNewWindowOptions: function (options) {
    options.newWindow = this.defaultObject(options.newWindow);
    options.newWindow.entry = this.validateOptionalString(
      options,
      options.newWindow.entry,
      'newWindow.entry'
    );
    options.newWindow.window = this.validateOptionalObject(
      options,
      options.newWindow.window,
      'newWindow.window'
    );
    return options;
  },

  // Generic
  /**
   * Returns the original value if it is an object, or defaults to empty object.
   *
   * @param  {object} value  Any value
   * @return {object}        The original value if an object, or an empty object
   */
  defaultObject: function (value) {
    if (typeof(value) !== 'object' || Array.isArray(value)) {
      value = {};
    }
    return value;
  },
  /**
   * Validates a value is a number and if not returns a default.
   *
   * @param  {object} options       The user's options object
   * @param  {number} value         The number to validate
   * @param  {number} defaultValue  The fallback number
   * @param  {string} key           Used in error message
   * @return {number}               The original number or the fallback
   */
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
  },
  validateOptionalString: function (options, value, key) {
    if (value === undefined) {
      return value;
    }
    if (typeof(value) !== 'string') {
      helpers.throwError(options, 'The optional ' + key + ' must be a string');
      return undefined;
    }
    return value;
  },
  /**
   * Validates optional objects.
   *
   * @param  {object} options  Users options object
   * @param  {object} value    Object to validate
   * @param  {string} key      Used by error message
   * @return {object}          Original object or undefined
   */
  validationOptionalObject: function (options, value, key) {
    if (value === undefined) {
      return value;
    }
    if (typeof(value) !== 'object' || Array.isArray(value)) {
      helpers.throwError(options, 'Optional ' + key + ' must be an object.');
      return undefined;
    }
    return value;
  },
  /**
   * Loops over list of optional functions and validates them.
   *
   * @param  {object} options     User's options object
   * @param  {string} apiSection  Name of the subKey on the options object where the optional functions live
   * @param  {array}  functions   Array of strings of function names
   * @return {object}             User's options object (mutated)
   */
  validateOptionalFunctions: function (options, apiSection, functions) {
    functions.forEach((func) => {
      options[apiSection][func] = this.validateOptionalFunction(
        options,
        options[apiSection][func],
        apiSection + '.' + func
      );
      if (!options[apiSection][func]) {
        delete options[apiSection][func];
      }
    });
    return options;
  },
  /**
   * Verifies a value is a function or undefined.
   *
   * @param  {object}   options  The user's options object
   * @param  {function} value    The function to validate
   * @param  {string}   key      Used in error message
   * @return {function}          The original function or undefined
   */
  validateOptionalFunction: function (options, value, key) {
    if (typeof(value) !== 'function') {
      helpers.throwError(options, 'The ' + key + ' must be a function or undefined');
      return undefined;
    }
    return value;
  },
  /**
   * Verifies a required function is a function.
   *
   * @param  {object}   options  User's options object
   * @param  {function} value    The function to validate
   * @param  {string}   key      Used in error message
   * @return {function}          The original value or undefined
   */
  validateRequiredFunction: function (options, value, key) {
    if (typeof(value) !== 'function') {
      helpers.throwError(options, 'The ' + key + ' is a required function');
      return undefined;
    }
    return value;
  },
};

module.exports = validation;
