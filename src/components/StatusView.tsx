import { Status } from "masto"
import { View } from "react-native"
import { Text } from "react-native-paper"

type Props = {
  status: Status
}

export const StatusView: React.FC<Props> = ({ status }) => {
  return (
    <View>
      <Text>{status.content}</Text>
    </View>
  )
}
