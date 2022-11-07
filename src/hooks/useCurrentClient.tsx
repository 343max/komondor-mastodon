import { useClients } from "./useClients"
import { useCurrentAccountId } from "./useCurrentAccountId"
import { MastoClient } from "masto"
import React from "react"
import { useAsyncEffect } from "./useAsyncEffect"
import { useStoredAccounts } from "./useStoredAccounts"

export const useCurrentClient = () => {
  const [accountId] = useCurrentAccountId()
  const { accountTokens } = useStoredAccounts()
  const { getClient } = useClients()
  const [currentClient, setCurrentClient] = React.useState<
    MastoClient | undefined
  >()

  useAsyncEffect(async () => {
    const token = accountId
      ? accountTokens.find(({ appId }) => appId === accountId)
      : undefined
    if (token) {
      setCurrentClient(await getClient(token))
    }
  }, [accountId, accountTokens, getClient])

  return currentClient
}
