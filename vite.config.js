'use strict';

/**
 * @file Configuration file for Vite to set up unit tests.
 */

/* eslint-disable import/extensions,import/no-unresolved,import/no-anonymous-default-export,import/no-unused-modules */
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    setupFiles: './tests/setup.cjs'
  }
});
