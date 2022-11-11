import { Ionicons } from "@expo/vector-icons"
import { acountHeaderButton } from "../components/AccountMenu"
import { useHeaderOptions } from "../hooks/useHeaderOptions"
import { NotificationsTimelineView } from "../components/NotificationsListView"
import { SafeCurrentClientProvider } from "../hooks/useSafeCurrentClient"
import { NoAccountView } from "../components/NoAccountView"

export const NotificationsScreen: React.FC = () => {
  useHeaderOptions({
    title: "Notifications",
    tabBarIcon: ({ color }) => (
      <Ionicons name="ios-notifications-outline" size={28} color={color} />
    ),
    headerLeft: acountHeaderButton,
  })

  return (
    <SafeCurrentClientProvider fallback={<NoAccountView />}>
      <NotificationsTimelineView />
    </SafeCurrentClientProvider>
  )
}
