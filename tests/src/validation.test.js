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
        expect(validation.defaultObject(options, {}, 'test'))
          .toEqual({});

        expect(customLogger)
          .not.toHaveBeenCalled();
      });

      test('Good inputs', () => {
        expect(validation.defaultObject(options, { a: 1 }, 'test'))
          .toEqual({ a: 1 });

        expect(customLogger)
          .not.toHaveBeenCalled();
      });

      test('Undefined', () => {
        expect(validation.defaultObject(options, undefined, 'test'))
          .toEqual({});

        expect(customLogger)
          .not.toHaveBeenCalled();
      });

      test('Bad inputs', () => {
        expect(validation.defaultObject(options, 'asdf', 'test'))
          .toEqual({});

        expect(customLogger)
          .toHaveBeenCalledWith('test should be an object. Defaulting to {}');
      });
    });

    describe('defaultNumber', () => {
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
