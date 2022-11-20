import { NotificationsTimelineView } from "../components/NotificationsListView"
import { NoAccountView } from "../components/NoAccountView"
import { SafeClientProvider } from "../components/SafeClientProvider"

export const NotificationsScreen: React.FC = () => {
  return (
    <SafeClientProvider>
      <NotificationsTimelineView />
    </SafeClientProvider>
  )
}
