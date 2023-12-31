'use strict';

/**
 * @file Unit tests for checking the most recent local version of the app.
 */

const getLatestLocal = require('../../../src/downloadLatestAppAndOpenWindowInBackground/getLatestLocal.cjs');

describe('getLatestLocal.cjs', () => {
  let options;

  beforeEach(() => {
    options = {
      verbose: true,
      customLogger: vi.fn()
    };
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  test('Stub for coverage', async () => {
    const result = await getLatestLocal(options);

    expect(result)
      .toEqual('0.0.0');
  });
});
