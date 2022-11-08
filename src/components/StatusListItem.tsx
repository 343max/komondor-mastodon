import { View } from "react-native"
import { tw } from "../lib/tw"
import { StatusView } from "./StatusView"

type Props = Omit<React.ComponentProps<typeof StatusView>, "style">

export const StatusListItem: React.FC<Props> = (props) => {
  return <StatusView {...props} style={tw`m-4`} />
}
