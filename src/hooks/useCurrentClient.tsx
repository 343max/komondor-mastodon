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
    if (accountId == undefined) {
      setCurrentClient(undefined)
    } else {
      const token = accountTokens.find(({ appId }) => appId === accountId)
      if (token) {
        const client = await getClient(token)
        setCurrentClient(client)
      }
    }
  }, [accountId, accountTokens, getClient])

  return currentClient
}
