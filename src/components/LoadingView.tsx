import { View } from "react-native"
import { tw } from "../lib/tw"

export const LoadingView: React.FC = () => {
  const Dot = () => (
    <View
      style={tw`w-5 h-5 bg-black dark:bg-white m-1 rounded-full opacity-3 dark:opacity-8`}
    />
  )
  return (
    <View style={tw`w-full h-full flex-row justify-center items-center`}>
      <Dot />
      <Dot />
      <Dot />
    </View>
  )
}
