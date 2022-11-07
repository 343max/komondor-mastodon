import React from "react"
import {
  AccountTokenStore,
  storableAccount,
  StoredAccount,
} from "../lib/accountsTokenStore"
import { useAsyncEffect } from "./useAsyncEffect"

type ContextType = {
  accountTokens: StoredAccount[]
  addAccount: (config: {
    domain: string
    token: string
    state: string
  }) => Promise<StoredAccount>
  removeAccount: (accountId: string) => Promise<void>
  removeAllAccounts: () => Promise<void>
}

const Context = React.createContext<ContextType>(
  undefined as unknown as ContextType
)

export const StoredAccountsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [accountTokens, setAccountTokens] = React.useState<StoredAccount[]>([])

  const value: ContextType = {
    accountTokens,
    addAccount: async ({ domain, token, state }) => {
      const account = storableAccount({ domain, token, state })
      const accounts = [...accountTokens, account]
      await AccountTokenStore.setAccounts(accounts)
      setAccountTokens(accounts)
      return account
    },
    removeAccount: async (accountId) => {
      const accounts = accountTokens.filter(({ appId }) => appId != accountId)
      await AccountTokenStore.setAccounts(accounts)
      setAccountTokens(accounts)
    },
    removeAllAccounts: async () => {
      await AccountTokenStore.deleteAccounts()
      setAccountTokens([])
    },
  }

  useAsyncEffect(async () => {
    setAccountTokens(await AccountTokenStore.getAccounts())
  }, [])

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export const useStoredAccounts = () => React.useContext(Context)
