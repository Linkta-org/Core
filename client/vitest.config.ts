import { defineConfig, mergeConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// Base configuration with common settings
const baseConfig = defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    globals: true,
  },
});

// Configuration specific to unit tests
const unitConfig = mergeConfig(baseConfig, {
  test: {
    include: ['**/*.unit.test.[jt]s?(x)'],
    setupFiles: ['./tests/unit/setup/testSetup.ts'],
  },
});

// Configuration specific to integration tests
const integrationConfig = mergeConfig(baseConfig, {
  test: {
    include: ['**/*.integration.test.[jt]s?(x)'],
  },
});

// Export configuration based on TEST_TYPE environment variable
// Defaults to unitConfig if TEST_TYPE is not set to 'integration'
export default process.env.TEST_TYPE === 'integration'
  ? integrationConfig
  : unitConfig;
