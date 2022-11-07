import { useNavigation } from "@react-navigation/native"
import { View } from "react-native"
import { Button, Text } from "react-native-paper"
import { tw } from "../lib/tw"

export const NoAccountView: React.FC = () => {
  const { navigate } = useNavigation()
  return (
    <View style={tw`p-4 pt-20 flex-col justify-center`}>
      <Text variant="headlineLarge" style={tw`text-center`}>
        No accounts
      </Text>
      <Button
        mode="contained"
        style={tw`m-5`}
        onPress={() => navigate("Login")}
      >
        Add Account
      </Button>
    </View>
  )
}
