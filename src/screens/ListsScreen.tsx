import React from "react"
import { NoAccountView } from "../components/NoAccountView"
import { SafeCurrentClientProvider } from "../hooks/useSafeCurrentClient"
import { ListsView } from "../components/ListsView"

export const ListsScreen: React.FC = () => {
  return (
    <SafeCurrentClientProvider fallback={<NoAccountView />}>
      <ListsView />
    </SafeCurrentClientProvider>
  )
}
