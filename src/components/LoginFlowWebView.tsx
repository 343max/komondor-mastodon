import * as WebBrowser from "expo-web-browser"
import { useAuthRequest } from "expo-auth-session"
import React from "react"
import { getOAuthEndpoints } from "../lib/getOAuthEndpoints"

type Props = {
  clientId: string
  clientSecret: string
  redirectUri: string
  domain: string
  onSuccess: (token: string, state: string) => void
  onCanceled: () => void
  scopes: string[]
}

WebBrowser.maybeCompleteAuthSession()

export const LoginFlowWebView: React.FC<Props> = ({
  clientId,
  clientSecret,
  redirectUri,
  domain,
  onSuccess,
  onCanceled,
  scopes,
}) => {
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId,
      clientSecret,
      redirectUri,
      scopes,
    },
    getOAuthEndpoints(domain)
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
