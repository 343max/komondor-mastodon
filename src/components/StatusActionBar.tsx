import { EvilIcons, SimpleLineIcons } from "@expo/vector-icons"
import { Status } from "masto"
import {
  Share,
  StyleProp,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import { useTheme } from "react-native-paper"
import { tw } from "../lib/tw"

type Props = {
  status: Status
  style?: StyleProp<ViewStyle>
}

export const StatusActionBar: React.FC<Props> = ({ status, style }) => {
  const share = () => {
    Share.share({ url: status.url ?? status.uri })
  }
  const debugShare = () => {
    Share.share({ message: JSON.stringify(status, undefined, 2) })
  }

  const { colors } = useTheme()
  return (
    <View style={[style, tw`flex-row`]}>
      <TouchableOpacity onPress={share}>
        <EvilIcons name="share-apple" size={36} color={colors.primary} />
      </TouchableOpacity>
      <TouchableOpacity onPress={debugShare} style={tw`mx-8`}>
        <SimpleLineIcons name="wrench" size={24} color={colors.primary} />
      </TouchableOpacity>
    </View>
  )
}
