process.env.BABEL_ENV = 'browser';

module.exports = async function({ config }) {
    // find storybook rule matching JS files, and add support for typescript
    const storybookJsRule = config.module.rules.find(x => x.test.exec('find-the-correct-rule.js'));
    storybookJsRule.test = /\.(?:js|jsx|ts|tsx)?$/;
    const babelLoader = storybookJsRule.use.find(x => x.loader === 'babel-loader');
    babelLoader.options.presets = [
        ...(babelLoader.options.presets || []),
        '@babel/preset-typescript',
    ];
    babelLoader.options.plugins = [
        ...(babelLoader.options.plugins || []),
        'babel-plugin-styled-components',
    ];

    // add typescript extensions to webpacks resolve config
    config.resolve.extensions.push('.ts', '.tsx');

    return config;
};
