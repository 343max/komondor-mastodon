import { Notification } from "masto"
import { View } from "react-native"
import { Text } from "react-native-paper"
import { tw } from "../lib/tw"
import { Avatar } from "./Avatar"
import { StatusView } from "./StatusView"
import { StatusContentView } from "./StatusContentView"

type Props = { notification: Notification }

const getDescription = ({ type, account, status }: Notification): string => {
  const user = account.displayName != "" ? account.displayName : account.acct
  switch (type) {
    case "mention":
      return `${user} mentioned you`
    case "favourite":
      return `${user} stared your post`
    case "follow":
      return `${user} started following you`
    case "follow_request":
      return `${user} wants to follow you`
    case "poll":
      return `${user} poll`
    case "reblog":
      return `${user} reposted your post`
  }
}

export const NotificationView: React.FC<Props> = ({ notification }) => {
  return (
    <View style={tw`p-2 w-full`}>
      <View style={tw`flex-row`}>
        <Avatar
          uri={notification.account.avatarStatic}
          size={30}
          style={tw`mr-2`}
        />
        <View style={tw`flex-shrink-1 flex-grow`}>
          <Text style={tw`flex-shrink-1`}>{getDescription(notification)}</Text>
          {notification.status ? (
            <StatusContentView status={notification.status} style={tw`mt-2`} />
          ) : null}
        </View>
      </View>
    </View>
  )
}
