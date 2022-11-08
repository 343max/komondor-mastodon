import { Status } from "masto"
import { View, StyleProp, ViewStyle } from "react-native"
import { Text } from "react-native-paper"
import { tw } from "../lib/tw"
import { Avatar } from "./Avatar"

type Props = {
  status: Status
  style?: StyleProp<ViewStyle> | undefined
}

export const StatusView: React.FC<Props> = ({ status, style }) => {
  if (status.account.displayName === "jom") {
    console.log(JSON.stringify(status, null, 2))
  }
  return (
    <View style={[tw`flex-row w-full`, style]}>
      <Avatar uri={status.account.avatarStatic} size={30} style={tw`mr-3`} />
      <View style={tw`w-full`}>
        <Text variant="titleSmall">{status.account.displayName}</Text>
        <Text variant="titleSmall">{status.account.acct}</Text>
        {status.reblog ? (
          <StatusView status={status.reblog} style={tw`mt-2`} />
        ) : (
          <Text>{status.content}</Text>
        )}
      </View>
    </View>
  )
}
