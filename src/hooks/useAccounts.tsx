import React from "react"
import { AccountMeta } from "../lib/accountMetaStore"
import { StoredAccount } from "../lib/accountsTokenStore"
import { MastoClient } from "masto"

type ContextType = {
  accountTokens: StoredAccount[]
  accountsMeta: AccountMeta[]
  clients: Record<string, MastoClient>
  currentAccountId: string | null
}

const Context = React.createContext<ContextType>({
  accountTokens: [],
  accountsMeta: [],
  clients: {},
  currentAccountId: null,
})

export const AccountProvider: React.FC = () => {
  return <Context.Provider />
}
