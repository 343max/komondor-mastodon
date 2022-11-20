import { Text } from "react-native-paper"
import { Account } from "masto"

type Props = {
  user: Account
}

export const UserProfileView: React.FC<Props> = ({ user }) => {
  return <Text>{user.displayName}</Text>
}
