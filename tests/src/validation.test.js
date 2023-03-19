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
      test('undefined', () => {
        const value = undefined;
        const defaultValue = 5;
        const key = 'KEY';

        expect(validation.defaultNumber(options, value, defaultValue, key))
          .toEqual(5);

        expect(customLogger)
          .not.toHaveBeenCalled();
      });

      test('Number', () => {
        const value = 3;
        const defaultValue = 5;
        const key = 'KEY';

        expect(validation.defaultNumber(options, value, defaultValue, key))
          .toEqual(3);

        expect(customLogger)
          .not.toHaveBeenCalled();
      });

      test('String', () => {
        const value = 'asdf';
        const defaultValue = 5;
        const key = 'KEY';

        expect(validation.defaultNumber(options, value, defaultValue, key))
          .toEqual(5);

        expect(customLogger)
          .toHaveBeenCalledWith('Optional KEY must be a whole number. Defaulting to 5');
      });

      test('NaN', () => {
        const value = NaN;
        const defaultValue = 5;
        const key = 'KEY';

        expect(validation.defaultNumber(options, value, defaultValue, key))
          .toEqual(5);

        expect(customLogger)
          .toHaveBeenCalledWith('Optional KEY must be a whole number. Defaulting to 5');
      });

      test('5.5', () => {
        const value = 5.5;
        const defaultValue = 5;
        const key = 'KEY';

        expect(validation.defaultNumber(options, value, defaultValue, key))
          .toEqual(5);

        expect(customLogger)
          .toHaveBeenCalledWith('Optional KEY must be a whole number. Defaulting to 5');
      });

      test('Infinity', () => {
        const value = Infinity;
        const defaultValue = 5;
        const key = 'KEY';

        expect(validation.defaultNumber(options, value, defaultValue, key))
          .toEqual(5);

        expect(customLogger)
          .toHaveBeenCalledWith('Optional KEY must be a whole number. Defaulting to 5');
      });

      test('-Infinity', () => {
        const value = -Infinity;
        const defaultValue = 5;
        const key = 'KEY';

        expect(validation.defaultNumber(options, value, defaultValue, key))
          .toEqual(5);

        expect(customLogger)
          .toHaveBeenCalledWith('Optional KEY must be a whole number. Defaulting to 5');
      });
    });

    /*
    describe('validateOptionalString', () => {
    });

    describe('validateOptionalObject', () => {
    });

    describe('validateOptionalFunctions', () => {
    });

    describe('validateOptionalFunction', () => {
    });

    describe('validateRequiredFunction', () => {
    });
    */
  });
});
