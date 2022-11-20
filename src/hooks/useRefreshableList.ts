import React from "react"
import { useAsyncEffect } from "./useAsyncEffect"
import { MastoClient } from "masto"
import { useSafeCurrentClient } from "./useSafeCurrentClient"
import { Haptics } from "../lib/haptics"

export const useRefreshableList = <T>(
  refreshFn: (client: MastoClient) => Promise<T[]>
) => {
  const client = useSafeCurrentClient()
  const [items, setItems] = React.useState<T[]>([])
  const [refreshing, setRefreshing] = React.useState(false)

  const refresh = React.useMemo(
    () => async () => {
      setRefreshing(true)
      try {
        const items = await refreshFn(client)
        setItems(items)
      } catch (error) {
        throw error
      } finally {
        setRefreshing(false)
      }
    },
    [client]
  )

  const hapticRefresh = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
    await refresh()
  }

  useAsyncEffect(refresh, [refresh])

  return { data: items, refreshing, onRefresh: hapticRefresh }
}
