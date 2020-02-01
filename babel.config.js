module.exports = api => {
    return {
        presets: [
            [
                '@babel/preset-env',
                {
                    modules: api.env() === 'browser' ? false : 'commonjs',
                    useBuiltIns: 'usage',
                    corejs: { version: 3 },
                },
            ],
            '@babel/preset-typescript',
            '@babel/preset-react',
        ],
        plugins: [
            '@babel/plugin-proposal-class-properties',
            '@babel/plugin-proposal-object-rest-spread',
            '@babel/plugin-proposal-optional-chaining',
            '@babel/plugin-proposal-nullish-coalescing-operator',
            [
                'babel-plugin-styled-components',
                {
                    displayName: true,
                },
            ],
        ],
    };
};
