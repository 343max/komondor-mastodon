import { Account } from "masto"
import { usePaginator } from "../hooks/usePaginator"
import { tw } from "../lib/tw"
import { FlatList } from "react-native"
import { StatusListItem } from "./StatusListItem"
import { useStackNavigation } from "../hooks/useStackNavigation"
import { UserProfileHeaderView } from "./UserProfileHeaderView"

type Props = {
  user: Account
}

export const UserProfileView: React.FC<Props> = ({ user }) => {
  const listProps = usePaginator((client) =>
    client.accounts.getStatusesIterable(user.id, { excludeReplies: false })
  )
  const { push } = useStackNavigation()

  return (
    <FlatList
      {...listProps}
      style={[tw`h-full`]}
      ListHeaderComponent={<UserProfileHeaderView user={user} />}
      renderItem={({ item }) => (
        <StatusListItem
          status={item}
          showActions={true}
          onPress={() => push("StatusDetails", { status: item })}
        />
      )}
    />
  )
}
