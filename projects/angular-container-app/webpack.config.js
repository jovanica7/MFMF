const { withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');
const deps = require('../../package.json').dependencies;

module.exports = withModuleFederationPlugin({
  remotes: {
    "react_remote": "http://localhost:3000/remoteEntry.js"
  },

  shared: {
    react: {
      singleton: true,
      requiredVersion: deps.react,
    },
    'react-dom/client': {
      singleton: true,
      requiredVersion: deps['react-dom'],
    },
  },

});
