import { DiscoveryDocument } from "expo-auth-session"

export const getOAuthEndpoints = (domain: string): DiscoveryDocument => ({
  authorizationEndpoint: `https://${domain}/oauth/authorize`,
  tokenEndpoint: `https://${domain}/oauth/token`,
  revocationEndpoint: `https://${domain}/oauth/revoke`,
})
