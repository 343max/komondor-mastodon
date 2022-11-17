import React from "react"
import * as Linking from "expo-linking"
import { AuthSessionResult } from "expo-auth-session"
import { parseAuthResponseParams } from "../lib/parseAuthResponseParams"

export const useAuthUrlEventListener = () => {
  const [authSessionResult, setAuthSessionResult] = React.useState<
    AuthSessionResult | null | undefined
  >()
  React.useEffect(() => {
    const listener = Linking.addEventListener("url", ({ url }) => {
      const parsed = Linking.parse(url)

      setAuthSessionResult(
        parseAuthResponseParams(parsed.queryParams ?? {}, url)
      )
    })

    return () => listener.remove()
  }, [])

  return authSessionResult
}
