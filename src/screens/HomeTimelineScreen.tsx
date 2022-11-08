import { AntDesign, SimpleLineIcons } from "@expo/vector-icons"
import React from "react"
import { Pressable } from "react-native"
import { NoAccountView } from "../components/NoAccountView"
import { useHeaderOptions } from "../hooks/useHeaderOptions"
import { SafeCurrentClientProvider } from "../hooks/useSafeCurrentClient"
import { TimelineView } from "../components/TimelineView"
import { useStoredAccounts } from "../hooks/useStoredAccounts"
import { useCurrentAccountId } from "../hooks/useCurrentAccountId"
import { tw } from "../lib/tw"
import { acountHeaderButton } from "../components/AccountMenu"
import { useTheme } from "react-native-paper"

export const HomeTimelineScreen = () => {
  const [, setCurrentAccountId] = useCurrentAccountId()
  const { removeAllAccounts } = useStoredAccounts()
  const { colors } = useTheme()

  useHeaderOptions({
    title: "Home",
    tabBarIcon: ({ color }) => (
      <SimpleLineIcons name="home" color={color} size={22} />
    ),
    headerLeft: acountHeaderButton,
  })

  return (
    <SafeCurrentClientProvider fallback={<NoAccountView />}>
      <TimelineView timeline={"home"} />
    </SafeCurrentClientProvider>
  )
}
