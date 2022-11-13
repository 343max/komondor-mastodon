const IS_DEV = process.env.APP_VARIANT === "development"
const bundleIdentifier = IS_DEV
  ? "app.komondor.mastodon.dev"
  : "app.komondor.mastodon"

export default {
  expo: {
    name: "Komondor",
    slug: "komondor-mastodon",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: "komondor",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/images/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      buildNumber: "3",
      supportsTablet: true,
      bundleIdentifier,
      config: {
        usesNonExemptEncryption: false,
      },
    },
    android: {
      versionCode: 2,
      package: bundleIdentifier,
      blockedPermissions: ["android.permission.RECORD_AUDIO"],
    },
    web: {
      favicon: "./assets/images/favicon.png",
    },
    extra: {
      eas: {
        projectId: "55f72a26-e82e-49a0-9e7b-68d5efd0bc2d",
      },
    },
  },
}
