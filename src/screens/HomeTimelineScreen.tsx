import React from "react"
import { NoAccountView } from "../components/NoAccountView"
import { SafeCurrentClientProvider } from "../hooks/useSafeCurrentClient"
import { TimelineView } from "../components/TimelineView"
import { useCurrentAccountMeta } from "../hooks/useCurrentAccountMeta"
import { fullUserName } from "../lib/fullUsername"

export const HomeTimelineScreen: React.FC = () => {
  const accountMeta = useCurrentAccountMeta()

  const headerTitle = React.useMemo(
    () => (accountMeta ? fullUserName(accountMeta) : "Home"),
    [accountMeta]
  )

  return (
    <SafeCurrentClientProvider fallback={<NoAccountView />}>
      <TimelineView
        timeline={(client) => client.timelines.home}
        headerTitle={headerTitle}
        autoHidingHeader={true}
      />
    </SafeCurrentClientProvider>
  )
}
