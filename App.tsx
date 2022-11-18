import { StatusBar } from "expo-status-bar"
import React from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"

import useColorScheme from "./src/hooks/useColorScheme"
import Navigation from "./src/navigation"
import { Provider } from "react-native-paper"
import { StoredAccountsProvider } from "./src/hooks/useStoredAccounts"
import { StoredAccountMetaProvider } from "./src/hooks/useStoredMeta"
import { ClientsProvider } from "./src/hooks/useClients"
import { AccountMetaUpdater } from "./src/components/AccountMetaUpdater"
import { CurrentAccountIdProvider } from "./src/hooks/useCurrentAccountId"
import { useDeviceContext } from "twrnc"
import { tw } from "./src/lib/tw"

export default function App() {
  const colorScheme = useColorScheme()
  useDeviceContext(tw)

  return (
    <Provider>
      <CurrentAccountIdProvider>
        <StoredAccountsProvider>
          <StoredAccountMetaProvider>
            <ClientsProvider>
              <AccountMetaUpdater />
              <SafeAreaProvider>
                <Navigation colorScheme={colorScheme} />
                <StatusBar />
              </SafeAreaProvider>
            </ClientsProvider>
          </StoredAccountMetaProvider>
        </StoredAccountsProvider>
      </CurrentAccountIdProvider>
    </Provider>
  )
}
