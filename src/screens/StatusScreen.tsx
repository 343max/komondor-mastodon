import { useRoute, RouteProp } from "@react-navigation/native"
import { Status } from "masto"
import { RootStackParamList } from "../../types"
import { NoAccountView } from "../components/NoAccountView"
import { StatusContextView } from "../components/StatusContextView"
import { SafeCurrentClientProvider } from "../hooks/useSafeCurrentClient"

export type StatusDetailScreenParams = {
  status: Status
}

export const StatusDetailScreen: React.FC = () => {
  const { params } = useRoute<RouteProp<RootStackParamList, "StatusDetails">>()

  return (
    <SafeCurrentClientProvider fallback={<NoAccountView />}>
      <StatusContextView status={params.status} />
    </SafeCurrentClientProvider>
  )
}
