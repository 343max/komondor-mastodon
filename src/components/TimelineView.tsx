import { useSafeCurrentClient } from "../hooks/useSafeCurrentClient"
import { useAsyncEffect } from "../hooks/useAsyncEffect"
import React from "react"
import { Status } from "masto"
import { FlashList } from "@shopify/flash-list"
import { StatusView } from "./StatusView"

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

  useAsyncEffect(async () => {
    setStatuses(await paginator.next())
  }, [])

  return (
    <FlashList
      data={statuses.value}
      renderItem={({ item }) => <StatusView status={item} />}
    />
  )
}
