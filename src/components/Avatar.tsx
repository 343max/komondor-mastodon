import { View, Image } from "react-native"
import { tw } from "../lib/tw"

type Props = {
  uri: string | undefined
  size?: number
}

export const Avatar: React.FC<Props> = ({ uri, size = 30 }) => {
  return uri === undefined ? (
    <View style={tw`bg-gray-500 w-[${size}px] h-[${size}px] rounded-full`} />
  ) : (
    <Image
      source={{ uri }}
      style={tw`bg-gray-500 w-[${size}px] h-[${size}px] rounded-full`}
    />
  )
}
