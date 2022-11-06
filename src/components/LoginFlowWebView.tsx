import * as WebBrowser from "expo-web-browser"
import { useAuthRequest } from "expo-auth-session"
import React from "react"

type Props = {
  clientId: string
  clientSecret: string
  redirectUri: string
  domain: string
  onSuccess: (token: string, state: string) => void
  onCanceled: () => void
}

WebBrowser.maybeCompleteAuthSession()

export const LoginFlowWebView: React.FC<Props> = ({
  clientId,
  clientSecret,
  redirectUri,
  domain,
  onSuccess,
  onCanceled,
}) => {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId,
      clientSecret,
      redirectUri,
      scopes: ["read", "write", "follow"], // TODO: push
    },
    { authorizationEndpoint: `https://${domain}/oauth/authorize` }
  )

  React.useEffect(() => {
    if (request) {
      promptAsync()
    }
  }, [request])

  React.useEffect(() => {
    if (response) {
      if (response.type === "success") {
        onSuccess(
          response.params["code"] as string,
          response.params["state"] as string
        )
      } else if (["cancel", "dismiss", "error"].includes(response.type)) {
        onCanceled()
      }
    }
  }, [response])

  return <></>
}
