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

export default defineConfig(({ mode }) => {
  // Configuration specific to unit tests
  const unitConfig = mergeConfig(baseConfig, {
    test: {
      include: ['tests/unit/**/*.test.[jt]s?(x)'],
      setupFiles: ['./tests/unit/setup/testSetup.ts'],
    },
  });

  // Configuration specific to integration tests
  const integrationConfig = mergeConfig(baseConfig, {
    test: {
      include: ['tests/integration/**/*.test.[jt]s?(x)'],
    },
  });

  // Return config based on mode
  return mode === 'integration' ? integrationConfig : unitConfig;
});
