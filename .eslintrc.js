module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:react/recommended',
        'prettier',
        'prettier/@typescript-eslint',
    ],
    plugins: ['react', 'prettier', 'babel'],
    parserOptions: {
        sourceType: 'module',
    },
    env: {
        es6: true,
        node: true,
    },
    rules: {
        'prettier/prettier': 'error',
        '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/prefer-interface': 'off',
        '@typescript-eslint/explicit-member-accessibility': 'off',
    },
    settings: {
        react: {
            version: '16',
        },
    },
};
