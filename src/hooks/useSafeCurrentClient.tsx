import { MastoClient } from "masto"
import React from "react"
import { useCurrentClient } from "./useCurrentClient"

const Context = React.createContext<MastoClient>(
  undefined as unknown as MastoClient
)

type Props = {
  notLoaded: React.ReactNode
  noAccount: React.ReactNode
}

export const SafeCurrentClientProvider: React.FC<
  React.PropsWithChildren<Props>
> = ({ children, noAccount, notLoaded }) => {
  const client = useCurrentClient()

  if (client === undefined) {
    return <>{notLoaded}</>
  } else if (client === null) {
    return <>{noAccount}</>
  } else {
    return <Context.Provider value={client}>{children}</Context.Provider>
  }
}

export const useSafeCurrentClient = () => React.useContext(Context)
