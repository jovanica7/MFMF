const { ModuleFederationPlugin } = require('webpack').container;
const deps = require('./package.json').dependencies;

module.exports = {
  output: {
    scriptType: 'text/javascript'
  },
  optimization: {
    runtimeChunk: false
  },
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    hot: true
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'angular-container-app',
      filename: 'remoteEntry.js',
      remotes: {
        list_user: `react_remote@http://localhost:3002/remoteEntry.js`,
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: deps.react
        },
        'react-dom/client': {
          singleton: true,
          requiredVersion: deps['react-dom']
        },
      },
    }),
  ],
};
