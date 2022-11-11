import { Notification } from "masto"
import { View } from "react-native"
import { Text } from "react-native-paper"

type Props = { notification: Notification }

export const NotificationView: React.FC<Props> = ({ notification }) => {
  return (
    <View>
      <Text>{notification.type}</Text>
    </View>
  )
}
