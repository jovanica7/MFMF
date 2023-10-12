import { container } from 'webpack';
const { ModuleFederationPlugin } = container;

import { dependencies as deps } from './package.json';

export const entry = './src/index';
export const mode = 'development';
export const devServer = {
  port: 3000,
  hot: true,
  headers: {
    "Access-Control-Allow-Origin": "*"
  },
};
export const resolve = {
  extensions: ['.js', '.tsx', '.ts']
};
export const output = {
  publicPath: 'auto'
};
export const plugins = [
  new ModuleFederationPlugin({
    name: 'react_remote',
    filename: 'remoteEntry.js',
    exposes: {
      './EmployeeListReactComponent': './src/EmployeeListReactComponent',
    },
    shared: {
      react: {
        singleton: true,
        requiredVersion: deps.react,
      },
      'react-dom': {
        singleton: true,
        requiredVersion: deps['react-dom']
      },
    },
  }),
];
