'use strict';

/**
 * @file Unit tests for checking the most recent local version of the app.
 */

const path = require('path');

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

  test('Return false when there are no local folders', async () => {
    const result = await getLatestLocal(options);

    expect(result)
      .toEqual(false);
  });

  test('Return latest local version', async () => {
    global.nw.App.dataPath = path.join(__dirname, '..', '..', 'mockData');

    const result = await getLatestLocal(options);

    expect(result)
      .toEqual('2.10.1');
  });
});
