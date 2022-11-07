import React from "react"
import * as Store from "../lib/currentAccountIdStore"
import { useAsyncEffect } from "./useAsyncEffect"

type ContextType = [string | undefined, (accountId: string | undefined) => void]

const Context = React.createContext<ContextType>([undefined, () => {}])

export const CurrentAccountIdProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [currentAccountId, setCurrentAccountId] = React.useState<
    string | undefined
  >()

  useAsyncEffect(async () => {
    setCurrentAccountId((await Store.getCurrentAccountId()) ?? undefined)
  }, [])

  const value: ContextType = [
    currentAccountId,
    async (accountId) => {
      if (accountId) {
        await Store.setCurrentAccountId(accountId)
      } else {
        await Store.removeCurrentAccountId()
      }
      setCurrentAccountId(accountId)
    },
  ]

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export const useCurrentAccountId = (): ContextType => React.useContext(Context)
