'use strict';

/**
 * @file Unit tests for helper functions.
 */

const { LIBRARY_LOG_PREFIX } = require('../../src/constants.cjs');
const helpers = require('../../src/helpers.cjs');

describe('helpers.cjs', () => {
  let customLogger;
  let options;
  const consoleError = console.error;

  beforeEach(() => {
    console.error = vi.fn();
    customLogger = vi.fn();
    options = {
      verbose: true,
      customLogger
    };
  });

  afterEach(() => {
    vi.clearAllMocks();
    console.error = consoleError;
  });

  describe('throwError', () => {
    const message = 'This is the message';
    const error = new Error('This is the error');

    test('Does nothing if nothing passed in', () => {
      helpers.throwError();

      expect(options.customLogger)
        .not.toHaveBeenCalled();

      expect(console.error)
        .not.toHaveBeenCalled();
    });

    test('Calls customLogger with message and error', () => {
      helpers.throwError(options, message, error);

      expect(options.customLogger)
        .toHaveBeenCalledWith(message, error);

      expect(console.error)
        .not.toHaveBeenCalled();
    });

    test('Calls customLogger with just message', () => {
      helpers.throwError(options, message);

      expect(options.customLogger)
        .toHaveBeenCalledWith(message);

      expect(console.error)
        .not.toHaveBeenCalled();
    });

    test('Calls console.error with message and error', () => {
      delete options.customLogger;
      helpers.throwError(options, message, error);

      expect(console.error)
        .toHaveBeenCalledWith(LIBRARY_LOG_PREFIX, message, error);

      expect(options.customLogger)
        .toEqual(undefined);
    });

    test('Calls console.error with just message', () => {
      delete options.customLogger;
      helpers.throwError(options, message);

      expect(console.error)
        .toHaveBeenCalledWith(LIBRARY_LOG_PREFIX, message);

      expect(options.customLogger)
        .toEqual(undefined);
    });
  });

  describe('requiredFunctionMissing', () => {
    test('Throws error when called', () => {
      let message;

      try {
        message = helpers.requiredFunctionMissing();
      } catch (error) {
        message = error;
      }

      expect(message)
        .toEqual('ERROR: Required function missing.');
    });
  });
});
