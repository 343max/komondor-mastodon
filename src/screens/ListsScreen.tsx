import React from "react"
import { ListsView } from "../components/ListsView"
import { SafeClientProvider } from "../components/SafeClientProvider"

export const ListsScreen: React.FC = () => {
  return (
    <SafeClientProvider>
      <ListsView />
    </SafeClientProvider>
  )
}
