import { useSafeCurrentClient } from "../hooks/useSafeCurrentClient"
import { useAsyncEffect } from "../hooks/useAsyncEffect"
import React from "react"
import { Status } from "masto"
import { StatusListItem } from "./StatusListItem"
import { FlatList } from "react-native"

type Props = {
  timeline: "home" | "public"
}

export const TimelineView: React.FC<Props> = ({ timeline }) => {
  const client = useSafeCurrentClient()

  const paginator =
    timeline === "home" ? client.timelines.home : client.timelines.public

  const [statuses, setStatuses] = React.useState<
    IteratorResult<Status[], Status[]>
  >({ value: [] })
  const [refreshing, setRefreshing] = React.useState(false)

  const refresh = async () => {
    setRefreshing(true)
    setStatuses(await paginator.next())
    setRefreshing(false)
  }

  useAsyncEffect(refresh, [client])

  return (
    <FlatList
      refreshing={refreshing}
      onRefresh={refresh}
      data={statuses.value}
      renderItem={({ item }) => <StatusListItem status={item} key={item.id} />}
    />
  )
}
