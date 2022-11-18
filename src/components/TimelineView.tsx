import React from "react"
import { StatusListItem } from "./StatusListItem"
import { FlatList } from "react-native"
import { usePaginator } from "../hooks/usePaginator"
import { useHeaderOptions } from "../hooks/useHeaderOptions"
import { useCurrentAccountMeta } from "../hooks/useCurrentAccountMeta"
import { fullUserName } from "../lib/fullUsername"

type Props = {
  timeline: "home" | "public"
}

export const TimelineView: React.FC<Props> = ({ timeline }) => {
  const props = usePaginator((client) =>
    timeline === "home" ? client.timelines.home : client.timelines.public
  )

  const accountMeta = useCurrentAccountMeta()
  if (accountMeta) {
    useHeaderOptions({ headerTitle: fullUserName(accountMeta) })
  }

  return (
    <FlatList
      {...props}
      renderItem={({ item }) => (
        <StatusListItem status={item} showActions={true} key={item.id} />
      )}
    />
  )
}
