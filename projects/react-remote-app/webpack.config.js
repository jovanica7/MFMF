const { ModuleFederationPlugin } = require('webpack').container;

const deps = require('./package.json').dependencies;

module.exports = {
  mode: 'development',
  devServer: {
    port: 3002,
    hot: true,
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'react_remote',
      filename: 'remoteEntry.js',
      exposes: {
        './EmployeeListComponent': './src/EmployeeListComponent',
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        'react-dom': {
          singleton: true,
          requiredVersion: deps['react-dom'],
        },
      },
    }),
  ],
};
