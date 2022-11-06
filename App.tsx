import { StatusBar } from "expo-status-bar"
import React from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"

import useColorScheme from "./src/hooks/useColorScheme"
import Navigation from "./src/navigation"
import { Provider } from "react-native-paper"

export default function App() {
  const colorScheme = useColorScheme()

  return (
    <Provider>
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    </Provider>
  )
}
