import React from "react"
import { NoAccountView } from "../components/NoAccountView"
import { SafeCurrentClientProvider } from "../hooks/useSafeCurrentClient"

export const ListsScreen: React.FC = () => {
  return (
    <SafeCurrentClientProvider
      fallback={<NoAccountView />}
    ></SafeCurrentClientProvider>
  )
}
