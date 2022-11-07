import React from "react"
import { useStoredAccounts } from "./useStoredAccounts"
import { useStoredMeta } from "./useStoredMeta"
import { fullUserName } from "../lib/fullUsername"

export const useKnownAccounts = () => {
  const { accountTokens } = useStoredAccounts()
  const { accountsMeta } = useStoredMeta()

  return React.useMemo(
    () =>
      accountsMeta
        .filter(
          ({ appId }) =>
            accountTokens.findIndex((t) => t.appId === appId) !== -1
        )
        .map((a) => ({
          ...a,
          domain: accountTokens.find((t) => t.appId === a.appId)!.domain,
        }))
        .sort((a, b) => fullUserName(a).localeCompare(fullUserName(b))),
    [accountTokens, accountsMeta]
  )
}
