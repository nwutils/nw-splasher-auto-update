'use strict';

/**
 * @file    Hits a provided endpoint and returns the data containing version info
 * @author  TheJaredWilcurt
 */

const { OPTIONS } = require('../api-type-definitions.js');

const helpers = require('./helpers.js');

/**
 * Uses the provided `versionUrl` to make a network request.
 * Returns a promise of the response.
 *
 * @param  {OPTIONS} options  User's validated options
 * @return {Promise}          Axios promise of the result
 */
async function getVersionUrl (options) {
  const versionUrl = options.autoUpdate.versionUrl;
  const axios = require('axios');
  return axios.get(versionUrl)
    .then((response) => {
      return response;
    })
    .catch((error) => {
      helpers.throwError(options, 'Error getting versionUrl response', error);
    });
};

module.exports = getVersionUrl;
