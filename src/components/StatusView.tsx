import { Status } from "masto"
import { View, Image } from "react-native"
import { Text } from "react-native-paper"
import { tw } from "../lib/tw"

type Props = {
  status: Status
}

export const StatusView: React.FC<Props> = ({ status }) => {
  return (
    <View style={tw`flex-row m-1 w-full`}>
      <Image
        source={{ uri: status.account.avatar }}
        style={tw`w-15 h-15 rounded-lg`}
      />
      <View>
        <Text variant="titleSmall">
          {status.account.displayName} {status.account.username}
        </Text>
        <Text>{status.content}</Text>
      </View>
    </View>
  )
}
