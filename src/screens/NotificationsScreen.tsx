import { NotificationsTimelineView } from "../components/NotificationsListView"
import { SafeCurrentClientProvider } from "../hooks/useSafeCurrentClient"
import { NoAccountView } from "../components/NoAccountView"

export const NotificationsScreen: React.FC = () => {
  return (
    <SafeCurrentClientProvider fallback={<NoAccountView />}>
      <NotificationsTimelineView />
    </SafeCurrentClientProvider>
  )
}
