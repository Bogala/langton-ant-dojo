// load the default config generator.
const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');
module.exports = (baseConfig, env) => {
    const config = genDefaultConfig(baseConfig, env);
    // Extend it as you need.
    // For example, add typescript loader:
    config.module.rules.push({
        test: /\.tsx?$/,
        exclude: /node_modules/,
        include: [/stories/, /components/, /shared/],
        loader: "awesome-typescript-loader"
    });

    config.module.rules.push({
        test: /\.scss$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }, {
            loader: "sass-loader" // compiles Sass to CSS
        }]
    });

    config.module.rules.push({
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {}  
          }
        ]
    });

    config.resolve.extensions.push('.png');
    config.resolve.extensions.push('.jpg');
    config.resolve.extensions.push('.gif');
    config.resolve.extensions.push('.svg');
    config.resolve.extensions.push('.scss');
    config.resolve.extensions.push('.ts');
    config.resolve.extensions.push('.tsx');
    return config;
};