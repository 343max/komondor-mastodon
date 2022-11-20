import React from "react"
import { TimelineView } from "../components/TimelineView"
import { useCurrentAccountMeta } from "../hooks/useCurrentAccountMeta"
import { fullUserName } from "../lib/fullUsername"
import { SafeClientProvider } from "../components/SafeClientProvider"

export const HomeTimelineScreen: React.FC = () => {
  const accountMeta = useCurrentAccountMeta()

  const headerTitle = React.useMemo(
    () => (accountMeta ? fullUserName(accountMeta) : "Home"),
    [accountMeta]
  )

  return (
    <SafeClientProvider>
      <TimelineView
        timeline={(client) => client.timelines.home}
        headerTitle={headerTitle}
        autoHidingHeader={true}
      />
    </SafeClientProvider>
  )
}
