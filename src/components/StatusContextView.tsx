import { Status } from "masto"
import { useRefreshableList } from "../hooks/useRefreshableList"
import { FlatList } from "react-native"
import { StatusListItem } from "./StatusListItem"
import { useStackNavigation } from "../hooks/useStackNavigation"
import { tw } from "../lib/tw"

type Props = {
  status: Status
}

export const StatusContextView: React.FC<Props> = ({ status: outerStatus }) => {
  const status = outerStatus.reblog ?? outerStatus
  const { push } = useStackNavigation()
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
          style={
            item.id === status.id ? tw`bg-gray-300 dark:bg-gray-800` : undefined
          }
          status={item}
          showActions={true}
          onPress={
            item.id === status.id
              ? undefined
              : () => push("StatusDetails", { status: item })
          }
        />
      )}
    />
  )
}
