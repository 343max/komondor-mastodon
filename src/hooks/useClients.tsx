import { MastoClient } from "masto"
import React from "react"
import { StoredAccount } from "../lib/accountsTokenStore"
import { mastoLogin } from "../lib/mastoLogin"

type CachedClients = Record<string, MastoClient>
type LatestMastoClient = { client: MastoClient; accountId: string }

type ContextType = {
  cachedClients: CachedClients
  getClient: (account: StoredAccount) => Promise<MastoClient>
  getCachedClient: (accountId: string) => MastoClient | undefined
  latestClient: LatestMastoClient | undefined
}

const Context = React.createContext<ContextType>({
  cachedClients: {},
  getClient: () => {
    throw Error("<ClientsProvider> not in view hierarchy")
  },
  getCachedClient: () => {
    throw Error("<ClientsProvider> not in view hierarchy")
  },
  latestClient: undefined,
})

export const ClientsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [clients, setClients] = React.useState<CachedClients>({})
  const [latestClient, setLatestClient] = React.useState<
    LatestMastoClient | undefined
  >()

  const value: ContextType = {
    cachedClients: clients,
    getClient: async (account) => {
      if (clients[account.appId]) {
        return clients[account.appId]
      } else {
        const client = await mastoLogin({
          url: `https://${account.domain}`,
          accessToken: account.token,
        })
        setClients((cs) => ({ ...cs, [account.appId]: client }))
        setLatestClient({ client, accountId: account.appId })
        return client
      }
    },
    getCachedClient: (accountId) => clients[accountId],
    latestClient,
  }

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export const useClients = () => React.useContext(Context)
