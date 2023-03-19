'use strict';

/**
 * @file   Tests the validation file's functions
 * @author TheJaredWilcurt
 */

const validation = require('../../src/validation.js');

describe('validation.js', () => {
  let customLogger;
  let options;

  beforeEach(() => {
    customLogger = vi.fn();
    options = {
      verbose: true,
      customLogger
    };
  });

  /*
  describe('Specific', () => {
  });
  */

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

      test('undefined', () => {
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

      test('undefined', () => {
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

      test('undefined', () => {
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

    /*
    describe('validateOptionalFunctions', () => {
    });

    describe('validateOptionalFunction', () => {
    });

    describe('validateRequiredFunction', () => {
    });
    */
  });
});
