import React from "react"
import { tw } from "../lib/tw"
import { StatusView } from "./StatusView"

type Props = Omit<React.ComponentProps<typeof StatusView>, "style">

export const StatusListItem = React.memo<Props>((props) => {
  return <StatusView {...props} style={tw`w-full p-2`} />
})
