import React from "react"
import * as Store from "../lib/currentAccountIdStore"
import { useAsyncEffect } from "./useAsyncEffect"

export const useCurrentAccountId = () => {
  const [currentAccountId, setCurrentAccountId] = React.useState<
    string | undefined
  >()

  useAsyncEffect(async () => {
    setCurrentAccountId((await Store.getCurrentAccountId()) ?? undefined)
  }, [])

  return [
    currentAccountId,
    async (accountId: string | undefined) => {
      if (accountId) {
        await Store.setCurrentAccountId(accountId)
      } else {
        await Store.removeCurrentAccountId()
      }
      setCurrentAccountId(accountId)
    },
  ]
}
