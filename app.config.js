const IS_PROD = process.env.APP_VARIANT === "production"
const bundleIdentifier = IS_PROD
  ? "app.komondor.mastodon"
  : "app.komondor.mastodon.dev"

export default {
  expo: {
    name: IS_PROD ? "Komondor" : "Komondor Dev",
    slug: "komondor-mastodon",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/icon.png",
    scheme: IS_PROD ? "app.komondor" : "app.komondor-dev",
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
    updates: {
      url: "https://u.expo.dev/55f72a26-e82e-49a0-9e7b-68d5efd0bc2d",
    },
    runtimeVersion: {
      policy: "sdkVersion",
    },
  },
}
