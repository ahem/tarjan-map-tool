module.exports = {
    preset: 'ts-jest',
    moduleNameMapper: {
        '\\.(?:png|svg|jpg|jpeg|gif|scss)$': '<rootDir>/jest/fileMock.js',
    },
    testEnvironment: require.resolve('jest-environment-jsdom-global'),
    rootDir: '.',
    coveragePathIgnorePatterns: ['<rootDir>/node_modules/'],
    testPathIgnorePatterns: ['<rootDir>/node_modules/', '<rootDir>/.yarncache/', '<rootDir>/dist'],
    globals: {
        'ts-jest': {
            diagnostics: {
                ignoreCodes: ['TS151001'],
            },
        },
    },
};
