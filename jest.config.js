module.exports = {
    preset: 'ts-jest',
    setupFilesAfterEnv: ['<rootDir>/shared/testing/testSetup.js'],
    testEnvironment: 'jsdom',
    roots: ['<rootDir>/packages'],
    collectCoverageFrom: [
        'packages/**/**.tsx',
        'packages/**/**.ts',
        '!packages/docs/**',
        '!packages/**/dist/**',
        '!packages/**/index.tsx',
        '!packages/**/Example.tsx',
        '!packages/**/Examples.tsx',
    ],
    testPathIgnorePatterns: ['<rootDir>/packages/docs', 'node_modules'],
    transform: {
        '\\.(ts|tsx)$': 'ts-jest',
    },
    testMatch: ['<rootDir>/packages/**/*.test.ts?(x)'],
    moduleNameMapper: {
        '\\.(css|scss)$': 'identity-obj-proxy',
    },
};
