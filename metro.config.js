const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Exclude the frontend directory from Metro's watch list and resolver
config.resolver.blockList = [
  /frontend\/.*/,
];

config.resolver.nodeModulesPaths = [
  path.resolve(__dirname, 'node_modules'),
];

module.exports = config;
