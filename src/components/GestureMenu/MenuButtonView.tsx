import { StyleProp, ViewStyle, View, Text, Image } from "react-native"
import { tw } from "../../lib/tw"

type Props = {
  style?: StyleProp<ViewStyle>
  size?: number
}

export const MenuButtonView: React.FC<Props> = ({ style, size = 12 }) => {
  const Dot = () => (
    <View
      style={[
        tw`w-[20%] h-[20%] bg-black dark:bg-white dark:opacity-10 m-[5%] rounded-full`,
      ]}
    />
  )

  return (
    <View
      style={[
        tw`w-${size} h-${size} flex-col justify-center items-center rounded-full bg-white/10`,
        style,
      ]}
    >
      <Dot />
      <Dot />
      <Dot />
    </View>
  )
}
