import React from "react"
import { NoAccountView } from "../components/NoAccountView"
import { SafeCurrentClientProvider } from "../hooks/useSafeCurrentClient"
import { TimelineView } from "../components/TimelineView"
import { List } from "masto"
import { RouteProp, useRoute } from "@react-navigation/native"
import { RootStackParamList } from "../../types"

export type ListStatusesScreenParams = {
  list: List
}

export const ListStatusesScreen: React.FC = () => {
  const { params } = useRoute<RouteProp<RootStackParamList, "List">>()

  return (
    <SafeCurrentClientProvider fallback={<NoAccountView />}>
      <TimelineView
        timeline={(client) => client.timelines.getListIterable(params.list.id)}
        headerTitle={params.list.title}
        autoHidingHeader={true}
      />
    </SafeCurrentClientProvider>
  )
}
