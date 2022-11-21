import { MastoClient, Paginator } from "masto"
import React from "react"
import { useAsyncEffect } from "./useAsyncEffect"
import { useSafeCurrentClient } from "./useSafeCurrentClient"
import { Haptics } from "../lib/haptics"
import { FlatListProps } from "react-native"
import { removedDuplicates } from "../lib/removeDuplicates"

type Identifiable = { id: string }

export type PaginatorFn<P, T extends Identifiable> = (
  client: MastoClient
) => Paginator<P, T[]>

export const usePaginator = <P, T extends Identifiable>(
  paginatorFn: PaginatorFn<P, T>
): Omit<FlatListProps<T>, "renderItem"> => {
  const client = useSafeCurrentClient()
  const [paginator, setPaginator] = React.useState<Paginator<P, T[]>>(() =>
    paginatorFn(client)
  )
  const [items, setItems] = React.useState<T[]>([])
  const [endOfList, setEndOfList] = React.useState(false)

  const [refreshing, setRefreshing] = React.useState(false)

  const handleNext = (result: IteratorResult<T[]>): T[] => {
    if (result.done) {
      setEndOfList(true)
      return []
    } else {
      return result.value
    }
  }

  const refresh = React.useMemo(
    () => async () => {
      setRefreshing(true)
      const p = paginatorFn(client)
      setEndOfList(false)
      setPaginator(p)
      setItems(handleNext(await p.next()))
      setRefreshing(false)
    },
    [paginatorFn, client]
  )

  const hapticRefresh = React.useMemo(
    () => async () => {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
      await refresh()
    },
    [refresh]
  )

  const onEndReached = React.useMemo(
    () =>
      endOfList
        ? () => {}
        : async () => {
            const newItems = handleNext(await paginator.next())
            if (newItems.length > 0) {
              setItems((i) => removedDuplicates([...i, ...newItems]))
            }
          },
    [paginator, setItems, endOfList]
  )

  useAsyncEffect(refresh, [client])

  return {
    data: items,
    refreshing,
    onRefresh: hapticRefresh,
    onEndReachedThreshold: 2,
    onEndReached,
  }
}
