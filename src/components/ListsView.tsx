import { useSafeCurrentClient } from "../hooks/useSafeCurrentClient"
import { useRefreshableList } from "../hooks/useRefreshableList"
import { FlatList } from "react-native"
import { List } from "react-native-paper"
import { tw } from "../lib/tw"
import React from "react"
import { Entypo } from "@expo/vector-icons"

export const ListsView: React.FC = () => {
  const listProps = useRefreshableList((client) => client.lists.fetchAll())

  return (
    <FlatList
      style={tw`h-full`}
      {...listProps}
      renderItem={({ item }) => {
        return (
          <List.Item
            title={item.title}
            right={({ color }) => (
              <Entypo name="chevron-small-right" size={24} color={color} />
            )}
          ></List.Item>
        )
      }}
    ></FlatList>
  )
}
