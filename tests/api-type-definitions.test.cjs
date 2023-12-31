'use strict';

/**
 * @file A stub test file to give coverage to the JSDocs types file.
 */

const allTypeVariables = require('../api-type-definitions.cjs');

describe('api-type-definitions.cjs', () => {
  test('Stub for coverage', () => {
    const allTypeValues = Object.values(allTypeVariables);
    const allTypeVariablesAreUndefined = allTypeValues.every((value) => {
      return value === undefined;
    });

    expect(allTypeVariablesAreUndefined)
      .toEqual(true);
  });
});
