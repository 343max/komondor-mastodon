import React from "react"
import { NoAccountView } from "../components/NoAccountView"
import { SafeCurrentClientProvider } from "../hooks/useSafeCurrentClient"
import { TimelineView } from "../components/TimelineView"

export const HomeTimelineScreen = () => {
  return (
    <SafeCurrentClientProvider fallback={<NoAccountView />}>
      <TimelineView timeline={"home"} />
    </SafeCurrentClientProvider>
  )
}
