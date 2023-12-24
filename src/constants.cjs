'use strict';

/**
 * @file Defines shared constant variables
 */

const path = require('path');

const LIBRARY_NAME = 'nw-splasher-auto-update';

const LIBRARY_LOG_PREFIX = '_________________________\nNW-Splasher-Auto-Update:\n';

const DEFAULT_CLOSE_SPLASH_AFTER = 3000;
const DEFAULT_PORT_NUMBER = 4443;

const DEFAULT_DOWNLOAD_RETRIES = 3;
const DEFAULT_EXTRACT_RETRIES = 3;

const STORAGE_LOCATION = path.join(nw.App.dataPath, LIBRARY_NAME);

module.exports = {
  DEFAULT_CLOSE_SPLASH_AFTER,
  DEFAULT_DOWNLOAD_RETRIES,
  DEFAULT_EXTRACT_RETRIES,
  DEFAULT_PORT_NUMBER,
  LIBRARY_LOG_PREFIX,
  LIBRARY_NAME,
  STORAGE_LOCATION
};
