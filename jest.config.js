module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    roots: ['<rootDir>/packages'],
    testPathIgnorePatterns: ['<rootDir>/packages/docs', 'node_modules'],
    transform: {
        '\\.(ts|tsx)$': 'ts-jest',
    },
    testMatch: ['<rootDir>/packages/**/*.test.ts?(x)'],
    moduleNameMapper: {
        '\\.(css|scss)$': 'identity-obj-proxy',
    },
};
