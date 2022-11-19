import React from "react"
import { TouchableOpacity, View } from "react-native"
import { Button, HelperText, TextInput } from "react-native-paper"
import { tw } from "../lib/tw"
import { domainRegex } from "../lib/domainRegex"
import { useNavigation } from "@react-navigation/native"
import { useUpdateHeaderOptions } from "../hooks/useHeaderOptions"
import { makeRedirectUri, exchangeCodeAsync } from "expo-auth-session"
import { mastoLogin } from "../lib/mastoLogin"
import { LoginFlowWebView } from "../components/LoginFlowWebView"
import { useStoredAccounts } from "../hooks/useStoredAccounts"
import { useCurrentAccountId } from "../hooks/useCurrentAccountId"
import { getOAuthEndpoints } from "../lib/getOAuthEndpoints"

export const LoginScreen: React.FC = () => {
  const invalidDomainError = "Please make sure to enter the instance name"

  const [domain, setDomain] = React.useState("")
  const [redirectUri] = React.useState(makeRedirectUri)
  const [app, setApp] = React.useState<
    { clientId: string; clientSecret: string } | undefined
  >()

  const [error, setError] = React.useState<string | undefined>(undefined)

  const { goBack } = useNavigation()
  const { addAccount } = useStoredAccounts()
  const [, setCurrentAccountId] = useCurrentAccountId()

  const scopes = ["read", "write", "follow", "push"]

  useUpdateHeaderOptions(
    () => ({
      headerTitle: "Add Account",
      headerLeft: () => <Button onPress={goBack}>Cancel</Button>,
    }),
    [goBack]
  )

  const validDomain =
    React.useMemo(() => domain.match(domainRegex), [domain]) !== null

  React.useEffect(() => {
    if (validDomain && error === invalidDomainError) {
      setError(undefined)
    }
  }, [validDomain])

  const handleLogin = () => {
    if (!validDomain) {
      return
    }

    const f = async () => {
      setError(undefined)
      const masto = await mastoLogin({ url: `https://${domain}` })

      const app = await masto.apps.create({
        clientName: "Komondor",
        scopes: scopes.join(" "),
        redirectUris: redirectUri,
      })
      setApp({ clientId: app.clientId!, clientSecret: app.clientSecret! })
    }

    f().catch((error) => {
      console.error(error)
      setError(`${error}`)
    })
  }

  const handleDisabledPress = () => {
    setError(invalidDomainError)
  }

  const onSuccess: React.ComponentProps<
    typeof LoginFlowWebView
  >["onSuccess"] = (code, state) => {
    const f = async () => {
      const authTokens = await exchangeCodeAsync(
        {
          code,
          redirectUri,
          clientId: app!.clientId,
          clientSecret: app!.clientSecret,
          scopes,
        },
        getOAuthEndpoints(domain)
      )
      const account = await addAccount({
        domain,
        token: authTokens.accessToken,
        state,
      })
      await setCurrentAccountId(account.appId)
      goBack()
    }

    f()
  }

  return (
    <View style={tw`p-5 flex-col`}>
      {app !== undefined && redirectUri !== undefined ? (
        <LoginFlowWebView
          {...app}
          redirectUri={redirectUri}
          domain={domain}
          onSuccess={onSuccess}
          onCanceled={goBack}
          scopes={scopes}
        />
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
      <HelperText type="error" visible={error !== undefined}>
        {error}
      </HelperText>
      <View style={tw`mt-4 mx-4`}>
        <TouchableOpacity disabled={validDomain} onPress={handleDisabledPress}>
          <Button
            mode="contained"
            disabled={!validDomain}
            onPress={handleLogin}
          >
            Login
          </Button>
        </TouchableOpacity>
      </View>
    </View>
  )
}
