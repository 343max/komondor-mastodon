import { Status } from "masto"
import { StatusView } from "./StatusView"
import { useRefreshableList } from "../hooks/useRefreshableList"
import { FlatList } from "react-native"
import { StatusListItem } from "./StatusListItem"
import { useNavigation } from "@react-navigation/native"

type Props = {
  status: Status
}

export const StatusContextView: React.FC<Props> = ({ status }) => {
  const { navigate } = useNavigation()
  const listProps = useRefreshableList(async (client) => {
    const { ancestors, descendants } = await client.statuses.fetchContext(
      status.id
    )

    return [...ancestors, status, ...descendants]
  })

  return (
    <FlatList
      {...listProps}
      renderItem={({ item }) => (
        <StatusListItem
          status={item}
          showActions={true}
          onPress={() => navigate("StatusDetails", { status: item })}
        />
      )}
    />
  )
}
