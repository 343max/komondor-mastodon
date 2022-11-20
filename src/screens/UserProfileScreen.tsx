import { Account } from "masto"
import { useRoute } from "../hooks/useRoute"
import { NotificationsTimelineView } from "../components/NotificationsListView"
import { SafeClientProvider } from "../components/SafeClientProvider"
import { UserProfileView } from "../components/UserProfileView"
import { useUpdateHeaderOptions } from "../hooks/useHeaderOptions"

export type UserProfileScreenParams = {
  user: Account
}

export const UserProfileScreen: React.FC = () => {
  const { params } = useRoute<"UserProfile">()

  useUpdateHeaderOptions(
    () => ({ headerTitle: params.user.displayName }),
    [params.user]
  )

  return (
    <SafeClientProvider>
      <UserProfileView user={params.user} />
    </SafeClientProvider>
  )
}
