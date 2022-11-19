import { MastoClient, Paginator } from "masto"
import React from "react"
import { useAsyncEffect } from "./useAsyncEffect"
import { useSafeCurrentClient } from "./useSafeCurrentClient"

export type PaginatorFn<P, T> = (client: MastoClient) => Paginator<P, T[]>

export const usePaginator = <P, T>(paginatorFn: PaginatorFn<P, T>) => {
  const client = useSafeCurrentClient()
  const paginator: Paginator<P, T[]> = paginatorFn(client)
  const [items, setItems] = React.useState<T[]>([])

  const [refreshing, setRefreshing] = React.useState(false)

  const refresh = async () => {
    setRefreshing(true)
    setItems((await paginator.next()).value)
    setRefreshing(false)
  }

  useAsyncEffect(refresh, [client])

  return { data: items, refreshing, onRefresh: refresh }
}
