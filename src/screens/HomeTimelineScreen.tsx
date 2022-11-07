import { SimpleLineIcons } from "@expo/vector-icons"
import React from "react"
import { Pressable } from "react-native"
import { NoAccountView } from "../components/NoAccountView"
import { useHeaderOptions } from "../hooks/useHeaderOptions"
import { useNavigation } from "@react-navigation/native"
import { SafeCurrentClientProvider } from "../hooks/useSafeCurrentClient"
import { TimelineView } from "../components/TimelineView"

export const HomeTimelineScreen = () => {
  const { navigate } = useNavigation()

  useHeaderOptions({
    title: "Home",
    tabBarIcon: ({ color }) => (
      <SimpleLineIcons name="home" color={color} size={22} />
    ),
    headerRight: ({ tintColor }) => {
      return (
        <Pressable
          onPress={() => navigate("Login")}
          style={({ pressed }) => ({
            opacity: pressed ? 0.5 : 1,
          })}
        >
          <SimpleLineIcons
            name="login"
            size={22}
            color={tintColor}
            style={{ marginRight: 15 }}
          />
        </Pressable>
      )
    },
  })

  return (
    <SafeCurrentClientProvider fallback={<NoAccountView />}>
      <TimelineView timeline={"home"} />
    </SafeCurrentClientProvider>
  )
}
