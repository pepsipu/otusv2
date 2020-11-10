import type { Config } from '@jest/types';

export default async (): Promise<Config.InitialOptions> => ({
  preset: 'ts-jest',
  rootDir: './tests',
  testEnvironment: 'node',
  verbose: true,
  setupFiles: ['./setup.ts'],
});
