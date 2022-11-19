import { useRefreshableList } from "../hooks/useRefreshableList"
import { FlatList } from "react-native"
import { List } from "react-native-paper"
import { tw } from "../lib/tw"
import React from "react"
import { Entypo } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

export const ListsView: React.FC = () => {
  const listProps = useRefreshableList((client) => client.lists.fetchAll())
  const { navigate } = useNavigation()

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
            onPress={() => navigate("List", { list: item })}
          ></List.Item>
        )
      }}
    ></FlatList>
  )
}
