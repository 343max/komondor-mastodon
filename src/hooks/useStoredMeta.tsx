import React from "react"
import { AccountMeta, AccountMetaStore } from "../lib/accountMetaStore"
import { useAsyncEffect } from "./useAsyncEffect"

type ContextType = {
  accountsMeta: AccountMeta[]
  setAccountsMeta: (accountMeta: AccountMeta[]) => Promise<void>
  getAccountMeta: (accountId: string) => AccountMeta | undefined
  updateAccountMeta: (accountMeta: AccountMeta) => Promise<void>
}

const Context = React.createContext<ContextType>(
  undefined as unknown as ContextType
)

export const StoredAccountMetaProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [accountsMeta, setAccountMeta] = React.useState<AccountMeta[]>([])

  const setAccountsMeta: ContextType["setAccountsMeta"] = async (accounts) => {
    AccountMetaStore.setAccounts(accounts)
    setAccountMeta(accounts)
  }

  const value: ContextType = {
    accountsMeta,
    setAccountsMeta,
    getAccountMeta: (accountId) => accountsMeta.find(({ appId }) => accountId),
    updateAccountMeta: async (account) => {
      const accounts = [
        ...accountsMeta.filter(({ appId }) => appId !== account.appId),
        account,
      ]
      await setAccountsMeta(accounts)
    },
  }

  useAsyncEffect(async () => {
    setAccountMeta(await AccountMetaStore.getAccounts())
  }, [])

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export const useStoredMeta = () => React.useContext(Context)
