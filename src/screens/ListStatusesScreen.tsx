import React from "react"
import { TimelineView } from "../components/TimelineView"
import { List } from "masto"
import { RouteProp, useRoute } from "@react-navigation/native"
import { RootStackParamList } from "../../types"
import { SafeClientProvider } from "../components/SafeClientProvider"

export type ListStatusesScreenParams = {
  list: List
}

export const ListStatusesScreen: React.FC = () => {
  const { params } = useRoute<RouteProp<RootStackParamList, "List">>()

  return (
    <SafeClientProvider>
      <TimelineView
        timeline={(client) => client.timelines.getListIterable(params.list.id)}
        headerTitle={params.list.title}
        autoHidingHeader={true}
      />
    </SafeClientProvider>
  )
}
