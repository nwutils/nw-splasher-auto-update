'use strict';

/**
 * @file A stub test file to give coverage to the JSDocs types file.
 */

const {
  CUSTOMLOGGER,
  OPTIONS,
  SPLASHER,
  AUTOUPDATE,
  NEWWINDOW
} = require('../api-type-definitions.cjs');

describe('api-type-definitions.cjs', () => {
  test('Stub for coverage', () => {
    expect(CUSTOMLOGGER)
      .toEqual(undefined);

    expect(OPTIONS)
      .toEqual(undefined);

    expect(SPLASHER)
      .toEqual(undefined);

    expect(AUTOUPDATE)
      .toEqual(undefined);

    expect(NEWWINDOW)
      .toEqual(undefined);
  });
});
