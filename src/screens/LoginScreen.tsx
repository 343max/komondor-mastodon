import React from "react"
import { View } from "react-native"
import { Button, TextInput } from "react-native-paper"
import { tw } from "../lib/tw"
import { domainRegex } from "../lib/domainRegex"
import { useNavigation } from "@react-navigation/native"

export const LoginScreen: React.FC = () => {
  const [domain, setDomain] = React.useState("")

  const { setOptions, goBack } = useNavigation()

  setOptions({
    title: "Add Account",
    headerRight: ({ canGoBack }: { canGoBack: boolean }) =>
      canGoBack ? <Button onPress={goBack}>Cancel</Button> : null,
  })

  const validDomain = React.useMemo(() => domain.match(domainRegex), [domain])

  const login = () => {
    if (!validDomain) {
      return
    }

    alert(domain)
  }

  return (
    <View style={tw`p-5 flex-col`}>
      <TextInput
        mode="outlined"
        label="instance.social"
        value={domain}
        onChangeText={setDomain}
        keyboardType="url"
        autoCapitalize="none"
        autoCorrect={false}
        autoFocus={true}
        onSubmitEditing={login}
      />
      <View style={tw`mt-4 mx-4`}>
        <Button mode="contained" disabled={!validDomain} onPress={login}>
          Login
        </Button>
      </View>
    </View>
  )
}
