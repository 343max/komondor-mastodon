import React from "react"
import { useCurrentAccountId } from "./useCurrentAccountId"
import { useKnownAccounts } from "./useKnownAccounts"

export const useCurrentAccountMeta = () => {
  const [currentAccountId] = useCurrentAccountId()
  const accounts = useKnownAccounts()

  return React.useMemo(
    () => accounts.find(({ appId }) => appId === currentAccountId),
    [currentAccountId, accounts]
  )
}
