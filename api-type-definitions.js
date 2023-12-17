/**
 * @file Type definitions for the API and reusable functions/objects.
 */

/**
 * OPTIONAL: console.error is called by default if verbose: true.
 *
 * Your own custom logging function called with helpful warning/error
 * messages from the internal validators. Only used if verbose: true.
 *
 * @callback {Function} CUSTOMLOGGER
 * @param    {string}   message       The human readable warning/error message
 * @param    {object}   [error]       Sometimes an error or options object is passed
 * @return   {void}
 */

/**
 * @typedef  {object}       OPTIONS
 * @property {boolean}      [verbose=true]  Logs out helpful warnings/errors using `customLogger` or console.error.
 * @property {CUSTOMLOGGER} [customLogger]  Called (if verbose: true) with helpful warning/error messages from internal validators.
 * @property {SPLASHER}     [splasher]      Settings for the splash screen
 * @property {AUTOUPDATE}   [autoUpdate]    Settings for auto updating your app
 * @property {NEWWINDOW}    [newWindow]     Settings for the main app window displayed after auto-update completes
 */

/**
 * @typedef  {object} SPLASHER
 * @property {number} [port=4443]              Websocket port the splash screen window listens on to know when to close itself.
 * @property {number} [closeSplashAfter=3000]  ms to wait before auto-closing splash. -1 to only close if signaled via the websocket port.
 */

/**
 * @typedef  {object}   AUTOUPDATE
 * @property {string}   versionUrl           The url we hit to check for latest version.
 * @property {Function} confirmNewVersion    .
 * @property {Function} downloadPath         .
 * @property {number}   [downloadRetries=3]  .
 * @property {number}   [extractRetries=3]   .
 * @property {Function} [onUpdate]           .
 * @property {Function} [validateZip]        .
 * @property {Function} [validateExtract]    .
 * @property {Function} [onRetry]            .
 * @property {Function} [onError]            .
 * @property {Function} [onComplete]         .
 */

/**
 * @typedef  {object} NEWWINDOW
 * @property {string} [entry]   The file to load in the window, like 'index.html'.
 * @property {object} [window]  Any NW.js window subfield options.
 *                              [Docs](https://docs.nwjs.io/en/latest/References/Manifest%20Format/#window-subfields)
 */

/**
 * @type {CUSTOMLOGGER}
 */
let CUSTOMLOGGER;

/**
 * @type {OPTIONS}
 */
let OPTIONS;

/**
 * @type {SPLASHER}
 */
let SPLASHER;

/**
 * @type {AUTOUPDATE}
 */
let AUTOUPDATE;

/**
 * @type {NEWWINDOW}
 */
let NEWWINDOW;

module.exports = {
  CUSTOMLOGGER,
  OPTIONS,
  SPLASHER,
  AUTOUPDATE,
  NEWWINDOW
};
