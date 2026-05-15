const path = require('path');
const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = withNativeWind(getDefaultConfig(__dirname), {
  input: './styles/global.css',
});
const defaultResolveRequest = config.resolver.resolveRequest;

config.resolver.resolveRequest = (context, moduleName, platform) => {
  const resolveRequest = defaultResolveRequest ?? context.resolveRequest;

  if (moduleName.startsWith('@/')) {
    return resolveRequest(
      context,
      path.resolve(__dirname, moduleName.slice(2)),
      platform
    );
  }

  return resolveRequest(context, moduleName, platform);
};

module.exports = config;