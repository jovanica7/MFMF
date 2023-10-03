const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  remotes: {
    // "shell": "http://localhost:4200/remoteEntry.js",    
    "employee_list": `employee_list@http://localhost:3002/remoteEntry.js`
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
