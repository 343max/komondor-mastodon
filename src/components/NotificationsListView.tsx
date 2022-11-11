import React from "react"
import { FlatList } from "react-native"
import { NotificationView } from "./NotificationView"
import { usePaginator } from "../hooks/usePaginator"

export const NotificationsTimelineView: React.FC = () => {
  const props = usePaginator((client) => client.notifications.getIterator())

  return (
    <FlatList
      {...props}
      renderItem={({ item }) => (
        <NotificationView notification={item} key={item.id} />
      )}
    />
  )
}
