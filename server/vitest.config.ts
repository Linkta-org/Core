import { defineConfig, mergeConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

// Base configuration with common settings
const baseConfig = defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: 'node',
    globals: true,
  },
});

export default defineConfig(({ mode }) => {
  // Configuration specific to unit tests
  const unitConfig = mergeConfig(baseConfig, {
    test: {
      include: ['tests/unit/**/*.test.[jt]s?(x)'],
    },
  });

  // Configuration specific to integration tests
  const integrationConfig = mergeConfig(baseConfig, {
    test: {
      include: ['tests/integration/**/*.test.[jt]s?(x)'],
      setupFiles: ['./tests/integration/setup/testDB.ts'],
    },
  });

  // Return config based on mode
  return mode === 'integration' ? integrationConfig : unitConfig;
});
