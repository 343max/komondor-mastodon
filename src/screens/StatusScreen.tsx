import { useRoute, RouteProp } from "@react-navigation/native"
import { Status } from "masto"
import { RootStackParamList } from "../../types"
import { NoAccountView } from "../components/NoAccountView"
import { StatusContextView } from "../components/StatusContextView"
import { SafeClientProvider } from "../components/SafeClientProvider"

export type StatusDetailScreenParams = {
  status: Status
}

export const StatusDetailScreen: React.FC = () => {
  const { params } = useRoute<RouteProp<RootStackParamList, "StatusDetails">>()

  return (
    <SafeClientProvider>
      <StatusContextView status={params.status} />
    </SafeClientProvider>
  )
}
