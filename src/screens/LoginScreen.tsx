import React from "react"
import { View } from "react-native"
import { Button, TextInput } from "react-native-paper"
import { tw } from "../lib/tw"
import { domainRegex } from "../lib/domainRegex"
import { useNavigation } from "@react-navigation/native"
import { useHeaderOptions } from "../hooks/useHeaderOptions"
import { makeRedirectUri } from "expo-auth-session"
import { mastoLogin } from "../lib/mastoLogin"
import { LoginFlowWebView } from "../components/LoginFlowWebView"

export const LoginScreen: React.FC = () => {
  const [domain, setDomain] = React.useState("mastodon.komondor.dev")
  const [redirectUri, setRedirectUri] = React.useState<string | undefined>()
  const [app, setApp] = React.useState<
    { clientId: string; clientSecret: string } | undefined
  >()

  const { setOptions, goBack } = useNavigation()

  useHeaderOptions({
    headerTitle: "Add Account",
    headerLeft: () => <Button onPress={goBack}>Cancel</Button>,
  })

  const validDomain = React.useMemo(() => domain.match(domainRegex), [domain])

  const handleLogin = () => {
    if (!validDomain) {
      return
    }

    const f = async () => {
      const redirectUri = makeRedirectUri()
      setRedirectUri(redirectUri)
      console.log({ redirectUri })
      const masto = await mastoLogin({ url: `https://${domain}` })

      const app = await masto.apps.create({
        clientName: "Komondor",
        scopes: "read write follow",
        redirectUris: redirectUri,
      })

      setApp({ clientId: app.clientId!, clientSecret: app.clientSecret! })
    }

    f().catch((error) => console.error(error))
  }

  return (
    <View style={tw`p-5 flex-col`}>
      {app !== undefined && redirectUri && undefined ? (
        <LoginFlowWebView {...app} redirectUri={redirectUri} domain={domain} />
      ) : null}
      <TextInput
        mode="outlined"
        label="instance.social"
        value={domain}
        onChangeText={setDomain}
        keyboardType="url"
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus={true}
        onSubmitEditing={handleLogin}
      />
      <View style={tw`mt-4 mx-4`}>
        <Button mode="contained" disabled={!validDomain} onPress={handleLogin}>
          Login
        </Button>
      </View>
    </View>
  )
}
