import { List } from "react-native-paper"
import { useSafeCurrentClient } from "../hooks/useSafeCurrentClient"
import { useRefreshableList } from "../hooks/useRefreshableList"

export const ListsView: React.FC = () => {
  const client = useSafeCurrentClient()
  const listProps = useRefreshableList(client.lists.fetchAll)

  return <List.Section {...listProps}></List.Section>
}
