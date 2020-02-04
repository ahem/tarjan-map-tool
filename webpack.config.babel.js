import webpack from 'webpack';

/** @type webpack.Configuration */
const config = {
    entry: './src/index.ts',
    output: {
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: { envName: 'browser' },
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json'],
    },
    devtool: 'cheap-eval-source-map',
};

export default config;
