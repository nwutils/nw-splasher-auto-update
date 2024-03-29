'use strict';

/**
 * @file Tests the validation file's functions
 */

const validation = require('../../../src/downloadLatestAppAndOpenWindowInBackground/validation.cjs');
const helpers = require('../../../src/helpers.cjs');

describe('validation.cjs', () => {
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
    console.error = consoleError;
  });

  describe('Specific', () => {
    describe('validateDownloadLatestAppAndOpenWindowInBackgroundOptions', () => {
      test('undefined returns defaulted object with warnings', () => {
        expect(validation.validateDownloadLatestAppAndOpenWindowInBackgroundOptions())
          .toEqual({
            verbose: true,
            splasher: {
              port: 4443,
              closeSplashAfter: 3000
            },
            autoUpdate: {
              downloadPath: helpers.requiredFunctionMissing,
              confirmNewVersion: helpers.requiredFunctionMissing,
              downloadRetries: 3,
              extractRetries: 3
            },
            newWindow: {
              entry: undefined,
              window: undefined
            }
          });

        expect(console.error.mock.calls)
          .toEqual([
            [
              '_________________________\nNW-Splasher-Auto-Update:\n',
              'The autoUpdate.versionUrl must be a string starting with http'
            ],
            [
              '_________________________\nNW-Splasher-Auto-Update:\n',
              'The autoUpdate.downloadPath is a required function'
            ],
            [
              '_________________________\nNW-Splasher-Auto-Update:\n',
              'The autoUpdate.confirmNewVersion is a required function'
            ]
          ]);
      });
    });

    describe('validateSplasherOptions', () => {
      test('undefined', () => {
        expect(validation.validateSplasherOptions())
          .toEqual(undefined);

        expect(customLogger)
          .not.toHaveBeenCalled();
      });
    });

    describe('validateAutoUpdateOptions', () => {
      test('undefined', () => {
        expect(validation.validateAutoUpdateOptions())
          .toEqual(undefined);

        expect(customLogger)
          .not.toHaveBeenCalled();
      });
    });

    describe('validateNewWindowOptions', () => {
      test('undefined', () => {
        expect(validation.validateNewWindowOptions())
          .toEqual(undefined);

        expect(customLogger)
          .not.toHaveBeenCalled();
      });
    });

    describe('removeUndocumentedDownloadLatestAppAndOpenWindowInBackgroundKeys', () => {
      test('undefined', () => {
        expect(validation.removeUndocumentedDownloadLatestAppAndOpenWindowInBackgroundKeys())
          .toEqual(undefined);

        expect(customLogger)
          .not.toHaveBeenCalled();
      });
    });
  });

  describe('Generic', () => {
    describe('deleteKeys', () => {
      test('Good inputs', () => {
        const obj = {
          a: 1,
          b: 2,
          c: 3
        };
        const keys = ['a', 'b'];
        validation.deleteKeys(obj, keys);

        expect(obj)
          .toEqual({
            a: 1,
            b: 2
          });
      });
    });

    describe('defaultObject', () => {
      test('Empty object', () => {
        expect(validation.defaultObject(options, {}, 'KEY'))
          .toEqual({});

        expect(customLogger)
          .not.toHaveBeenCalled();
      });

      test('Good inputs', () => {
        expect(validation.defaultObject(options, { a: 1 }, 'KEY'))
          .toEqual({ a: 1 });

        expect(customLogger)
          .not.toHaveBeenCalled();
      });

      test('Undefined', () => {
        expect(validation.defaultObject(options, undefined, 'KEY'))
          .toEqual({});

        expect(customLogger)
          .not.toHaveBeenCalled();
      });

      test('Bad inputs', () => {
        expect(validation.defaultObject(options, 'asdf', 'KEY'))
          .toEqual({});

        expect(customLogger)
          .toHaveBeenCalledWith('KEY should be an object. Defaulting to {}');
      });
    });

    describe('defaultNumber', () => {
      const defaultValue = 5;
      const key = 'KEY';

      test('Undefined', () => {
        expect(validation.defaultNumber(options, undefined, defaultValue, key))
          .toEqual(5);

        expect(customLogger)
          .not.toHaveBeenCalled();
      });

      test('Number', () => {
        expect(validation.defaultNumber(options, 3, defaultValue, key))
          .toEqual(3);

        expect(customLogger)
          .not.toHaveBeenCalled();
      });

      test('String', () => {
        expect(validation.defaultNumber(options, 'asdf', defaultValue, key))
          .toEqual(5);

        expect(customLogger)
          .toHaveBeenCalledWith('Optional KEY must be a whole number. Defaulting to 5');
      });

      test('NaN', () => {
        expect(validation.defaultNumber(options, NaN, defaultValue, key))
          .toEqual(5);

        expect(customLogger)
          .toHaveBeenCalledWith('Optional KEY must be a whole number. Defaulting to 5');
      });

      test('5.5', () => {
        expect(validation.defaultNumber(options, 5.5, defaultValue, key))
          .toEqual(5);

        expect(customLogger)
          .toHaveBeenCalledWith('Optional KEY must be a whole number. Defaulting to 5');
      });

      test('Infinity', () => {
        expect(validation.defaultNumber(options, Infinity, defaultValue, key))
          .toEqual(5);

        expect(customLogger)
          .toHaveBeenCalledWith('Optional KEY must be a whole number. Defaulting to 5');
      });

      test('-Infinity', () => {
        expect(validation.defaultNumber(options, -Infinity, defaultValue, key))
          .toEqual(5);

        expect(customLogger)
          .toHaveBeenCalledWith('Optional KEY must be a whole number. Defaulting to 5');
      });
    });

    describe('validateOptionalString', () => {
      const key = 'KEY';

      test('Undefined', () => {
        expect(validation.validateOptionalString(options, undefined, key))
          .toEqual(undefined);

        expect(customLogger)
          .not.toHaveBeenCalled();
      });

      test('String', () => {
        expect(validation.validateOptionalString(options, 'asdf', key))
          .toEqual('asdf');

        expect(customLogger)
          .not.toHaveBeenCalled();
      });

      test('Number', () => {
        expect(validation.validateOptionalString(options, 5, key))
          .toEqual(undefined);

        expect(customLogger)
          .toHaveBeenCalledWith('The optional KEY must be a string');
      });
    });

    describe('validateOptionalObject', () => {
      const key = 'KEY';

      test('Undefined', () => {
        expect(validation.validateOptionalObject(options, undefined, key))
          .toEqual(undefined);

        expect(customLogger)
          .not.toHaveBeenCalled();
      });

      test('Object', () => {
        expect(validation.validateOptionalObject(options, {}, key))
          .toEqual({});

        expect(customLogger)
          .not.toHaveBeenCalled();
      });

      test('Array', () => {
        expect(validation.validateOptionalObject(options, [], key))
          .toEqual(undefined);

        expect(customLogger)
          .toHaveBeenCalledWith('Optional KEY must be an object');
      });

      test('String', () => {
        expect(validation.validateOptionalObject(options, 'asdf', key))
          .toEqual(undefined);

        expect(customLogger)
          .toHaveBeenCalledWith('Optional KEY must be an object');
      });
    });

    describe('validateOptionalFunctions', () => {
      test('String', () => {
        const a = vi.fn();
        options = {
          ...options,
          section: {
            a,
            b: 'asdf'
          }
        };
        const apiSection = 'section';
        const functions = ['a', 'b'];

        expect(validation.validateOptionalFunctions(options, apiSection, functions))
          .toEqual({
            verbose: true,
            customLogger,
            section: {
              a
            }
          });

        expect(customLogger)
          .toHaveBeenCalledWith('The section.b must be a function or undefined');
      });
    });

    describe('validateOptionalFunction', () => {
      const key = 'KEY';

      test('Undefined', () => {
        expect(validation.validateOptionalFunction(options, undefined, key))
          .toEqual(undefined);

        expect(customLogger)
          .not.toHaveBeenCalled();
      });

      test('String', () => {
        expect(validation.validateOptionalFunction(options, 'asdf', key))
          .toEqual(undefined);

        expect(customLogger)
          .toHaveBeenCalledWith('The KEY must be a function or undefined');
      });

      test('Function', () => {
        const value = vi.fn();

        expect(validation.validateOptionalFunction(options, value, key))
          .toEqual(value);

        expect(customLogger)
          .not.toHaveBeenCalled();
      });
    });

    describe('validateRequiredFunction', () => {
      const key = 'KEY';

      test('Undefined', () => {
        expect(validation.validateRequiredFunction(options, undefined, key))
          .toEqual(helpers.requiredFunctionMissing);

        expect(customLogger)
          .toHaveBeenCalledWith('The KEY is a required function');
      });

      test('Function', () => {
        const value = vi.fn();

        expect(validation.validateRequiredFunction(options, value, key))
          .toEqual(value);

        expect(customLogger)
          .not.toHaveBeenCalled();
      });
    });
  });
});
