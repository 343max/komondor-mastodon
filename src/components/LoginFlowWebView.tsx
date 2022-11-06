import * as WebBrowser from "expo-web-browser"
import { useAuthRequest } from "expo-auth-session"
import React from "react"

type Props = {
  clientId: string
  clientSecret: string
  redirectUri: string
  domain: string
}

WebBrowser.maybeCompleteAuthSession()

export const LoginFlowWebView: React.FC<Props> = ({
  clientId,
  clientSecret,
  redirectUri,
  domain,
}) => {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId,
      clientSecret,
      redirectUri,
      scopes: ["read", "write", "follow", "push"],
    },
    { authorizationEndpoint: `https://${domain}/oauth/authorize` }
  )

  React.useEffect(() => {
    promptAsync()
  }, [])

  React.useEffect(() => {
    if (response) {
      console.log(response)
    }
  }, [response])

  return <></>
}
