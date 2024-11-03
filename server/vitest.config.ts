import { defineConfig, mergeConfig } from 'vitest/config';

// Base configuration with common settings
const baseConfig = defineConfig({
  test: {
    environment: 'node',
    globals: true,
  },
});

// Configuration specific to unit tests
const unitConfig = mergeConfig(baseConfig, {
  test: {
    include: ['**/*.unit.test.[jt]s?(x)'],
  },
});

// Configuration specific to integration tests
const integrationConfig = mergeConfig(baseConfig, {
  test: {
    include: ['**/*.integration.test.[jt]s?(x)'],
    setupFiles: ['./tests/integration/setup/testDB.ts'],
  },
});

// Export configuration based on TEST_TYPE environment variable
// Defaults to unitConfig if TEST_TYPE is not set to 'integration'
export default process.env.TEST_TYPE === 'integration'
  ? integrationConfig
  : unitConfig;
