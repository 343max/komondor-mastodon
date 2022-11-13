import React from "react"
import { useAsyncEffect } from "./useAsyncEffect"

export const useRefreshableList = <T>(refreshFn: () => Promise<T[]>) => {
  const [items, setItems] = React.useState<T[]>([])
  const [refreshing, setRefreshing] = React.useState(false)

  const refresh = async () => {
    setRefreshing(true)
    setItems(await refreshFn())
    setRefreshing(false)
  }

  useAsyncEffect(refresh, [refreshFn])

  return { data: items, refreshing, onRefresh: refresh }
}
