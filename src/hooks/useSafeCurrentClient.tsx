import { MastoClient } from "masto"
import React from "react"
import { useCurrentClient } from "./useCurrentClient"

const Context = React.createContext<MastoClient>(
  undefined as unknown as MastoClient
)

export const SafeCurrentClientProvider: React.FC<
  React.PropsWithChildren<{ fallback: React.ReactNode }>
> = ({ children, fallback }) => {
  const client = useCurrentClient()
  return client ? (
    <Context.Provider value={client}>{children}</Context.Provider>
  ) : (
    <>{fallback}</>
  )
}

export const useSafeCurrentClient = () => React.useContext(Context)
