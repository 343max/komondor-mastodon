import * as WebBrowser from "expo-web-browser"
import { useAuthRequest } from "expo-auth-session"
import React from "react"
import { getOAuthEndpoints } from "../lib/getOAuthEndpoints"
import { useAuthUrlEventListener } from "../hooks/useAuthUrlEventListener"

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

  // expo auth session has an awful longstanding bug, where expo auth session in android prod apps
  // simply will not return a successful login https://github.com/expo/expo/issues/12044
  // so this parses the callback url manually and return the result
  const androidCustomResponse = useAuthUrlEventListener()

  React.useEffect(() => {
    if (request) {
      promptAsync()
    }
  }, [request])

  React.useEffect(() => {
    const r = androidCustomResponse ?? response
    if (r) {
      if (r.type === "success") {
        onSuccess(r.params["code"] as string, r.params["state"] as string)
      } else if (["cancel", "dismiss", "error"].includes(r.type)) {
        onCanceled()
      }
    }
  }, [androidCustomResponse, response])

  return <></>
}
