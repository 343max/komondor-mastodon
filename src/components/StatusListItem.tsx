import React from "react"
import { tw } from "../lib/tw"
import { StatusView } from "./StatusView"

type Props = React.ComponentProps<typeof StatusView>

export const StatusListItem = React.memo<Props>(
  ({ style, ...props }) => {
    return <StatusView {...props} style={[style, tw`w-full p-2`]} />
  },
  (a, b) => a.status.id == b.status.id
)
