import React from "react"
import { StatusListItem } from "./StatusListItem"
import { FlatList } from "react-native"
import { usePaginator } from "../hooks/usePaginator"

type Props = {
  timeline: "home" | "public"
}

export const TimelineView: React.FC<Props> = ({ timeline }) => {
  const props = usePaginator((client) =>
    timeline === "home" ? client.timelines.home : client.timelines.public
  )

  return (
    <FlatList
      {...props}
      renderItem={({ item }) => <StatusListItem status={item} key={item.id} />}
    />
  )
}
