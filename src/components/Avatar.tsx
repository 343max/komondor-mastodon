import { View, Image, StyleProp, ImageStyle } from "react-native"
import { tw } from "../lib/tw"

type Props = {
  uri: string | undefined
  size?: number
  style?: StyleProp<ImageStyle> | undefined
}

export const Avatar: React.FC<Props> = ({ uri, size = 30, style }) => {
  return uri === undefined ? (
    <View
      style={[tw`bg-gray-500 w-[${size}px] h-[${size}px] rounded-full`, style]}
    />
  ) : (
    <Image
      source={{ uri }}
      style={[tw`bg-gray-500 w-[${size}px] h-[${size}px] rounded-full`, style]}
    />
  )
}
