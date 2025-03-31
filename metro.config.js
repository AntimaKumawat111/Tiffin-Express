const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const config = getDefaultConfig(__dirname);

// ⚡ SVG सपोर्ट ऐड करें
config.resolver.assetExts = config.resolver.assetExts.filter(
  (ext) => ext !== "svg"
);
config.resolver.sourceExts.push("svg");

// ⚡ NativeWind सपोर्ट ऐड करें
module.exports = withNativeWind(config, { input: "./global.css" });
